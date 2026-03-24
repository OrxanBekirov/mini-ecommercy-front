import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Grid, CircularProgress, Alert, Typography } from "@mui/material";

import ProductImageGallery from "../components/productDetail/ProductImageGallery";
import ProductInfo from "../components/productDetail/ProductInfo";
import { fetchProductById } from "../features/products/productSlice";

function ProductDetailPage() {
    const { id } = useParams();
    const dispatch = useDispatch();

    const { selectedProduct, loading, error } = useSelector((store) => store.product);

    useEffect(() => {
        dispatch(fetchProductById(id));
    }, [dispatch, id]);

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;
    if (!selectedProduct) return <Typography>Məhsul tapılmadı</Typography>;

    return (
        <Box sx={{ py: 4 }}>
            <Grid container spacing={4}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <ProductImageGallery images={selectedProduct.imageUrls} name={selectedProduct.name} />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <ProductInfo product={selectedProduct} />
                </Grid>
            </Grid>
        </Box>
    );
}

export default ProductDetailPage;