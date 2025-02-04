// import React from "react";
// import {
// 	Card,
// 	CardMedia,
// 	CardContent,
// 	Typography,
// 	CardActions,
// 	Button,
// 	Box,
// 	Chip,
// 	Rating,
// 	Stack,
// } from "@mui/material";
// import { Link } from "react-router-dom";
// import DownloadIcon from "@mui/icons-material/Download";
// import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

// const ContentCard = ({ content }) => {
// 	const {
// 		_id,
// 		title,
// 		description,
// 		thumbnailUrl,
// 		price,
// 		isFree,
// 		downloads,
// 		avgRating,
// 		subject,
// 		class: contentClass,
// 	} = content;

// 	return (
// 		<Card
// 			sx={{
// 				height: "100%",
// 				display: "flex",
// 				flexDirection: "column",
// 				transition: "transform 0.2s",
// 				"&:hover": {
// 					transform: "scale(1.03)",
// 					boxShadow: 3,
// 				},
// 			}}
// 			elevation={2}>
// 			<CardMedia
// 				component='img'
// 				height='200'
// 				image={thumbnailUrl || "/api/placeholder/400/200"}
// 				alt={title}
// 				sx={{
// 					height: 200,
// 					objectFit: "cover",
// 				}}
// 			/>
// 			<CardContent sx={{ flexGrow: 1 }}>
// 				<Typography
// 					gutterBottom
// 					variant='h6'
// 					component='div'
// 					sx={{
// 						fontWeight: "bold",
// 						display: "-webkit-box",
// 						overflow: "hidden",
// 						WebkitBoxOrient: "vertical",
// 						WebkitLineClamp: 2,
// 					}}>
// 					{title}
// 				</Typography>
// 				<Typography
// 					variant='body2'
// 					color='text.secondary'
// 					sx={{
// 						mb: 2,
// 						display: "-webkit-box",
// 						overflow: "hidden",
// 						WebkitBoxOrient: "vertical",
// 						WebkitLineClamp: 2,
// 					}}>
// 					{description}
// 				</Typography>

// 				<Stack
// 					direction='row'
// 					justifyContent='space-between'
// 					alignItems='center'
// 					sx={{ mb: 1 }}>
// 					<Box>
// 						<Chip
// 							size='small'
// 							label={`${contentClass?.name || "N/A"}`}
// 							variant='outlined'
// 							sx={{ mr: 1 }}
// 						/>
// 						<Chip
// 							size='small'
// 							label={`${subject?.name || "N/A"}`}
// 							variant='outlined'
// 						/>
// 					</Box>

// 					<Box display='flex' alignItems='center'>
// 						<DownloadIcon
// 							fontSize='small'
// 							sx={{ mr: 0.5, color: "text.secondary" }}
// 						/>
// 						<Typography variant='body2' color='text.secondary'>
// 							{downloads}
// 						</Typography>
// 					</Box>
// 				</Stack>

// 				<Stack
// 					direction='row'
// 					justifyContent='space-between'
// 					alignItems='center'>
// 					<Box display='flex' alignItems='center'>
// 						<Rating
// 							name='read-only'
// 							value={avgRating || 0}
// 							precision={0.5}
// 							readOnly
// 							size='small'
// 						/>
// 						<Typography variant='body2' color='text.secondary' sx={{ ml: 1 }}>
// 							({avgRating?.toFixed(1) || "N/A"})
// 						</Typography>
// 					</Box>

// 					<Typography variant='h6' color={isFree ? "success.main" : "primary"}>
// 						{isFree ? "Free" : `₹${price}`}
// 					</Typography>
// 				</Stack>
// 			</CardContent>

// 			<CardActions>
// 				<Button
// 					component={Link}
// 					to={`/content/${_id}`}
// 					variant='contained'
// 					color='primary'
// 					fullWidth>
// 					View Details
// 				</Button>
// 			</CardActions>
// 		</Card>
// 	);
// };

// export default ContentCard;
