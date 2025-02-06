import React from 'react';
import { keyframes } from '@emotion/react';
import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

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

const StyledHeroSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  padding: theme.spacing(12, 0),
  background: 'linear-gradient(135deg, #f5f7ff 0%, #ffffff 100%)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: 'radial-gradient(circle at 20% 20%, #e0e7ff 0%, transparent 25%)',
    opacity: 0.4,
  }
}));

const AnimatedTypography = styled(Typography)`
  background: linear-gradient(135deg, #6366F1 0%, #4F46E5 50%, #6366F1 100%);
  background-size: 200% auto;
  animation: ${gradientShift} 5s ease infinite;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
`;

const ImageWrapper = styled(Box)`
  position: relative;
  &::before {
    content: '';
    position: absolute;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, #6366F1 0%, transparent 70%);
    opacity: 0.1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    z-index: -1;
  }
  &::after {
    content: '';
    position: absolute;
    width: 300px;
    height: 300px;
    border: 2px dashed #6366F1;
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
  background: linear-gradient(135deg, #6366F1 0%, #4F46E5 100%);
  opacity: 0.1;
  animation: ${floatAndRotate} 8s ease-in-out infinite;
  transition: all 0.3s ease;
  
  &:hover {
    opacity: 0.2;
    filter: brightness(1.2);
  }
`;

const EducationHero = ({ isMobile }) => {
  return (
    <StyledHeroSection>
      <Container maxWidth="lg">
        <Grid container spacing={8} alignItems="center">
          <Grid item xs={12} md={6}>
            <DecorativeShape 
              sx={{ 
                top: '10%', 
                left: '5%',
                animationDelay: '0s'
              }} 
            />
            <DecorativeShape 
              sx={{ 
                bottom: '10%', 
                right: '15%',
                animationDelay: '-4s',
                width: '80px',
                height: '80px'
              }} 
            />
            <DecorativeShape 
              sx={{ 
                top: '40%', 
                left: '15%',
                animationDelay: '-2s',
                width: '60px',
                height: '60px'
              }} 
            />
            
            <AnimatedTypography
              variant={isMobile ? "h3" : "h2"}
              fontWeight="bold"
              gutterBottom
              sx={{
                textAlign: isMobile ? "center" : "left",
              }}>
              Getting Quality Education Is Now More Easy
            </AnimatedTypography>
            
            <Typography
              variant="h6"
              color="text.secondary"
              paragraph
              sx={{ 
                mb: 4,
                textAlign: isMobile ? "center" : "left",
                position: 'relative',
                zIndex: 1
              }}>
              Join us to get quality education that helps you start and boost
              your career
            </Typography>
            
            <Stack
              direction={isMobile ? "column" : "row"}
              spacing={2}
              alignItems={isMobile ? "stretch" : "flex-start"}>
              <Button
                fullWidth={isMobile}
                variant="contained"
                size="large"
                sx={{
                  bgcolor: "#6366F1",
                  borderRadius: "12px",
                  px: 4,
                  py: 1.5,
                  "&:hover": { 
                    bgcolor: "#4F46E5",
                    transform: 'translateY(-2px)',
                    transition: 'all 0.3s ease'
                  },
                }}>
                Get Started
              </Button>
              <Button
                fullWidth={isMobile}
                variant="outlined"
                size="large"
                sx={{
                  borderColor: "#6366F1",
                  color: "#6366F1",
                  borderRadius: "12px",
                  px: 4,
                  py: 1.5,
                  "&:hover": {
                    borderColor: "#4F46E5",
                    bgcolor: "rgba(99, 102, 241, 0.04)",
                    transform: 'translateY(-2px)',
                    transition: 'all 0.3s ease'
                  },
                }}>
                Learn More
              </Button>
            </Stack>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <ImageWrapper>
              <Box
                component="img"
                src="./images/hero.webp"
                alt="Education"
                sx={{
                  width: "100%",
                  height: "auto",
                  maxWidth: "600px",
                  display: "block",
                  margin: "0 auto",
                  filter: "drop-shadow(0px 10px 30px rgba(99, 102, 241, 0.2))",
                  animation: `${float} 6s ease-in-out infinite`,
                  position: 'relative',
                  zIndex: 1
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