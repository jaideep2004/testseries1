// src/layouts/MainLayout.jsx
import React from 'react';
import { Box, Container } from '@mui/material';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Home from '../pages/Home';

const MainLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Box component="main" sx={{ flexGrow: 1, py: 3 }}>
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