// // // // pages/UserDashboard.jsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import ProjectSection from "../components/user/ProjectSection";
import {
	Box,
	Grid,
	Paper,
	Typography,
	Card,
	CardContent,
	CardMedia,
	CardActions,
	Button,
	Container,
	Chip,
	Stack,
	Dialog,
	DialogTitle,
	DialogContent,
	IconButton,
	CircularProgress,
} from "@mui/material";
import {
	BookmarkBorder,
	TrendingUp,
	LocalOffer,
	ArrowForward,
	AccessTime,
	Download,
	ShoppingCart,
	Preview,
	Close,
	Code as CodeIcon,
} from "@mui/icons-material";

import api from "../utils/api";
import PaymentModal from "../components/content/PaymentModal";
import { Home, Logout } from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";
import { saveAs } from "file-saver";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { setRequestUserType } from "../utils/api";

const UserDashboard = () => {
	const [dashboardData, setDashboardData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [selectedContent, setSelectedContent] = useState(null);
	const [previewModalOpen, setPreviewModalOpen] = useState(false);
	const [paymentModalOpen, setPaymentModalOpen] = useState(false);
	const [fileUrl, setFileUrl] = useState(null);
	const [previewError, setPreviewError] = useState(null);

	const navigate = useNavigate();
	const { logout } = useAuth();

	useEffect(() => {
		// setRequestUserType("user");
		fetchDashboardData();
	}, []);

	const fetchDashboardData = async () => {
		try {
			const { data } = await api.get("/customer/dashboard");
			setDashboardData(data);
			console.log("customer dash", data);
		} catch (error) {
			console.error("Error fetching dashboard data:", error);
		} finally {
			setLoading(false);
		}
	};

	const isPurchased = (content) => {
		return (
			content.isFree ||
			dashboardData?.purchasedContent?.some(
				(item) => item._id.toString() === content._id.toString()
			) ||
			dashboardData?.purchasedProjects?.some(
				(item) => item._id.toString() === content._id.toString()
			)
		);
	};

	const handleProjectPurchase = (project) => {
		setSelectedProject(project);
		setPaymentModalOpen(true);
	};

	// Helper to get Google Drive direct download URL
	const getGoogleDriveDownloadUrl = (url) => {
		// Extract Google Drive file ID from share/view URL
		const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
		if (match && match[1]) {
			return `https://drive.google.com/uc?id=${match[1]}&export=download`;
		}
		// Also handle URLs like .../open?id=FILE_ID or .../uc?id=FILE_ID
		const altMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
		if (altMatch && altMatch[1]) {
			return `https://drive.google.com/uc?id=${altMatch[1]}&export=download`;
		}
		return url;
	};

	const handlePreview = async (content) => {
		try {
			setPreviewError(null);

			if (!content.fileUrl) {
				setPreviewError("No preview available");
				return;
			}

			// If Google Drive file, open direct download URL in new tab
			if (content.fileUrl.includes('drive.google.com')) {
				const downloadUrl = getGoogleDriveDownloadUrl(content.fileUrl);
				window.open(downloadUrl, '_blank');
				return;
			}

			// First, determine file type from extension
			const fileExtension = content.fileUrl.split(".").pop().toLowerCase();
			const fileType = getFileType(fileExtension);

			// Check if content is purchasable and not owned
			if (!content.isFree && !isPurchased(content)) {
				setSelectedContent(content);
				setPaymentModalOpen(true);
				return;
			}

			// For documents, directly trigger download instead of preview
			if (fileType.isDocument) {
				handleDownload(content);
				return;
			}

			// For videos, PDFs, and images, attempt preview with timeout and retries
			const maxRetries = 2;
			let attempt = 0;
			let success = false;

			while (attempt < maxRetries && !success) {
				try {
					const response = await api.get(`/customer/preview/${content._id}`, {
						responseType: "blob",
						timeout: 15000, // 15 second timeout
					});

					const blob = new Blob([response.data], {
						type:
							response.headers["content-type"] ||
							getDefaultMimeType(fileType.type),
					});
					const url = URL.createObjectURL(blob);
					setFileUrl(url);
					setSelectedContent(content);
					setPreviewModalOpen(true);
					success = true;
				} catch (error) {
					attempt++;
					if (attempt === maxRetries) {
						throw error;
					}
					// Wait 1 second before retry
					await new Promise((resolve) => setTimeout(resolve, 1000));
				}
			}
		} catch (error) {
			console.error("Preview failed:", error);

			// Handle specific error cases
			if (error.code === "ECONNABORTED" || error.response?.status === 404) {
				// For timeout or not found, offer download instead
				const shouldDownload = window.confirm(
					"Preview is currently unavailable. Would you like to download the file instead?"
				);
				if (shouldDownload) {
					handleDownload(content);
				}
			} else {
				setPreviewError("Preview unavailable. Please try downloading instead.");
			}
		}
	};

	// Helper function to determine file type
	const getFileType = (extension) => {
		const documents = ["doc", "docx", "rtf", "txt", "pdf"];
		const images = ["jpg", "jpeg", "png", "gif"];
		const videos = ["mp4", "webm", "mov"];

		if (documents.includes(extension)) {
			return { type: "document", isDocument: true };
		} else if (images.includes(extension)) {
			return { type: "image", isDocument: false };
		} else if (videos.includes(extension)) {
			return { type: "video", isDocument: false };
		}
		return { type: "unknown", isDocument: true }; // Default to document handling
	};

	// Helper function to get default MIME type
	const getDefaultMimeType = (type) => {
		const mimeTypes = {
			document: "application/pdf",
			image: "image/jpeg",
			video: "video/mp4",
			unknown: "application/octet-stream",
		};
		return mimeTypes[type];
	};

	const handleDownload = async (content) => {
		try {
			if (!content.fileUrl) {
				throw new Error("No file URL available");
			}

			if (!isPurchased(content)) {
				setSelectedContent(content);
				setPaymentModalOpen(true);
				return;
			}

			// If Google Drive file, open direct download URL in new tab
			if (content.fileUrl.includes('drive.google.com')) {
				const downloadUrl = getGoogleDriveDownloadUrl(content.fileUrl);
				window.open(downloadUrl, '_blank');
				toast.success("Download started successfully");
				return;
			}

			const isProject = !!content.difficulty;
			const endpoint = isProject
				? `/projects/download/${content._id}`
				: `/customer/download/${content._id}`;

			// Show loading indicator
			const loadingToast = toast.loading("Preparing download...");

			try {
				const response = await api.get(endpoint, {
					responseType: "blob",
					timeout: 30000, // 30 second timeout
				});

				const fileExtension = content.fileUrl
					.split("\\")
					.pop()
					.split(".")
					.pop();
				const blob = new Blob([response.data], {
					type: isProject
						? "application/zip"
						: response.headers["content-type"],
				});

				// Use FileSaver.js for more reliable downloads
				saveAs(blob, `${content.title}.${fileExtension}`);
				toast.success("Download started successfully");
			} catch (error) {
				console.error("Download failed:", error);
				toast.error("Download failed. Please try again later.");
			} finally {
				toast.dismiss(loadingToast);
			}
		} catch (error) {
			console.error("Download error:", error);
			toast.error("Unable to process download. Please try again.");
		}
	};

	const getFileExtension = (type) => {
		const map = {
			pdf: ".pdf",
			video: ".mp4",
			image: ".jpg",
			document: ".docx",
		};
		return map[type.toLowerCase()] || "";
	};

	const PreviewDialog = () => {
		const handleClose = () => {
			if (fileUrl) {
				URL.revokeObjectURL(fileUrl);
			}
			setPreviewModalOpen(false);
			setSelectedContent(null);
			setFileUrl(null);
			setPreviewError(null);
		};

		if (!selectedContent) return null;
		// Prevent right-click on the dialog
		const handleContextMenu = (e) => {
			e.preventDefault();
			return false;
		};

		// Prevent keyboard shortcuts
		const handleKeyDown = (e) => {
			if (
				(e.ctrlKey && e.keyCode === 83) || // Ctrl+S
				(e.ctrlKey && e.keyCode === 80) || // Ctrl+P
				(e.ctrlKey && e.keyCode === 67) || // Ctrl+C
				(e.ctrlKey && e.keyCode === 65) || // Ctrl+A
				(e.metaKey && e.keyCode === 67) || // Cmd+C (Mac)
				(e.metaKey && e.keyCode === 65) || // Cmd+A (Mac)
				(e.ctrlKey && e.shiftKey && e.keyCode === 73) || // Ctrl+Shift+I
				e.keyCode === 123 // F12
			) {
				e.preventDefault();
				return false;
			}
		};

		const preventCopy = (e) => {
			e.preventDefault();
			e.stopPropagation();
			return false;
		};

		useEffect(() => {
			if (previewModalOpen) {
				// Simple keyboard shortcut prevention
				const handleKeydown = (e) => {
					if (e.ctrlKey && (e.key === "c" || e.key === "C")) {
						e.preventDefault();
					}
				};

				document.addEventListener("keydown", handleKeydown);
				return () => {
					document.removeEventListener("keydown", handleKeydown);
				};
			}
		}, [previewModalOpen]);

		const renderPreviewContent = () => {
			if (previewError) {
				return (
					<Box p={3} textAlign='center'>
						<Alert severity='error'>{previewError}</Alert>
					</Box>
				);
			}

			if (!fileUrl) {
				return (
					<Box p={3} textAlign='center'>
						<CircularProgress />
					</Box>
				);
			}

			// Get the file extension from the URL or content type header
			const fileExtension = fileUrl?.split(".")?.pop()?.toLowerCase() || "";
			const responseType = selectedContent.type?.toLowerCase() || "";

			// Check if it's a PDF based on multiple conditions
			const isPDF =
				fileExtension === "pdf" ||
				responseType.includes("pdf") ||
				(selectedContent.fileUrl &&
					selectedContent.fileUrl.toLowerCase().endsWith(".pdf")) ||
				["previous year", "question paper", "notes"].includes(responseType);

			// Check if it's a document file (docx, doc, etc.)
			const isDocument =
				["doc", "docx", "rtf", "txt"].includes(fileExtension) ||
				responseType.includes("document");

			if (isPDF) {
				return (
					<Box sx={{ position: "relative", bgcolor: "background.paper" }}>
						<iframe
							src={`${fileUrl}#toolbar=0&navpanes=0&scrollbar=1`}
							width='100%'
							height='800px'
							style={{ border: "none" }}
						/>
					</Box>
				);
			}

			if (isDocument) {
				return (
					<Box p={3} textAlign='center'>
						<Typography variant='h6' gutterBottom>
							Document Preview Unavailable
						</Typography>
						<Button
							variant='contained'
							color='primary'
							startIcon={<Download />}
							onClick={() => handleDownload(selectedContent)}>
							Download Document
						</Button>
					</Box>
				);
			}

			// Video content
			const isVideo =
				fileExtension === "mp4" ||
				fileExtension === "webm" ||
				responseType.includes("video") ||
				["lecture", "tutorial"].includes(responseType);

			if (isVideo) {
				return (
					<Box sx={{ position: "relative" }} onContextMenu={handleContextMenu}>
						<video
							width='100%'
							height='auto'
							controls
							controlsList='nodownload noplaybackrate noremoteplayback'
							style={{
								maxHeight: "600px",
								userSelect: "none",
								WebkitUserSelect: "none",
							}}
							playsInline
							disablePictureInPicture
							disableRemotePlayback>
							<source src={fileUrl} type='video/mp4' />
							Your browser does not support video playback.
						</video>
						<Typography
							variant='body2'
							sx={{
								position: "absolute",
								top: "50%",
								left: "50%",
								transform: "translate(-50%, -50%) rotate(-45deg)",
								color: "rgba(255, 255, 255, 0.2)",
								fontSize: "2rem",
								fontWeight: "bold",
								pointerEvents: "none",
								userSelect: "none",
								whiteSpace: "nowrap",
								zIndex: 2,
							}}>
							{dashboardData?.user?.name || "Protected Content"}
						</Typography>
					</Box>
				);
			}

			// Image content
			const isImage =
				["jpg", "jpeg", "png", "gif"].includes(fileExtension) ||
				responseType.includes("image");

			if (isImage) {
				return (
					<img
						src={fileUrl}
						alt={selectedContent.title}
						style={{ maxWidth: "100%", height: "auto" }}
					/>
				);
			}

			return (
				<Box p={3} textAlign='center'>
					<Typography variant='h6' color='text.secondary' gutterBottom>
						Previewing: {selectedContent.title}
					</Typography>
					<Typography variant='body1' color='text.secondary'>
						Type: {selectedContent.type}
					</Typography>
				</Box>
			);
		};

		return (
			<Dialog
				open={previewModalOpen}
				onClose={handleClose}
				maxWidth='lg'
				fullWidth
				onContextMenu={(e) => e.preventDefault()}>
				<DialogTitle>
					<Box
						display='flex'
						justifyContent='space-between'
						alignItems='center'>
						<Typography variant='h6'>{selectedContent.title}</Typography>
						<IconButton onClick={handleClose} size='small'>
							<Close />
						</IconButton>
					</Box>
				</DialogTitle>
				<DialogContent
					sx={{
						p: 0,
						"&::-webkit-scrollbar": {
							width: "8px",
							height: "8px",
						},
						"&::-webkit-scrollbar-track": {
							background: "#f1f1f1",
						},
						"&::-webkit-scrollbar-thumb": {
							background: "#888",
							borderRadius: "4px",
						},
						"&::-webkit-scrollbar-thumb:hover": {
							background: "#555",
						},
					}}>
					{renderPreviewContent()}
				</DialogContent>
			</Dialog>
		);
	};

	const ContentCard = ({ content }) => (
		<Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
			<CardMedia
				component='img'
				height='140'
				// image={getFileUrl(content.thumbnailUrl)}
				image={"/images/bg3.jpeg"}
				alt={content.title}
			/>
			<CardContent sx={{ flexGrow: 1 }}>
				<Box
					display='flex'
					justifyContent='space-between'
					alignItems='center'
					mb={1}>
					<Stack>
						<Typography variant='subtitle2' color='text.secondary'>
							{content.subjectId?.name}
						</Typography>
						<Typography variant='caption' color='text.secondary'>
							Class: {content.classId?.name}
						</Typography>
					</Stack>
					<Chip
						label={content.isFree ? "Free" : `₹${content.price}`}
						color={content.isFree ? "success" : "primary"}
						size='small'
					/>
				</Box>
				<Typography variant='h6' gutterBottom>
					{content.title}
				</Typography>
				<Stack direction='row' spacing={1} alignItems='center'>
					<AccessTime sx={{ fontSize: 16 }} />
					<Typography variant='caption'>
						{content.duration || 0} mins
					</Typography>
				</Stack>
			</CardContent>

			<CardActions sx={{ p: 2, justifyContent: "space-between" }}>
				<Button
					size='small'
					startIcon={<Preview />}
					onClick={() => handlePreview(content)}>
					Preview
				</Button>
				{!content.isFree && !isPurchased(content) && (
					<Button
						variant='contained'
						color='primary'
						startIcon={<ShoppingCart />}
						onClick={() => {
							setSelectedContent(content);
							setPaymentModalOpen(true);
						}}>
						Buy Now
					</Button>
				)}
			</CardActions>
		</Card>
	);

	const StatCard = ({ icon, title, count, onClick }) => (
		<Card
			sx={{
				height: "100%",
				cursor: onClick ? "pointer" : "default",
				transition: "transform 0.2s",
				"&:hover": onClick ? { transform: "translateY(-4px)" } : {},
			}}
			onClick={onClick}>
			<CardContent>
				<Box display='flex' alignItems='center' mb={2}>
					{icon}
					<Typography variant='h6' ml={1}>
						{title}
					</Typography>
				</Box>
				<Typography variant='h4' color='primary'>
					{count}
				</Typography>
			</CardContent>
		</Card>
	);

	const ContentSection = ({ title, contents, viewAllLink, icon }) => (
		<Paper sx={{ p: 3, mb: 3 }}>
			<Box
				display='flex'
				justifyContent='space-between'
				alignItems='center'
				mb={3}>
				<Box display='flex' alignItems='center'>
					{icon}
					<Typography variant='h5' ml={1}>
						{title}
					</Typography>
				</Box>
				<Button
					endIcon={<ArrowForward />}
					onClick={() => navigate(viewAllLink)}>
					View All
				</Button>
			</Box>
			<Grid container spacing={3}>
				{contents?.slice(0, 3).map((content) => (
					<Grid item xs={12} sm={6} md={4} key={content._id}>
						<ContentCard content={content} />
					</Grid>
				))}
			</Grid>
		</Paper>
	);

	if (loading) {
		return (
			<Box
				display='flex'
				justifyContent='center'
				alignItems='center'
				minHeight='80vh'>
				<CircularProgress />
			</Box>
		);
	}
	const handleLogout = () => {
		logout();
		navigate("/");
	};
	const ProjectCard = ({ project }) => (
		<Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
			<CardMedia
				component='img'
				height='140'
				// image={getFileUrl(project.thumbnailUrl)}
				image={"/images/bg12.jpg"}
				alt={project.title}
			/>
			<CardContent sx={{ flexGrow: 1 }}>
				<Box
					display='flex'
					justifyContent='space-between'
					alignItems='center'
					mb={1}>
					<Stack>
						<Typography variant='subtitle2' color='text.secondary'>
							{project.subjectId?.name}
						</Typography>
						<Typography variant='caption' color='text.secondary'>
							Class: {project.classId?.name}
						</Typography>
					</Stack>
					<Stack direction='row' spacing={1} alignItems='center'>
						{isPurchased(project) && (
							<Chip label='Purchased' color='success' size='small' />
						)}
						<Chip
							label={project.isFree ? "Free" : `₹${project.price}`}
							color={project.isFree ? "success" : "primary"}
							size='small'
						/>
					</Stack>
				</Box>
				<Typography variant='h6' gutterBottom>
					{project.title}
				</Typography>
				<Stack direction='row' spacing={1} alignItems='center' mb={1}>
					<CodeIcon sx={{ fontSize: 16 }} />
					<Typography variant='caption'>{project.difficulty}</Typography>
				</Stack>
				{project.technologies && (
					<Stack direction='row' spacing={1} flexWrap='wrap'>
						{project.technologies.slice(0, 3).map((tech) => (
							<Chip
								key={tech}
								label={tech}
								size='small'
								variant='outlined'
								sx={{ mb: 0.5 }}
							/>
						))}
					</Stack>
				)}
			</CardContent>

			<CardActions sx={{ p: 2, justifyContent: "space-between" }}>
				<Stack direction='row' spacing={1}>
					{(project.isFree || isPurchased(project)) && (
						<Button
							size='small'
							startIcon={<Download />}
							onClick={() => handleDownload(project)}>
							Download
						</Button>
					)}
				</Stack>
				{!project.isFree && !isPurchased(project) && (
					<Button
						variant='contained'
						color='primary'
						startIcon={<ShoppingCart />}
						onClick={() => {
							setSelectedContent(project);
							setPaymentModalOpen(true);
						}}>
						Buy Now
					</Button>
				)}
			</CardActions>
		</Card>
	);

	const ProjectSection = ({ title, projects, viewAllLink, icon }) => (
		<Paper sx={{ p: 3, mb: 3 }}>
			<Box
				display='flex'
				justifyContent='space-between'
				alignItems='center'
				mb={3}>
				<Box display='flex' alignItems='center'>
					{icon}
					<Typography variant='h5' ml={1}>
						{title}
					</Typography>
				</Box>
				<Button
					endIcon={<ArrowForward />}
					onClick={() => navigate(viewAllLink)}>
					View All
				</Button>
			</Box>
			<Grid container spacing={3}>
				{projects?.slice(0, 3).map((project) => (
					<Grid item xs={12} sm={6} md={4} key={project._id}>
						<ProjectCard project={project} />
					</Grid>
				))}
			</Grid>
		</Paper>
	);

	return (
		<>
			<Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
				<Box
					display='flex'
					justifyContent='space-between'
					alignItems='center'
					mb={3}>
					<Typography variant='h4'>User Dashboard</Typography>
					<Box>
						<Button
							startIcon={<Home />}
							onClick={() => navigate("/")}
							sx={{ mr: 2 }}
							variant='outlined'>
							Home
						</Button>
						<Button
							startIcon={<Logout />}
							onClick={handleLogout}
							variant='contained'
							color='error'>
							Logout
						</Button>
					</Box>
				</Box>

				<Grid container spacing={3}>
					<Grid item xs={12} md={3}>
						<StatCard
							icon={<BookmarkBorder color='primary' sx={{ fontSize: 30 }} />}
							title='Purchased Content'
							count={dashboardData?.purchasedContent?.length || 0}
							onClick={() => navigate("/customer/purchased")}
						/>
					</Grid>
					<Grid item xs={12} md={3}>
						<StatCard
							icon={<BookmarkBorder color='primary' sx={{ fontSize: 30 }} />}
							title='Purchased Projects'
							count={dashboardData?.purchasedProjects?.length || 0}
							onClick={() => navigate("/customer/purchased-projects")}
						/>
					</Grid>

					<Grid item xs={12} md={3}>
						<StatCard
							icon={<TrendingUp color='primary' sx={{ fontSize: 30 }} />}
							title='Recommended'
							count={dashboardData?.recommendedContent?.length || 0}
							onClick={() => navigate("/customer/recommended")}
						/>
					</Grid>
					<Grid item xs={12} md={3}>
						<StatCard
							icon={<LocalOffer color='primary' sx={{ fontSize: 30 }} />}
							title='Free Content'
							count={dashboardData?.freeContent?.length || 0}
							onClick={() => navigate("/customer/free")}
						/>
					</Grid>

					<Grid item xs={12}>
						<ContentSection
							title='Recently Purchased'
							contents={dashboardData?.purchasedContent}
							viewAllLink='/customer/purchased'
							icon={<BookmarkBorder color='primary' sx={{ fontSize: 30 }} />}
						/>
					</Grid>
					{dashboardData?.purchasedProjects?.length > 0 && (
						<Grid item xs={12}>
							<ProjectSection
								title='Your Purchased Projects'
								projects={dashboardData.purchasedProjects}
								viewAllLink='/customer/purchased-projects'
								icon={<CodeIcon color='primary' sx={{ fontSize: 30 }} />}
							/>
						</Grid>
					)}

					<Grid item xs={12}>
						<ContentSection
							title='Recommended For You'
							contents={dashboardData?.recommendedContent}
							viewAllLink='/customer/recommended'
							icon={<TrendingUp color='primary' sx={{ fontSize: 30 }} />}
						/>
					</Grid>  
					{dashboardData?.recommendedProjects?.length > 0 && (
						<Grid item xs={12}>
							<ProjectSection
								title='Recommended Projects'
								projects={dashboardData.recommendedProjects}
								viewAllLink='/projects'
								icon={<CodeIcon color='primary' sx={{ fontSize: 30 }} />}
							/>
						</Grid>
					)}
					{dashboardData?.freeProjects?.length > 0 && (
						<Grid item xs={12}>
							<ProjectSection
								title='Free Projects'
								projects={dashboardData.freeProjects}
								viewAllLink='/projects'
								icon={<CodeIcon color='primary' sx={{ fontSize: 30 }} />}
							/>
						</Grid>
					)}
					<Grid item xs={12}>
						<ContentSection
							title='Free Content'
							contents={dashboardData?.freeContent}
							viewAllLink='/content?type=free'
							icon={<LocalOffer color='primary' sx={{ fontSize: 30 }} />}
						/>
					</Grid>
				</Grid>

				<PreviewDialog />

				<PaymentModal
					open={paymentModalOpen}
					onClose={() => {
						setPaymentModalOpen(false);
						setSelectedContent(null);
					}}
					content={selectedContent}
				/>
				<br />
				<center style={{ color: "red" }}>
					In case of any query, kindly contact this number- +91 8437067027
				</center>
			</Container>
		</>
	);
};

export default UserDashboard;
