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
} from "@mui/material";
import useAuth from "../../hooks/useAuth";
import api from "../../utils/api";

const PurchasedContent = () => {
	const [content, setContent] = useState([]);
	const [loading, setLoading] = useState(true);
	const { user } = useAuth();

	useEffect(() => {
		const fetchPurchasedContent = async () => {
			try {
				const { data } = await api.get("/customer/dashboard");
				setContent(data.purchasedContent);
			} catch (error) {
				console.error("Error fetching purchased content:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchPurchasedContent();
	}, []);

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
				image={getFileUrl(content.thumbnailUrl) || "/default-thumbnail.png"}
				alt={content.title}
			/>
			<CardContent sx={{ flexGrow: 1 }}>
				<Typography gutterBottom variant='h5' component='div'>
					{content.title}
				</Typography>
				<Typography variant='body2' color='text.secondary'>
					{content.description}
				</Typography>
			</CardContent>
			<CardActions>
				<Button size='small' color='primary'>
					View Details
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
		</Box>
	);
};

export default PurchasedContent;
