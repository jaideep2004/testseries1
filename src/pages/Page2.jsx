import React from "react";
import { Container, Typography, Paper, Box, styled } from "@mui/material";

const TermsContainer = styled(Paper)(({ theme }) => ({
	padding: theme.spacing(4),
	borderRadius: "24px",
	backgroundColor: "#FFFFFF",
	boxShadow: "0px 10px 30px rgba(99, 102, 241, 0.1)",
	marginTop: theme.spacing(4),
	marginBottom: theme.spacing(4),
}));

const TermsAndConditions = () => {
	return (
		<Container maxWidth='lg'>
			<Box py={4}>
				<Typography variant='h3' gutterBottom sx={{ color: "#6366F1" }}>
					Terms and Conditions
				</Typography>

				<TermsContainer>
					<Typography variant='h5' gutterBottom>
						AcademicAssignmentMaster Terms of Service
					</Typography>

					<Typography paragraph>
						Last updated: {new Date().toLocaleDateString()}
					</Typography>

					<Typography variant='h6' gutterBottom sx={{ mt: 3 }}>
						1. Acceptance of Terms
					</Typography>
					<Typography paragraph>
						By accessing and using AcademicAssignmentMaster, you agree to be
						bound by these Terms and Conditions. If you disagree with any part
						of these terms, you may not access our services.
					</Typography>

					<Typography variant='h6' gutterBottom sx={{ mt: 3 }}>
						2. Educational Content Usage
					</Typography>
					<Typography paragraph>
						Our content is provided for educational and reference purposes only.
						Users are responsible for properly citing any materials used in
						their academic work and must comply with their institution's
						academic integrity policies.
					</Typography>

					<Typography variant='h6' gutterBottom sx={{ mt: 3 }}>
						3. User Accounts
					</Typography>
					<Typography paragraph>
						You are responsible for maintaining the confidentiality of your
						account credentials and for all activities under your account.
						Notify us immediately of any unauthorized use of your account.
					</Typography>

					<Typography variant='h6' gutterBottom sx={{ mt: 3 }}>
						4. Payment Terms
					</Typography>
					<Typography paragraph>
						Payments are processed through Razorpay. By making a payment, you
						agree to provide current, complete, and accurate purchase and
						account information and authorize us to charge your chosen payment
						method.
					</Typography>

					<Typography variant='h6' gutterBottom sx={{ mt: 3 }}>
						5. Intellectual Property
					</Typography>
					<Typography paragraph>
						All content on AcademicAssignmentMaster is protected by copyright
						and other intellectual property rights. Users may not copy,
						distribute, or use our content for commercial purposes without
						explicit permission.
					</Typography>

					<Typography variant='h6' gutterBottom sx={{ mt: 3 }}>
						6. Contact Information
					</Typography>
					<Typography paragraph>
						For questions about these Terms and Conditions, please contact us at
						support@academicassignmentmaster.com
					</Typography>
				</TermsContainer>
			</Box>
		</Container>
	);
};

export default TermsAndConditions;
