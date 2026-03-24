import React from 'react'
import { useEffect } from 'react'
import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    CircularProgress,
    Container,
    Typography,
    Alert,
} from '@mui/material'
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAdminBrands } from "../../features/brand/brandSlice"
function BrandSection() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { items = [], loading, error } = useSelector((store) => store.adminBrands);
    useEffect(() => {
        dispatch(fetchAdminBrands());
    }, [dispatch])
    const handleBrandClick = (brandName) => {
        navigate(`/products?brand=${encodeURIComponent(brandName)}`);
    };
    return (
        <Box sx={{ py: 8 }}>
            <Container>
                <Box sx={{ textAlign: "center", mb: 5 }}>
                    <Typography variant="h4" fontWeight="bold" gutterBottom>
                        Shop by Brand
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Sevdiyin markaları seç və uyğun məhsullara bax
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
                        {items.map((brand) => (
                            <Grid key={brand.id} size={{ xs: 12, sm: 6, md: 3 }}>
                                <Card
                                    sx={{
                                        height: "100%",
                                        borderRadius: 4,
                                        boxShadow: 2,
                                        transition: "0.3s",
                                        "&:hover": {
                                            transform: "translateY(-6px)",
                                            boxShadow: 8,
                                        },
                                    }}
                                >
                                    <CardActionArea
                                        sx={{ height: "100%" }}
                                        onClick={() => handleBrandClick(brand.name)}
                                    >
                                        <CardContent
                                            sx={{
                                                p: 4,
                                                minHeight: 140,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                textAlign: "center",
                                            }}
                                        >
                                            <Typography variant="h5" fontWeight="bold">
                                                {brand.name}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Container>
        </Box>
    )
}

export default BrandSection