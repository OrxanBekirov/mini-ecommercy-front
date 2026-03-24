import React from 'react'
import { useEffect } from 'react'
import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    CircularProgress,
    Container,
    Alert,
    Typography,
} from '@mui/material'

import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getAllCategoriesThunk } from "../../features/categories/categorySlice"
function CategorySection() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { categories = [], loading, error } = useSelector((store) => store.category)
    useEffect(() => {
        dispatch(getAllCategoriesThunk());
    }, [dispatch]);

    const handleCategoryClick = (categoryName) => {
        navigate(`/products?category=${encodeURIComponent(categoryName)}`);
    };
    return (
        <Container sx={{ py: 8 }}>
            <Box sx={{ textAlign: "center", mb: 5 }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    Shop by Category
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Kateqoriyanı seç və uyğun məhsulları kəşf et
                </Typography>
            </Box>

            {loading && (
                <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                    <CircularProgress />
                </Box>
            )}

            {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                </Alert>
            )}

            {!loading && !error && (
                <Grid container spacing={3}>
                    {categories.map((category) => (
                        <Grid key={category.id} size={{ xs: 12, sm: 6, md: 4 }}>
                            <Card
                                sx={{
                                    height: "100%",
                                    borderRadius: 4,
                                    boxShadow: 3,
                                    transition: "0.3s",
                                    "&:hover": {
                                        transform: "translateY(-6px)",
                                        boxShadow: 8,
                                    },
                                }}
                            >
                                <CardActionArea
                                    sx={{ height: "100%" }}
                                    onClick={() => handleCategoryClick(category.name)}
                                >
                                    <CardContent sx={{ p: 4 }}>
                                        <Typography variant="h5" fontWeight="bold" gutterBottom>
                                            {category.name}
                                        </Typography>

                                        <Typography
                                            variant="body1"
                                            color="text.secondary"
                                            sx={{ lineHeight: 1.7 }}
                                        >
                                            {category.description || "Bu kateqoriyaya aid məhsullara bax."}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    )
}

export default CategorySection