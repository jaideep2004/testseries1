//src/content/ContentDetail.jsx

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
} from "@mui/material";
import { Lock, Download, Clock, Tag, Book, School } from "lucide-react";
import api from "../../utils/api";

const ContentDetails = () => {
	const { id } = useParams();
	const location = useLocation();
	const navigate = useNavigate();
	const [content, setContent] = useState(location.state?.content || null);
	const [loading, setLoading] = useState(!location.state?.content);
	const [error, setError] = useState(null);
	const [user, setUser] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const [contentRes, userRes] = await Promise.all([
					!content
						? api.get(`/content/${id}`)
						: Promise.resolve({ data: content }),
					api.get("/auth/me"),
				]);
				setContent(contentRes.data);
				setUser(userRes.data);
			} catch (error) {
				if (error.response?.status === 401) {
					setUser(null);
				} else {
					setError("Failed to load content details. Please try again later.");
				}
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [id, content]);

	const handlePurchase = async () => {
		if (!user) {
			navigate("/login", { state: { from: location } });
			return;
		}

		try {
			const response = await api.post("/payment/create-order", {
				contentId: content._id,
				amount: content.price,
			});

			// Handle Razorpay integration here
			// Navigate to payment page or open Razorpay modal
			navigate("/payment", { state: { orderDetails: response.data } });
		} catch (error) {
			setError("Failed to initiate purchase. Please try again.");
		}
	};

	const handleDownload = () => {
		if (content.fileUrl && content.fileUrl.includes('drive.google.com')) {
			const idMatch = content.fileUrl.match(/[-\w]{25,}/);
			const fileId = idMatch ? idMatch[0] : null;
			if (fileId) {
				const driveUrl = `https://drive.google.com/uc?id=${fileId}&export=download`;
				window.open(driveUrl, '_blank');
				return;
			}
			window.open(content.fileUrl, '_blank');
			return;
		}
		window.open(content.fileUrl, '_blank');
	};

	if (loading) {
		return (
			<Box className='flex items-center justify-center min-h-screen'>
				<CircularProgress />
			</Box>
		);
	}

	if (error || !content) {
		return (
			<Box className='container mx-auto p-4'>
				<Alert severity='error'>{error || "Content not found"}</Alert>
			</Box>
		);
	}

	const canAccess =
		content.isFree || user?.purchasedContent?.includes(content._id);

	return (
		<Box className='container mx-auto p-4'>
			<Paper className='p-6'>
				<Box className='flex justify-between items-start mb-6'>
					<Box>
						<Typography variant='h4' className='mb-2'>
							{content.title}
						</Typography>
						<Box className='flex gap-2 mb-4'>
							<Chip
								icon={<School size={16} />}
								label={location.state?.className}
								variant='outlined'
							/>
							<Chip
								icon={<Book size={16} />}
								label={location.state?.subjectName}
								variant='outlined'
							/>
							<Chip
								icon={<Tag size={16} />}
								label={content.type}
								variant='outlined'
							/>
							{content.duration > 0 && (
								<Chip
									icon={<Clock size={16} />}
									label={`${content.duration} minutes`}
									variant='outlined'
								/>
							)}
						</Box>
					</Box>
					<Box className='text-right'>
						{content.isFree ? (
							<Typography variant='h6' className='text-green-600 mb-2'>
								Free
							</Typography>
						) : (
							<Typography variant='h6' className='mb-2'>
								₹{content.price}
							</Typography>
						)}
						{canAccess ? (
							<Button
								variant='contained'
								startIcon={<Download />}
								onClick={handleDownload}
								className='w-full'>
								Download Now
							</Button>
						) : (
							<Button
								variant='contained'
								color='primary'
								startIcon={<Lock />}
								onClick={handlePurchase}
								className='w-full'>
								Purchase to Access hello
							</Button>
						)}
					</Box>
				</Box>

				<Divider className='my-4' />

				<Typography variant='h6' className='mb-2'>
					Description
				</Typography>
				<Typography className='mb-4' style={{ whiteSpace: "pre-line" }}>
					{content.description}
				</Typography>

				{content.tags?.length > 0 && (
					<>
						<Typography variant='h6' className='mb-2'>
							Tags
						</Typography>
						<Box className='flex gap-2'>
							{content.tags.map((tag, index) => (
								<Chip key={index} label={tag} size='small' />
							))}
						</Box>
					</>
				)}
			</Paper>
		</Box>
	);
};

export default ContentDetails;
