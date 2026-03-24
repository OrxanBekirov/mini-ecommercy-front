import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchOrderById, clearSelectedOrder } from "../features/order/orderSlice";
import { createCheckoutSessionThunk } from "../features/payments/payment.Slice";
import {
    Box, Card, CardContent, Typography, CircularProgress,
    Alert, Divider, Button, Dialog, DialogTitle,
    DialogContent, DialogContentText, DialogActions
} from '@mui/material';

// Backend-dəki Enum-a uyğun sabit obyekt
const PaymentStatus = {
    Pending: 1,
    Success: 2,
    Failed: 3
};

function OrderDetailPage() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [openConfirm, setOpenConfirm] = useState(false);

    const { selectedOrder, loading, error } = useSelector((store) => store.orders);
    const { loading: paymentLoading, error: paymentError } = useSelector((store) => store.payment);

    useEffect(() => {
        if (id) {
            dispatch(fetchOrderById(id));
        }
        return () => dispatch(clearSelectedOrder());
    }, [dispatch, id]);

    // Statusları oxunaqlı sözə çevirən funksiya
    const getPaymentStatusText = (status) => {
        const s = Number(status);
        if (s === PaymentStatus.Success) return { text: "Uğurlu", color: "green" };
        if (s === PaymentStatus.Failed) return { text: "Uğursuz (Xəta)", color: "red" };
        return { text: "Gözləmədə", color: "orange" };
    };

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}><CircularProgress /></Box>;
    if (error) return <Alert severity='error' sx={{ m: 2 }}>{error}</Alert>;
    if (!selectedOrder) return <Typography sx={{ p: 3 }}>Sifariş tapılmadı.</Typography>;

    const items = selectedOrder.orderItems || [];
    const payment = selectedOrder.payment || {};

    // DÜZƏLİŞ: Backend-dən gələn enum (1, 2, 3) yoxlanılır
    // Əgər status 1-dirsə (Pending) və order status "PendingPayment"-dirsə düymə görünsün
    const isOrderPending = selectedOrder?.orderStatus?.toLowerCase().includes("pending");
    const isPaymentNotSuccess = Number(payment?.status) !== PaymentStatus.Success;

    const canPay = isOrderPending && isPaymentNotSuccess;

    const handleConfirmPayment = async () => {
        setOpenConfirm(false);
        const resultAction = await dispatch(createCheckoutSessionThunk(selectedOrder.id));

        if (createCheckoutSessionThunk.fulfilled.match(resultAction)) {
            const stripeUrl = resultAction.payload?.checkoutUrl;
            if (stripeUrl) {
                window.location.href = stripeUrl;
            }
        }
    };

    const statusInfo = getPaymentStatusText(payment.status);

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                Sifariş: #{selectedOrder.orderNumber}
            </Typography>

            {paymentError && <Alert severity="error" sx={{ mb: 2 }}>{paymentError}</Alert>}

            <Card sx={{ mb: 3, bgcolor: '#f9f9f9' }}>
                <CardContent>
                    <Typography sx={{ mb: 1 }}>
                        <strong>Sifariş Statusu:</strong> {selectedOrder.orderStatus}
                    </Typography>
                    <Typography sx={{ mb: 1 }}>
                        <strong>Ödəniş Metodu:</strong> {payment.method || "Stripe"}
                    </Typography>
                    <Typography sx={{ mb: 1 }}>
                        <strong>Ödəniş Statusu:</strong>
                        <span style={{ color: statusInfo.color, fontWeight: 'bold', marginLeft: '5px' }}>
                            {statusInfo.text}
                        </span>
                    </Typography>
                    <Typography variant="h6" sx={{ mt: 2, color: 'primary.main' }}>
                        <strong>Ümumi Məbləğ:</strong> {selectedOrder.totalAmount} ₼
                    </Typography>

                    {canPay && (
                        <Button
                            variant="contained"
                            fullWidth
                            color="primary"
                            sx={{ mt: 3, py: 1.5, fontWeight: 'bold' }}
                            onClick={() => setOpenConfirm(true)}
                            disabled={paymentLoading}
                        >
                            {paymentLoading ? "Gözləyin..." : "İndi Ödə (Stripe)"}
                        </Button>
                    )}
                </CardContent>
            </Card>

            <Typography variant="h6" gutterBottom>Məhsullar ({items.length})</Typography>

            {items.map((item, index) => (
                <Card key={index} sx={{ mb: 1.5, boxShadow: 1 }}>
                    <CardContent sx={{ py: 1.5, '&:last-child': { pb: 1.5 } }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: '600' }}>
                            {item.productName || item.productNameSnapshot}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                            <Typography variant="body2" color="text.secondary">
                                {item.quantity} ədəd x {item.unitPrice} ₼
                            </Typography>
                            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                {(item.lineTotal || (item.quantity * item.unitPrice)).toFixed(2)} ₼
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            ))}

            <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
                <DialogTitle>Ödəniş Təsdiqi</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Təhlükəsiz ödəniş üçün Stripe səhifəsinə yönləndiriləcəksiniz. Davam edək?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenConfirm(false)} color="inherit">Xeyr</Button>
                    <Button onClick={handleConfirmPayment} variant="contained" autoFocus>Bəli, Yönləndir</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default OrderDetailPage;