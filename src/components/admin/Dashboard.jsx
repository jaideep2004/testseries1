// src/components/admin/Dashboard.jsx
import React from "react";
import { Grid, Paper, Typography, Box } from "@mui/material";
import {
	People,
	LibraryBooks,
	AttachMoney,
	TrendingUp,
} from "@mui/icons-material";

import Stats from "./Stats";
import ContentList from "./ContentList";

const Dashboard = () => {
	return (
		<Box>
			<Typography variant='h4' gutterBottom>
				Admin Dashboard
			</Typography>

			<Stats />

			<Box sx={{ mt: 4 }}>
				<Typography variant='h5' gutterBottom>
					Recent Content
				</Typography>
				<ContentList />
			</Box>
		</Box>
	);
};

export default Dashboard;
