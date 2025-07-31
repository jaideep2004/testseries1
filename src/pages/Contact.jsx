import React, { useState, useRef } from "react";
import SEO from "../components/common/SEO";
import {
	Box,
	Container,
	Typography,
	Grid,
	TextField,
	Button,
	Paper,
	Stack,
	styled,
	Alert,
	Snackbar,
	CircularProgress,
} from "@mui/material";
import { Email, Phone, LocationOn, Send } from "@mui/icons-material";
import emailjs from "@emailjs/browser";

// Custom styled components
const ContactCard = styled(Paper)(({ theme }) => ({
	padding: theme.spacing(4),
	borderRadius: "24px",
	backgroundColor: "#FFFFFF",
	boxShadow: "0px 10px 30px rgba(99, 102, 241, 0.1)",
	transition: "all 0.3s ease-in-out",
	"&:hover": {
		transform: "translateY(-5px)",
		boxShadow: "0px 20px 40px rgba(99, 102, 241, 0.15)",
	},
}));

const InfoCard = styled(Paper)(({ theme }) => ({
	padding: theme.spacing(3),
	borderRadius: "20px",
	backgroundColor: "rgba(99, 102, 241, 0.05)",
	display: "flex",
	alignItems: "center",
	gap: theme.spacing(2),
}));

const Contact = () => {
	const form = useRef();
	const [loading, setLoading] = useState(false);
	const [snackbar, setSnackbar] = useState({
		open: false,
		message: "",
		severity: "success",
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			await emailjs.sendForm(
				"service_1z0da4o",
				"template_efe7977",
				form.current,
				"ByY67qallsZ4slKux"
			);
			setSnackbar({
				open: true,
				message: "Message sent successfully!",
				severity: "success",
			});
			form.current.reset();
		} catch (error) {
			setSnackbar({
				open: true,
				message: "Failed to send message. Please try again.",
				severity: "error",
			});
		} finally {
			setLoading(false);
		}
	};

	const handleCloseSnackbar = () => {
		setSnackbar({ ...snackbar, open: false });
	};

	return (
		<>
			<SEO 
				title="Contact Us | Academic Assignment Master"
				description="Get in touch with Academic Assignment Master. Contact us for inquiries about our academic services, support, or any questions you may have."
				keywords="contact, support, academic services, inquiries, help, academic assignment master"
				canonicalUrl="/contact"
			/>
			
			<Box sx={{ bgcolor: "#F6F9FC", minHeight: "100vh", py: 12 }}>
				<Container maxWidth='lg'>
					{/* Header Section */}
					<Box sx={{ textAlign: "center", mb: 8 }}>
						<Typography
							variant='h3'
							gutterBottom
							sx={{
								fontWeight: "600",
								background: "linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)",
								WebkitBackgroundClip: "text",
								WebkitTextFillColor: "transparent",
								fontFamily: "Poppins !important",
								fontSize: { xs: "35px", md: "48px" },
							}}>
							Get in Touch
						</Typography>
						<Typography variant='h6' color='text.secondary'>
							We'd love to hear from you. Send us a message and we'll respond as
							soon as possible
						</Typography>
					</Box>

					<Grid container spacing={6}>
						{/* Contact Information */}
						<Grid item xs={12} md={4}>
							<Stack spacing={4}>
								<Typography
									variant='h5'
									sx={{
										fontWeight: "bold",
										color: "#1A237E",
										mb: 2,
									}}>
									Contact Information
								</Typography>

								<InfoCard elevation={0}>
									<Email sx={{ color: "#6366F1", fontSize: 32 }} />
									<Box>
										<Typography variant='subtitle1' fontWeight='bold'>
											Email
										</Typography>
										<Typography variant='body2' color='text.secondary'>
											support@academicassignmentmaster.co.in
										</Typography>
									</Box>
								</InfoCard>

								<InfoCard elevation={0}>
									<Phone sx={{ color: "#6366F1", fontSize: 32 }} />
									<Box>
										<Typography variant='subtitle1' fontWeight='bold'>
											Phone
										</Typography>
										<Typography variant='body2' color='text.secondary'>
											+91 8437067027
										</Typography>
									</Box>
								</InfoCard>

								<InfoCard elevation={0}>
									<LocationOn sx={{ color: "#6366F1", fontSize: 32 }} />
									<Box>
										<Typography variant='subtitle1' fontWeight='bold'>
											Location
										</Typography>
										<Typography variant='body2' color='text.secondary'>
											123 Education Street, Learning City, 12345
										</Typography>
									</Box>
								</InfoCard>
							</Stack>
						</Grid>

						{/* Contact Form */}
						<Grid item xs={12} md={8}>
							<ContactCard>
								<form ref={form} onSubmit={handleSubmit}>
									<Grid container spacing={3}>
										<Grid item xs={12} sm={6}>
											<TextField
												fullWidth
												label='First Name'
												name='first_name'
												required
												variant='outlined'
											/>
										</Grid>
										<Grid item xs={12} sm={6}>
											<TextField
												fullWidth
												label='Last Name'
												name='last_name'
												required
												variant='outlined'
											/>
										</Grid>
										<Grid item xs={12}>
											<TextField
												fullWidth
												label='Email'
												name='email'
												required
												type='email'
												variant='outlined'
											/>
										</Grid>
										<Grid item xs={12}>
											<TextField
												fullWidth
												label='Subject'
												name='subject'
												required
												variant='outlined'
											/>
										</Grid>
										<Grid item xs={12}>
											<TextField
												fullWidth
												label='Message'
												name='message'
												required
												multiline
												rows={4}
												variant='outlined'
											/>
										</Grid>
										<Grid item xs={12}>
											<Button
												type='submit'
												variant='contained'
												disabled={loading}
												startIcon={
													loading ? <CircularProgress size={20} /> : <Send />
												}
												sx={{
													bgcolor: "#6366F1",
													borderRadius: "12px",
													px: 4,
													py: 1.5,
													"&:hover": { bgcolor: "#4F46E5" },
												}}>
												{loading ? "Sending..." : "Send Message"}
											</Button>
										</Grid>
									</Grid>
								</form>
							</ContactCard>
						</Grid>
					</Grid>
				</Container>
			</Box>
			
			<Snackbar
				open={snackbar.open}
				autoHideDuration={6000}
				onClose={handleCloseSnackbar}
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
				<Alert
					onClose={handleCloseSnackbar}
					severity={snackbar.severity}
					sx={{ width: "100%" }}>
					{snackbar.message}
				</Alert>
			</Snackbar>
		</>
	);
};

export default Contact;
