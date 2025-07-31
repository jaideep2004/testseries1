// //src/pages/ContentDetails.jsx

import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import SEO from "../components/common/SEO";
import {
	Box,
	Paper,
	Typography,
	Button,
	Chip,
	Alert,
	CircularProgress,
	Divider,
	Grid,
	Stack,
	Container,
	Card,
	CardContent,
	CardHeader,
	Tooltip,
	Dialog,
	DialogTitle,
	DialogContent,
	IconButton,
	Snackbar,
} from "@mui/material";
import {
	Lock,
	Download,
	Clock,
	Tag,
	Book,
	School,
	Code,
	StarHalf,
	FileText,
} from "lucide-react";
import api, { downloadFile } from "../utils/api";
import PaymentModal from "../components/content/PaymentModal";
import useAuth from "../hooks/useAuth";
import { Preview } from "@mui/icons-material";
import { Close } from "@mui/icons-material";
import { extractIdFromSlug, createUniqueSlug } from "../utils/helpers";

const ContentDetails = () => {
	const { slug } = useParams();
	const contentId = extractIdFromSlug(slug);
	const location = useLocation();
	const navigate = useNavigate();
	const { user } = useAuth();

	const [content, setContent] = useState(location.state?.content || null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [openPaymentModal, setOpenPaymentModal] = useState(false);
	const [contentType, setContentType] = useState(
		location.state?.type || "course"
	);

	const [previewUrl, setPreviewUrl] = useState(null);
	const [showPreview, setShowPreview] = useState(false);
	const [showFullDescription, setShowFullDescription] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				
				// First try to fetch as a course
				try {
					const courseRes = await api.get(`/content/${contentId}`);
					setContent(courseRes.data);
					setContentType("course");
					setLoading(false);
					return;
				} catch (courseError) {
					// If not found as a course, try as a project
					try {
						const projectRes = await api.get(`/projects/${contentId}`);
						setContent(projectRes.data);
						setContentType("project");
						setLoading(false);
						return;
					} catch (projectError) {
						throw new Error("Content not found");
					}
				}
			} catch (error) {
				console.error("Error fetching content:", error);
				setError(
					`Failed to load content details. Please try again later.`
				);
				setLoading(false);
			}
		};

		if (contentId) {
			fetchData();
		} else {
			setError("Invalid content URL");
			setLoading(false);
		}
	}, [contentId]);

	const handlePreview = async () => {
		try {
			// Validate PDF extension
			if (!content.fileUrl?.toLowerCase().endsWith(".pdf")) {
				setError("Preview is only available for PDF files");
				return;
			}

			setLoading(true);

			// Make sure to set responseType to 'blob' to handle binary data
			const response = await api.get(`/customer/preview/${content._id}`, {
				responseType: "blob",
			});

			// Create blob URL from response
			const blob = new Blob([response.data], { type: "application/pdf" });
			const url = URL.createObjectURL(blob);
			setPreviewUrl(url);
			setShowPreview(true);
		} catch (error) {
			console.error("Preview error:", error);
			setError("Failed to load preview. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	const handleDownloadOrPurchase = () => {
		if (!user) {
			navigate("/login", {
				state: {
					from: location.pathname,
					content: content,
					type: contentType,
				},
			});
			return;
		}

		const canAccess =
			content.isFree || user.purchasedContent?.includes(content._id);

		if (canAccess) {
			handleDownload();
		} else {
			setOpenPaymentModal(true);
		}
	};

	const handleDownload = async () => {
		try {
			setLoading(true);
			
			// First get the download URL
			let response;
			if (contentType === "course") {
				response = await api.get(`/customer/download/${content._id}`);
			} else {
				response = await api.get(`/projects/download/${content._id}`);
			}
			
			if (!response.data.fileUrl) {
				throw new Error("File URL not found");
			}
			
			// Check if it's a Google Drive URL
			if (response.data.fileUrl.includes('drive.google.com')) {
				// For Google Drive, we open directly in a new tab
				window.open(response.data.fileUrl, '_blank');
				setLoading(false);
				return;
			}
			
			// Extract filename from URL
			const filename = response.data.fileUrl.split('/').pop() || `${content.title}.pdf`;
			
			// Check if URL is absolute or relative
			const downloadUrl = response.data.fileUrl.startsWith('http') 
				? response.data.fileUrl 
				: `${api.defaults.baseURL}/${response.data.fileUrl.replace(/^\/+/, '')}`;
				
			// Use the downloadFile utility for better handling
			await downloadFile(downloadUrl, filename);
			
			// Update download count if needed
			try {
				await api.post(`/content/track-download/${content._id}`);
			} catch (trackError) {
				console.error("Failed to track download:", trackError);
				// Non-critical error, don't show to user
			}
		} catch (error) {
			console.error("Download error:", error);
			let errorMessage = "Failed to download content. Please try again.";
			
			if (error.response?.status === 404) {
				errorMessage = "The file could not be found. It may have been moved or deleted.";
			} else if (error.response?.status === 403) {
				errorMessage = "You don't have permission to access this file.";
			} else if (error.message?.includes("timeout")) {
				errorMessage = "Download timed out. The file might be too large or the server is busy.";
			} else if (error.response?.data?.message) {
				errorMessage = error.response.data.message;
			}
			
			setError(errorMessage);
		} finally {
			setLoading(false);
		}
	};

	const handleClosePaymentModal = () => {
		setOpenPaymentModal(false);
	};

	const PreviewDialog = () => (
		<Dialog
			open={showPreview}
			onClose={() => {
				setShowPreview(false);
				// Clean up blob URL when dialog closes
				if (previewUrl) {
					URL.revokeObjectURL(previewUrl);
					setPreviewUrl(null);
				}
			}}
			maxWidth='lg'
			fullWidth
			PaperProps={{
				sx: {
					minHeight: "80vh",
					maxHeight: "90vh",
				},
			}}>
			<DialogTitle>
				<Box display='flex' justifyContent='space-between' alignItems='center'>
					<Typography variant='h6'>Document Preview</Typography>
					<IconButton
						onClick={() => {
							setShowPreview(false);
							if (previewUrl) {
								URL.revokeObjectURL(previewUrl);
								setPreviewUrl(null);
							}
						}}>
						<Close />
					</IconButton>
				</Box>
			</DialogTitle>
			<DialogContent>
				{previewUrl ? (
					<iframe
						src={previewUrl}
						width='100%'
						height='100%'
						style={{
							border: "none",
							minHeight: "70vh",
						}}
						title='PDF Preview'
					/>
				) : (
					<Box
						display='flex'
						justifyContent='center'
						alignItems='center'
						minHeight='70vh'>
						<CircularProgress />
					</Box>
				)}
			</DialogContent>
		</Dialog>
	);

	const DescriptionDialog = () => (
		<Dialog
			open={showFullDescription}
			onClose={() => setShowFullDescription(false)}
			maxWidth='md'
			fullWidth>
			<DialogTitle>
				<Box display='flex' justifyContent='space-between' alignItems='center'>
					<Typography variant='h6'>Description</Typography>
					<IconButton onClick={() => setShowFullDescription(false)}>
						<Close />
					</IconButton>
				</Box>
			</DialogTitle>
			<DialogContent>
				<Typography
					sx={{
						whiteSpace: "pre-line",
						color: "text.secondary",
					}}>
					{content.description}
				</Typography>
			</DialogContent>
		</Dialog>
	);

	if (loading) {
		return (
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					minHeight: "100vh",
					background: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
				}}>
				<CircularProgress size={80} thickness={4} sx={{ color: "white" }} />
			</Box>
		);
	}

	if (error || !content) {
		return (
			<Container maxWidth='sm' sx={{ mt: 4 }}>
				<Alert severity='error' sx={{ borderRadius: 2 }}>
					{error || "Content not found"}
				</Alert>
			</Container>
		);
	}

	const isPDF = content.fileUrl?.toLowerCase().endsWith(".pdf");

	return (
		<>
			{content && (
				<SEO 
					title={`${content.title} | Academic Assignment Master`}
					description={content.description ? content.description.slice(0, 160) : "View detailed information about this academic resource, including pricing, content details, and download options."}
					keywords={`${content.category}, academic resources, ${content.title}, study materials`}
					canonicalUrl={`/course/${slug}`}
					ogType="article"
					ogImage={content.thumbnailUrl || "https://yourwebsite.com/images/hero123.png"}
				/>
			)}
			
			<Container maxWidth='lg' sx={{ py: 4 }}>
				<Card
					elevation={6}
					sx={{
						borderRadius: 3,
						background: "linear-gradient(to right bottom, #ffffff, #f0f0f0)",
						overflow: "hidden",
					}}>
					<CardHeader
						title={
							<Typography
								variant='h4'
								sx={{
									fontWeight: "bold",
									background:
										"linear-gradient(45deg, #4b6cb7 0%, #182848 100%)",
									WebkitBackgroundClip: "text",
									WebkitTextFillColor: "transparent",
								}}>
								{content.title}
							</Typography>
						}
						action={
							<Box sx={{ textAlign: "right" }}>
								{content.isFree ? (
									<Typography
										variant='h6'
										sx={{
											color: "success.main",
											fontWeight: "bold",
										}}>
										Free
									</Typography>
								) : (
									<Typography
										variant='h6'
										sx={{
											fontWeight: "bold",
											color: "primary.main",
										}}>
										₹{content.price}
									</Typography>
								)}
							</Box>
						}
						sx={{
							pb: 0,
							"& .MuiCardHeader-content": { flex: "0 0 auto" },
						}}
					/>
					<CardContent>
						{/* Chips Section - Hidden as requested */}
						<Box sx={{ display: "none", flexWrap: "wrap", gap: 1, mb: 2 }}>
							{contentType === "course" && (
								<>
									<Tooltip title='Class'>
										<Chip
											icon={<School size={16} />}
											label={location.state?.className}
											variant='outlined'
											color='primary'
										/>
									</Tooltip>
									<Tooltip title='Subject'>
										<Chip
											icon={<Book size={16} />}
											label={location.state?.subjectName}
											variant='outlined'
											color='secondary'
										/>
									</Tooltip>
								</>
							)}

							{contentType === "project" && (
								<>
									<Tooltip title='Tech Stack'>
										<Chip
											icon={<Code size={16} />}
											label={content.techStack}
											variant='outlined'
											color='primary'
										/>
									</Tooltip>
									<Tooltip title='Difficulty Level'>
										<Chip
											icon={<StarHalf size={16} />}
											label={`Difficulty: ${content.difficulty}`}
											variant='outlined'
											color='warning'
										/>
									</Tooltip>
								</>
							)}

							<Tooltip title='Content Type'>
								<Chip
									icon={<Tag size={16} />}
									label={content.type}
									variant='outlined'
									color='info'
								/>
							</Tooltip>
							{content.duration > 0 && (
								<Tooltip title='Duration'>
									<Chip
										icon={<Clock size={16} />}
										label={`${content.duration} minutes`}
										variant='outlined'
										color='success'
									/>
								</Tooltip>
							)}
						</Box>

						{/* Action Button */}

						<Stack direction='row' spacing={2} sx={{ mb: 3 }}>
							{isPDF && (
								<Button
									variant='outlined'
									color='primary'
									onClick={handlePreview}
									startIcon={<Preview />}>
									Preview Document
								</Button>
							)}
							<Button
								variant='contained'
								color='primary'
								onClick={handleDownloadOrPurchase}
								startIcon={
									content.isFree ||
									user?.purchasedContent?.includes(content._id) ? (
										<Download />
									) : (
										<Lock />
									)
								}>
								{content.isFree || user?.purchasedContent?.includes(content._id)
									? "Download Now"
									: "Purchase to Access"}
							</Button>
						</Stack>

						<Divider sx={{ my: 3 }} />

						{/* Description Section - Modified to show only one line */}
						<Typography
							variant='h6'
							sx={{
								mb: 2,
								fontWeight: "bold",
								background: "linear-gradient(45deg, #4b6cb7 0%, #182848 100%)",
								WebkitBackgroundClip: "text",
								WebkitTextFillColor: "transparent",
							}}>
							Description
						</Typography>
						<Box>
							<Typography
								sx={{
									mb: 1,
									color: "text.secondary",
									overflow: 'hidden',
									textOverflow: 'ellipsis',
									display: '-webkit-box',
									WebkitLineClamp: 1,
									WebkitBoxOrient: 'vertical'
								}}>
								{content.description}
							</Typography>
							<Button 
								variant="text" 
								color="primary" 
								size="small"
								onClick={() => setShowFullDescription(true)}
							>
								Show More
							</Button>
						</Box>

						{/* Preview Dialogs */}
						<PreviewDialog />
						<DescriptionDialog />

						{/* Project Specific Details */}
						{contentType === "project" && (
							<Box sx={{ mt: 3 }}>
								<Typography
									variant='h6'
									sx={{
										mb: 2,
										fontWeight: "bold",
										background:
											"linear-gradient(45deg, #4b6cb7 0%, #182848 100%)",
										WebkitBackgroundClip: "text",
										WebkitTextFillColor: "transparent",
									}}>
									Project Details
								</Typography>
								<Grid container spacing={2}>
									<Grid item xs={12} md={6}>
										<Stack spacing={2}>
											<Box display='flex' alignItems='center'>
												<Code
													size={24}
													style={{ marginRight: 8, color: "#4b6cb7" }}
												/>
												<Typography>Tech Stack: {content.techStack}</Typography>
											</Box>
											<Box display='flex' alignItems='center'>
												<StarHalf
													size={24}
													style={{ marginRight: 8, color: "#4b6cb7" }}
												/>
												<Typography>
													Difficulty: {content.difficulty}
												</Typography>
											</Box>
										</Stack>
									</Grid>
									<Grid item xs={12} md={6}>
										<Box display='flex' alignItems='center'>
											<FileText
												size={24}
												style={{ marginRight: 8, color: "#4b6cb7" }}
											/>
											<Typography>
												Learning Outcomes: {content.learningOutcomes}
											</Typography>
										</Box>
									</Grid>
								</Grid>
							</Box>
						)}

						{/* Tags Section */}
						{/* {content.tags?.length > 0 && (
							<Box sx={{ mt: 3 }}>
								<Typography
									variant='h6'
									sx={{
										mb: 2,
										fontWeight: "bold",
										background:
											"linear-gradient(45deg, #4b6cb7 0%, #182848 100%)",
										WebkitBackgroundClip: "text",
										WebkitTextFillColor: "transparent",
									}}>
									Tags
								</Typography>
								<Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
									{content.tags.map((tag, index) => (
										<Chip
											key={index}
											label={tag}
											size='small'
											color='primary'
											variant='outlined'
										/>
									))}
								</Box>
							</Box>
						)} */}
					</CardContent>
				</Card>
			</Container>
			<PreviewDialog />
			<p style={{ textAlign: "center" }}>Login/Regsiter to Download document</p>
			{/* Payment Modal */}
			<PaymentModal
				open={openPaymentModal}
				onClose={handleClosePaymentModal}
				content={content}
			/>
		</>
	);
};

export default ContentDetails;
