// src/components/auth/Register.jsx
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
	Grid,
	Divider,
} from "@mui/material";
import { Google as GoogleIcon } from "@mui/icons-material";
import { useAuth } from "../../context/AuthContext";
import { GoogleLogin } from "@react-oauth/google";

const Register = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const { register, googleAuth } = useAuth();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (formData.password !== formData.confirmPassword) {
			return setError("Passwords do not match");
		}

		try {
			setError("");
			setLoading(true);
			const { redirectUrl } = await register({
				name: formData.name,
				email: formData.email,
				password: formData.password,
			});
			navigate(redirectUrl);
		} catch (err) {
			setError(err.message || "Failed to create an account");
		} finally {
			setLoading(false);
		}
	};

	const handleGoogleSuccess = async (credentialResponse) => {
		try {
			setLoading(true);
			const result = await googleAuth(credentialResponse);
			navigate(result.redirectUrl);
		} catch (error) {
			setError(error.message || "Google authentication failed");
		} finally {
			setLoading(false);
		}
	};

	return (
		<Container maxWidth='sm'>
			<Paper elevation={3} sx={{ p: 4, mt: 4 }}>
				<Typography variant='h4' component='h1' gutterBottom align='center'>
					Create Account
				</Typography>

				{error && (
					<Alert severity='error' sx={{ mb: 2 }}>
						{error}
					</Alert>
				)}

				<Box component='form' onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								fullWidth
								label='Full Name'
								name='name'
								value={formData.name}
								onChange={handleChange}
								required
							/>
						</Grid>

						<Grid item xs={12}>
							<TextField
								fullWidth
								label='Email'
								type='email'
								name='email'
								value={formData.email}
								onChange={handleChange}
								required
							/>
						</Grid>

						<Grid item xs={12}>
							<TextField
								fullWidth
								label='Password'
								type='password'
								name='password'
								value={formData.password}
								onChange={handleChange}
								required
							/>
						</Grid>

						<Grid item xs={12}>
							<TextField
								fullWidth
								label='Confirm Password'
								type='password'
								name='confirmPassword'
								value={formData.confirmPassword}
								onChange={handleChange}
								required
							/>
						</Grid>
					</Grid>

					<Button
						type='submit'
						variant='contained'
						fullWidth
						sx={{ mt: 3 }}
						disabled={loading}>
						{loading ? "Creating Account..." : "Register"}
					</Button>

					<Divider sx={{ my: 3 }}>OR</Divider>

					{/* <Button
						variant='outlined'
						fullWidth
						startIcon={<GoogleIcon />}
						onClick={() => {
    
              
						}}>
						Continue with Google
					</Button> */}
					{/* <GoogleLogin
						onSuccess={async (credentialResponse) => {
							try {
								const result = await googleAuth(credentialResponse);
								navigate(result.redirectUrl);
							} catch (error) {
								setError(error.message || "Google authentication failed");
							}
						}}
						onError={() => {
							setError("Google authentication failed");
						}}
						useOneTap
						theme='filled_blue'
						shape='pill'
						text='continue_with'
					/> */}

					<Box sx={{ width: "100%", mb: 2 }}>
						<GoogleLogin
							onSuccess={handleGoogleSuccess}
							onError={() => {
								setError("Google authentication failed");
							}}
							theme='filled_blue'
							size='large'
							text='continue_with'
							width='100%'
						/>
					</Box>

					<Box sx={{ mt: 2, textAlign: "center" }}>
						<Typography variant='body2'>
							Already have an account?{" "}
							<Button
								variant='text'
								onClick={() => navigate("/login")}
								sx={{ textTransform: "none" }}>
								Login here
							</Button>
						</Typography>
					</Box>
				</Box>
			</Paper>
		</Container>
	);
};

export default Register;
