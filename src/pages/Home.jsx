// //src/pages/Home.jsx

import React, { useState, useEffect } from "react";
import SEO from "../components/common/SEO";
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
	AutoStories,
	MenuBook,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import api from "../utils/api";
import { AnimatePresence, motion } from "framer-motion";
import { WhatsApp } from "@mui/icons-material";
import AboutSection from "./AboutSection";
import About2 from "./About2";
import EducationHero from "./EducationHero";
import { createUniqueSlug } from "../utils/helpers";

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
	height: "80%",
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
		// Use createUniqueSlug for URL generation
		const slug = createUniqueSlug(course.title, course._id);
		navigate(`/course/${slug}`);
	};

	// Handle project card click
	const handleProjectClick = (project) => {
		// Use createUniqueSlug for URL generation
		const slug = createUniqueSlug(project.title, project._id);
		navigate(`/course/${slug}`);
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
			name: "Aarav Sharma",
			role: "Student",
			comment:
				"This platform provides an amazing learning experience. The courses are well-structured and very engaging.",
			avatar: "./images/user.jpg",
			rating: 5,
		},
		{
			id: 2,
			name: "Priya Patel",
			role: "Professional",
			comment:
				"Excellent content and knowledgeable instructors. I have gained valuable skills in just a few weeks.",
			avatar: "./images/user.jpg",
			rating: 5,
		},
		{
			id: 3,
			name: "Rohan Iyer",
			role: "Developer",
			comment:
				"The platform has been a game changer for my career growth. The community and support are top-notch.",
			avatar: "./images/user.jpg",
			rating: 5,
		},
		{
			id: 4,
			name: "Ananya Verma",
			role: "Designer",
			comment:
				"Comprehensive courses and a structured teaching approach. I highly recommend this platform to all learners.",
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
		<>
			<SEO
				title='Academic Assignment Master | Expert Academic Solutions'
				description='Get professional academic assistance, study materials, and expert solutions for all your educational needs.'
				canonicalUrl='/'
			/>
			<Box sx={{ bgcolor: "#F6F9FC" }}>
				<Tooltip title='Join our WhatsApp Channel' placement='right'>
					<WhatsAppButton onClick={handleWhatsAppClick} aria-label='whatsapp'>
						<WhatsApp />
					</WhatsAppButton>
				</Tooltip>
				<EducationHero />

				<Container maxWidth='lg' sx={{ py: isMobile ? 4 : 6 }}>
					<Box
						sx={{
							// mb: isMobile ? 4 : 6,
							textAlign: "center",
							px: isMobile ? 2 : 0,
						}}>
						<Typography
							variant={isMobile ? "h5" : "h4"}
							gutterBottom
							sx={{
								fontWeight: "600",
								background: "linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)",
								WebkitBackgroundClip: "text",
								WebkitTextFillColor: "transparent",
								fontFamily: "Poppins !important",
								fontSize: { xs: "35px", md: "48px" },
							}}>
							Explore courses by category
						</Typography>
						<Typography
							variant='subtitle1'
							color='black'
							fontFamily='Poppins !important'
							fontSize='17px'>
							Browse our top categories where you can find the best courses that
							fit you
						</Typography>
					</Box>

					<Grid
						container
						spacing={isMobile ? 2 : 4}
						marginTop={isMobile ? 4 : 6}>
						{classes.slice(0, 3).map((category) => (
							<Grid item xs={12} sm={6} md={4} key={category._id}>
								<CategoryCard
									onClick={() => handleCategoryClick(category._id)}
									sx={{
										minHeight: "220px",
									}}>
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
									<Typography
										variant='h6'
										sx={{
											mb: 1,
											fontWeight: "600",
											fontFamily: "Poppins !important",
										}}>
										{category.name}
									</Typography>
									<Typography
										variant='body2'
										color='#000000'
										fontFamily='Poppins !important'
										fontSize='14px'>
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
							// mb: isMobile ? 6 : 10,
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
				<div style={{backgroundColor:"white"}}>
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
									fontWeight: "700",
									background:
										"linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)",
									WebkitBackgroundClip: "text",
									WebkitTextFillColor: "transparent",

									fontFamily: "Poppins !important",
									fontSize: { xs: "25px", md: "35px" },
									textAlign: { xs: "center", md: "left" },
								}}>
								Latest Uploads
							</Typography>
							<Button
								endIcon={<ArrowForward />}
								onClick={() => navigate("/browse")}
								sx={{
									color: "#6366F1",
									"&:hover": {
										bgcolor: "rgba(99, 102, 241, 0.04)",
									},
									display: { xs: "none", md: "block" },
									whiteSpace: "nowrap",
								}}>
								See All
							</Button>
						</Box>

						<Grid container spacing={4}>
							{courses.slice(0, 6).map((course) => (
								<Grid item xs={12} sm={6} md={4} key={course._id}>
									<CourseCard>
										<CardMedia
											component='img'
											height='150'
											// image={course.thumbnailUrl}
											image={"./images/bg3.jpeg"}
											alt={course.title}
											sx={{ objectFit: "cover" }}
										/>
										<CardContent sx={{ p: 3 }}>
											<Stack spacing={2}>
												<Typography
													variant='h6'
													sx={{
														overflow: "hidden",
														textOverflow: "ellipsis",
														display: "-webkit-box",
														WebkitLineClamp: 2,
														WebkitBoxOrient: "vertical",
														height: "3.6rem",
														fontFamily: "Poppins !important",
														fontWeight: "600",
														fontSize: "18px",
													}}>
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
														color: "#3f3a3a",
														fontFamily: "Poppins !important",
														fontSize: "14px",
													}}>
													{course.description}
												</Typography>
												<Stack
													direction='row'
													justifyContent='space-between'
													alignItems='center'
													style={{ marginTop: "40px" }}>
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
				</div>

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
								fontWeight: "700",
								background: "linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)",
								WebkitBackgroundClip: "text",
								WebkitTextFillColor: "transparent",

								fontFamily: "Poppins !important",
								fontSize: { xs: "25px", md: "35px" },
								mt: 2,
								textAlign: { xs: "center", md: "left" },
							}}>
							Projects to Boost Your Skills
						</Typography>
						<Button
							endIcon={<ArrowForward />}
							onClick={() => navigate("/browse")}
							sx={{
								color: "#6366F1",
								display: { xs: "none", md: "block" },
								whiteSpace: "nowrap",
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
										height='150'
										// image={project.thumbnailUrl}
										image={"./images/bg12.jpg"}
										alt={project.title}
										sx={{ objectFit: "cover" }}
									/>
									<CardContent sx={{ p: 3 }}>
										<Stack spacing={2}>
											<Typography
												variant='h6'
												sx={{
													overflow: "hidden",
													textOverflow: "ellipsis",
													display: "-webkit-box",
													WebkitLineClamp: 2,
													WebkitBoxOrient: "vertical",
													height: "3.6rem",
													fontFamily: "Poppins !important",
													fontWeight: "600",
													fontSize: "18px",
												}}>
												{project.title.length > 60
													? project.title.substring(0, 60) + "..."
													: project.title}
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
													color: "#3f3a3a",
													fontFamily: "Poppins !important",
													fontSize: "14px",
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
														fontFamily: "Poppins !important",
														fontSize: "14px",
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

				{/* Stats Section */}
				<Container
					maxWidth='lg'
					sx={{ mb: 8, mt: 8, position: "relative", zIndex: 1 }}>
					<Grid container spacing={4}>
						<Grid item xs={12} md={4}>
							<StyledStatCard>
								<Typography variant='h3' color='#6366f1' fontWeight='bold'>
									{stats.courses.toLocaleString()}+
								</Typography>
								<Typography
									variant='subtitle1'
									sx={{ mt: 1, fontFamily: "Poppins !important" }}>
									Total Assignments Completed
								</Typography>
							</StyledStatCard>
						</Grid>
						<Grid item xs={12} md={4}>
							<StyledStatCard>
								<Typography variant='h3' color='#6366f1' fontWeight='bold'>
									{stats.mentors.toLocaleString()}+
								</Typography>
								<Typography
									variant='subtitle1'
									sx={{ mt: 1, fontFamily: "Poppins !important" }}>
									Total Projects
								</Typography>
							</StyledStatCard>
						</Grid>
						<Grid item xs={12} md={4}>
							<StyledStatCard>
								<Typography variant='h3' color='#6366f1' fontWeight='bold'>
									{stats.students.toLocaleString()}+
								</Typography>
								<Typography
									variant='subtitle1'
									sx={{ mt: 1, fontFamily: "Poppins !important" }}>
									Active Students
								</Typography>
							</StyledStatCard>
						</Grid>
					</Grid>
				</Container>
				<AboutSection />

				<About2 />

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
									background:
										"linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)",
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

				{/* Animated CTA Section */}
				<Box
					sx={{
						position: "relative",
						py: { xs: 8, md: 8 },
						overflow: "hidden",
						background: "linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)",
						boxShadow: "0 -10px 40px rgba(0, 0, 0, 0.05)",
						borderRadius: { xs: "30px 30px 0 0", md: "60px 60px 0 0" },
						mt: 5,
					}}>
					{/* Animated Background Elements */}
					<Box
						sx={{
							position: "absolute",
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
							overflow: "hidden",
							opacity: 0.1,
						}}>
						{Array.from({ length: 6 }).map((_, i) => (
							<Box
								key={i}
								component={motion.div}
								initial={{ opacity: 0, scale: 0 }}
								animate={{
									opacity: 0.4 + Math.random() * 0.4,
									scale: 0.5 + Math.random() * 0.8,
									x: Math.random() * 100 - 50,
									y: Math.random() * 100 - 50,
								}}
								transition={{
									duration: 3 + Math.random() * 5,
									repeat: Infinity,
									repeatType: "reverse",
									ease: "easeInOut",
									delay: i * 0.3,
								}}
								sx={{
									position: "absolute",
									width: { xs: "100px", md: "200px" },
									height: { xs: "100px", md: "200px" },
									borderRadius: "50%",
									background: "white",
									left: `${(i * 20) % 100}%`,
									top: `${(i * 15) % 100}%`,
									filter: "blur(50px)",
								}}
							/>
						))}
					</Box>

					<Container maxWidth='lg' sx={{ position: "relative", zIndex: 1 }}>
						<Grid
							container
							spacing={5}
							alignItems='center'
							justifyContent='center'>
							<Grid item xs={12} md={7}>
								<motion.div
									initial={{ opacity: 0, y: 30 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.7 }}
									viewport={{ once: true }}>
									<Typography
										variant={isMobile ? "h4" : "h2"}
										sx={{
											color: "white",
											fontWeight: "600",
											textAlign: { xs: "center", md: "left" },
											mb: 3,
											fontFamily: "Poppins !important",
											fontSize: { xs: "35px", md: "48px" },
										}}>
										Ready to Unlock Your Academic Potential?
									</Typography>

									<Typography
										variant={isMobile ? "body1" : "h6"}
										sx={{
											color: "rgba(255, 255, 255, 0.9)",
											textAlign: { xs: "center", md: "left" },
											mb: 4,
											fontFamily: "Poppins !important",
											fontSize: { xs: "16px", md: "18px" },
											lineHeight: 1.6,
											maxWidth: "90%",
										}}>
										Join thousands of students who've already transformed their
										academic journey with our comprehensive resources and expert
										guidance.
									</Typography>

									<Box
										sx={{
											display: "flex",
											gap: 3,
											flexDirection: { xs: "column", sm: "row" },
											justifyContent: { xs: "center", md: "flex-start" },
											alignItems: { xs: "center", md: "flex-start" },
										}}>
										<motion.div
											whileHover={{ scale: 1.05 }}
											whileTap={{ scale: 0.98 }}>
											<Button
												variant='contained'
												onClick={() => navigate("/register")}
												size='large'
												sx={{
													bgcolor: "white",
													color: "#4F46E5",
													borderRadius: "12px",
													px: 4,
													py: 1.5,
													fontWeight: 600,
													fontFamily: "Poppins !important",
													boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
													"&:hover": {
														bgcolor: "rgba(255, 255, 255, 0.9)",
														transform: "translateY(-3px)",
														boxShadow: "0 15px 30px rgba(0, 0, 0, 0.15)",
													},
													minWidth: "180px",
												}}>
												Register Now
											</Button>
										</motion.div>

										<motion.div
											whileHover={{ scale: 1.05 }}
											whileTap={{ scale: 0.98 }}>
											<Button
												variant='outlined'
												onClick={() => navigate("/browse")}
												size='large'
												sx={{
													color: "white",
													borderColor: "white",
													borderRadius: "12px",
													px: 4,
													py: 1.5,
													fontWeight: 600,
													fontFamily: "Poppins !important",
													"&:hover": {
														borderColor: "white",
														bgcolor: "rgba(255, 255, 255, 0.1)",
														transform: "translateY(-3px)",
													},
													minWidth: "180px",
												}}>
												Browse Courses
											</Button>
										</motion.div>
									</Box>
								</motion.div>
							</Grid>

							<Grid
								item
								xs={12}
								md={5}
								sx={{ display: { xs: "none", md: "block" } }}>
								<motion.div
									initial={{ opacity: 0, scale: 0.8 }}
									whileInView={{ opacity: 1, scale: 1 }}
									transition={{ duration: 0.7, delay: 0.2 }}
									viewport={{ once: true }}>
									<Box
										sx={{
											position: "relative",
											height: "400px",
											width: "100%",
										}}>
										{/* Animated floating elements */}
										<Box
											component={motion.div}
											animate={{
												y: [0, -15, 0],
												rotate: [0, 2, 0],
											}}
											transition={{
												duration: 4,
												repeat: Infinity,
												ease: "easeInOut",
											}}
											sx={{
												position: "absolute",
												top: "10%",
												right: "15%",
											}}>
											<School sx={{ fontSize: 60, color: "white" }} />
										</Box>

										<Box
											component={motion.div}
											animate={{
												y: [0, 15, 0],
												rotate: [0, -3, 0],
											}}
											transition={{
												duration: 3.5,
												repeat: Infinity,
												ease: "easeInOut",
												delay: 0.5,
											}}
											sx={{
												position: "absolute",
												bottom: "20%",
												right: "25%",
											}}>
											<AutoStories sx={{ fontSize: 70, color: "white" }} />
										</Box>

										<Box
											component={motion.div}
											animate={{
												y: [0, -20, 0],
												rotate: [0, 5, 0],
											}}
											transition={{
												duration: 4.5,
												repeat: Infinity,
												ease: "easeInOut",
												delay: 1,
											}}
											sx={{
												position: "absolute",
												top: "30%",
												left: "20%",
											}}>
											<MenuBook sx={{ fontSize: 50, color: "white" }} />
										</Box>

										<Box
											component={motion.div}
											animate={{
												y: [0, 10, 0],
												rotate: [0, -2, 0],
											}}
											transition={{
												duration: 3,
												repeat: Infinity,
												ease: "easeInOut",
												delay: 1.5,
											}}
											sx={{
												position: "absolute",
												bottom: "30%",
												left: "30%",
											}}>
											<EmojiEvents sx={{ fontSize: 55, color: "white" }} />
										</Box>

										{/* Main graduation cap image */}
										<Box
											component={motion.div}
											initial={{ y: 20, opacity: 0 }}
											animate={{ y: 0, opacity: 1 }}
											transition={{ duration: 1 }}
											sx={{
												position: "absolute",
												top: "50%",
												left: "50%",
												transform: "translate(-50%, -50%)",
											}}>
											<Box
												component={motion.div}
												animate={{
													y: [0, -20, 0],
												}}
												transition={{
													duration: 5,
													repeat: Infinity,
													ease: "easeInOut",
												}}>
												<Box
													sx={{
														width: "200px",
														height: "200px",
														background: "white",
														borderRadius: "50%",
														display: "flex",
														alignItems: "center",
														justifyContent: "center",
														boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
													}}>
													<School sx={{ fontSize: 100, color: "#6366F1" }} />
												</Box>
											</Box>
										</Box>
									</Box>
								</motion.div>
							</Grid>
						</Grid>
					</Container>
				</Box>
			</Box>
		</>
	);
};

export default Home;
