// // import React from "react";
// // import {
// // 	Box,
// // 	Container,
// // 	Grid,
// // 	Typography,
// // 	useTheme,
// // 	useMediaQuery,
// // } from "@mui/material";
// // import { motion } from "framer-motion";

// // const About2 = () => {
// // 	const theme = useTheme();
// // 	const isMobile = useMediaQuery(theme.breakpoints.down("md"));

// // 	const contentVariants = {
// // 		hidden: { opacity: 0, x: 50 },
// // 		visible: {
// // 			opacity: 1,
// // 			x: 0,
// // 			transition: { duration: 0.8, ease: "easeOut" },
// // 		},
// // 	};

// // 	const imageVariants = {
// // 		hidden: { opacity: 0, x: -50 },
// // 		visible: {
// // 			opacity: 1,
// // 			x: 0,
// // 			transition: { duration: 0.8, ease: "easeOut" },
// // 		},
// // 	};

// // 	return (
// // 		<Box
// // 			sx={{
// // 				bgcolor: "#F8F9FC",
// // 				py: { xs: 6, md: 12 },
// // 				position: "relative",
// // 				overflow: "hidden",
// // 				"&::before": {
// // 					content: '""',
// // 					position: "absolute",
// // 					top: 0,
// // 					left: 0,
// // 					right: 0,
// // 					height: "100%",
// // 					background:
// // 						"radial-gradient(circle at top left, rgba(99, 102, 241, 0.05) 0%, transparent 70%)",
// // 					pointerEvents: "none",
// // 				},
// // 			}}
// // 			id='about-us'>
// // 			<Container maxWidth='lg'>
// // 				<Grid
// // 					container
// // 					spacing={{ xs: 4, md: 8 }}
// // 					alignItems='stretch'
// // 					sx={{ minHeight: { md: "600px" } }}>
// // 					<Grid
// // 						item
// // 						xs={12}
// // 						md={6}
// // 						component={motion.div}
// // 						variants={imageVariants}
// // 						initial='hidden'
// // 						whileInView='visible'
// // 						viewport={{ once: true }}>
// // 						<Box
// // 							sx={{
// // 								position: "relative",
// // 								height: "100%",
// // 								minHeight: { xs: "300px", md: "100%" },
// // 								"&::before": {
// // 									content: '""',
// // 									position: "absolute",
// // 									top: "-20px",
// // 									left: "-20px",
// // 									right: "20px",
// // 									bottom: "20px",
// // 									background:
// // 										"linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(79, 70, 229, 0.1) 100%)",
// // 									borderRadius: "30px",
// // 									zIndex: 1,
// // 								},
// // 							}}>
// // 							<Box
// // 								component='img'
// // 								src='./images/about2.png'
// // 								alt='About Us'
// // 								sx={{
// // 									width: "100%",
// // 									height: "100%",
// // 									objectFit: "cover",
// // 									borderRadius: "20px",
// // 									position: "relative",
// // 									zIndex: 2,
// // 									boxShadow: "0px 20px 40px rgba(99, 102, 241, 0.2)",
// // 								}}
// // 							/>
// // 						</Box>
// // 					</Grid>

// // 					<Grid
// // 						item
// // 						xs={12}
// // 						md={6}
// // 						component={motion.div}
// // 						variants={contentVariants}
// // 						initial='hidden'
// // 						whileInView='visible'
// // 						viewport={{ once: true }}>
// // 						<Box
// // 							sx={{
// // 								height: "100%",
// // 								display: "flex",
// // 								flexDirection: "column",
// // 								justifyContent: "center",
// // 								p: { xs: 2, md: 4 },
// // 							}}>
// // 							<Typography
// // 								variant='h3'
// // 								sx={{
// // 									fontWeight: 800,
// // 									background:
// // 										"linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)",
// // 									WebkitBackgroundClip: "text",
// // 									WebkitTextFillColor: "transparent",
// // 									mb: 4,
// // 									fontSize: { xs: "2.5rem", md: "3rem" },
// // 								}}>
// // 								About Us
// // 							</Typography>

