import React from "react";
import { keyframes } from "@emotion/react";
import {
	Box,
	Button,
	Container,
	Grid,
	Stack,
	Typography,
	useTheme,
	useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

// Keyframes for animations
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const floatAndRotate = keyframes`
  0% { 
    transform: translateY(0px) rotate(45deg);
  }
  33% { 
    transform: translateY(-15px) rotate(60deg);
  }
  66% {
    transform: translateY(10px) rotate(30deg);
  }
  100% { 
    transform: translateY(0px) rotate(45deg);
  }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const textGradientAnimation = keyframes`
  0% { 
    background-position: 0% 50%;
    filter: hue-rotate(0deg);
  }
  50% { 
    background-position: 100% 50%;
    filter: hue-rotate(10deg);
  }
  100% { 
    background-position: 0% 50%;
    filter: hue-rotate(0deg);
  }
`;

const slideInFromLeft = keyframes`
  0% { transform: translateX(-50px); opacity: 0; }
  100% { transform: translateX(0); opacity: 1; }
`;

const slideInFromRight = keyframes`
  0% { transform: translateX(50px); opacity: 0; }
  100% { transform: translateX(0); opacity: 1; }
`;

const StyledHeroSection = styled(Box)(({ theme }) => ({
	position: "relative",
	overflow: "hidden",
	padding: theme.spacing(5, 0),
	background: "linear-gradient(135deg, #f5f7ff 0%, #ffffff 100%)",
	"&::before": {
		content: '""',
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundImage:
			"radial-gradient(circle at 20% 20%, #e0e7ff 0%, transparent 25%)",
		opacity: 0.4,
		zIndex: 0,
	},
}));

const AnimatedTypography = styled(Typography)`
	background: linear-gradient(135deg, #6366f1 0%, #4f46e5 50%, #8b5cf6 80%, #6366f1 100%);
	background-size: 300% auto;
	animation: ${textGradientAnimation} 8s ease infinite;
	background-clip: text;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	display: inline-block;
	position: relative;
	z-index: 2;
	text-shadow: 0 0 20px rgba(99, 102, 241, 0.1);
`;

const ImageWrapper = styled(Box)`
	position: relative;
	&::before {
		content: "";
		position: absolute;
		width: 400px;
		height: 400px;
		background: radial-gradient(circle, #6366f1 0%, transparent 70%);
		opacity: 0.1;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		border-radius: 50%;
		z-index: -1;
	}
	&::after {
		content: "";
		position: absolute;
		width: 300px;
		height: 300px;
		border: 2px dashed #6366f1;
		border-radius: 50%;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		opacity: 0.2;
		z-index: -1;
		animation: ${float} 6s ease-in-out infinite;
	}
`;

const DecorativeShape = styled(Box)`
	position: absolute;
	width: 100px;
	height: 100px;
	border-radius: 24px;
	background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
	opacity: 0.2;
	animation: ${floatAndRotate} 8s ease-in-out infinite;
	transition: all 0.3s ease;

	&:hover {
		opacity: 0.2;
		filter: brightness(1.2);
	}
`;

const CircleShape = styled(Box)`
	position: absolute;
	width: 120px;
	height: 120px;
	border-radius: 50%;
	background: ${props => props.bgColor || "linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)"};
	opacity: ${props => props.opacity || 0.15};
	animation: ${float} ${props => props.duration || "7s"} ease-in-out infinite;
	animation-delay: ${props => props.delay || "0s"};
	z-index: 0;
`;

const AnimatedButton = styled(Button)`
	position: relative;
	overflow: hidden;
	z-index: 2;
	animation: ${slideInFromLeft} 0.8s ease-out forwards;
	animation-delay: ${props => props.delay || "0s"};
`;

const AnimatedOutlinedButton = styled(Button)`
	position: relative;
	overflow: hidden;
	z-index: 2;
	animation: ${slideInFromRight} 0.8s ease-out forwards;
	animation-delay: ${props => props.delay || "0s"};
`;

const EducationHero = () => {
	const theme = useTheme();
	const navigate = useNavigate();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	return (
		<StyledHeroSection style={{minHeight:"75vh"}}>
			<Container maxWidth='lg'>
				<Grid container spacing={8} alignItems='center'>
					<Grid item xs={12} md={6} sx={{ position: "relative", zIndex: 1 }}>
						<DecorativeShape
							sx={{
								top: "15%",
								left: "10%",
								animationDelay: "0s",
								zIndex: 0,
							}}
						/>
						<DecorativeShape
							sx={{
								bottom: "20%",
								right: "15%",
								animationDelay: "-4s",
								width: "80px",
								height: "80px",
								zIndex: 0,
							}}
						/>
						<DecorativeShape
							sx={{
								top: "70%",
								left: "25%",
								animationDelay: "-2s",
								width: "60px",
								height: "60px",
								zIndex: 0,
							}}
						/>
						
						<CircleShape 
							sx={{ 
								top: "20%", 
								left: "65%", 
								width: "200px",
								height: "200px",
							}}
							bgColor="linear-gradient(135deg, #ec4899 0%, #d946ef 100%)"
							opacity={0.08}
							duration="9s"
							delay="-1s"
						/>
						<CircleShape 
							sx={{ 
								top: "60%", 
								left: "5%",
								width: "180px",
								height: "180px", 
							}}
							bgColor="linear-gradient(135deg, #3b82f6 0%, #2dd4bf 100%)"
							opacity={0.1}
							duration="12s"
							delay="-3s"
						/>
						<DecorativeShape
							sx={{
								top: "35%",
								right: "5%",
								animationDelay: "-6s",
								width: "70px",
								height: "70px",
								background: "linear-gradient(135deg, #f59e0b 0%, #f97316 100%)",
								opacity: 0.12,
								zIndex: 0,
							}}
						/>

						<AnimatedTypography
							variant={isMobile ? "h2" : "h2"}
							fontWeight='600'
							fontFamily={"Poppins"}
							gutterBottom
							sx={{
								textAlign: isMobile ? "center" : "left",
								fontSize: isMobile ? "2rem" : "4.2rem",
							}}>
							Getting Quality Education Is Now More Easy
						</AnimatedTypography>

						<Typography
							variant='h6'
							color='text.secondary'
							paragraph
							sx={{
								mb: 4,
								textAlign: isMobile ? "center" : "left",
								position: "relative",
								zIndex: 2,
								animation: `${slideInFromLeft} 0.8s ease-out forwards`,
								animationDelay: "0.2s",
								color:"black",
								fontFamily: "Poppins",
							}}>
							Join us to get quality education that helps you start and boost
							your career
						</Typography>

						<Stack
							direction={isMobile ? "column" : "row"}
							spacing={2}
							alignItems={isMobile ? "stretch" : "flex-start"}>
							<AnimatedButton
								fullWidth={isMobile}
								variant='contained'
								size='large'
								delay="0.4s"
								sx={{
									bgcolor: "#6366F1",
									borderRadius: "12px",
									px: 4,
									py: 1.5,
									"&:hover": {
										bgcolor: "#4F46E5",
										transform: "translateY(-2px)",
										transition: "all 0.3s ease",
									},
								}}
								onClick={() => navigate("/register")}>
								Get Started
							</AnimatedButton>
							<AnimatedOutlinedButton
								fullWidth={isMobile}
								variant='outlined'
								size='large'
								delay="0.6s"
								sx={{
									borderColor: "#6366F1",
									color: "#6366F1",
									borderRadius: "12px",
									px: 4,
									py: 1.5,
									"&:hover": {
										borderColor: "#4F46E5",
										bgcolor: "rgba(99, 102, 241, 0.04)",
										transform: "translateY(-2px)",
										transition: "all 0.3s ease",
									},
								}}
							
								onClick={() => navigate("/browse")}>
								Learn More
							</AnimatedOutlinedButton>
						</Stack>
					</Grid>

					<Grid item xs={12} md={6}>
						<ImageWrapper>
							<Box
								component='img'
								src='./images/hero123.png'
								alt='Education'
								sx={{
									height: "auto",
									maxWidth: {xs:"450px",md:"740px"},
									display: "block",
									margin: "0 auto",
									animation: `${float} 6s ease-in-out infinite`,
									position: "relative",
									zIndex: 1,
									marginLeft: "-70px",
									
								}}
							/>
						</ImageWrapper>
					</Grid>
				</Grid>
			</Container>
		</StyledHeroSection>
	);
};

export default EducationHero;
