// src/components/user/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Button,
  Divider,
  CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import { createUniqueSlug } from '../../utils/helpers';

const ContentCard = ({ content, isPurchased }) => {
  const navigate = useNavigate();

  const getFileUrl = (fileUrl) => {
    if (!fileUrl) return "/api/placeholder/400/200";
    if (fileUrl.startsWith("http")) return fileUrl;
    return `https://testbackend2-5loz.onrender.com/${fileUrl.replace(/\\/g, "/")}`;
  };

  const handleClick = () => {
    const slug = createUniqueSlug(content.title, content._id);
    if (isPurchased) {
      navigate(`/course/${slug}`);
    } else {
      navigate(`/course/${slug}`);
    }
  };

  return (
    <Card sx={{ display: 'flex', mb: 2, cursor: 'pointer' }} onClick={handleClick}>
      <CardMedia
        component="img"
        sx={{ width: 140 }}
        image={content.thumbnailUrl }
        alt={content.title}
      />
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h6">{content.title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {content.description.substring(0, 100)}...
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            {content.subjectId.name} | {content.type}
          </Typography>
          {!isPurchased && !content.isFree && (
            <Typography variant="h6" color="primary">
              ₹{content.price}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await api.get('/customer/dashboard');
        setDashboardData(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Purchased Content Section */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h5" gutterBottom>
              Your Purchased Content
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {dashboardData.purchasedContent.map((content) => (
              <ContentCard
                key={content._id}
                content={content}
                isPurchased={true}
              />
            ))}
          </Paper>
        </Grid>

        {/* Recommended Content Section */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h5" gutterBottom>
              Recommended for You
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {dashboardData.recommendedContent.map((content) => (
              <ContentCard
                key={content._id}
                content={content}
                isPurchased={false}
              />
            ))}
          </Paper>
        </Grid>

        {/* Free Content Section */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h5" gutterBottom>
              Free Resources
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {dashboardData.freeContent.map((content) => (
              <ContentCard
                key={content._id}
                content={content}
                isPurchased={false}
              />
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;