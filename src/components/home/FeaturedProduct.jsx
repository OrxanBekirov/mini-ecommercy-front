import React from 'react'
import { Box, Button, CircularProgress, Container, Typography, Alert } from '@mui/material'
import { useEffect } from 'react'

import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProductCard from "../../components/ProductCard"
import { fetchProducts } from "../../features/products/productSlice"
function FeaturedProduct() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { items = [], loading, error } = useSelector((store) => store.product);
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const featuredProducts = items.slice(0, 8);

    return (
        <Box sx={{ py: 8, bgcolor: "#f9fafb" }}>
            <Container>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 4,
                        flexWrap: "wrap",
                        gap: 2,
                    }}
                >
                    <Box>
                        <Typography variant="h4" fontWeight="bold" gutterBottom>
                            Featured Products
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Seçilmiş məhsullarımızı kəşf et
                        </Typography>
                    </Box>

                    <Button
                        variant="outlined"
                        onClick={() => navigate("/products")}
                        sx={{ borderRadius: 3 }}
                    >
                        View All
                    </Button>
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
                        {featuredProducts.map((product) => (
                            <Grid key={product.id} size={{ xs: 12, sm: 6, md: 3 }}>
                                <ProductCard product={product} />
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Container>
        </Box>
    )
}

export default FeaturedProduct