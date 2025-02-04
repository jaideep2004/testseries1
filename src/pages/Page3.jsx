import React from "react";
import { Container, Typography, Paper, Box, styled } from "@mui/material";

const RefundContainer = styled(Paper)(({ theme }) => ({
	padding: theme.spacing(4),
	borderRadius: "24px",
	backgroundColor: "#FFFFFF",
	boxShadow: "0px 10px 30px rgba(99, 102, 241, 0.1)",
	marginTop: theme.spacing(4),
	marginBottom: theme.spacing(4),
}));

const CancellationAndRefunds = () => {
	return (
		<Container maxWidth='lg'>
			<Box py={4}>
				<Typography variant='h3' gutterBottom sx={{ color: "#6366F1" }}>
					Cancellation and Refund Policy
				</Typography>

				<RefundContainer>
					<Typography variant='h5' gutterBottom>
						AcademicAssignmentMaster Refund Policy
					</Typography>

					<Typography paragraph>
						Last updated: {new Date().toLocaleDateString()}
					</Typography>

					<Typography variant='h6' gutterBottom sx={{ mt: 3 }}>
						1. Cancellation Policy
					</Typography>
					<Typography paragraph>
						You may cancel your subscription or service at any time through your
						account settings. Cancellation will take effect at the end of your
						current billing period.
					</Typography>

					<Typography variant='h6' gutterBottom sx={{ mt: 3 }}>
						2. Refund Eligibility
					</Typography>
					<Typography paragraph>
						- Within 7 days of purchase: Full refund available if you're
						unsatisfied with our services - After 7 days: Refunds are evaluated
						on a case-by-case basis - Technical issues: Full refund if service
						was unusable due to technical problems on our end
					</Typography>

					<Typography variant='h6' gutterBottom sx={{ mt: 3 }}>
						3. Refund Process
					</Typography>
					<Typography paragraph>
						Refunds are processed through Razorpay and typically take 5-7
						business days to appear in your account. The refund will be issued
						to the original payment method used for the purchase.
					</Typography>

					<Typography variant='h6' gutterBottom sx={{ mt: 3 }}>
						4. Non-Refundable Items
					</Typography>
					<Typography paragraph>
						Certain services, such as already downloaded materials or completed
						custom assignments, are non-refundable. These will be clearly marked
						at the time of purchase.
					</Typography>

					<Typography variant='h6' gutterBottom sx={{ mt: 3 }}>
						5. How to Request a Refund
					</Typography>
					<Typography paragraph>
						To request a refund, please contact our support team at
						support@academicassignmentmaster.com with your order details and
						reason for the refund request.
					</Typography>
				</RefundContainer>
			</Box>
		</Container>
	);
};

export default CancellationAndRefunds;
