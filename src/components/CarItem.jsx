import React from 'react';
import { Typography, Box, Button, Card, CardContent } from "@mui/material";
import { useDispatch } from 'react-redux';

import { updateCartItemThunk, removeCartItemThunk } from '../features/carts/cartSlice';

function CartItem({ item }) {
    const dispatch = useDispatch();

    const productName = item.productName || item.product?.name;
    const price = item.unitPrice || item.product?.price;
    const qty = item.quantity;
    const productId = item.productId ?? item.product?.id;
    const handleIncrease = () => {
        const productId = item.productId ?? item.product?.id;
        dispatch(updateCartItemThunk({ productId, quantity: qty + 1 }));
    };


    const handleDecrease = () => {
        if (qty <= 1) return;
        const productId = item.productId ?? item.product?.id;
        dispatch(updateCartItemThunk({ productId, quantity: qty - 1 }));
    };

    const handleRemove = () => {
        if (!productId) {
            console.error("productId tapılmadı", item);
            return;
        }
        dispatch(removeCartItemThunk(productId));
    };

    return (
        <Card sx={{ mb: 2 }}>
            <CardContent>
                <Box display={'flex'} justifyContent={"space-between"} alignItems={"center"}>
                    <Typography variant='h6'>{productName}</Typography>
                    <Box display={'flex'} alignItems={"center"} gap={1}>
                        <Button variant="outlined" onClick={handleDecrease}>-</Button>
                        <Typography>{qty}</Typography>
                        <Button variant="outlined" onClick={handleIncrease}>+</Button>
                    </Box>
                </Box>
                <Typography sx={{ mt: 1 }}>Qiymət: {price} ₼</Typography>
                <Button color='error' sx={{ mt: 2 }} variant="outlined" onClick={handleRemove}>
                    Sil
                </Button>
            </CardContent>
        </Card>
    );
}

export default CartItem;