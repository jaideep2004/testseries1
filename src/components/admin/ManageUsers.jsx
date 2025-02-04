// // // components/admin/ManageUsers.jsx

import React, { useState, useEffect } from "react";
import {
	Container,
	Typography,
	TextField,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Grid,
	Box,
	Alert,
	Chip,
	ThemeProvider,
	createTheme,
} from "@mui/material";
import Loading from "../common/Loading";
import api from "../../utils/api";

const theme = createTheme({
	palette: {
		primary: {
			main: "#1976d2",
		},
		background: {
			default: "#f4f6f8",
		},
	},
});

const ManageUsers = () => {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedUser, setSelectedUser] = useState(null);
	const [userProfile, setUserProfile] = useState(null);
	const [error, setError] = useState("");
	const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
	const [userToDelete, setUserToDelete] = useState(null);

	useEffect(() => {
		fetchUsers();
	}, []);

	const fetchUsers = async () => {
		try {
			const { data } = await api.get("/admin/users");
			setUsers(data);
		} catch (error) {
			setError("Error fetching users: " + error.message);
		} finally {
			setLoading(false);
		}
	};

	const fetchUserProfile = async (userId) => {
		try {
			const { data } = await api.get(`/admin/users/${userId}`);
			setUserProfile(data);
		} catch (error) {
			setError("Error fetching user profile: " + error.message);
		}
	};

	const handleViewProfile = (user) => {
		setSelectedUser(user);
		fetchUserProfile(user._id);
	};

	const handleDeleteUser = async () => {
		try {
			await api.delete(`/admin/users/${userToDelete._id}`);
			setUsers(users.filter((user) => user._id !== userToDelete._id));
			setDeleteConfirmOpen(false);
			setUserToDelete(null);
		} catch (error) {
			setError("Error deleting user: " + error.message);
		}
	};

	const filteredUsers = users.filter(
		(user) =>
			user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			user.email.toLowerCase().includes(searchTerm.toLowerCase())
	);

	if (loading) return <Loading />;

	return (
		<ThemeProvider theme={theme}>
			<Container maxWidth='xl' sx={{ py: 4 }}>
				{error && (
					<Alert severity='error' sx={{ mb: 2 }}>
						{error}
					</Alert>
				)}

				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						mb: 3,
					}}>
					<Typography variant='h4' gutterBottom>
						Manage Users
					</Typography>
					<TextField
						variant='outlined'
						placeholder='Search users...'
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						size='small'
						sx={{ width: 300 }}
					/>
				</Box>

				<TableContainer component={Paper} elevation={3}>
					<Table>
						<TableHead sx={{ bgcolor: "grey.100" }}>
							<TableRow>
								<TableCell>Name</TableCell>
								<TableCell>Email</TableCell>
								<TableCell>Joined Date</TableCell>
								<TableCell>Type</TableCell>
								<TableCell>Actions</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{filteredUsers.map((user) => (
								<TableRow key={user._id} hover>
									<TableCell>{user.name}</TableCell>
									<TableCell>{user.email}</TableCell>
									<TableCell>
										{new Date(user.createdAt).toLocaleDateString()}
									</TableCell>
									<TableCell>
										<Chip
											label={user.isAdmin ? "Admin" : "User"}
											color={user.isAdmin ? "primary" : "default"}
											size='small'
										/>
									</TableCell>
									<TableCell>
										<Button
											variant='outlined'
											size='small'
											onClick={() => handleViewProfile(user)}
											sx={{ mr: 1 }}>
											View Profile
										</Button>
										{!user.isAdmin && (
											<Button
												variant='outlined'
												color='error'
												size='small'
												onClick={() => {
													setUserToDelete(user);
													setDeleteConfirmOpen(true);
												}}>
												Delete
											</Button>
										)}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>

				{/* User Profile Dialog */}
				<Dialog
					open={!!selectedUser}
					onClose={() => {
						setSelectedUser(null);
						setUserProfile(null);
					}}
					maxWidth='md'
					fullWidth>
					<DialogTitle>User Profile</DialogTitle>
					<DialogContent>
						{userProfile ? (
							<Grid container spacing={3} sx={{ mt: 1 }}>
								<Grid item xs={12} md={6}>
									<Typography variant='h6' gutterBottom>
										Basic Information
									</Typography>
									<Typography>
										<strong>Name:</strong> {userProfile.user.name}
									</Typography>
									<Typography>
										<strong>Email:</strong> {userProfile.user.email}
									</Typography>
									<Typography>
										<strong>Joined:</strong>{" "}
										{new Date(userProfile.user.createdAt).toLocaleDateString()}
									</Typography>
									<Typography>
										<strong>Last Login:</strong>{" "}
										{new Date(userProfile.user.lastLogin).toLocaleDateString()}
									</Typography>
								</Grid>
								<Grid item xs={12} md={6}>
									<Typography variant='h6' gutterBottom>
										Statistics
									</Typography>
									<Typography>
										<strong>Total Spent:</strong> ₹
										{userProfile.statistics.totalSpent}
									</Typography>
									<Typography>
										<strong>Total Purchases:</strong>{" "}
										{userProfile.statistics.totalPurchases}
									</Typography>
									<Typography>
										<strong>Content Purchased:</strong>{" "}
										{userProfile.statistics.contentPurchased}
									</Typography>
									<Typography>
										<strong>Projects Purchased:</strong>{" "}
										{userProfile.statistics.projectsPurchased}
									</Typography>
								</Grid>
								<Grid item xs={12}>
									<Typography variant='h6' gutterBottom>
										Recent Orders
									</Typography>
									<TableContainer component={Paper} variant='outlined'>
										<Table size='small'>
											<TableHead>
												<TableRow>
													<TableCell>Date</TableCell>
													<TableCell>Item</TableCell>
													<TableCell>Amount</TableCell>
													<TableCell>Status</TableCell>
												</TableRow>
											</TableHead>
											<TableBody>
												{userProfile.orders.map((order) => (
													<TableRow key={order._id}>
														<TableCell>
															{new Date(order.createdAt).toLocaleDateString()}
														</TableCell>
														<TableCell>
															{order.content?.title || order.project?.title}
														</TableCell>
														<TableCell>₹{order.amount}</TableCell>
														<TableCell>
															<Chip
																label={order.status}
																color={
																	order.status === "successful"
																		? "success"
																		: "default"
																}
																size='small'
															/>
														</TableCell>
													</TableRow>
												))}
											</TableBody>
										</Table>
									</TableContainer>
								</Grid>
							</Grid>
						) : (
							<Loading />
						)}
					</DialogContent>
					<DialogActions>
						<Button
							onClick={() => {
								setSelectedUser(null);
								setUserProfile(null);
							}}>
							Close
						</Button>
					</DialogActions>
				</Dialog>

				{/* Delete Confirmation Dialog */}
				<Dialog
					open={deleteConfirmOpen}
					onClose={() => setDeleteConfirmOpen(false)}>
					<DialogTitle>Confirm Delete</DialogTitle>
					<DialogContent>
						<Typography>
							Are you sure you want to delete user {userToDelete?.name}? This
							action cannot be undone.
						</Typography>
					</DialogContent>
					<DialogActions>
						<Button onClick={() => setDeleteConfirmOpen(false)}>Cancel</Button>
						<Button
							onClick={handleDeleteUser}
							color='error'
							variant='contained'>
							Delete
						</Button>
					</DialogActions>
				</Dialog>
			</Container>
		</ThemeProvider>
	);
};

export default ManageUsers;
