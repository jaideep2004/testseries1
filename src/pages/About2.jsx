import React from "react";
import {
	Box,
	Container,
	Grid,
	Typography,
	useTheme,
	useMediaQuery,
	Button,
} from "@mui/material";
import { motion } from "framer-motion";
import { keyframes } from "@emotion/react";
import { styled } from "@mui/material/styles";
import { 
	LightbulbOutlined, 
	EmojiEvents, 
	School, 
	AutoStories, 
	Create, 
	MenuBook, 
	LocalLibrary, 
	StickyNote2
} from "@mui/icons-material";

// Define gradient animation
const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const floatAnimation = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-15px) rotate(2deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const floatAnimationReverse = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(15px) rotate(-2deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const rotateAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const FloatingElement = styled(Box)(({ delay = 0, duration = 5, reverse = false }) => ({
  position: "absolute",
  zIndex: 0,
  opacity: 0.6,
  animation: `${reverse ? floatAnimationReverse : floatAnimation} ${duration}s ease-in-out infinite ${delay}s`,
}));

const IconBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 70px;
  border-radius: 16px;
  margin-bottom: 20px;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(79, 70, 229, 0.2) 100%);
  box-shadow: 0 10px 20px rgba(79, 70, 229, 0.1);
  animation: ${floatAnimation} 3s ease-in-out infinite;
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

	const featureVariants = {
		hidden: { opacity: 0, y: 30 },
		visible: (i) => ({
			opacity: 1,
			y: 0,
			transition: { 
				duration: 0.6,
				delay: i * 0.2,
				ease: "easeOut" 
			},
		}),
	};

	return (
		<Box
			sx={{
				backgroundColor: "#F8F9FC",
				position: "relative",
				overflow: "hidden",
				pb: { xs: 8, md: 8 },
				pt: { xs: 8, md: 8 },
				"&::before": {
					content: '""',
					position: "absolute",
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					background:
						"radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.08) 0%, transparent 50%)",
					zIndex: 0,
				},
			}}
			id='about-us'>
				
			{/* Floating Elements */}
			<FloatingElement
				sx={{
					top: "10%",
					left: "5%",
					transform: "rotate(-15deg)",
					color: "primary.light",
				}}
				delay={0.5}
				duration={6}
			>
				<School sx={{ fontSize: 40, color: "rgba(99, 102, 241, 0.6)" }} />
			</FloatingElement>
			
			<FloatingElement
				sx={{
					top: "15%",
					right: "10%",
					transform: "rotate(10deg)",
					color: "primary.light",
				}}
				delay={1.2}
				duration={5}
				reverse
			>
				<AutoStories sx={{ fontSize: 50, color: "rgba(99, 102, 241, 0.5)" }} />
			</FloatingElement>
			
			<FloatingElement
				sx={{
					bottom: "20%",
					left: "15%",
					transform: "rotate(5deg)",
					color: "primary.light",
				}}
				delay={0.8}
				duration={7}
			>
				<Create sx={{ fontSize: 35, color: "rgba(99, 102, 241, 0.4)" }} />
			</FloatingElement>
			
			<FloatingElement
				sx={{
					bottom: "30%",
					right: "5%",
					transform: "rotate(-10deg)",
					color: "primary.light",
				}}
				delay={1.5}
				duration={8}
				reverse
			>
				<MenuBook sx={{ fontSize: 45, color: "rgba(99, 102, 241, 0.5)" }} />
			</FloatingElement>
			
			<FloatingElement
				sx={{
					top: "60%",
					left: "30%",
					transform: "rotate(8deg)",
					color: "primary.light",
				}}
				delay={2}
				duration={6.5}
			>
				<LocalLibrary sx={{ fontSize: 30, color: "rgba(99, 102, 241, 0.6)" }} />
			</FloatingElement>
			
			<FloatingElement
				sx={{
					top: "40%",
					right: "25%",
					transform: "rotate(-5deg)",
					color: "primary.light",
				}}
				delay={0.3}
				duration={5.5}
				reverse
			>
				<StickyNote2 sx={{ fontSize: 35, color: "rgba(99, 102, 241, 0.4)" }} />
			</FloatingElement>

			{/* Upper section with image and initial text */}
			<Container maxWidth='lg' sx={{ mb: 8, position: 'relative', zIndex: 2 }}>
				<motion.div
					initial={{ opacity: 0, y: -30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7 }}
					viewport={{ once: true }}
					style={{ textAlign: 'center', marginBottom: '3rem' }}
				>
					<Typography
						variant={isMobile ? "h3" : "h2"}
						sx={{
							fontWeight: 600,
							background:
								"linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)",
							backgroundSize: "200% 200%",
							animation: `${gradientShift} 5s ease infinite`,
							WebkitBackgroundClip: "text",
							WebkitTextFillColor: "transparent",
						
							display: 'inline-block',
							position: 'relative',
							fontFamily: "Poppins !important",
							fontSize:{xs:"35px",md:"48px"},
							
						}}
					>
						About Us
					</Typography>
				</motion.div>

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
								
								borderRadius: "30px",
								overflow: "hidden",
								boxShadow: "0 25px 50px -12px rgba(99, 102, 241, 0.25)",
							}}>
							<Box
								component='img'
								src='./images/abxw2.jpg'
								alt='About Academic Assignment Master'
								sx={{
									width: "100%",
									height: "100%",
									objectFit: "cover",
									objectPosition: "center",
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
								background: 'rgba(255, 255, 255, 0.8)',
								backdropFilter: 'blur(10px)',
								borderRadius: '20px',
								padding: '2rem',
								boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)'
							}}>
							<Typography
								variant='body1'
								sx={{
									mb: 3,
									fontSize: "17px",
									lineHeight: 1.7,
									color: "text.secondary",
									position: "relative",
									textAlign: "justify",
									fontFamily: "Poppins !important",
									color:"#000000"
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
									mb: 3,
									fontSize: "17px",
									lineHeight: 1.7,
									color: "text.secondary",
									position: "relative",
									textAlign: "justify",
									fontFamily: "Poppins !important",
									color:"#000000"
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

			{/* Services section styled like "Unlock Your Full Potential" */}
			{/* <Box
				sx={{
					width: "100%",
					py: { xs: 8, md: 12 },
					position: "relative",
					zIndex: 1,
					background: "linear-gradient(180deg, #F8F9FC 0%, #FFFFFF 100%)",
					boxShadow: "0 -10px 40px rgba(0, 0, 0, 0.03)",
				}}>
				<Container maxWidth='lg'>
					<Box
						sx={{
							textAlign: "center",
							maxWidth: { xs: "100%", md: "900px" },
							margin: "0 auto",
							mb: 8,
						}}>
						<motion.div
							initial={{ opacity: 0, y: -20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.7 }}
							viewport={{ once: true }}>
							<Typography
								variant='h3'
								component='h2'
								sx={{
									fontWeight: 700,
									mb: { xs: 2, md: 3 },
									fontSize: { xs: "1.75rem", sm: "2rem", md: "2.75rem" },
									textAlign: "center",
									background: "linear-gradient(135deg, #4F46E5 0%, #6366F1 50%, #818CF8 100%)",
									backgroundSize: "200% auto",
									WebkitBackgroundClip: "text",
									WebkitTextFillColor: "transparent",
									display: "inline-block",
								}}>
								Our Academic Services
							</Typography>
						</motion.div>
						<motion.div
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							transition={{ duration: 0.7, delay: 0.2 }}
							viewport={{ once: true }}>
							<Typography
								variant='h6'
								sx={{
									fontSize: { xs: "1rem", sm: "1.2rem" },
									lineHeight: 1.8,
									color: "text.primary",
									position: "relative",
									textAlign: "center",
									mb: { xs: 3, md: 4 },
									maxWidth: "800px",
									mx: "auto",
								}}>
								We provide comprehensive academic support to help you excel in your educational journey
							</Typography>
						</motion.div>
					</Box>

					<Grid container spacing={4}>
						{[
							{
								icon: <LightbulbOutlined sx={{ fontSize: 36, color: "#6366F1" }} />,
								title: "Expert Guidance",
								description: "Access comprehensive tutorials and insights from industry experts to master complex topics with ease.",
								delay: 0,
							},
							{
								icon: <School sx={{ fontSize: 36, color: "#6366F1" }} />,
								title: "Proven Strategies",
								description: "Learn time-tested exam strategies and methodologies that have helped thousands of students succeed.",
								delay: 1,
							},
							{
								icon: <EmojiEvents sx={{ fontSize: 36, color: "#6366F1" }} />,
								title: "Achieve Excellence",
								description: "Develop the skills and knowledge needed to excel in your academic journey and future career.",
								delay: 2,
							},
						].map((feature, index) => (
							<Grid item xs={12} md={4} key={index}>
								<motion.div
									custom={feature.delay}
									variants={featureVariants}
									initial="hidden"
									whileInView="visible"
									viewport={{ once: true }}>
									<Box
										sx={{
											p: 4,
											height: "100%",
											display: "flex",
											flexDirection: "column",
											alignItems: "center",
											textAlign: "center",
											borderRadius: "16px",
											background: "#FFFFFF",
											boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
											transition: "transform 0.3s ease, box-shadow 0.3s ease",
											"&:hover": {
												transform: "translateY(-8px)",
												boxShadow: "0 15px 35px rgba(99, 102, 241, 0.1)",
											},
										}}>
										<IconBox>
											{feature.icon}
										</IconBox>
										<Typography
											variant="h5"
											sx={{
												fontWeight: 600,
												mb: 2,
												color: "#333",
											}}>
											{feature.title}
										</Typography>
										<Typography
											variant="body1"
											sx={{
												color: "text.secondary",
												mb: 3,
											}}>
											{feature.description}
										</Typography>
									</Box>
								</motion.div>
							</Grid>
						))}
					</Grid>

					<Box
						sx={{
							mt: 6,
							display: "flex",
							justifyContent: "center",
						}}>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.6 }}
							viewport={{ once: true }}>
							<Button
								variant="contained"
								size="large"
								sx={{
									bgcolor: "#6366F1",
									borderRadius: "12px",
									px: 4,
									py: 1.5,
									fontWeight: 600,
									boxShadow: "0 10px 20px rgba(99, 102, 241, 0.2)",
									"&:hover": {
										bgcolor: "#4F46E5",
										transform: "translateY(-3px)",
										boxShadow: "0 15px 25px rgba(99, 102, 241, 0.3)",
										transition: "all 0.3s ease",
									},
								}}>
								Get Started Today
							</Button>
						</motion.div>
					</Box>
				</Container>
			</Box> */}
		</Box>
	);
};

export default About2;
