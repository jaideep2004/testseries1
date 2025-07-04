import React from 'react';
import { Box, Container, Typography, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/common/SEO';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <SEO 
        title="Page Not Found | Academic Assignment Master"
        description="The page you are looking for does not exist. Return to our homepage to explore our academic resources and services."
        canonicalUrl="/404"
      />
      
      <Box 
        sx={{ 
          minHeight: '80vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          bgcolor: '#F6F9FC'
        }}
      >
        <Container maxWidth="md">
          <Stack spacing={4} alignItems="center" textAlign="center">
            <Typography 
              variant="h1" 
              sx={{ 
                fontWeight: 'bold',
                fontSize: { xs: '5rem', md: '8rem' },
                background: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              404
            </Typography>
            
            <Typography variant="h4" fontWeight="bold">Page Not Found</Typography>
            
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '600px' }}>
              The page you are looking for might have been removed, had its name changed, 
              or is temporarily unavailable. Please check the URL or return to the homepage.
            </Typography>
            
            <Button 
              variant="contained" 
              size="large"
              onClick={() => navigate('/')}
              sx={{ 
                mt: 4,
                px: 4,
                py: 1.5,
                borderRadius: '12px',
                fontSize: '1.1rem'
              }}
            >
              Back to Homepage
            </Button>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default NotFound; 