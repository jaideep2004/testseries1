import React from "react";
import { Container, Typography, Paper, Box, styled } from "@mui/material";

const DisclaimerContainer = styled(Paper)(({ theme }) => ({
	padding: theme.spacing(4),
	borderRadius: "24px",
	backgroundColor: "#FFFFFF",
	boxShadow: "0px 10px 30px rgba(99, 102, 241, 0.1)",
	marginTop: theme.spacing(4),
	marginBottom: theme.spacing(4),
}));

const Disclaimer = () => {
	return (
		<Container maxWidth='lg'>
			<Box py={4}>
				<Typography variant='h3' gutterBottom sx={{ color: "#6366F1" }}>
					Disclaimer
				</Typography>

				<DisclaimerContainer>
					<Typography variant='h5' gutterBottom>
						AcademicAssignmentMaster Disclaimer
					</Typography>

					<Typography paragraph>
						Last updated: {new Date().toLocaleDateString()}
					</Typography>

					<Typography variant='h6' gutterBottom sx={{ mt: 3 }}>
						1. Educational Purpose
					</Typography>
					<Typography paragraph>
						The content provided on AcademicAssignmentMaster is for educational
						and reference purposes only. We do not guarantee specific academic
						outcomes or grades from using our services.
					</Typography>

					<Typography variant='h6' gutterBottom sx={{ mt: 3 }}>
						2. Academic Integrity
					</Typography>
					<Typography paragraph>
						Users are responsible for ensuring their use of our services
						complies with their institution's academic integrity policies. Our
						materials should be used as references and learning aids, not as
						final submissions.
					</Typography>

					<Typography variant='h6' gutterBottom sx={{ mt: 3 }}>
						3. Accuracy of Information
					</Typography>
					<Typography paragraph>
						While we strive to provide accurate and up-to-date information, we
						make no representations or warranties about the completeness,
						reliability, or accuracy of the content on our website.
					</Typography>

					<Typography variant='h6' gutterBottom sx={{ mt: 3 }}>
						4. Third-Party Content
					</Typography>
					<Typography paragraph>
						Our website may contain links to third-party content. We are not
						responsible for the content, accuracy, or practices of any
						third-party sites linked to our platform.
					</Typography>

					<Typography variant='h6' gutterBottom sx={{ mt: 3 }}>
						5. Payment Processing
					</Typography>
					<Typography paragraph>
						Payment processing is handled by Razorpay. While we ensure secure
						integration, we are not responsible for any issues arising from the
						payment gateway's operations.
					</Typography>

					<Typography variant='h6' gutterBottom sx={{ mt: 3 }}>
						6. Contact Information
					</Typography>
					<Typography paragraph>
						For questions about this disclaimer, please contact us at
						support@academicassignmentmaster.com
					</Typography>
				</DisclaimerContainer>
			</Box>
		</Container>
	);
};

export default Disclaimer;