// // 							<Typography
// // 								variant='body1'
// // 								sx={{
// // 									mb: 4,
// // 									color: "text.secondary",
// // 									fontSize: "1.1rem",
// // 									lineHeight: 1.8,
// // 								}}>
// // 								Welcome to Academic Assignment Master, your premier destination
// // 								for exceptional academic assignment solutions. As a pioneering
// // 								force in academic writing services, we empower students from top
// // 								universities globally with comprehensive assignment and project
// // 								support.
// // 							</Typography>

// // 							<Typography
// // 								variant='body1'
// // 								sx={{
// // 									mb: 4,
// // 									color: "text.secondary",
// // 									fontSize: "1.1rem",
// // 									lineHeight: 1.8,
// // 								}}>
// // 								With a legacy of over 10 years, our expertise in crafting
// // 								bespoke academic content has earned us a reputation for
// // 								excellence. Our diverse team of specialized writers, each a
// // 								master in their field, ensures that every assignment receives
// // 								meticulous attention to detail and unwavering expertise.
// // 							</Typography>

// // 							<Box
// // 								sx={{
// // 									p: 4,
// // 									bgcolor: "rgba(99, 102, 241, 0.05)",
// // 									borderRadius: "20px",
// // 									border: "1px solid rgba(99, 102, 241, 0.1)",
// // 									mt: 4,
// // 								}}>
// // 								<Typography
// // 									variant='body1'
// // 									sx={{
// // 										color: "text.primary",
// // 										fontSize: "1.1rem",
// // 										lineHeight: 1.8,
// // 										fontStyle: "italic",
// // 									}}>
// // 									Unlock your full potential! By joining our community for a
// // 									transformative learning experience, designed to help you excel
// // 									in competitive exams and thrive in the dynamic industrial
// // 									landscape. Get expert tutorials, real-world insights, and
// // 									proven exam strategies to achieve success. We'll empower you
// // 									to reach new heights and realize your dreams. Let's embark on
// // 									this journey together!
// // 								</Typography>
// // 							</Box>
// // 						</Box>
// // 					</Grid>
// // 				</Grid>
// // 			</Container>
// // 		</Box>
// // 	);
// // };

// // export default About2;

// import React from "react";
// import {
// 	Box,
// 	Container,
// 	Grid,
// 	Typography,
// 	useTheme,
// 	useMediaQuery,
// } from "@mui/material";
// import { motion } from "framer-motion";

// const About2 = () => {
// 	const theme = useTheme();
// 	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

// 	const textVariants = {
// 		hidden: { opacity: 0, y: 20 },
// 		visible: {
// 			opacity: 1,
// 			y: 0,
// 			transition: { duration: 0.8, ease: "easeOut" },
// 		},
// 	};

// 	const imageVariants = {
// 		hidden: { opacity: 0, scale: 0.8 },
// 		visible: {
// 			opacity: 1,
// 			scale: 1,
// 			transition: { duration: 1, ease: "easeOut" },
// 		},
// 	};

