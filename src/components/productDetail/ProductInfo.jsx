import React, { useState } from "react";
import { Card, CardContent, Typography, Chip, Button, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux"; // useSelector əlavə edildi
import QuantitySelector from "./QuantitySelector";
import { addCartItem } from "../../features/carts/cartSlice";

function ProductInfo({ product }) {
    const dispatch = useDispatch();

    // Səbətdəki bu məhsulun sayını tapırıq (Stok kontrolu üçün)
    const cartItems = useSelector((state) => state.cart.items); // State yolunuz fərqli ola bilər
    const existingInCart = cartItems?.find(item => item.productId === product.id)?.quantity || 0;

    const [quantity, setQuantity] = useState(1);

    // Maksimum seçilə biləcək miqdar: Stok - Səbətdəki sayı
    const availableToSelect = (product.stockQuantity || 0) - existingInCart;

    const handleAddToCart = () => {
        if (quantity > 0) {
            dispatch(addCartItem({ productId: product.id, quantity }));
            // Əlavə etdikdən sonra selector-u sıfırlamaq olar
            setQuantity(1);
        }
    };

    const isOutOfStock = product.stockQuantity <= 0;

    return (
        <Card sx={{ maxWidth: 500, boxShadow: 3 }}>
            <CardContent>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    {product.name}
                </Typography>

                <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                    Brand: {product.brandName}
                </Typography>

                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                    Category: {product.categoryName}
                </Typography>

                <Typography variant="h5" fontWeight="bold" color="primary" sx={{ mb: 2 }}>
                    {product.price} ₼
                </Typography>

                <Chip
                    label={isOutOfStock ? "Stokda yoxdur" : "Stokda var"}
                    color={isOutOfStock ? "error" : "success"}
                    variant="outlined"
                    sx={{ mb: 3 }}
                />

                <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
                    {product.description}
                </Typography>

                {!isOutOfStock && (
                    <Box sx={{ mb: 3 }}>
                        <QuantitySelector
                            quantity={quantity}
                            setQuantity={setQuantity}
                            maxQuantity={availableToSelect > 0 ? availableToSelect : 1}
                        />
                        {availableToSelect <= 0 && (
                            <Typography variant="caption" color="error">
                                Maksimum stok sayına çatdınız (Səbətdə: {existingInCart})
                            </Typography>
                        )}
                    </Box>
                )}

                <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    onClick={handleAddToCart}
                    disabled={isOutOfStock || availableToSelect <= 0}
                >
                    {isOutOfStock ? "Məhsul Bitib" : "Səbətə Əlavə Et"}
                </Button>
            </CardContent>
        </Card>
    );
}

export default ProductInfo;