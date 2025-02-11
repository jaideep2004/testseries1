// //src/pages/Home.jsx

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
	Paper,
	styled,
	useTheme,
	IconButton,
	Avatar,
	Chip,
	useMediaQuery,
	Fab,
	Tooltip,
	keyframes,
} from "@mui/material";
import {
	ArrowForward,
	ArrowBack,
	School,
	People,
	EmojiEvents,
	Timer,
	Star,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import api from "../utils/api";
import { AnimatePresence, motion } from "framer-motion";
import { WhatsApp } from "@mui/icons-material";
import AboutSection from "./AboutSection";
import About2 from "./About2";
import EducationHero from "./EducationHero";

// Custom styled components with enhanced styling
const StyledHeroSection = styled(Box)(({ theme }) => ({
	background: "linear-gradient(135deg, #F6F9FC 0%, #ECF0F9 100%)",
	padding: theme.spacing(10, 0, 6, 0),
	position: "relative",
	overflow: "hidden",
	minHeight: "680px",
	borderRadius: "0 0 50px 50px",
}));

const StyledStatCard = styled(motion.div)(({ theme }) => ({
	background: "#FFFFFF",
	borderRadius: "20px",
	padding: theme.spacing(4),
	textAlign: "center",
	boxShadow: "0px 10px 30px rgba(99, 102, 241, 0.1)",
	transition: "all 0.3s ease-in-out",
	"&:hover": {
		transform: "translateY(-10px)",
		boxShadow: "0px 20px 40px rgba(99, 102, 241, 0.15)",
	},
}));

const CategoryCard = styled(Paper)(({ theme }) => ({
	padding: theme.spacing(4),
	textAlign: "center",
	borderRadius: "24px",
	cursor: "pointer",
	transition: "all 0.3s ease-in-out",
	background: "#FFFFFF",
	boxShadow: "0px 10px 30px rgba(99, 102, 241, 0.1)",
	"&:hover": {
		transform: "translateY(-10px)",
		boxShadow: "0px 20px 40px rgba(99, 102, 241, 0.15)",
	},
}));

const CourseCard = styled(Card)(({ theme }) => ({
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

const TestimonialCard = styled(Card)(({ theme }) => ({
	padding: theme.spacing(4),
	height: "100%",
	backgroundColor: "#6366F1",
	color: "white",
	borderRadius: "24px",
	position: "relative",
	overflow: "visible",
	"&::before": {
		content: '""',
		position: "absolute",
		top: -20,
		left: 40,
		width: 40,
		height: 40,
		backgroundColor: "#6366F1",
		transform: "rotate(45deg)",
	},
}));

// Rest of your utility functions remain the same
const getFileUrl = (fileUrl) => {
	if (!fileUrl) return "/api/placeholder/400/200";
	if (fileUrl.startsWith("http")) return fileUrl;
	return `https://testbackend2-5loz.onrender.com/${fileUrl.replace(
		/\\/g,
		"/"
	)}`;
};

const TestimonialSection = ({ testimonials }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentIndex((prev) => (prev + 1) % testimonials.length);
		}, 5000); // Change testimonial every 5 seconds

		return () => clearInterval(timer);
	}, [testimonials.length]);

	return (
		<Box sx={{ position: "relative", px: isMobile ? 2 : 4 }}>
			<AnimatePresence mode='wait'>
				<Grid
					container
					spacing={3}
					component={motion.div}
					key={currentIndex}
					initial={{ opacity: 0, x: 100 }}
					animate={{ opacity: 1, x: 0 }}
					exit={{ opacity: 0, x: -100 }}
					transition={{ duration: 0.5 }}>
					{isMobile ? (
						// Mobile view - single card
						<Grid item xs={12}>
							<TestimonialCard elevation={4}>
								<CardContent>
									<Stack spacing={3}>
										<Typography
											variant='body1'
											sx={{
												fontSize: "1.1rem",
												fontStyle: "italic",
												mb: 3,
											}}>
											"{testimonials[currentIndex].comment}"
										</Typography>
										<Stack direction='row' spacing={2} alignItems='center'>
											<Avatar
												src={testimonials[currentIndex].avatar}
												alt={testimonials[currentIndex].name}
												sx={{
													width: 56,
													height: 56,
													border: "2px solid white",
												}}
											/>
											<Box>
												<Typography variant='h6' sx={{ fontWeight: "bold" }}>
													{testimonials[currentIndex].name}
												</Typography>
												<Typography variant='body2'>
													{testimonials[currentIndex].role}
												</Typography>
											</Box>
										</Stack>
										<Stack direction='row' spacing={0.5}>
											{[...Array(testimonials[currentIndex].rating)].map(
												(_, i) => (
													<Star key={i} sx={{ color: "#FFD700" }} />
												)
											)}
										</Stack>
									</Stack>
								</CardContent>
							</TestimonialCard>
						</Grid>
					) : (
						// Desktop view - three cards
						[0, 1, 2].map((offset) => {
							const index = (currentIndex + offset) % testimonials.length;
							return (
								<Grid item xs={12} md={4} key={testimonials[index].id}>
									<TestimonialCard elevation={4}>
										<CardContent>
											<Stack spacing={3}>
												<Typography
													variant='body1'
													sx={{
														fontSize: "1.1rem",
														fontStyle: "italic",
														mb: 3,
													}}>
													"{testimonials[index].comment}"
												</Typography>
												<Stack direction='row' spacing={2} alignItems='center'>
													<Avatar
														src={testimonials[index].avatar}
														alt={testimonials[index].name}
														sx={{
															width: 56,
															height: 56,
															border: "2px solid white",
														}}
													/>
													<Box>
														<Typography
															variant='h6'
															sx={{ fontWeight: "bold" }}>
															{testimonials[index].name}
														</Typography>
														<Typography variant='body2'>
															{testimonials[index].role}
														</Typography>
													</Box>
												</Stack>
												<Stack direction='row' spacing={0.5}>
													{[...Array(testimonials[index].rating)].map(
														(_, i) => (
															<Star key={i} sx={{ color: "#FFD700" }} />
														)
													)}
												</Stack>
											</Stack>
										</CardContent>
									</TestimonialCard>
								</Grid>
							);
						})
					)}
				</Grid>
			</AnimatePresence>

			{/* Optional: Add navigation dots for mobile view */}
			{isMobile && (
				<Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
					{testimonials.map((_, index) => (
						<Box
							key={index}
							sx={{
								width: 8,
								height: 8,
								borderRadius: "50%",
								backgroundColor: currentIndex === index ? "#6366F1" : "#E0E0E0",
								mx: 0.5,
								cursor: "pointer",
							}}
							onClick={() => setCurrentIndex(index)}
						/>
					))}
				</Box>
			)}
		</Box>
	);
};
const pulse = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7);
  }
  70% {
    transform: scale(1.05);
    box-shadow: 0 0 0 15px rgba(37, 211, 102, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(37, 211, 102, 0);
  }
`;

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-15px);
  }
  60% {
    transform: translateY(-7px);
  }
`;

const WhatsAppButton = styled(Fab)(({ theme }) => ({
	position: "fixed",
	bottom: 40,
	left: 40,
	width: 70, // Increased size
	height: 70, // Increased size
	backgroundColor: "#25D366",
	"&:hover": {
		backgroundColor: "#128C7E",
		animation: `${bounce} 1s ease infinite`,
	},
	zIndex: 1000,
	animation: `${pulse} 2s infinite`,
	"& .MuiSvgIcon-root": {
		fontSize: 40, // Increased icon size
	},
	[theme.breakpoints.down("sm")]: {
		bottom: 20,
		left: 20,
		width: 65, // Slightly smaller on mobile
		height: 65,
		"& .MuiSvgIcon-root": {
			fontSize: 32,
		},
	},
}));

const Home = () => {
	const theme = useTheme();
	const [courses, setCourses] = useState([]);
	const [classes, setClasses] = useState([]);
	const [currentTestimonial, setCurrentTestimonial] = useState(0);
	const [stats, setStats] = useState({ courses: 0, mentors: 0, students: 0 });
	const [isAnimatingStats, setIsAnimatingStats] = useState(false);
	const [projects, setProjects] = useState([]);
	const navigate = useNavigate();
	const { user } = useAuth();

	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	const handleCategoryClick = (categoryId) => {
		navigate(`/category/${categoryId}`);
	};

	const handleCourseClick = (course) => {
		// Navigate to content details page with course data
		navigate(`/content/${course._id}`, {
			state: {
				content: course,
				type: "course",
			},
		});
	};

	// Handle project card click
	const handleProjectClick = (project) => {
		// Navigate to content details page with project data
		navigate(`/content/${project._id}`, {
			state: {
				content: project,
				type: "project",
			},
		});
	};

	const handleWhatsAppClick = () => {
		window.open(
			"https://whatsapp.com/channel/0029VazmxhQCxoAph2sYrO0s",
			"_blank"
		);
	};

	const testimonials = [
		{
			id: 1,
			name: "Jane Bond",
			role: "Student",
			comment:
				"The best learning platform I've ever used. The courses are well-structured and easy to follow.",
			avatar: "./images/user.jpg",
			rating: 5,
		},
		{
			id: 2,
			name: "Kate Myers",
			role: "Professional",
			comment:
				"Excellent content and great instructors. I've learned so much in just a few weeks.",
			avatar: "./images/user.jpg",
			rating: 5,
		},
		{
			id: 3,
			name: "John Doe",
			role: "Developer",
			comment:
				"The platform has helped me advance my career significantly. Great community support!",
			avatar: "./images/user.jpg",
			rating: 5,
		},
		{
			id: 4,
			name: "Sarah Smith",
			role: "Designer",
			comment:
				"Comprehensive courses and excellent teaching methodology. Highly recommended!",
			avatar: "./images/user.jpg",
			rating: 5,
		},
	];

	useEffect(() => {
		fetchInitialData();
		animateStats();
	}, []);

	const animateStats = () => {
		setIsAnimatingStats(true);
		const duration = 7000; // 2 seconds
		const steps = 70;
		const interval = duration / steps;

		let currentStep = 0;
		const targetStats = { courses: 1000, mentors: 100, students: 3000 };

		const timer = setInterval(() => {
			currentStep++;
			const progress = currentStep / steps;

			setStats({
				courses: Math.floor(targetStats.courses * progress),
				mentors: Math.floor(targetStats.mentors * progress),
				students: Math.floor(targetStats.students * progress),
			});

			if (currentStep >= steps) {
				clearInterval(timer);
				setIsAnimatingStats(false);
			}
		}, interval);
	};

	const fetchInitialData = async () => {
		try {
			const [contentsRes, projectsRes, classesRes] = await Promise.all([
				api.get("/content"),
				api.get("/projects"),
				api.get("/admin/classes"),
			]);

			// Transform image URLs
			const transformedContents = contentsRes.data.contents.map((course) => ({
				...course,
				thumbnailUrl: getFileUrl(course.thumbnailUrl),
			}));

			const transformedProjects = projectsRes.data.projects.map((project) => ({
				...project,
				thumbnailUrl: getFileUrl(project.thumbnailUrl),
			}));

			const transformedClasses = classesRes.data.map((category) => ({
				...category,
				image: getFileUrl(category.image),
			}));

			setCourses(transformedContents);
			setProjects(transformedProjects);
			setClasses(transformedClasses);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	return (
		<Box sx={{ bgcolor: "#F6F9FC" }}>
			<Tooltip title='Join our WhatsApp Channel' placement='right'>
				<WhatsAppButton onClick={handleWhatsAppClick} aria-label='whatsapp'>
					<WhatsApp />
				</WhatsAppButton>
			</Tooltip>
			<EducationHero />

			{/* Stats Section */}
			<Container
				maxWidth='lg'
				sx={{ mt: isMobile ? -4 : -8, mb: 8, position: "relative", zIndex: 1 }}>
				<Grid container spacing={4}>
					<Grid item xs={12} md={4}>
						<StyledStatCard>
							<Typography variant='h3' color='primary' fontWeight='bold'>
								{stats.courses.toLocaleString()}+
							</Typography>
							<Typography variant='subtitle1' sx={{ mt: 1 }}>
								Total Assignments Completed
							</Typography>
						</StyledStatCard>
					</Grid>
					<Grid item xs={12} md={4}>
						<StyledStatCard>
							<Typography variant='h3' color='primary' fontWeight='bold'>
								{stats.mentors.toLocaleString()}+
							</Typography>
							<Typography variant='subtitle1' sx={{ mt: 1 }}>
								Total Projects
							</Typography>
						</StyledStatCard>
					</Grid>
					<Grid item xs={12} md={4}>
						<StyledStatCard>
							<Typography variant='h3' color='primary' fontWeight='bold'>
								{stats.students.toLocaleString()}+
							</Typography>
							<Typography variant='subtitle1' sx={{ mt: 1 }}>
								Active Students
							</Typography>
						</StyledStatCard>
					</Grid>
				</Grid>
			</Container>
			<AboutSection />
			<About2 />

			<Container maxWidth='lg' sx={{ py: isMobile ? 4 : 6 }}>
				<Box
					sx={{
						mb: isMobile ? 4 : 6,
						textAlign: "center",
						px: isMobile ? 2 : 0,
					}}>
					<Typography
						variant={isMobile ? "h5" : "h4"}
						gutterBottom
						sx={{
							fontWeight: "bold",
							background: "linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)",
							WebkitBackgroundClip: "text",
							WebkitTextFillColor: "transparent",
						}}>
						Explore courses by category
					</Typography>
					<Typography variant='subtitle1' color='text.secondary'>
						Browse our top categories where you can find the best courses that
						fit you
					</Typography>
				</Box>

				<Grid container spacing={isMobile ? 2 : 4}>
					{classes.slice(0, 3).map((category) => (
						<Grid item xs={12} sm={6} md={4} key={category._id}>
							<CategoryCard onClick={() => handleCategoryClick(category._id)}>
								<Box
									component='img'
									// src={category.image}
									src={"./images/bg8.jpg"}
									alt={category.name}
									sx={{
										width: 80,
										height: 80,
										borderRadius: "20px",
										objectFit: "cover",
										marginBottom: 2,
										boxShadow: "0px 10px 20px rgba(99, 102, 241, 0.1)",
									}}
								/>
								<Typography variant='h6' sx={{ mb: 1, fontWeight: "bold" }}>
									{category.name}
								</Typography>
								<Typography variant='body2' color='text.secondary'>
									{category.description}
								</Typography>
							</CategoryCard>
						</Grid>
					))}
				</Grid>

				<Box
					sx={{
						display: "flex", // Use flexbox
						justifyContent: "center", // Center horizontally
						alignItems: "center", // Center vertically
						bgcolor: "#F8F9FC",
						py: isMobile ? 4 : 6,
						mb: isMobile ? 6 : 10,
					}}>
					<Button
						variant='contained'
						onClick={() => navigate("/browse")}
						sx={{
							bgcolor: "#6366F1",
							borderRadius: "12px",
							px: 4,
							py: 1.5,
							"&:hover": { bgcolor: "#4F46E5" },
						}}>
						See All Categories
					</Button>
				</Box>
			</Container>

			{/* Popular Courses Section */}
			<Container maxWidth='lg' sx={{ py: 6 }}>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						mb: 6,
					}}>
					<Typography
						variant='h4'
						sx={{
							fontWeight: "bold",
							background: "linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)",
							WebkitBackgroundClip: "text",
							WebkitTextFillColor: "transparent",
						}}>
						Popular courses for you
					</Typography>
					<Button
						endIcon={<ArrowForward />}
						onClick={() => navigate("/browse")}
						sx={{
							color: "#6366F1",
							"&:hover": {
								bgcolor: "rgba(99, 102, 241, 0.04)",
							},
						}}>
						See All
					</Button>
				</Box>

				<Grid container spacing={4}>
					{courses.slice(0, 3).map((course) => (
						<Grid item xs={12} sm={6} md={4} key={course._id}>
							<CourseCard>
								<CardMedia
									component='img'
									height='240'
									// image={course.thumbnailUrl}
									image={"./images/bg3.jpeg"}
									alt={course.title}
									sx={{ objectFit: "cover" }}
								/>
								<CardContent sx={{ p: 3 }}>
									<Stack spacing={2}>
										<Typography variant='h6' sx={{ fontWeight: "bold" }}>
											{course.title}
										</Typography>
										<Typography
											variant='body2'
											color='text.secondary'
											sx={{
												overflow: "hidden",
												textOverflow: "ellipsis",
												display: "-webkit-box",
												WebkitLineClamp: 2,
												WebkitBoxOrient: "vertical",
											}}>
											{course.description}
										</Typography>
										<Stack
											direction='row'
											justifyContent='space-between'
											alignItems='center'>
											<Typography
												variant='h6'
												color='primary'
												fontWeight='bold'>
												{course.isFree ? (
													<Chip label='Free' color='primary' size='small' />
												) : (
													`₹${course.price}`
												)}
											</Typography>
											<Button
												onClick={() => handleCourseClick(course)}
												variant='contained'
												sx={{
													bgcolor: "#6366F1",
													borderRadius: "12px",
													"&:hover": { bgcolor: "#4F46E5" },
												}}>
												{course.isFree ? "Start Learning" : "Buy Now"}
											</Button>
										</Stack>
									</Stack>
								</CardContent>
							</CourseCard>
						</Grid>
					))}
				</Grid>
				<Box sx={{ textAlign: "center", mt: 4 }}>
					<Button
						fullWidth={isMobile}
						variant='contained'
						onClick={() => navigate("/browse")}
						sx={{
							bgcolor: "#6366F1",
							borderRadius: "12px",
							px: 4,
							py: 1.5,
							"&:hover": { bgcolor: "#4F46E5" },
						}}>
						Browse All Courses
					</Button>
				</Box>
			</Container>
			{/* projects */}
			<Container maxWidth='lg' sx={{ py: 6 }}>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						mb: 6,
					}}>
					<Typography
						variant='h4'
						sx={{
							fontWeight: "bold",
							background: "linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)",
							WebkitBackgroundClip: "text",
							WebkitTextFillColor: "transparent",
						}}>
						Projects to Boost Your Skills
					</Typography>
					<Button
						endIcon={<ArrowForward />}
						sx={{
							color: "#6366F1",
							"&:hover": {
								bgcolor: "rgba(99, 102, 241, 0.04)",
							},
						}}>
						See All Projects
					</Button>
				</Box>

				<Grid container spacing={4}>
					{projects.slice(0, 3).map((project) => (
						<Grid item xs={12} sm={6} md={4} key={project._id}>
							<CourseCard>
								<CardMedia
									component='img'
									height='240'
									// image={project.thumbnailUrl}
									image={"./images/bg12.jpg"}
									alt={project.title}
									sx={{ objectFit: "cover" }}
								/>
								<CardContent sx={{ p: 3 }}>
									<Stack spacing={2}>
										<Typography variant='h6' sx={{ fontWeight: "bold" }}>
											{project.title}
										</Typography>
										<Typography
											variant='body2'
											color='text.secondary'
											sx={{
												overflow: "hidden",
												textOverflow: "ellipsis",
												display: "-webkit-box",
												WebkitLineClamp: 2,
												WebkitBoxOrient: "vertical",
											}}>
											{project.description}
										</Typography>
										<Stack direction='row' spacing={2} alignItems='center'>
											<Chip
												label={`Difficulty: ${project.difficulty}`}
												size='small'
												sx={{
													bgcolor: "rgba(99, 102, 241, 0.1)",
													color: "#6366F1",
												}}
											/>
										</Stack>
										<Stack
											direction='row'
											justifyContent='space-between'
											alignItems='center'>
											<Typography
												variant='h6'
												color='primary'
												fontWeight='bold'>
												{project.isFree ? (
													<Chip label='Free' color='primary' size='small' />
												) : (
													`₹${project.price}`
												)}
											</Typography>
											<Button
												onClick={() => handleProjectClick(project)}
												variant='contained'
												sx={{
													bgcolor: "#6366F1",
													borderRadius: "12px",
													"&:hover": { bgcolor: "#4F46E5" },
												}}>
												{project.isFree ? "View Project" : "Buy Project"}
											</Button>
										</Stack>
									</Stack>
								</CardContent>
							</CourseCard>
						</Grid>
					))}
				</Grid>
				<Box sx={{ textAlign: "center", mt: 4 }}>
					<Button
						fullWidth={isMobile}
						variant='contained'
						onClick={() => navigate("/browse")}
						sx={{
							bgcolor: "#6366F1",
							borderRadius: "12px",
							px: 4,
							py: 1.5,
							"&:hover": { bgcolor: "#4F46E5" },
						}}>
						View All Projects
					</Button>
				</Box>
			</Container>
			{/* testimonials */}
			<Box
				sx={{
					bgcolor: "#F8F9FC",
					py: isMobile ? 4 : 6,
					mb: isMobile ? 6 : 10,
				}}>
				<Container maxWidth='lg'>
					<Box sx={{ textAlign: "center", mb: isMobile ? 4 : 6 }}>
						<Typography
							variant={isMobile ? "h5" : "h4"}
							sx={{
								fontWeight: "bold",
								background: "linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)",
								WebkitBackgroundClip: "text",
								WebkitTextFillColor: "transparent",
								mb: 2,
							}}>
							What our students are saying
						</Typography>
						<Typography variant='subtitle1' color='text.secondary'>
							Discover how our platform has transformed learning experiences
						</Typography>
					</Box>
					<TestimonialSection
						testimonials={testimonials}
						displayCount={isMobile ? 1 : 3}
					/>
				</Container>
			</Box>
		</Box>
	);
};

export default Home;
