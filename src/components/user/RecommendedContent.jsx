// // components/user/RecommendedContent.jsx

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
import api from "../../utils/api";
import Loading from "../common/Loading";

const getFileUrl = (fileUrl) => {
	if (!fileUrl) return "/api/placeholder/400/200";
	if (fileUrl.startsWith("http")) return fileUrl;
	return `https://testbackend2-5loz.onrender.com/${fileUrl.replace(
		/\\/g,
		"/"
	)}`;
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

const RecommendedContentCard = ({ content }) => (
	<Card
		sx={{
			height: "100%",
			display: "flex",
			flexDirection: "column",
		}}>
		<CardMedia
			component='img'
			height='200'
			image='/images/about.jpg'
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
		<CardActions></CardActions>
	</Card>
);

const RecommendedContent = () => {
	const [content, setContent] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchRecommendedContent = async () => {
			try {
				const { data } = await api.get("/customer/dashboard");
				setContent(data.recommendedContent);
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
						Recommended For You
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

export default RecommendedContent;
