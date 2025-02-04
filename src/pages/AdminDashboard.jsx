// // // pages/AdminDashboard.jsx

import React, { useEffect, useState } from "react";
import {
	Container,
	Grid,
	Typography,
	Paper,
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Alert,
	Box,
	createTheme,
	ThemeProvider,
	Button,
} from "@mui/material";
import {
	LineChart,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Line,
	ResponsiveContainer,
} from "recharts";
import Loading from "../components/common/Loading";
import api from "../utils/api";
import { Home, Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
// import { setRequestUserType } from "../utils/api";

const theme = createTheme({
	palette: {
		primary: {
			main: "#1976d2",
		},
		background: {
			default: "#f4f6f8",
		},
	},
	typography: {
		fontFamily: "Roboto, Arial, sans-serif",
	},
});

const AdminDashboard = () => {
	const navigate = useNavigate();
	const { logout } = useAuth();

	const [stats, setStats] = useState({
		totalUsers: 0,
		totalContent: 0,
		totalOrders: 0,
		totalRevenue: 0,
		recentOrders: [],
		monthlyRevenue: [],
	});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		// setRequestUserType('admin');
		fetchDashboardStats();
	}, []);

	const handleLogout = () => {
		logout();
		navigate("/");
	};

	const fetchDashboardStats = async () => {
		try {
			const { data } = await api.get("/admin/stats");
			setStats(data);
			console.log("stats", data);
			setError(null);
		} catch (error) {
			setError(
				error.response?.data?.message || "Error fetching dashboard stats"
			);
			console.error("Error fetching stats:", error);
		} finally {
			setLoading(false);
		}
	};

	if (loading) return <Loading />;

	return (
		<ThemeProvider theme={theme}>
			<Container maxWidth='xl' sx={{ py: 4 }}>
				{error && (
					<Alert severity='error' sx={{ mb: 3 }}>
						{error}
					</Alert>
				)}

				<Box
					display='flex'
					justifyContent='space-between'
					alignItems='center'
					mb={3}>
					<Typography variant='h4'>Admin Dashboard</Typography>
					<Box>
						<Button
							startIcon={<Home />}
							onClick={() => navigate("/")}
							sx={{ mr: 2 }}
							variant='outlined'>
							Home
						</Button>
						<Button
							startIcon={<Logout />}
							onClick={handleLogout}
							variant='contained'
							color='error'>
							Logout
						</Button>
					</Box>
				</Box>

				{/* Stats Overview */}
				<Grid container spacing={3} sx={{ mb: 4 }}>
					{[
						{ label: "Total Users", value: stats.totalUsers },
						{ label: "Total Content", value: stats.totalContent },
						{ label: "Total Orders", value: stats.totalOrders },
						{
							label: "Total Revenue",
							value: `₹${stats.totalRevenue.toLocaleString()}`,
						},
					].map((stat, index) => (
						<Grid item xs={12} sm={6} md={3} key={index}>
							<Paper
								elevation={3}
								sx={{
									p: 3,
									textAlign: "center",
									bgcolor: "background.paper",
								}}>
								<Typography color='textSecondary' gutterBottom>
									{stat.label}
								</Typography>
								<Typography variant='h5' fontWeight='bold'>
									{stat.value}
								</Typography>
							</Paper>
						</Grid>
					))}
				</Grid>

				{/* Revenue Chart */}
				<Paper elevation={3} sx={{ p: 3, mb: 4 }}>
					<Typography variant='h6' sx={{ mb: 3 }}>
						Revenue Overview
					</Typography>
					<Box height={400}>
						<ResponsiveContainer width='100%' height='100%'>
							<LineChart
								data={stats.monthlyRevenue || []}
								margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
								<CartesianGrid strokeDasharray='3 3' />
								<XAxis dataKey='month' />
								<YAxis />
								<Tooltip
									formatter={(value) => [
										`₹${value.toLocaleString()}`,
										"Revenue",
									]}
								/>
								<Line
									type='monotone'
									dataKey='amount'
									stroke='#1976d2'
									name='Revenue'
								/>
							</LineChart>
						</ResponsiveContainer>
					</Box>
				</Paper>

				{/* Recent Orders */}
				<Paper elevation={3} sx={{ p: 3 }}>
					<Typography variant='h6' sx={{ mb: 3 }}>
						Recent Orders
					</Typography>
					<TableContainer>
						<Table>
							<TableHead>
								<TableRow>
									{["User", "Content", "Amount", "Date"].map((header) => (
										<TableCell key={header} sx={{ fontWeight: "bold" }}>
											{header}
										</TableCell>
									))}
								</TableRow>
							</TableHead>
							<TableBody>
								{stats.recentOrders.map((order) => (
									<TableRow key={order._id} hover>
										<TableCell>{order.user?.name || "N/A"}</TableCell>
										<TableCell>{order.content?.title || "N/A"}</TableCell>
										<TableCell>
											₹{order.amount?.toLocaleString() || 0}
										</TableCell>
										<TableCell>
											{new Date(order.createdAt).toLocaleDateString()}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</Paper>
			</Container>
		</ThemeProvider>
	);
};

export default AdminDashboard;
