import React, { useState, useEffect } from "react";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	Typography,
	Box,
	CircularProgress,
	Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";

const loadRazorpay = () => {
	return new Promise((resolve) => {
		const script = document.createElement("script");
		script.src = "https://checkout.razorpay.com/v1/checkout.js";
		script.onload = () => resolve(true);
		script.onerror = () => resolve(false);
		document.body.appendChild(script);
	});
};

const PaymentModal = ({ open, onClose, content }) => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		loadRazorpay();
	}, []);

	const handlePayment = async () => {
		try {
			setLoading(true);
			setError(null);

			// Determine if it's a content or project purchase
			const isProject = content.fileUrl && content.technologies;

			// Create order
			const orderResponse = await api.post("/payment/create-order", {
				[isProject ? "projectId" : "contentId"]: content._id,
				amount: content.price,
			});

			// Initialize Razorpay
			const options = {
				key: "rzp_live_QHLQqqlH3erJiV",
				// key: "rzp_test_uTjU5pNn8acyKC",
				amount: orderResponse.data.amount,
				currency: orderResponse.data.currency,
				name: "Academic Assignment Master",
				description: `Payment for ${content.title}`,
				order_id: orderResponse.data.id,
				handler: async (response) => {
					try {
						await api.post("/payment/verify-payment", {
							razorpayPaymentId: response.razorpay_payment_id,
							razorpayOrderId: response.razorpay_order_id,
							orderId: orderResponse.data.orderId,
						});
						// Refresh user data or update local state
						onClose();
						navigate("/customer/dashboard");

						// Reload the page to reflect changes
						window.location.reload();
					} catch (error) {
						setError("Payment verification failed");
					}
				},
				prefill: {
					name: content.title,
				},
				theme: {
					color: "#1976d2",
				},
			};
			const razorpay = new window.Razorpay(options);
			razorpay.open();
		} catch (error) {
			setError(error.response?.data?.message || "Payment initiation failed");
		} finally {
			setLoading(false);
		}
	};

	return (
		<Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
			<DialogTitle>Complete Purchase</DialogTitle>
			<DialogContent>
				<Box sx={{ mb: 2 }}>
					<Typography variant='h6' gutterBottom>
						{content?.title}
					</Typography>
					<Typography variant='body1' color='primary' gutterBottom>
						Price: ₹{content?.price}
					</Typography>
					<Typography variant='body2' color='text.secondary'>
						Click "Proceed to Payment" to complete your purchase securely
						through Razorpay.
					</Typography>
				</Box>
				{error && (
					<Alert severity='error' sx={{ mb: 2 }}>
						{error}
					</Alert>
				)}
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose} disabled={loading}>
					Cancel
				</Button>
				<Button onClick={handlePayment} variant='contained' disabled={loading}>
					{loading ? <CircularProgress size={24} /> : "Proceed to Payment"}
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default PaymentModal;
