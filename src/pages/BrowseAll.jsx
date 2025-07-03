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
	CircularProgress,
} from "@mui/material";
import { Search, FilterList } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import api from "../utils/api";
import { debounce } from "lodash";
import { useNavigate } from "react-router-dom";
import { createUniqueSlug } from "../utils/helpers";

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
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState({
		categories: [],
		courses: [],
		projects: [],
		semesters: [],
	});

	const navigate = useNavigate();

	useEffect(() => {
		fetchAllData();
	}, []);

	useEffect(() => {
		// Debounce the search to prevent too many API calls
		const debouncedSearch = debounce(() => {
			fetchFilteredData();
		}, 500);

		debouncedSearch();

		return () => {
			debouncedSearch.cancel();
		};
	}, [searchTerm, filterCategory, filterSemester]);

	const fetchAllData = async () => {
		setLoading(true);
		try {
			const [categoriesRes, semestersRes] = await Promise.all([
				api.get("/admin/classes"),
				api.get("/admin/semesters"),
			]);

			setData((prev) => ({
				...prev,
				categories: categoriesRes.data || [],
				semesters: semestersRes.data || [],
			}));

			// Initial fetch of filtered data
			await fetchFilteredData();
		} catch (error) {
			console.error("Error fetching initial data:", error);
		} finally {
			setLoading(false);
		}
	};

	const fetchFilteredData = async () => {
		setLoading(true);
		try {
			// Build query parameters
			const params = new URLSearchParams();
			if (searchTerm) params.append("search", searchTerm);
			if (filterCategory !== "all") params.append("classId", filterCategory);
			if (filterSemester !== "all") params.append("semesterId", filterSemester);

			console.log("Filter params:", params.toString());
			console.log("Filter values:", { searchTerm, filterCategory, filterSemester });

			// Fetch filtered data based on current tab
			const [coursesRes, projectsRes] = await Promise.all([
				api.get(`/content?${params}`),
				api.get(`/projects?${params}`),
			]);

			console.log("Courses response:", coursesRes.data);
			console.log("Projects response:", projectsRes.data);

			setData((prev) => ({
				...prev,
				courses: coursesRes.data.contents || [],
				projects: projectsRes.data.projects || [],
			}));
		} catch (error) {
			console.error("Error fetching filtered data:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleTabChange = (event, newValue) => {
		setTab(newValue);
	};

	const handleSearchChange = (event) => {
		setSearchTerm(event.target.value);
	};

	const handleCategoryChange = (event) => {
		setFilterCategory(event.target.value);
	};

	const handleSemesterChange = (event) => {
		setFilterSemester(event.target.value);
	};

	const getFileUrl = (fileUrl) => {
		if (!fileUrl) return "/api/placeholder/400/200";
		if (fileUrl.startsWith("http")) return fileUrl;
		return `${process.env.REACT_APP_API_URL}/${fileUrl.replace(/\\/g, "/")}`;
	};

	const handleViewCourses = (category) => {
		const slug = createUniqueSlug(category.name, category._id);
		navigate(`/category/${slug}`);
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
						onChange={handleSearchChange}
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
							onChange={handleCategoryChange}
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
							onChange={handleSemesterChange}
							label='Semester'>
							<MenuItem value='all'>All Semesters</MenuItem>
							{data.semesters.map((semester) => (
								<MenuItem key={semester._id} value={semester._id}>
									{semester.name}
								</MenuItem>
							))}
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

			{/* Loading Indicator */}
			{loading && (
				<Box display='flex' justifyContent='center' my={4}>
					<CircularProgress />
				</Box>
			)}

			{/* Content Grid */}
			<Grid container spacing={4}>
				{!loading &&
					tab === 0 &&
					data.categories.map((category) => (
						<Grid item xs={12} sm={6} md={4} key={category._id}>
							<StyledCard>
								<CardMedia
									component='img'
									height='200'
									image={"./images/bg8.jpg"}
									alt={category.name}
								/>
								<CardContent>
									<Typography variant='h6' gutterBottom>
										{category.name}
									</Typography>
									<Typography variant='body2' color='text.secondary'>
										{category.description}
									</Typography>
									<Button
										variant='contained'
										color='primary'
										fullWidth
										sx={{ mt: 2 }}
										onClick={() => handleViewCourses(category)}>
										View Courses
									</Button>
								</CardContent>
							</StyledCard>
						</Grid>
					))}

				{!loading &&
					tab === 1 &&
					data.courses.map((course) => (
						<Grid item xs={12} sm={6} md={4} key={course._id}>
							<StyledCard>
								<CardMedia
									component='img'
									height='200'
									image={"./images/bg3.jpeg"}
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
										<Button
											variant='contained'
											color='primary'
											onClick={() => navigate("/login")}>
											View Details
										</Button>
									</Stack>
								</CardContent>
							</StyledCard>
						</Grid>
					))}

				{!loading &&
					tab === 2 &&
					data.projects.map((project) => (
						<Grid item xs={12} sm={6} md={4} key={project._id}>
							<StyledCard>
								<CardMedia
									component='img'
									height='200'
									image={"./images/bg12.jpg"}
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
										<Button
											variant='contained'
											color='primary'
											onClick={() => navigate("/login")}>
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
