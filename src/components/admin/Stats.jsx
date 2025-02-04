// src/components/admin/Stats.jsx
import React, { useEffect, useState } from "react";
import {
	Grid,
	Paper,
	Typography,
	Box,
	CircularProgress,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
} from "@mui/material";
import {
	People,
	LibraryBooks,
	AttachMoney,
	TrendingUp,
} from "@mui/icons-material";
import api from "../../utils/api";

const StatsCard = ({ title, value, icon: Icon, color }) => (
	<Paper sx={{ p: 2 }}>
		<Box sx={{ display: "flex", alignItems: "center" }}>
			<Box sx={{ flexGrow: 1 }}>
				<Typography variant='h6' gutterBottom>
					{title}
				</Typography>
				<Typography variant='h4'>{value}</Typography>
			</Box>
			<Icon sx={{ fontSize: 40, color }} />
		</Box>
	</Paper>
);

const Stats = () => {
	const [stats, setStats] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchStats = async () => {
			try {
				const response = await api.get("/admin/stats");
				setStats(response.data);
				console.log(response.data);
			} catch (error) {
				console.error("Error fetching stats:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchStats();
	}, []);

	if (loading) return <CircularProgress />;

	return (
		<Box>
			<Grid container spacing={3}>
				<Grid item xs={12} sm={6} md={3}>
					<StatsCard
						title='Total Users'
						value={stats?.totalUsers}
						icon={People}
						color='#1976d2'
					/>
				</Grid>
				<Grid item xs={12} sm={6} md={3}>
					<StatsCard
						title='Total Content'
						value={stats?.totalContent}
						icon={LibraryBooks}
						color='#2e7d32'
					/>
				</Grid>
				<Grid item xs={12} sm={6} md={3}>
					<StatsCard
						title='Total Orders'
						value={stats?.totalOrders}
						icon={AttachMoney}
						color='#ed6c02'
					/>
				</Grid>
				<Grid item xs={12} sm={6} md={3}>
					<StatsCard
						title='Revenue (₹)'
						value={stats?.totalRevenue}
						icon={TrendingUp}
						color='#9c27b0'
					/>
				</Grid>
			</Grid>

			<Paper sx={{ mt: 4, p: 2 }}>
				<Typography variant='h6' gutterBottom>
					Recent Orders
				</Typography>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>User</TableCell>
							<TableCell>Content</TableCell>
							<TableCell align='right'>Amount</TableCell>
							<TableCell>Date</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{stats.recentOrders.map((order) => (
							<TableRow key={order._id}>
								<TableCell>{order?.user?.name}</TableCell>
								<TableCell>{order?.content?.title}</TableCell>
								<TableCell align='right'>₹{order.amount}</TableCell>
								<TableCell>
									{new Date(order?.createdAt).toLocaleDateString()}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</Paper>
		</Box>
	);
};

export default Stats;
