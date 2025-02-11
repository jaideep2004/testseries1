// // // src/components/common/Footer.jsx

import React from "react";
import {
	Box,
	Container,
	Grid,
	Typography,
	Link,
	Stack,
	IconButton,
	Divider,
	styled,
} from "@mui/material";
import {
	Facebook,
	Twitter,
	Instagram,
	LinkedIn,
	Phone,
	Email,
	LocationOn,
} from "@mui/icons-material";
import PrivacyPolicy from "../../pages/Page1";
import TermsAndConditions from "../../pages/Page2";
import CancellationAndRefunds from "../../pages/Page3";
import Disclaimer from "../../pages/Page4";

// Styled components remain the same
const StyledFooter = styled(Box)(({ theme }) => ({
	background: "linear-gradient(135deg, #1E293B 0%, #0F172A 100%)",
	color: "#fff",
	padding: theme.spacing(8, 0, 4),
	position: "relative",
	"&::before": {
		content: '""',
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		height: "4px",
		background: "linear-gradient(90deg, #6366F1 0%, #4F46E5 100%)",
	},
}));

const SocialButton = styled(IconButton)(({ theme }) => ({
	color: "#fff",
	backgroundColor: "rgba(255, 255, 255, 0.1)",
	"&:hover": {
		backgroundColor: "#6366F1",
		transform: "translateY(-3px)",
	},
	transition: "all 0.3s ease-in-out",
}));

const FooterLink = styled(Link)({
	color: "#CBD5E1",
	textDecoration: "none",
	transition: "all 0.2s ease-in-out",
	display: "block",
	marginBottom: "8px",
	"&:hover": {
		color: "#6366F1",
		transform: "translateX(5px)",
	},
});

const ContactItem = styled(Box)(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	marginBottom: theme.spacing(2),
	"& svg": {
		marginRight: theme.spacing(2),
		color: "#6366F1",
	},
}));

const PolicyLink = styled(Link)({
	color: "#CBD5E1",
	textDecoration: "none",
	transition: "color 0.2s ease-in-out",
	"&:hover": {
		color: "#6366F1",
	},
});

