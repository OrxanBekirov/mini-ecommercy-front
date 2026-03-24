import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMyCart } from '../features/carts/cartSlice';
import { CircularProgress, Alert, Typography, Container, Button, Divider, Box } from "@mui/material";
// Əgər komponentin adı həqiqətən CarItem-dirsə olduğu kimi saxlayın, 
// amma səhvdirsə CartItem olaraq düzəldin:
import CarItem from '../components/CarItem';
import { useNavigate } from 'react-router-dom';

function CartPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, cart, loading } = useSelector((store) => store.cart);

    useEffect(() => {
        dispatch(fetchMyCart());
    }, [dispatch]);

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress /></Box>;
    if (error) return <Alert severity='error'>{error}</Alert>;

    // cart obyektinin daxilindəki massivi təhlükəsiz şəkildə götürürük
    const items = cart?.cartItems || cart?.items || [];

    // DUZELISH: reducer -> reduce
    const total = items.reduce((sum, it) => {
        const price = it.unitPrice || it.product?.price || 0;
        return sum + price * it.quantity;
    }, 0);

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
                Səbətim
            </Typography>

            {items.length === 0 ? (
                <Typography variant="h6" color="text.secondary">
                    Səbətiniz hazırda boşdur.
                </Typography>
            ) : (
                <>
                    {items.map((x) => (
                        <CarItem key={x.id} item={x} />
                    ))}

                    <Divider sx={{ my: 2 }} />

                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6">Total:</Typography>
                        <Typography variant="h6">
                            {/* total-ın rəqəm olduğuna əmin oluruq */}
                            {(total || 0).toFixed(2)} ₼
                        </Typography>
                    </Box>

                    <Button
                        variant="contained"
                        fullWidth
                        sx={{ mt: 2 }}
                        disabled={items.length === 0}
                        onClick={() => navigate("/checkout")}
                    >
                        Checkout
                    </Button>
                </>
            )}
        </Container>
    );
}

export default CartPage; // Adı düzəldildi