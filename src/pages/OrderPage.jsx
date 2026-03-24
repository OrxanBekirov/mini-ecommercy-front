import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Typography,
    Card,
    CardContent,
    Button,
    CircularProgress,
    Chip,
    Stack,
    Divider,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
    getMyOrdersThunk,
    cancelOrderThunk,
} from "../features/order/orderSlice";

function OrdersPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { orders, loading, error } = useSelector((state) => state.orders);

    const [openCancelModal, setOpenCancelModal] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [cancelReason, setCancelReason] = useState("");

    useEffect(() => {
        dispatch(getMyOrdersThunk());
    }, [dispatch]);

    const getOrderStatusText = (status) => {
        switch (status) {
            case 1:
                return "Pending Payment";
            case 2:
                return "Paid";
            case 3:
                return "Shipped";
            case 4:
                return "Delivered";
            case 5:
                return "Cancelled";
            case 6:
                return "Preparing";
            default:
                return "Unknown";
        }
    };

    const getOrderStatusColor = (status) => {
        switch (status) {
            case 1:
                return "warning";
            case 2:
                return "success";
            case 3:
                return "info";
            case 4:
                return "primary";
            case 5:
                return "error";
            case 6:
                return "secondary";
            default:
                return "default";
        }
    };

    const canCancelOrder = (status) => {
        return status !== 4 && status !== 5;
    };

    const handleOpenCancelModal = (orderId) => {
        console.log("OPEN MODAL ORDER ID =", orderId);
        setSelectedOrderId(orderId);
        setCancelReason("");
        setOpenCancelModal(true);
    };

    const handleCloseCancelModal = () => {
        setOpenCancelModal(false);
        setSelectedOrderId(null);
        setCancelReason("");
    };

    const handleConfirmCancel = async () => {
        if (!cancelReason.trim()) {
            alert("Ləğv səbəbi boş ola bilməz");
            return;
        }

        const resultAction = await dispatch(
            cancelOrderThunk({
                orderId: selectedOrderId,
                reason: cancelReason.trim(),
            })
        );

        if (cancelOrderThunk.fulfilled.match(resultAction)) {
            toast.info("Sifariş uğurla ləğv edildi!");
            handleCloseCancelModal();
            dispatch(getMyOrdersThunk());
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ maxWidth: 1000, mx: "auto", mt: 4, px: 2 }}>
                <Typography color="error" variant="h6">
                    Xəta: {error}
                </Typography>
            </Box>
        );
    }
    const visibleOrders = orders.filter(
        (order) => order.orderStatus !== 5 && order.orderStatus !== "Cancelled"
    );
    return (
        <Box sx={{ maxWidth: 1000, mx: "auto", mt: 4, px: 2 }}>
            <Typography variant="h4" fontWeight="bold" mb={3}>
                My Orders
            </Typography>

            {!orders || orders.length === 0 ? (
                <Card sx={{ borderRadius: 3 }}>
                    <CardContent>
                        <Typography variant="h6">Sifariş tapılmadı</Typography>
                        <Typography color="text.secondary" mt={1}>
                            Hələ heç bir sifarişiniz yoxdur.
                        </Typography>
                    </CardContent>
                </Card>
            ) : (
                <Stack spacing={3}>
                    {visibleOrders.map((order) => (
                        <Card key={order.id} sx={{ borderRadius: 3, boxShadow: 3 }}>
                            <CardContent>
                                <Stack
                                    direction={{ xs: "column", sm: "row" }}
                                    justifyContent="space-between"
                                    alignItems={{ xs: "flex-start", sm: "center" }}
                                    spacing={2}
                                    mb={2}
                                >
                                    <Box>
                                        <Typography variant="h6" fontWeight="bold">
                                            Order #{order.orderNumber}
                                        </Typography>

                                        <Typography variant="body2" color="text.secondary" mt={0.5}>
                                            Order ID: {order.id}
                                        </Typography>
                                    </Box>

                                    <Chip
                                        label={getOrderStatusText(order.orderStatus)}
                                        color={getOrderStatusColor(order.orderStatus)}
                                        variant="filled"
                                    />
                                </Stack>

                                <Divider sx={{ mb: 2 }} />

                                <Stack spacing={1.2}>
                                    <Typography>
                                        <strong>Total Amount:</strong> {order.totalAmount} ₼
                                    </Typography>

                                    <Typography>
                                        <strong>Shipping Address:</strong>{" "}
                                        {order.shippingAddress || "Yoxdur"}
                                    </Typography>

                                    <Typography>
                                        <strong>Note:</strong> {order.note || "Yoxdur"}
                                    </Typography>
                                </Stack>

                                {order.orderItems && order.orderItems.length > 0 && (
                                    <Box mt={3}>
                                        <Typography variant="subtitle1" fontWeight="bold" mb={1.5}>
                                            Order Items
                                        </Typography>

                                        <Stack spacing={1.5}>
                                            {order.orderItems.map((item, index) => (
                                                <Box
                                                    key={item.id || index}
                                                    sx={{
                                                        p: 2,
                                                        border: "1px solid #e0e0e0",
                                                        borderRadius: 2,
                                                    }}
                                                >
                                                    <Typography fontWeight="bold">
                                                        {item.productNameSnapshot || item.productName || "Product"}
                                                    </Typography>

                                                    <Typography variant="body2" color="text.secondary">
                                                        Quantity: {item.quantity}
                                                    </Typography>

                                                    <Typography variant="body2" color="text.secondary">
                                                        Unit Price: {item.unitPrice} ₼
                                                    </Typography>

                                                    <Typography variant="body2" color="text.secondary">
                                                        Line Total:{" "}
                                                        {item.lineTotal ??
                                                            (item.unitPrice && item.quantity
                                                                ? item.unitPrice * item.quantity
                                                                : 0)}{" "}
                                                        ₼
                                                    </Typography>
                                                </Box>
                                            ))}
                                        </Stack>
                                    </Box>
                                )}

                                <Stack
                                    direction="row"
                                    justifyContent="flex-end"
                                    spacing={2}
                                    mt={3}
                                >
                                    <Button
                                        variant="contained"
                                        sx={{ mr: 2 }}
                                        onClick={() => navigate(`/orders/${order.id}`)}
                                    >
                                        Details
                                    </Button>
                                    {(order.orderStatus === 1 || order.orderStatus === "PendingPayment") && (
                                        <Button
                                            color="error"
                                            variant="outlined"
                                            sx={{ mt: 2 }}
                                            onClick={() => handleOpenCancelModal(order.id)}
                                        >
                                            Cancel Order
                                        </Button>
                                    )}
                                </Stack>
                            </CardContent>
                        </Card>
                    ))}
                </Stack>
            )}

            <Dialog
                open={openCancelModal}
                onClose={handleCloseCancelModal}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>Cancel Order</DialogTitle>

                <DialogContent>
                    <TextField
                        label="Ləğv səbəbi"
                        fullWidth
                        multiline
                        rows={4}
                        margin="normal"
                        value={cancelReason}
                        onChange={(e) => setCancelReason(e.target.value)}
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleCloseCancelModal}>Bağla</Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleConfirmCancel}
                    >
                        Təsdiqlə
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default OrdersPage;