const Footer = () => {
	return (
		<StyledFooter component='footer'>
			<Container maxWidth='lg'>
				<Grid container spacing={6}>
					{/* About Section */}
					<Grid item xs={12} md={4}>
						<Box sx={{ mb: 4 }}>
							<Typography
								variant='h5'
								sx={{
									fontWeight: "bold",
									background:
										"linear-gradient(90deg, #6366F1 0%, #4F46E5 100%)",
									WebkitBackgroundClip: "text",
									WebkitTextFillColor: "transparent",
									mb: 2,
								}}>
								Academic Assignment Master
							</Typography>
							<Typography
								variant='body1'
								sx={{ color: "#CBD5E1", mb: 3, lineHeight: 1.7 }}>
								We provide high-quality educational content for students
								preparing for various competitive exams. Our platform is
								designed to make learning accessible, engaging, and effective.
							</Typography>
							<p>Follow Us</p>
							<Stack direction='row' spacing={2}>
								<a
									href='https://www.facebook.com/AcademicAssignmentMaster/'
									target='_blank'
									style={{ textDecoration: "none", color: "inherit" }}>
									<SocialButton aria-label='Facebook' style={{ scale: "1.3" }}>
										<Facebook />
									</SocialButton>
								</a>
								{/* <SocialButton aria-label='Twitter'>
									<Twitter />
								</SocialButton> */}
								<a
									href='https://www.instagram.com/academicassigmentmaster/?hl=en'
									target='_blank'
									style={{ textDecoration: "none", color: "inherit" }}>
									<SocialButton
										aria-label='Instagram'
										style={{ scale: "1.3", marginLeft: "10px" }}>
										<Instagram />
									</SocialButton>
								</a>
								<a
									href='https://www.linkedin.com/posts/academic-assignment-master_default-page-activity-7292127422806712320-NI-x?utm_source=share&utm_medium=member_desktop'
									target='_blank'
									style={{ textDecoration: "none", color: "inherit" }}>
									<SocialButton
										aria-label='LinkedIn'
										style={{ scale: "1.3", marginLeft: "10px" }}>
										<LinkedIn />
									</SocialButton>
								</a>
							</Stack>
						</Box>
					</Grid>

					{/* Quick Links */}
					<Grid item xs={12} md={4}>
						<Typography
							variant='h6'
							sx={{ color: "#fff", mb: 3, fontWeight: "bold" }}>
							Quick Links
						</Typography>
						<FooterLink href='/browse'>Courses</FooterLink>
						<FooterLink href='/browse'>Test Series</FooterLink>
						<FooterLink href='/browse'>Study Materials</FooterLink>

						<FooterLink href='/browse'>About Us</FooterLink>
						<FooterLink href='/contact'>Contact</FooterLink>
					</Grid>

					{/* Contact Info */}
					<Grid item xs={12} md={4}>
						<Typography
							variant='h6'
							sx={{ color: "#fff", mb: 3, fontWeight: "bold" }}>
							Contact Us
						</Typography>
						<Stack spacing={2}>
							<ContactItem>
								<Email />
								<Box>
									<Typography variant='body2' sx={{ color: "#CBD5E1" }}>
										Email:
									</Typography>
									<Typography variant='body1' sx={{ color: "#fff" }}>
										<a
											href='mailto:support@academicassignmentmaster.co.in'
											style={{ textDecoration: "none", color: "inherit" }}>
											support@academicassignmentmaster.co.in
										</a>
									</Typography>
								</Box>
							</ContactItem>
							<ContactItem>
								<Phone />
								<Box>
									<Typography variant='body2' sx={{ color: "#CBD5E1" }}>
										WhatsApp No:
									</Typography>
									<Typography variant='body1' sx={{ color: "#fff" }}>
										<a
											href='+918437067027'
											style={{ textDecoration: "none", color: "inherit" }}>
											+91 8437067027
										</a>
									</Typography>
								</Box>
							</ContactItem>
							<ContactItem>
								{/* <LocationOn /> */}
								{/* <Box>
									<Typography variant='body2' sx={{ color: "#CBD5E1" }}>
										Address:
									</Typography>
									<Typography variant='body1' sx={{ color: "#fff" }}>
										123 Learning Street, Education City,
										<br />
										Knowledge State - 100001
									</Typography>
								</Box> */}
							</ContactItem>
						</Stack>
					</Grid>
				</Grid>

				<Divider sx={{ my: 4, borderColor: "rgba(255, 255, 255, 0.1)" }} />

				{/* Policy Links */}
				<Box sx={{ textAlign: "center", mb: 3 }}>
					<Stack
						direction={{ xs: "column", sm: "row" }}
						spacing={{ xs: 1, sm: 3 }}
						justifyContent='center'
						alignItems='center'>
						<PolicyLink href='/privacy'>Privacy Policy</PolicyLink>
						<PolicyLink href='/terms'>Terms & Conditions</PolicyLink>
						<PolicyLink href='/refunds'>Cancellation & Refunds</PolicyLink>
						<PolicyLink href='/disclaimer'>Disclaimer</PolicyLink>
					</Stack>
				</Box>

				{/* Copyright */}
				<Box sx={{ textAlign: "center" }}>
					<Typography variant='body2' sx={{ color: "#CBD5E1" }}>
						{"Copyright © "}
						<Link
							href='/'
							sx={{
								color: "#6366F1",
								textDecoration: "none",
								"&:hover": { color: "#4F46E5" },
							}}>
							AcademicAssignmentMaster
						</Link>{" "}
						{new Date().getFullYear()}
						{". All rights reserved."}
					</Typography>
				</Box>
			</Container>
		</StyledFooter>
	);
};

export default Footer;
