// BrowseAll.jsx
import React, { useState, useEffect } from "react";
import {
	Box,
	Container,
	Typography,
	Grid,
	Card,
	CardContent,
	CardMedia,
	Button,
	Stack,
	Tabs,
	Tab,
	Chip,
	TextField,
	InputAdornment,
	MenuItem,
	Select,
	FormControl,
	InputLabel,
} from "@mui/material";
import { Search, FilterList } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import api from "../utils/api";

const StyledCard = styled(Card)(({ theme }) => ({
	height: "100%",
	display: "flex",
	flexDirection: "column",
	transition: "all 0.3s ease-in-out",
	borderRadius: "24px",
	overflow: "hidden",
	boxShadow: "0px 10px 30px rgba(99, 102, 241, 0.1)",
	"&:hover": {
		transform: "translateY(-10px)",
		boxShadow: "0px 20px 40px rgba(99, 102, 241, 0.15)",
	},
}));

const BrowseAll = () => {
	const [tab, setTab] = useState(0);
	const [searchTerm, setSearchTerm] = useState("");
	const [filterCategory, setFilterCategory] = useState("all");
	const [filterSemester, setFilterSemester] = useState("all");
	const [data, setData] = useState({
		categories: [],
		courses: [],
		projects: [],
	});

	useEffect(() => {
		fetchAllData();
	}, []);

	const fetchAllData = async () => {
		try {
			// Replace with your actual API calls
			const [categoriesRes, coursesRes, projectsRes] = await Promise.all([
				api.get("/admin/classes"),
				api.get("/content"),
				api.get("/projects"),
			]);

			setData({
				categories: categoriesRes.data,
				courses: coursesRes.data.contents,
				projects: projectsRes.data.projects,
			});
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	const handleTabChange = (event, newValue) => {
		setTab(newValue);
	};

	const filterContent = (content) => {
		return content.filter((item) => {
			const matchesSearch =
				item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
				item.description.toLowerCase().includes(searchTerm.toLowerCase());
			const matchesCategory =
				filterCategory === "all" || item.category === filterCategory;
			const matchesSemester =
				filterSemester === "all" || item.semester === filterSemester;
			return matchesSearch && matchesCategory && matchesSemester;
		});
	};
	const getFileUrl = (fileUrl) => {
		if (!fileUrl) return "/api/placeholder/400/200";
		if (fileUrl.startsWith("http")) return fileUrl;
		return `https://testbackend2-5loz.onrender.com/${fileUrl.replace(/\\/g, "/")}`;
	};

	return (
		<Container maxWidth='lg' sx={{ py: 8 }}>
			<Typography variant='h4' sx={{ mb: 4, fontWeight: "bold" }}>
				Browse All Content
			</Typography>

			{/* Search and Filters */}
			<Grid container spacing={3} sx={{ mb: 4 }}>
				<Grid item xs={12} md={6}>
					<TextField
						fullWidth
						placeholder='Search...'
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						InputProps={{
							startAdornment: (
								<InputAdornment position='start'>
									<Search />
								</InputAdornment>
							),
						}}
					/>
				</Grid>
				<Grid item xs={12} md={3}>
					<FormControl fullWidth>
						<InputLabel>Category</InputLabel>
						<Select
							value={filterCategory}
							onChange={(e) => setFilterCategory(e.target.value)}
							label='Category'>
							<MenuItem value='all'>All Categories</MenuItem>
							{data.categories.map((category) => (
								<MenuItem key={category._id} value={category._id}>
									{category.name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={12} md={3}>
					<FormControl fullWidth>
						<InputLabel>Semester</InputLabel>
						<Select
							value={filterSemester}
							onChange={(e) => setFilterSemester(e.target.value)}
							label='Semester'>
							<MenuItem value='all'>All Semesters</MenuItem>
							{/* Add your semester options here */}
						</Select>
					</FormControl>
				</Grid>
			</Grid>

			{/* Content Tabs */}
			<Tabs value={tab} onChange={handleTabChange} sx={{ mb: 4 }}>
				<Tab label='Categories' />
				<Tab label='Courses' />
				<Tab label='Projects' />
			</Tabs>

			{/* Content Grid */}
			<Grid container spacing={4}>
				{tab === 0 &&
					data.categories.map((category) => (
						<Grid item xs={12} sm={6} md={4} key={category._id}>
							<StyledCard>
								<CardMedia
									component='img'
									height='200'
									// image={category.image}
									image={getFileUrl(category.image)}
									alt={category.name}
								/>
								<CardContent>
									<Typography variant='h6' gutterBottom>
										{category.name}
									</Typography>
									<Typography variant='body2' color='text.secondary'>
										{category.description}
									</Typography>
								</CardContent>
							</StyledCard>
						</Grid>
					))}

				{tab === 1 &&
					filterContent(data.courses).map((course) => (
						<Grid item xs={12} sm={6} md={4} key={course._id}>
							<StyledCard>
								<CardMedia
									component='img'
									height='200'
									image={getFileUrl(course.thumbnailUrl)}
									alt={course.title}
								/>
								<CardContent>
									<Typography variant='h6' gutterBottom>
										{course.title}
									</Typography>
									<Typography variant='body2' color='text.secondary'>
										{course.description}
									</Typography>
									<Stack
										direction='row'
										justifyContent='space-between'
										alignItems='center'
										sx={{ mt: 2 }}>
										{course.isFree ? (
											<Chip label='Free' color='primary' />
										) : (
											<Typography variant='h6' color='primary'>
												₹{course.price}
											</Typography>
										)}
										<Button variant='contained' color='primary'>
											View Details
										</Button>
									</Stack>
								</CardContent>
							</StyledCard>
						</Grid>
					))}

				{tab === 2 &&
					filterContent(data.projects).map((project) => (
						<Grid item xs={12} sm={6} md={4} key={project._id}>
							<StyledCard>
								<CardMedia
									component='img'
									height='200'
									image={getFileUrl(project.thumbnailUrl)}
									alt={project.title}
								/>
								<CardContent>
									<Typography variant='h6' gutterBottom>
										{project.title}
									</Typography>
									<Typography variant='body2' color='text.secondary'>
										{project.description}
									</Typography>
									<Chip
										label={`Difficulty: ${project.difficulty}`}
										sx={{ mt: 1, mb: 1 }}
									/>
									<Stack
										direction='row'
										justifyContent='space-between'
										alignItems='center'
										sx={{ mt: 2 }}>
										{project.isFree ? (
											<Chip label='Free' color='primary' />
										) : (
											<Typography variant='h6' color='primary'>
												₹{project.price}
											</Typography>
										)}
										<Button variant='contained' color='primary'>
											View Details
										</Button>
									</Stack>
								</CardContent>
							</StyledCard>
						</Grid>
					))}
			</Grid>
		</Container>
	);
};

export default BrowseAll;