// 	return (
// 		<Box
// 			sx={{
// 				backgroundColor: "#F8F9FC",
// 				position: "relative",
// 				overflow: "hidden",
// 				py: { xs: 8, md: 12 },
// 				"&::before": {
// 					content: '""',
// 					position: "absolute",
// 					top: 0,
// 					left: 0,
// 					right: 0,
// 					bottom: 0,
// 					background:
// 						"radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.08) 0%, transparent 50%)",
// 					zIndex: 1,
// 				},
// 			}}
// 			id='about-us'>
// 			<Container maxWidth='lg'>
// 				<Grid container spacing={8} alignItems='stretch'>
// 					<Grid
// 						item
// 						xs={12}
// 						md={6}
// 						component={motion.div}
// 						variants={imageVariants}
// 						initial='hidden'
// 						whileInView='visible'
// 						viewport={{ once: true }}>
// 						<Box
// 							sx={{
// 								position: "relative",
// 								height: "100%",
// 								minHeight: { xs: "400px", md: "600px" },
// 								borderRadius: "30px",
// 								overflow: "hidden",
// 								boxShadow: "0 25px 50px -12px rgba(99, 102, 241, 0.25)",
// 							}}>
// 							<Box
// 								component='img'
// 								src='./images/bg8.jpg'
// 								alt='About Academic Assignment Master'
// 								sx={{
// 									width: "100%",
// 									height: "100%",
// 									objectFit: "cover",
// 									objectPosition: "center",
// 									filter: "brightness(0.95)",
// 									transition: "transform 0.6s ease-in-out",
// 									"&:hover": {
// 										transform: "scale(1.05)",
// 									},
// 								}}
// 							/>
// 							<Box
// 								sx={{
// 									position: "absolute",
// 									top: 0,
// 									left: 0,
// 									right: 0,
// 									bottom: 0,
// 									background:
// 										"linear-gradient(180deg, transparent 0%, rgba(99, 102, 241, 0.1) 100%)",
// 								}}
// 							/>
// 						</Box>
// 					</Grid>

// 					<Grid
// 						item
// 						xs={12}
// 						md={6}
// 						component={motion.div}
// 						variants={textVariants}
// 						initial='hidden'
// 						whileInView='visible'
// 						viewport={{ once: true }}>
// 						<Box
// 							sx={{
// 								height: "100%",
// 								display: "flex",
// 								flexDirection: "column",
// 								justifyContent: "center",
// 								position: "relative",
// 								zIndex: 2,
// 							}}>
// 							<Typography
// 								variant={isMobile ? "h3" : "h2"}
// 								gutterBottom
// 								sx={{
// 									fontWeight: 800,
// 									background:
// 										"linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)",
// 									WebkitBackgroundClip: "text",
// 									WebkitTextFillColor: "transparent",
// 									mb: 4,
// 									position: "relative",
// 									"&::after": {
// 										content: '""',
// 										position: "absolute",
// 										bottom: -10,
// 										left: 0,
// 										width: 80,
// 										height: 4,
// 										borderRadius: 2,
// 										backgroundColor: "#6366F1",
// 									},
// 								}}>
// 								About Us
// 							</Typography>

// 							<Typography
// 								variant='body1'
// 								sx={{
// 									mb: 4,
// 									fontSize: "1.1rem",
// 									lineHeight: 1.8,
// 									color: "text.secondary",
// 									position: "relative",
// 									textAlign: "justify",
// 								}}>
// 								Welcome to <b>Academic Assignment Master</b>, your premier
// 								destination for exceptional academic assignment solutions. As a
// 								pioneering force in academic writing services, we empower
// 								students from top universities globally with comprehensive
// 								assignment and project support.
// 							</Typography>

// 							<Typography
// 								variant='body1'
// 								sx={{
// 									mb: 4,
// 									fontSize: "1.1rem",
// 									lineHeight: 1.8,
// 									color: "text.secondary",
// 									position: "relative",
// 									textAlign: "justify",
// 								}}>
// 								With a legacy of over 10 years, our expertise in crafting
// 								bespoke academic content has earned us a reputation for
// 								excellence. Our diverse team of specialized writers, each a
// 								master in their field, ensures that every assignment receives
// 								meticulous attention to detail and unwavering expertise.
// 							</Typography>

