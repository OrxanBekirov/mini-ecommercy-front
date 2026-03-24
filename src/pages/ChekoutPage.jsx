import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import {
    Card,
    Box,
    CardContent,
    Typography,
    TextField,
    Button,
    MenuItem,
    Alert,
} from "@mui/material";
import { toast } from "react-toastify";

import { chekoutSchema } from "../validation/schemas/checkOutSchemas";
import { createMyOrderThunk } from "../features/order/orderSlice";
import { createCheckoutSessionThunk } from "../features/payments/payment.Slice";

function ChekoutPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { creating, error } = useSelector((store) => store.orders);

    const formik = useFormik({
        initialValues: {
            shippingAddress: "",
            note: "",
            paymentMethod: "Cash",
        },
        validationSchema: chekoutSchema,
        onSubmit: async (values, actions) => {
            try {
                const orderResult = await dispatch(createMyOrderThunk(values));

                if (createMyOrderThunk.fulfilled.match(orderResult)) {
                    const createdOrder = orderResult.payload;

                    if (values.paymentMethod === "Stripe") {
                        const paymentResult = await dispatch(
                            createCheckoutSessionThunk(createdOrder.id)
                        );

                        if (createCheckoutSessionThunk.fulfilled.match(paymentResult)) {
                            const checkoutUrl = paymentResult.payload.checkoutUrl;
                            window.location.href = checkoutUrl;
                            return;
                        } else {
                            toast.error(
                                paymentResult.payload || "Stripe checkout yaradıla bilmədi"
                            );
                            return;
                        }
                    }

                    actions.resetForm();
                    toast.success("Order created successfully");
                    navigate("/orders");
                } else {
                    toast.error(orderResult.payload || "Order yaradıla bilmədi");
                }
            } catch (error) {
                actions.setSubmitting(false);
                toast.error("Xəta baş verdi");
            } finally {
                actions.setSubmitting(false);
            }
        },
    });

    return (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Card sx={{ width: 520 }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        Sifarişin rəsmiləşdirilməsi
                    </Typography>

                    {error && <Alert severity="error">{error}</Alert>}

                    <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 2 }}>
                        <TextField
                            label="Çatırılma Ünvanı"
                            name="shippingAddress"
                            fullWidth
                            margin="normal"
                            value={formik.values.shippingAddress}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.shippingAddress &&
                                Boolean(formik.errors.shippingAddress)
                            }
                            helperText={
                                formik.touched.shippingAddress && formik.errors.shippingAddress
                            }
                        />

                        <TextField
                            label="Qeyd "
                            name="note"
                            fullWidth
                            margin="normal"
                            value={formik.values.note}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.note && Boolean(formik.errors.note)}
                            helperText={formik.touched.note && formik.errors.note}
                        />

                        <TextField
                            select
                            label="Payment Method"
                            name="paymentMethod"
                            fullWidth
                            margin="normal"
                            value={formik.values.paymentMethod}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.paymentMethod &&
                                Boolean(formik.errors.paymentMethod)
                            }
                            helperText={
                                formik.touched.paymentMethod && formik.errors.paymentMethod
                            }
                        >
                            <MenuItem value="Cash">Nagd</MenuItem>

                            <MenuItem value="Stripe">Stripe</MenuItem>
                        </TextField>

                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{ mt: 2 }}
                            disabled={creating || formik.isSubmitting}
                        >
                            {creating ? "Creating Order..." : "Sifaris Et"}
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}

export default ChekoutPage;