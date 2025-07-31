// import React from 'react';
// import { Box, Container, Typography, Grid, Card, CardContent } from '@mui/material';
// import { School, Description, MenuBook, EmojiEvents } from '@mui/icons-material';

// const AboutSection = () => {
//   return (
//     <Box
//       sx={{
//         backgroundImage: 'url("/api/placeholder/1920/1080")',
//         backgroundAttachment: 'fixed',
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         position: 'relative',
//         '&::before': {
//           content: '""',
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           backgroundColor: 'rgba(99, 102, 241, 0.9)',
//           zIndex: 1
//         }
//       }}
//     >
//       <Container
//         maxWidth="lg"
//         sx={{
//           py: { xs: 8, md: 12 },
//           position: 'relative',
//           zIndex: 2
//         }}
//       >
//         <Typography
//           variant="h3"
//           align="center"
//           sx={{
//             color: 'white',
//             mb: 6,
//             fontWeight: 'bold'
//           }}
//         >
//           About Us
//         </Typography>

//         <Grid container spacing={4}>
//           {/* Assignment Help */}
//           <Grid item xs={12} md={6} lg={3}>
//             <Card
//               sx={{
//                 height: '100%',
//                 backgroundColor: 'rgba(255, 255, 255, 0.9)',
//                 transition: 'transform 0.3s ease-in-out',
//                 '&:hover': {
//                   transform: 'translateY(-8px)'
//                 }
//               }}
//             >
//               <CardContent sx={{ p: 4 }}>
//                 <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//                   <School sx={{ color: '#6366F1', fontSize: 40, mr: 2 }} />
//                   <Typography variant="h5" fontWeight="bold">
//                     Assignment Help
//                   </Typography>
//                 </Box>
//                 <Typography variant="body1" color="text.secondary">
//                   Academic Assignment Master understands student life's complexities. We provide expert assistance with assignments, ensuring plagiarism-free work and thorough proofreading, allowing you to focus on what matters most.
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>

//           {/* Project and Dissertation */}
//           <Grid item xs={12} md={6} lg={3}>
//             <Card
//               sx={{
//                 height: '100%',
//                 backgroundColor: 'rgba(255, 255, 255, 0.9)',
//                 transition: 'transform 0.3s ease-in-out',
//                 '&:hover': {
//                   transform: 'translateY(-8px)'
//                 }
//               }}
//             >
//               <CardContent sx={{ p: 4 }}>
//                 <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//                   <Description sx={{ color: '#6366F1', fontSize: 40, mr: 2 }} />
//                   <Typography variant="h5" fontWeight="bold">
//                     Project & Dissertation
//                   </Typography>
//                 </Box>
//                 <Typography variant="body1" color="text.secondary">
//                   Professional, affordable project report writing services for MBA students. Our expert writers deliver top-quality, well-researched reports while maintaining complete confidentiality.
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>

//           {/* Coursework Help */}
//           <Grid item xs={12} md={6} lg={3}>
//             <Card
//               sx={{
//                 height: '100%',
//                 backgroundColor: 'rgba(255, 255, 255, 0.9)',
//                 transition: 'transform 0.3s ease-in-out',
//                 '&:hover': {
//                   transform: 'translateY(-8px)'
//                 }
//               }}
//             >
//               <CardContent sx={{ p: 4 }}>
//                 <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//                   <MenuBook sx={{ color: '#6366F1', fontSize: 40, mr: 2 }} />
//                   <Typography variant="h5" fontWeight="bold">
//                     Coursework Help
//                   </Typography>
//                 </Box>
//                 <Typography variant="body1" color="text.secondary">
//                   We understand the challenges of managing coursework alongside other commitments. Let us help you handle your academic workload effectively and achieve the best possible grades.
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>

//           {/* Competitive Exam */}
//           <Grid item xs={12} md={6} lg={3}>
//             <Card
//               sx={{
//                 height: '100%',
//                 backgroundColor: 'rgba(255, 255, 255, 0.9)',
//                 transition: 'transform 0.3s ease-in-out',
//                 '&:hover': {
//                   transform: 'translateY(-8px)'
//                 }
//               }}
//             >
//               <CardContent sx={{ p: 4 }}>
//                 <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//                   <EmojiEvents sx={{ color: '#6366F1', fontSize: 40, mr: 2 }} />
//                   <Typography variant="h5" fontWeight="bold">
//                     Competitive Exam
//                   </Typography>
//                 </Box>
//                 <Typography variant="body1" color="text.secondary">
//                   Access expert tutorials, industrial insights, and proven exam strategies. Join our community to excel in competitive exams and thrive in the dynamic industrial landscape.
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         </Grid>

