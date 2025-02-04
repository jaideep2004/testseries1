// src/components/auth/AdminLogin.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	Container,
	Paper,
	TextField,
	Button,
	Typography,
	Box,
	Alert,
	styled,
} from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import Header from "../common/Header";

const StyledContainer = styled(Container)(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	minHeight: "calc(100vh - 64px)",
	paddingBottom: theme.spacing(8),
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
	padding: theme.spacing(6),
	width: "100%",
	maxWidth: 450,
	borderRadius: 12,
}));

const AdminLogin = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const { login } = useAuth();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setError("");
			setLoading(true);
			const { redirectUrl, isAdmin } = await login(formData, true); // Pass true for admin login

			if (!isAdmin) {
				setError("Access denied. Admin login only.");
				return;
			}

			navigate(redirectUrl);
		} catch (err) {
			setError(err.message || "Admin login failed");
		} finally {
			setLoading(false);
		}
	};

	return (
		<StyledContainer>
			<Header />
			<StyledPaper elevation={0}>
				<Typography variant='h4' align='center' gutterBottom>
					Admin Login
				</Typography>

				{error && (
					<Alert severity='error' sx={{ mb: 3 }}>
						{error}
					</Alert>
				)}

				<Box component='form' onSubmit={handleSubmit}>
					<TextField
						fullWidth
						label='Email'
						type='email'
						name='email'
						value={formData.email}
						onChange={handleChange}
						required
						sx={{ mb: 2 }}
					/>

					<TextField
						fullWidth
						label='Password'
						type='password'
						name='password'
						value={formData.password}
						onChange={handleChange}
						required
						sx={{ mb: 2 }}
					/>

					<Button
						type='submit'
						variant='contained'
						fullWidth
						disabled={loading}
						sx={{ mt: 2 }}>
						{loading ? "Signing in..." : "Admin Sign In"}
					</Button>
				</Box>
			</StyledPaper>
		</StyledContainer>
	);
};

export default AdminLogin;
