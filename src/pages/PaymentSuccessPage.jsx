import React from 'react'
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { markPaymentSuccessThunk } from "../features/payments/payment.Slice"
function PaymentSuccessPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    useEffect(() => {
        const orderId = searchParams.get("orderId"); // URL-dən orderId-ni tutun
        if (orderId) {
            dispatch(markPaymentSuccessThunk(orderId));
        }
    }, [dispatch, searchParams]);
    const sessionId = searchParams.get("session_id");
    return (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 6, px: 2 }}>
            <Card sx={{ maxWidth: 520, width: "100%", textAlign: "center", py: 3 }}>
                <CardContent>
                    <CheckCircleOutlineIcon sx={{ fontSize: 70, mb: 2 }} />
                    <Typography variant="h4" fontWeight="bold" gutterBottom>
                        Payment Successful
                    </Typography>

                    <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                        Your payment process has been completed successfully.
                    </Typography>

                    {sessionId && (
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                            Session ID: {sessionId}
                        </Typography>
                    )}

                    <Button
                        variant="contained"
                        fullWidth
                        sx={{ mb: 2 }}
                        onClick={() => navigate("/orders")}
                    >
                        Go to My Orders
                    </Button>

                    <Button
                        variant="outlined"
                        fullWidth
                        onClick={() => navigate("/")}
                    >
                        Back to Home
                    </Button>
                </CardContent>
            </Card>
        </Box>
    )
}

export default PaymentSuccessPage