// //src/pages/ContentDetails.jsx

import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
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
import api from "../utils/api";
import PaymentModal from "../components/content/PaymentModal";
import useAuth from "../hooks/useAuth";
import { Preview } from "@mui/icons-material";
import { Close } from "@mui/icons-material";

const ContentDetails = () => {
	const { id } = useParams();
	const location = useLocation();
	const navigate = useNavigate();
	const { user } = useAuth();

	const [content, setContent] = useState(location.state?.content || null);
	const [loading, setLoading] = useState(!location.state?.content);
	const [error, setError] = useState(null);
	const [openPaymentModal, setOpenPaymentModal] = useState(false);
	const [contentType, setContentType] = useState(
		location.state?.type || "course"
	);

	const [previewUrl, setPreviewUrl] = useState(null);
	const [showPreview, setShowPreview] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				let contentRes;

				if (contentType === "course") {
					contentRes = !content
						? await api.get(`/content/${id}`)
						: { data: content };
				} else {
					contentRes = !content
						? await api.get(`/projects/${id}`)
						: { data: content };
				}

				setContent(contentRes.data);
			} catch (error) {
				setError(
					`Failed to load ${contentType} details. Please try again later.`
				);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [id, content, contentType]);

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
			let response;
			if (contentType === "course") {
				response = await api.get(`/customer/download/${content._id}`);
			} else {
				response = await api.get(`/projects/download/${content._id}`);
			}
			window.open(response.data.fileUrl, "_blank");
		} catch (error) {
			setError("Failed to download content. Please try again.");
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
						{/* Chips Section */}
						<Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
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
						{/* <Button
							variant='contained'
							color='primary'
							onClick={handleDownloadOrPurchase}
							sx={{
								width: "100%",
								py: 1.5,
								borderRadius: 2,
								background: "linear-gradient(45deg, #4b6cb7 0%, #182848 100%)",
								"&:hover": {
									background:
										"linear-gradient(45deg, #182848 0%, #4b6cb7 100%)",
								},
							}}
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
						</Button> */}

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

						{/* Description Section */}
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
						<Typography
							sx={{
								mb: 4,
								whiteSpace: "pre-line",
								color: "text.secondary",
							}}>
							{content.description}
						</Typography>

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
						{content.tags?.length > 0 && (
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
						)}
					</CardContent>
				</Card>
			</Container>
			<PreviewDialog />
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