// 							<Box
// 								sx={{
// 									p: 4,
// 									borderRadius: "20px",
// 									background:
// 										"linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(79, 70, 229, 0.1) 100%)",
// 									border: "1px solid rgba(99, 102, 241, 0.2)",
// 									position: "relative",
// 									overflow: "hidden",
// 									"&::before": {
// 										content: '""',
// 										position: "absolute",
// 										top: 0,
// 										left: 0,
// 										right: 0,
// 										bottom: 0,
// 										background:
// 											"radial-gradient(circle at top right, rgba(99, 102, 241, 0.1), transparent 70%)",
// 									},
// 								}}>
// 								<Typography
// 									variant='body1'
// 									sx={{
// 										fontSize: "1.1rem",
// 										lineHeight: 1.8,
// 										color: "text.primary",
// 										fontWeight: 500,
// 										position: "relative",
// 										zIndex: 1,
// 										textAlign: "justify",
// 									}}>
// 									Unlock your full potential! By joining our community for a
// 									transformative learning experience, designed to help you excel
// 									in competitive exams and thrive in the dynamic industrial
// 									landscape. Get expert tutorials, real-world insights, and
// 									proven exam strategies to achieve success. We'll empower you
// 									to reach new heights and realize your dreams. Let's embark on
// 									this journey together!
// 								</Typography>
// 							</Box>
// 						</Box>
// 					</Grid>
// 				</Grid>
// 			</Container>
// 		</Box>
// 	);
// };

// export default About2;

import React from "react";
import {
	Box,
	Container,
	Grid,
	Typography,
	useTheme,
	useMediaQuery,
} from "@mui/material";
import { motion } from "framer-motion";
import { keyframes } from "@emotion/react";
import { styled } from "@mui/material/styles";

// Define gradient animation
const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const GradientBox = styled(Box)`
	background: linear-gradient(
		-45deg,
		rgba(99, 102, 241, 0.1) 0%,
		rgba(79, 70, 229, 0.1) 25%,
		rgba(99, 102, 241, 0.15) 50%,
		rgba(79, 70, 229, 0.1) 75%,
		rgba(99, 102, 241, 0.1) 100%
	);
	background-size: 400% 400%;
	animation: ${gradientShift} 15s ease infinite;
`;