//         <Typography
//           variant="h6"
//           align="center"
//           sx={{
//             color: 'white',
//             mt: 6,
//             fontWeight: 500
//           }}
//         >
//           Your satisfaction is our utmost priority. We deliver top-notch quality content, always on time and absolutely error-free.
//         </Typography>
//       </Container>
//     </Box>
//   );
// };

// export default AboutSection;

import React from "react";
import {
	Box,
	Container,
	Typography,
	Grid,
	Card,
	CardContent,
	useTheme,
	useMediaQuery,
} from "@mui/material";
import { motion } from "framer-motion";
import {
	School,
	Assignment,
	LibraryBooks,
	EmojiEvents,
} from "@mui/icons-material";

const AboutSection = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	const cardVariants = {
		hidden: { opacity: 0, y: 50 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.6 },
		},
	};

	const services = [
		{
			title: "Assignment Help",
			description:
				"Balancing assignments with personal life can be challenging. Let us ease your burden with expert consultancy, free guidance, and plagiarism-free work. Our team covers a wide range of subjects, ensuring top-quality support. With thorough proofreading, your reputation thrives. Partner with us for a stress-free academic journey!",
			icon: Assignment,
			color: "#4F46E5",
		},
		{
			title: "Project and Dissertation Help",
			description:
				"Struggling with your MBA project report? Let our expert writers craft a high-quality, well-researched report at an affordable price. We ensure top academic standards while prioritizing your privacy. With competitive pricing, professional help is within reach. Focus on your goals while we handle the complexities. Secure your success today with our trusted expertise!",
			icon: School,
			color: "#6366F1",
		},
		{
			title: "Course Work Help",
			description:
				"Coursework can be overwhelming with endless research, writing, and tight deadlines. Balancing assignments with other commitments adds to the pressure. If deadlines are stressing you out, we’re here to help! Our expert support ensures high-quality work while you stay focused. Say goodbye to stress and hello to success!",
			icon: LibraryBooks,
			color: "#7C3AED",
		},
		{
			title: "Competitive Exam Preparation",
			description:
				"Unlock expert tutorials, real-world insights, and exam strategies to help you excel. Join our community of ambitious learners and take charge of your success. Subscribe now for a transformative learning journey. We’ll guide you to not just pass exams but thrive in a competitive world. Start your path to excellence today!",
			icon: EmojiEvents,
			color: "#8B5CF6",
		},
	];

	return (
		<Box
			sx={{
				background: "url(./images/bg10.jpg) center/cover fixed",
				position: "relative",
				"&::before": {
					content: '""',
					position: "absolute",
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					backgroundColor: "rgba(0.5,0.5,0.5,0.5)",
				},
			}}>
			<Container
				maxWidth='lg'
				sx={{
					py: 9,
					position: "relative",
					zIndex: 1,
				}}>
				<Box textAlign='center' mb={8}>
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}>
						<Typography
							variant={isMobile ? "h4" : "h3"}
							component='h2'
							mb={3}
							sx={{
								fontWeight: "600",
								background: "white",
								WebkitBackgroundClip: "text",
								WebkitTextFillColor: "transparent",
								fontFamily:"Poppins !important"
							}}>
							Your Academic Success Partner
						</Typography>
						<Typography
							variant='h6'
							color='white'
							maxWidth='800px'
							mx='auto'
							mb={6}
							fontWeight="400"
						fontFamily="Poppins !important"
						>
							We provide comprehensive academic support services to help you
							excel in your educational journey
						</Typography>
					</motion.div>
				</Box>

				<Grid container spacing={4}>
					{services.map((service, index) => (
						<Grid item xs={12} md={6} key={service.title}>
							<motion.div
								variants={cardVariants}
								initial='hidden'
								whileInView='visible'
								viewport={{ once: true }}
								custom={index}>
								<Card
									elevation={0}
									sx={{
										height: "100%",
										background: "rgba(255, 255, 255, 0.9)",
										backdropFilter: "blur(10px)",
										transition: "transform 0.3s ease-in-out",
										"&:hover": {
											transform: "translateY(-8px)",
										},
									}}>
									<CardContent sx={{ p: 4 }}>
										<Box
											sx={{
												display: "flex",
												alignItems: "center",
												mb: 2,
											}}>
											<Box
												sx={{
													p: 1,
													borderRadius: "12px",
													bgcolor: `${service.color}15`,
													mr: 2,
												}}>
												{React.createElement(service.icon, {
													sx: { fontSize: 40, color: service.color },
												})}
											</Box>
											<Typography variant='h5' fontWeight='500' fontFamily="Poppins !important">
												{service.title}
											</Typography>
										</Box>
										<Typography variant='body1' color='black' fontFamily="Poppins !important" fontSize="15px">
											{service.description}
										</Typography>
									</CardContent>
								</Card>
							</motion.div>
						</Grid>
					))}
				</Grid>
			</Container>
		</Box>
	);
};

export default AboutSection;
