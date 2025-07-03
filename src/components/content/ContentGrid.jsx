// src/components/content/ContentGrid.jsx
import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Chip
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { createUniqueSlug } from '../../utils/helpers';

const ContentCard = ({ content }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleClick = () => {
    const slug = createUniqueSlug(content.title, content._id);
    if (!isAuthenticated && !content.isFree) {
      navigate('/login', { state: { redirectTo: `/course/${slug}` } });
    } else {
      navigate(`/course/${slug}`);
    }
  };

  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 3,
          transition: 'all 0.3s ease-in-out'
        }
      }}
      onClick={handleClick}
    >
      <CardMedia
        component="img"
        height="140"
        image={content.thumbnailUrl || '/placeholder.png'}
        alt={content.title}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="h2">
          {content.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {content.description.substring(0, 100)}...
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <Chip label={content.type} size="small" />
          <Chip label={content.subjectId.name} size="small" />
          <Chip label={content.classId.name} size="small" />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {content.isFree ? (
            <Chip label="Free" color="success" />
          ) : (
            <Typography variant="h6" color="primary">
              ₹{content.price}
            </Typography>
          )}
          <Button size="small" variant="contained">
            {content.isFree ? 'Access Now' : 'Buy Now'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

const ContentGrid = ({ contents = [] }) => {
  return (
    <Grid container spacing={3}>
      {contents.map((content) => (
        <Grid item xs={12} sm={6} md={4} key={content._id}>
          <ContentCard content={content} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ContentGrid;