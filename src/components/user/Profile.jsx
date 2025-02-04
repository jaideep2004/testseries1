// // components/user/Profile.jsx

import React from "react";
import {
	Container,
	Paper,
	Typography,
	Grid,
	Box,
	Divider,
	Card,
	CardContent,
	Avatar,
} from "@mui/material";
import { Person, Email, CalendarToday } from "@mui/icons-material";
import { useAuth } from "../../context/AuthContext";

const Profile = () => {
	const { user } = useAuth();

	const ProfileItem = ({ icon, label, value }) => (
		<Box display='flex' alignItems='center' mb={2}>
			<Box mr={2}>{icon}</Box>
			<Box>
				<Typography variant='body2' color='text.secondary'>
					{label}
				</Typography>
				<Typography variant='body1'>{value}</Typography>
			</Box>
		</Box>
	);

	return (
		<Container maxWidth='md' sx={{ py: 4 }}>
			<Paper elevation={3} sx={{ p: 4 }}>
				<Box display='flex' alignItems='center' mb={4}>
					<Avatar
						sx={{
							width: 100,
							height: 100,
							bgcolor: "primary.main",
							fontSize: "2.5rem",
							mr: 3,
						}}>
						{user?.name?.charAt(0)}
					</Avatar>
					<Box>
						<Typography variant='h4' gutterBottom>
							{user?.name}
						</Typography>
						<Typography variant='body1' color='text.secondary'>
							Account Details
						</Typography>
					</Box>
				</Box>

				<Divider sx={{ my: 3 }} />

				<Grid container spacing={3}>
					<Grid item xs={12}>
						<ProfileItem
							icon={<Person color='primary' />}
							label='Full Name'
							value={user?.name}
						/>
						<ProfileItem
							icon={<Email color='primary' />}
							label='Email Address'
							value={user?.email}
						/>
						<ProfileItem
							icon={<CalendarToday color='primary' />}
							label='Member Since'
							value={new Date(user?.createdAt).toLocaleDateString()}
						/>
					</Grid>
				</Grid>
			</Paper>
		</Container>
	);
};

export default Profile;
