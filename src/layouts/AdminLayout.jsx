// // src/layouts/AdminLayout.jsx

import React from "react";
import {
	Box,
	Drawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	AppBar,
	Toolbar,
	Typography,
	IconButton,
} from "@mui/material";
import {
	Dashboard,
	Upload,
	People,
	Assessment,
	ExitToApp,
	LibraryBooks,
} from "@mui/icons-material";
import { useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const drawerWidth = 240;

const AdminLayout = () => {
	const navigate = useNavigate();
	const { logout } = useAuth();

	const menuItems = [
		{ text: "Dashboard", icon: <Dashboard />, path: "/admin/dashboard" },
		{ text: "Upload Content", icon: <Upload />, path: "/admin/upload" },
		// { text: " Content", icon: <Upload />, path: "/admin/content" },
		{
			text: "Manage Content",
			icon: <LibraryBooks />,
			path: "/admin/manage-content",
		},
		{ text: "Manage Users", icon: <People />, path: "/admin/users" },
		{ text: "Analytics", icon: <Assessment />, path: "/admin/stats" },
	];

	return (
		<Box sx={{ display: "flex" }}>
			<AppBar
				position='fixed'
				sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
				<Toolbar>
					<Typography variant='h6' noWrap component='div' sx={{ flexGrow: 1 }}>
						Admin Dashboard
					</Typography>
					<IconButton color='inherit' onClick={logout}>
						<ExitToApp />
					</IconButton>
				</Toolbar>
			</AppBar>

			<Drawer
				variant='permanent'
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					"& .MuiDrawer-paper": {
						width: drawerWidth,
						boxSizing: "border-box",
					},
				}}>
				<Toolbar />
				<Box sx={{ overflow: "auto" }}>
					<List>
						{menuItems.map((item) => (
							<ListItem
								button
								key={item.text}
								onClick={() => navigate(item.path)}>
								<ListItemIcon>{item.icon}</ListItemIcon>
								<ListItemText primary={item.text} />
							</ListItem>
						))}
					</List>
				</Box>
			</Drawer>

			<Box component='main' sx={{ flexGrow: 1, p: 3 }}>
				<Toolbar />
				<Outlet />
			</Box>
		</Box>
	);
};

export default AdminLayout;
