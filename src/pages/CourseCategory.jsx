// pages/CourseCategory.jsx
import React, { useEffect, useState } from "react";
import { 
    Box, 
    Container, 
    Typography, 
    Grid, 
    Paper, 
    CircularProgress,
    Chip,
    Select,
    MenuItem,
    FormControl,
    InputLabel
} from "@mui/material";
import { useParams } from "react-router-dom";
import api from "../utils/api";

// Utility function for handling file URLs (similar to Home page)
const getFileUrl = (fileUrl) => {
    if (!fileUrl) return "/api/placeholder/400/200";
    if (fileUrl.startsWith("http")) return fileUrl;
    return `https://testbackend2-5loz.onrender.com/${fileUrl.replace(/\\/g, "/")}`;
};

const ContentCard = ({ content, onClick }) => (
    <Paper 
        elevation={3}
        sx={{
            display: 'flex', 
            flexDirection: 'column',
            height: '100%',
            transition: 'transform 0.2s ease-in-out',
            '&:hover': {
                transform: 'scale(1.02)',
                boxShadow: 6
            }
        }}
    >
        <Box 
            component="img"
            src="/images/bg12.jpg"
            alt={content.title}
            sx={{
                width: '100%', 
                height: 200, 
                objectFit: 'cover'
            }}
        />
        <Box p={2} flexGrow={1}>
            <Typography variant="h6" gutterBottom>
                {content.title}
            </Typography>
            <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{
                    display: '-webkit-box',
                    overflow: 'hidden',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 2
                }}
            >
                {content.description}
            </Typography>
            <Box 
                display="flex" 
                justifyContent="space-between" 
                alignItems="center" 
                mt={2}
            >
                <Chip 
                    label={content.isFree ? "Free" : `₹${content.price}`} 
                    color={content.isFree ? "success" : "primary"}
                    size="small"
                />
            </Box>
        </Box>
    </Paper>
);

const CourseCategory = () => {
    const { categoryId } = useParams();
    const [category, setCategory] = useState(null);
    const [contents, setContents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        type: '',
        sort: 'newest'
    });
    const [pagination, setPagination] = useState({
        page: 1,
        pages: 1,
        total: 0
    });

    useEffect(() => {
        const fetchCategoryAndContents = async () => {
            try {
                // Fetch category details
                const categoryResponse = await api.get(`/admin/classes`);
                const currentCategory = categoryResponse.data.find(cat => cat._id === categoryId);
                setCategory(currentCategory);

                // Fetch contents for this category
                const contentsResponse = await api.get("/content", {
                    params: {
                        classId: categoryId,
                        type: filters.type,
                        sort: filters.sort,
                        page: pagination.page
                    }
                });

                setContents(contentsResponse.data.contents);
                setPagination({
                    page: contentsResponse.data.page,
                    pages: contentsResponse.data.pages,
                    total: contentsResponse.data.total
                });
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategoryAndContents();
    }, [categoryId, filters, pagination.page]);

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    if (loading) {
        return (
            <Box 
                display="flex" 
                justifyContent="center" 
                alignItems="center" 
                height="100vh"
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box mb={4}>
                <Typography variant="h3" gutterBottom>
                    {category?.name}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    {category?.description}
                </Typography>
            </Box>

            <Box display="flex" justifyContent="space-between" mb={3}>
                <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                    <InputLabel>Content Type</InputLabel>
                    <Select
                        name="type"
                        value={filters.type}
                        onChange={handleFilterChange}
                        label="Content Type"
                    >
                        <MenuItem value="">All Types</MenuItem>
                        <MenuItem value="Video Lectures">Video Lectures</MenuItem>
                        <MenuItem value="PDF Notes">PDF Notes</MenuItem>
                    </Select>
                </FormControl>

                <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                    <InputLabel>Sort By</InputLabel>
                    <Select
                        name="sort"
                        value={filters.sort}
                        onChange={handleFilterChange}
                        label="Sort By"
                    >
                        <MenuItem value="newest">Newest</MenuItem>
                        <MenuItem value="popular">Popular</MenuItem>
                        <MenuItem value="rating">Top Rated</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <Grid container spacing={3}>
                {contents.map(content => (
                    <Grid item xs={12} sm={6} md={4} key={content._id}>
                        <ContentCard content={content} />
                    </Grid>
                ))}
            </Grid>

            {contents.length === 0 && (
                <Box textAlign="center" mt={4}>
                    <Typography variant="h6" color="text.secondary">
                        No contents found in this category.
                    </Typography>
                </Box>
            )}
        </Container>
    );
};

export default CourseCategory;