const About2 = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	const textVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.8, ease: "easeOut" },
		},
	};

	const imageVariants = {
		hidden: { opacity: 0, scale: 0.8 },
		visible: {
			opacity: 1,
			scale: 1,
			transition: { duration: 1, ease: "easeOut" },
		},
	};

	return (
		<Box
			sx={{
				backgroundColor: "#F8F9FC",
				position: "relative",
				overflow: "hidden",
				pb: { xs: 0, md: 0 },
				pt: { xs: 8, md: 12 },
				"&::before": {
					content: '""',
					position: "absolute",
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					background:
						"radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.08) 0%, transparent 50%)",
					zIndex: 1,
				},
			}}
			id='about-us'>
			{/* Upper section with image and initial text */}
			<Container maxWidth='lg' sx={{ mb: 8 }}>
				<Grid container spacing={8} alignItems='center'>
					<Grid
						item
						xs={12}
						md={6}
						component={motion.div}
						variants={imageVariants}
						initial='hidden'
						whileInView='visible'
						viewport={{ once: true }}>
						<Box
							sx={{
								position: "relative",
								height: "100%",
								minHeight: { xs: "400px", md: "500px" },
								borderRadius: "30px",
								overflow: "hidden",
								boxShadow: "0 25px 50px -12px rgba(99, 102, 241, 0.25)",
							}}>
							<Box
								component='img'
								src='./images/hero7.jpg'
								alt='About Academic Assignment Master'
								sx={{
									width: "100%",
									height: "100%",
									objectFit: "cover",
									objectPosition: "center",
									filter: "brightness(0.95)",
									transition: "transform 0.6s ease-in-out",
									"&:hover": {
										transform: "scale(1.05)",
									},
								}}
							/>
							<Box
								sx={{
									position: "absolute",
									top: 0,
									left: 0,
									right: 0,
									bottom: 0,
									background:
										"linear-gradient(180deg, transparent 0%, rgba(99, 102, 241, 0.1) 100%)",
								}}
							/>
						</Box>
					</Grid>

					<Grid
						item
						xs={12}
						md={6}
						component={motion.div}
						variants={textVariants}
						initial='hidden'
						whileInView='visible'
						viewport={{ once: true }}>
						<Box
							sx={{
								height: "100%",
								display: "flex",
								flexDirection: "column",
								justifyContent: "center",
								position: "relative",
								zIndex: 2,
							}}>
							<Typography
								variant={isMobile ? "h3" : "h2"}
								gutterBottom
								sx={{
									fontWeight: 800,
									background:
										"linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)",
									backgroundSize: "200% 200%",
									animation: `${gradientShift} 5s ease infinite`,
									WebkitBackgroundClip: "text",
									WebkitTextFillColor: "transparent",
									mb: 4,
									position: "relative",
									"&::after": {
										content: '""',
										position: "absolute",
										bottom: -10,
										left: 0,
										width: 80,
										height: 4,
										borderRadius: 2,
										backgroundColor: "#6366F1",
									},
								}}>
								About Us
							</Typography>

							<Typography
								variant='body1'
								sx={{
									mb: 4,
									fontSize: "1.1rem",
									lineHeight: 1.8,
									color: "text.secondary",
									position: "relative",
									textAlign: "justify",
								}}>
								Welcome to <b>Academic Assignment Master</b>, your premier
								destination for exceptional academic assignment solutions. As a
								pioneering force in academic writing services, we empower
								students from top universities globally with comprehensive
								assignment and project support.
							</Typography>

							<Typography
								variant='body1'
								sx={{
									mb: 4,
									fontSize: "1.1rem",
									lineHeight: 1.8,
									color: "text.secondary",
									position: "relative",
									textAlign: "justify",
								}}>
								With a legacy of over 10 years, our expertise in crafting
								bespoke academic content has earned us a reputation for
								excellence. Our diverse team of specialized writers, each a
								master in their field, ensures that every assignment receives
								meticulous attention to detail and unwavering expertise.
							</Typography>
						</Box>
					</Grid>
				</Grid>
			</Container>

			{/* Full width bottom section */}
			<GradientBox
				component={motion.div}
				variants={textVariants}
				initial='hidden'
				whileInView='visible'
				viewport={{ once: true }}
				sx={{
					width: "100%",
					py: { xs: 8, md: 12 },
					position: "relative",
					"&::before": {
						content: '""',
						position: "absolute",
						top: 0,
						left: 0,
						width: "100%",
						height: "1px",
						background:
							"linear-gradient(90deg, transparent 0%, rgba(99, 102, 241, 0.2) 50%, transparent 100%)",
					},
				}}>
				<Container maxWidth='lg'>
					<Box
						sx={{
							textAlign: "center",
							maxWidth: "900px",
							margin: "0 auto",
							px: { xs: 2, md: 8 },
						}}>
						<Typography
							variant='h3'
							component='h2'
							sx={{
								fontWeight: 700,
								color: "#4F46E5",
								mb: 4,
								fontSize: { xs: "2rem", md: "2.5rem" },
								textAlign: "center",
								background: "linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)",
								WebkitBackgroundClip: "text",
								WebkitTextFillColor: "transparent",
							}}>
							Unlock Your Full Potential!
						</Typography>
						<Typography
							variant='h6'
							sx={{
								fontSize: "1.2rem",
								lineHeight: 1.8,
								color: "text.primary",
								position: "relative",
								textAlign: "center",
								mb: 4,
							}}>
							Join our community for a transformative learning experience,
							designed to help you excel in competitive exams and thrive in the
							dynamic industrial landscape.
						</Typography>
						<Typography
							variant='body1'
							sx={{
								fontSize: "1.1rem",
								lineHeight: 1.8,
								color: "text.secondary",
								position: "relative",
								textAlign: "center",
							}}>
							Get expert tutorials, real-world insights, and proven exam
							strategies to achieve success. We'll empower you to reach new
							heights and realize your dreams. Let's embark on this journey
							together!
						</Typography>
					</Box>
				</Container>
			</GradientBox>
		</Box>
	);
};

export default About2;
