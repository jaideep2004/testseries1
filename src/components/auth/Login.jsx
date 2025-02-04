// src/components/auth/Login.jsx
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
	Link,
	Divider,
	styled,
} from "@mui/material";
import {
	Google as GoogleIcon,
	Facebook as FacebookIcon,
} from "@mui/icons-material";
import { useAuth } from "../../context/AuthContext";
import Header from "../common/Header";

const StyledContainer = styled(Container)(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	minHeight: "calc(100vh - 64px)", // Adjust based on header height
	// paddingTop: theme.spacing(8),
	paddingBottom: theme.spacing(8),
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
	padding: theme.spacing(6),
	width: "100%",
	maxWidth: 450,
	borderRadius: 12,
	boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.05)",
}));

const SocialButton = styled(Button)(({ theme }) => ({
	width: "100%",
	marginBottom: theme.spacing(2),
	padding: theme.spacing(1.5),
	textTransform: "none",
	fontSize: "1rem",
	borderRadius: 8,
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
	marginBottom: theme.spacing(2),
	"& .MuiOutlinedInput-root": {
		borderRadius: 8,
		"&:hover fieldset": {
			borderColor: "#6366F1",
		},
	},
}));

const StyledButton = styled(Button)(({ theme }) => ({
	padding: theme.spacing(1.5),
	borderRadius: 8,
	fontSize: "1rem",
	textTransform: "none",
	backgroundColor: "#6366F1",
	"&:hover": {
		backgroundColor: "#4F46E5",
	},
}));

const Login = () => {
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
			const { redirectUrl, isAdmin } = await login(formData);

			// Prevent admin from logging in through user login
			if (isAdmin) {
				setError("Please use admin login");
				return;
			}

			navigate(redirectUrl);
		} catch (err) {
			setError(err.message || "Failed to login");
		} finally {
			setLoading(false);
		}
	};

	return (
		<StyledContainer style={{ maxWidth: "100%" }}>
			<Header />
			<StyledPaper elevation={0}>
				<Typography variant='h4' component='h1' align='center' gutterBottom>
					Welcome Back
				</Typography>
				<Typography
					variant='body1'
					color='text.secondary'
					align='center'
					mb={4}>
					Please sign in to continue learning
				</Typography>

				{error && (
					<Alert severity='error' sx={{ mb: 3 }}>
						{error}
					</Alert>
				)}

				<SocialButton
					variant='outlined'
					startIcon={<GoogleIcon />}
					onClick={() => {
						/* Handle Google login */
					}}>
					Continue with Google
				</SocialButton>

				<SocialButton
					variant='outlined'
					startIcon={<FacebookIcon />}
					onClick={() => {
						/* Handle Facebook login */
					}}>
					Continue with Facebook
				</SocialButton>

				<Box sx={{ my: 3, display: "flex", alignItems: "center" }}>
					<Divider sx={{ flex: 1 }} />
					<Typography variant='body2' color='text.secondary' sx={{ mx: 2 }}>
						OR
					</Typography>
					<Divider sx={{ flex: 1 }} />
				</Box>

				<Box component='form' onSubmit={handleSubmit}>
					<StyledTextField
						fullWidth
						label='Email'
						type='email'
						name='email'
						value={formData.email}
						onChange={handleChange}
						required
					/>

					<StyledTextField
						fullWidth
						label='Password'
						type='password'
						name='password'
						value={formData.password}
						onChange={handleChange}
						required
					/>

					<Box sx={{ mb: 3, mt: 1 }}>
						<Link
							href='/forgot-password'
							color='primary'
							sx={{ textDecoration: "none" }}>
							Forgot password?
						</Link>
					</Box>

					<StyledButton
						type='submit'
						variant='contained'
						fullWidth
						disabled={loading}>
						{loading ? "Signing in..." : "Sign In"}
					</StyledButton>

					<Box sx={{ mt: 3, textAlign: "center" }}>
						<Typography variant='body2' color='text.secondary'>
							Don't have an account?{" "}
							<Link
								href='/register'
								color='primary'
								sx={{ textDecoration: "none" }}>
								Sign up
							</Link>
						</Typography>
					</Box>
				</Box>
			</StyledPaper>
		</StyledContainer>
	);
};

export default Login;
