import React from 'react';
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useNavigate, useSearchParams } from "react-router-dom";

function PaymentCancelPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const orderId = searchParams.get("orderId");

    return (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 6, px: 2 }}>
            <Card sx={{ maxWidth: 520, width: "100%", textAlign: "center", py: 3 }}>
                <CardContent>
                    <HighlightOffIcon sx={{ fontSize: 70, mb: 2, color: "error.main" }} />

                    <Typography variant="h4" fontWeight="bold" gutterBottom>
                        Payment Cancelled
                    </Typography>

                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                        Your payment was cancelled or not completed.
                    </Typography>

                    <Button
                        variant="contained"
                        fullWidth
                        sx={{ mb: 2 }}
                        onClick={() => navigate(orderId ? `/orders/${orderId}` : "/orders")}
                    >
                        Try Again
                    </Button>

                    <Button
                        variant="outlined"
                        fullWidth
                        onClick={() => navigate("/cart")}
                    >
                        Back to Cart
                    </Button>
                </CardContent>
            </Card>
        </Box>
    );
}

export default PaymentCancelPage;