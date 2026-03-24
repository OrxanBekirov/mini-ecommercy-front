import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Box,
    Typography,
    CircularProgress,
    Alert,
    Card,
    CardContent,
    Button, CardMedia
} from "@mui/material";
import { getWishlistThunk, removeFromWishlistThunk } from "../features/wishlist/wishlistSlice";
import { addCartItem } from "../features/carts/cartSlice";
import React from 'react'

function WishlistPage() {
    const dispatch = useDispatch();
    const { items, loading, error } = useSelector((store) => store.wishlist);

    useEffect(() => {
        dispatch(getWishlistThunk());
    }, [dispatch]);

    const handleRemove = (productId) => {
        dispatch(removeFromWishlistThunk(productId));
    };

    const handleAddToCart = (productId) => {
        dispatch(addCartItem({ productId, quantity: 1 }));
    };

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;
    return (
        <Box sx={{ maxWidth: 1200, mx: "auto", mt: 4, px: 2 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                My Wishlist
            </Typography>

            {items.length === 0 ? (
                <Alert severity="info">Wishlist boşdur</Alert>
            ) : (
                items.map((item) => (
                    <Card key={item.productId} sx={{ mb: 2 }}>
                        <CardContent
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                gap: 2,
                                flexWrap: "wrap",
                            }}
                        >
                            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    // Əgər imageUrls boş deyilsə, ilk şəkli götür, yoxsa "No Image" göstər
                                    image={item.imageUrls && item.imageUrls.length > 0
                                        ? item.imageUrls[0]
                                        : 'https://via.placeholder.com/300x200?text=No+Image'}
                                    alt={item.productName}
                                    sx={{ objectFit: 'contain', padding: '10px' }}
                                />

                                <Box>
                                    <Typography variant="h6">{item.productName}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {item.brandName} / {item.categoryName}
                                    </Typography>
                                    <Typography variant="body1" sx={{ mt: 1 }}>
                                        {item.price}
                                    </Typography>
                                </Box>
                            </Box>

                            <Box sx={{ display: "flex", gap: 1 }}>
                                <Button
                                    variant="contained"
                                    onClick={() => handleAddToCart(item.productId)}
                                >
                                    Add to Cart
                                </Button>

                                <Button
                                    variant="outlined"
                                    color="error"
                                    onClick={() => handleRemove(item.productId)}
                                >
                                    Remove
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                ))
            )}
        </Box>
    )
}

export default WishlistPage


