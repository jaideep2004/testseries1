import React, { useState, useEffect } from "react";
import {
	Box,
	Typography,
	Grid,
	Card,
	CardMedia,
	CardContent,
	CardActions,
	Button,
	CircularProgress,
	Snackbar,
	Alert,
} from "@mui/material";
import { CloudDownload, Visibility } from "@mui/icons-material";
import useAuth from "../../hooks/useAuth";
import api from "../../utils/api";
import ContentPreview from "../common/ContentPreview";

const PurchasedContent = () => {
	const [content, setContent] = useState([]);
	const [loading, setLoading] = useState(true);
	const [alert, setAlert] = useState({ open: false, message: "", severity: "info" });
	const { user } = useAuth();

	useEffect(() => {
		const fetchPurchasedContent = async () => {
			try {
				const { data } = await api.get("/customer/dashboard");
				setContent(data.purchasedContent);
			} catch (error) {
				console.error("Error fetching purchased content:", error);
				setAlert({
					open: true,
					message: "Failed to load your purchased content",
					severity: "error"
				});
			} finally {
				setLoading(false);
			}
		};

		fetchPurchasedContent();
	}, []);

	const handleDownload = (contentItem) => {
		if (contentItem.fileUrl && contentItem.fileUrl.includes('drive.google.com')) {
			const idMatch = contentItem.fileUrl.match(/[-\w]{25,}/);
			const fileId = idMatch ? idMatch[0] : null;
			if (fileId) {
				const driveUrl = `https://drive.google.com/uc?id=${fileId}&export=download`;
				window.open(driveUrl, '_blank');
				return;
			}
			window.open(contentItem.fileUrl, '_blank');
			return;
		}
		window.open(contentItem.fileUrl, '_blank');
	};

	const getFileUrl = (fileUrl) => {
		if (!fileUrl) return "/api/placeholder/400/200";
		if (fileUrl.startsWith("http")) return fileUrl;
		return `https://testbackend2-5loz.onrender.com/${fileUrl.replace(
			/\\/g,
			"/"
		)}`;
	};

	const ContentCard = ({ content }) => (
		<Card
			sx={{
				height: "100%",
				display: "flex",
				flexDirection: "column",
			}}>
			<CardMedia
				component='img'
				height='140'
				image={content.thumbnailUrl ? getFileUrl(content.thumbnailUrl) : "/images/bg3.jpeg"}
				alt={content.title}
			/>
			<CardContent sx={{ flexGrow: 1 }}>
				<Typography gutterBottom variant='h5' component='div'>
					{content.title}
				</Typography>
				<Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
					{content.description?.substring(0, 100)}
					{content.description?.length > 100 ? "..." : ""}
				</Typography>
				<Typography variant="caption" color="text.secondary" display="block">
					{content.type}
				</Typography>
			</CardContent>
			<CardActions>
				<ContentPreview content={content} isPurchased={true} />
				<Button 
					size='small' 
					color='primary' 
					startIcon={<CloudDownload />}
					onClick={() => handleDownload(content)}
				>
					Download
				</Button>
			</CardActions>
		</Card>
	);

	if (loading)
		return (
			<Box
				display='flex'
				justifyContent='center'
				alignItems='center'
				height='200px'>
				<CircularProgress />
			</Box>
		);

	return (
		<Box sx={{ flexGrow: 1, p: 2 }}>
			<Typography
				variant='h4'
				component='h2'
				gutterBottom
				mb={7}
				sx={{ fontWeight: "bold" }}>
				My Purchased Content
			</Typography>

			{content.length === 0 ? (
				<Typography variant='body1' color='text.secondary'>
					You haven't purchased any content yet.
				</Typography>
			) : (
				<Grid container spacing={3}>
					{content.map((item) => (
						<Grid item xs={12} sm={6} md={4} key={item._id}>
							<ContentCard content={item} />
						</Grid>
					))}
				</Grid>
			)}
			
			<Snackbar 
				open={alert.open} 
				autoHideDuration={6000} 
				onClose={() => setAlert({...alert, open: false})}
			>
				<Alert 
					onClose={() => setAlert({...alert, open: false})} 
					severity={alert.severity}
				>
					{alert.message}
				</Alert>
			</Snackbar>
		</Box>
	);
};

export default PurchasedContent;
