// src/layouts/MainLayout.jsx
import React from 'react';
import { Box, Container } from '@mui/material';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Home from '../pages/Home';
import FloatingElements from '../components/common/FloatingElements';

const MainLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* Add floating educational elements in the background */}
      <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', zIndex: 0 }}>
        <FloatingElements count={8} zIndex="0" />
      </Box>
      
      <Header />
      <Box component="main" sx={{ flexGrow: 1, position: 'relative', zIndex: 1 }}>
        <Container maxWidth="xl">
          <Home/>
          {children}
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default MainLayout;