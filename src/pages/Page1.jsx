import React from "react";
import { Container, Typography, Paper, Box, styled } from "@mui/material";

const PolicyContainer = styled(Paper)(({ theme }) => ({
	padding: theme.spacing(4),
	borderRadius: "24px",
	backgroundColor: "#FFFFFF",
	boxShadow: "0px 10px 30px rgba(99, 102, 241, 0.1)",
	marginTop: theme.spacing(4),
	marginBottom: theme.spacing(4),
}));

const PrivacyPolicy = () => {
	return (
		<Container maxWidth='lg'>
			<Box py={4}>
				<Typography variant='h3' gutterBottom sx={{ color: "#6366F1" }}>
					Privacy Policy
				</Typography>

				<PolicyContainer>
					<Typography variant='h5' gutterBottom>
						Welcome to AcademicAssignmentMaster
					</Typography>

					<Typography paragraph>
						Last updated: {new Date().toLocaleDateString()}
					</Typography>

					<Typography variant='h6' gutterBottom sx={{ mt: 3 }}>
						1. Information We Collect
					</Typography>
					<Typography paragraph>
						We collect information you provide directly to us, including name,
						email address, and academic preferences when you register or use our
						services. We also automatically collect certain information about
						your device when you use our platform.
					</Typography>

					<Typography variant='h6' gutterBottom sx={{ mt: 3 }}>
						2. How We Use Your Information
					</Typography>
					<Typography paragraph>
						We use the collected information to provide, maintain, and improve
						our services, process your requests, send you technical notices, and
						communicate with you about our services.
					</Typography>

					<Typography variant='h6' gutterBottom sx={{ mt: 3 }}>
						3. Information Sharing
					</Typography>
					<Typography paragraph>
						We do not sell or rent your personal information to third parties.
						We may share your information with service providers who assist in
						our operations and are bound by confidentiality obligations.
					</Typography>

					<Typography variant='h6' gutterBottom sx={{ mt: 3 }}>
						4. Data Security
					</Typography>
					<Typography paragraph>
						We implement appropriate security measures to protect your personal
						information from unauthorized access, alteration, or destruction.
						However, no method of transmission over the internet is 100% secure.
					</Typography>

					<Typography variant='h6' gutterBottom sx={{ mt: 3 }}>
						5. Razorpay Integration
					</Typography>
					<Typography paragraph>
						For payment processing, we use Razorpay. When you make a payment,
						you will be directed to Razorpay's secure platform. Your payment
						information is handled directly by Razorpay according to their
						privacy policy.
					</Typography>

					<Typography variant='h6' gutterBottom sx={{ mt: 3 }}>
						6. Contact Us
					</Typography>
					<Typography paragraph>
						If you have questions about this Privacy Policy, please contact us
						at support@academicassignmentmaster.com
					</Typography>
				</PolicyContainer>
			</Box>
		</Container>
	);
};

export default PrivacyPolicy;
