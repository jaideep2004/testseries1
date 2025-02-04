import React from "react";
import {
	Box,
	Container,
	AppBar,
	Toolbar,
	Typography,
	Button,
	IconButton,
} from "@mui/material";
import { Person, Notifications, ExitToApp } from "@mui/icons-material";
import { useNavigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const UserLayout = () => {
	const navigate = useNavigate();
	const { logout } = useAuth();

	return (
		<Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
			<AppBar position='fixed'>
				<Toolbar>
					<Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
						Student Dashboard
					</Typography>
					<IconButton color='inherit'>
						<Notifications />
					</IconButton>
					<Button
						color='inherit'
						startIcon={<Person />}
						onClick={() => navigate("/customer/profile")}>
						Profile
					</Button>
					<IconButton color='inherit' onClick={logout}>
						<ExitToApp />
					</IconButton>
				</Toolbar>
			</AppBar>
			<Box component='main' sx={{ flexGrow: 1, mt: 8, py: 3 }}>
				<Container maxWidth='lg'>
					<Outlet />
				</Container>
			</Box>
		</Box>
	);
};

export default UserLayout;
