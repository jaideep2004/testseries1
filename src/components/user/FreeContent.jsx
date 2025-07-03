// // components/user/FreeContent.jsx

import React, { useState, useEffect } from "react";
import {
	Container,
	Typography,
	Grid,
	Paper,
	Box,
	createTheme,
	ThemeProvider,
	Card,
	CardMedia,
	CardContent,
	CardActions,
	Button,
	Chip,
	Stack,
} from "@mui/material";
import {
	TrendingUp,
	Preview,
	ShoppingCart,
	Download,
} from "@mui/icons-material";
import api, { downloadFile } from "../../utils/api";
import Loading from "../common/Loading";
import { toast } from "react-toastify";

const getFileUrl = (fileUrl) => {
	if (!fileUrl) return "/api/placeholder/400/200";
	if (fileUrl.startsWith("http")) return fileUrl;
	return `https://testbackend2-5loz.onrender.com/${fileUrl.replace(
		/\\/g,
		"/"
	)}`;
};

const getGoogleDriveDownloadUrl = (url) => {
	// Extract Google Drive file ID from share/view URL
	const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
	if (match && match[1]) {
		return `https://drive.google.com/uc?id=${match[1]}&export=download`;
	}
	// Also handle URLs like .../open?id=FILE_ID
	const altMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
	if (altMatch && altMatch[1]) {
		return `https://drive.google.com/uc?id=${altMatch[1]}&export=download`;
	}
	return url;
};

const theme = createTheme({
	palette: {
		primary: {
			main: "#1976d2",
		},
		background: {
			default: "#f4f6f8",
		},
	},

	components: {
		MuiCard: {
			styleOverrides: {
				root: {
					transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
					"&:hover": {
						transform: "scale(1.03)",
						boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
					},
				},
			},
		},
	},
});

const RecommendedContentCard = ({ content }) => {
	const handlePreview = () => {
		if (content.fileUrl && content.fileUrl.includes('drive.google.com')) {
			const downloadUrl = getGoogleDriveDownloadUrl(content.fileUrl);
			window.open(downloadUrl, '_blank');
		} else if (content.fileUrl) {
			window.open(content.fileUrl, '_blank');
		} else {
			toast.error('No file available for preview.');
		}
	};

	const handleDownload = async () => {
		try {
			await downloadFile(`/content/download/${content._id}`, content.title);
			toast.success("Download started successfully!");
		} catch (error) {
			console.error("Download error:", error);
			toast.error("Failed to download content. Please try again.");
		}
	};

	return (
		<Card
			sx={{
				height: "100%",
				display: "flex",
				flexDirection: "column",
			}}>
			<CardMedia
				component='img'
				height='200'
				image={"/images/bg10.jpg"}
				alt={content.title}
				sx={{
					objectFit: "cover",
					objectPosition: "center",
				}}
			/>
			<CardContent sx={{ flexGrow: 1 }}>
				<Stack spacing={1}>
					<Box display='flex' justifyContent='space-between' alignItems='center'>
						<Typography variant='subtitle2' color='text.secondary'>
							{content.subjectId?.name}
						</Typography>
						<Chip
							label={content.isFree ? "Free" : `₹${content.price}`}
							color={content.isFree ? "success" : "primary"}
							size='small'
						/>
					</Box>
					<Typography variant='h6' noWrap>
						{content.title}
					</Typography>
					<Stack direction='row' spacing={2}>
						<Box display='flex' alignItems='center'>
							<TrendingUp fontSize='small' sx={{ mr: 0.5 }} />
							<Typography variant='caption'>{content.duration} mins</Typography>
						</Box>
					</Stack>
				</Stack>
			</CardContent>
			<CardActions>
				<Button 
					startIcon={<Preview />} 
					size='small' 
					color='primary' 
					onClick={handlePreview}
					fullWidth
					variant="outlined"
				>
					Preview
				</Button>
				<Button 
					startIcon={<Download />} 
					size='small' 
					color='primary' 
					onClick={handleDownload}
					fullWidth
					variant="contained"
				>
					Download
				</Button>
			</CardActions>
		</Card>
	);
};

const FreeContent = () => {
	const [content, setContent] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchRecommendedContent = async () => {
			try {
				const { data } = await api.get("/customer/dashboard");
				setContent(data.freeContent);
				console.log("free", data);
			} catch (error) {
				console.error("Error fetching recommended content:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchRecommendedContent();
	}, []);

	if (loading) return <Loading />;

	return (
		<ThemeProvider theme={theme}>
			<Container maxWidth='xl' sx={{ py: 4 }}>
				<Paper
					elevation={4}
					sx={{
						p: 4,
						backgroundColor: "background.default",
						borderRadius: 3,
					}}>
					<Typography
						variant='h4'
						color='primary'
						gutterBottom
						sx={{
							textAlign: "center",
							mb: 4,
							fontWeight: "bold",
						}}>
						Free Content
					</Typography>

					{content.length === 0 ? (
						<Box
							display='flex'
							justifyContent='center'
							alignItems='center'
							height='300px'>
							<Typography variant='h6' color='text.secondary'>
								No recommendations available.
							</Typography>
						</Box>
					) : (
						<Grid container spacing={4}>
							{content.map((item) => (
								<Grid item xs={12} sm={6} md={4} key={item._id}>
									<RecommendedContentCard content={item} />
								</Grid>
							))}
						</Grid>
					)}
				</Paper>
			</Container>
		</ThemeProvider>
	);
};

export default FreeContent;
