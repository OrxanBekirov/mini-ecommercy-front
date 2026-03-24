import React, { useState } from "react";
import {
    Container,
    Typography,
    Grid,
    Paper,
    Box,
    TextField,
    Button,
    Alert,
    CircularProgress,
    Stack,
    IconButton,
    Divider
} from "@mui/material";

import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

import { useFormik } from "formik";
import { contactSchema } from "../validation/schemas/contactSchemas";
import { sendContactMessageApi } from "../api/contactApi";
import contactBanner from "../../src/assets/ContactPage/banner.jpg";

function ContactInfo({ icon, title, value }) {
    return (
        <Stack direction="row" spacing={2} alignItems="center">
            <Box
                sx={{
                    width: 45,
                    height: 45,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "primary.main",
                    color: "white"
                }}
            >
                {icon}
            </Box>

            <Box>
                <Typography fontWeight="bold">{title}</Typography>
                <Typography variant="body2" color="text.secondary">
                    {value}
                </Typography>
            </Box>
        </Stack>
    );
}

function ContactPage() {
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const formik = useFormik({
        initialValues: {
            Name: "",
            Email: "",
            Subject: "",
            Message: ""
        },
        validationSchema: contactSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                setLoading(true);
                setSuccessMessage("");
                setErrorMessage("");

                const response = await sendContactMessageApi(values);

                if (!response.success) {
                    throw new Error(response.message);
                }

                setSuccessMessage(response.message);
                resetForm();
            } catch (error) {
                setErrorMessage(
                    error?.response?.data?.message || "Mesaj göndərilə bilmədi"
                );
            } finally {
                setLoading(false);
            }
        }
    });

    return (
        <Container maxWidth="lg" sx={{ py: 8 }}>
            <Box textAlign="center" mb={6}>
                <Typography variant="h3" fontWeight="bold">
                    Bizimlə Əlaqə
                </Typography>

                <Typography color="text.secondary" sx={{ mt: 2 }}>
                    Suallarınız və ya təklifləriniz varsa bizimlə əlaqə saxlaya bilərsiniz.
                </Typography>
            </Box>

            <Grid container spacing={4}>
                {/* SOL TƏRƏF - ƏLAQƏ MƏLUMATLARI */}


                {/* SAĞ TƏRƏF - FORM */}
                <Grid item xs={12} md={7}>
                    <Paper elevation={3} sx={{ borderRadius: 4, overflow: "hidden" }}>
                        <Box
                            component="img"
                            src={contactBanner}
                            alt="Contact"
                            sx={{
                                width: "100%",
                                height: 220,
                                objectFit: "cover"
                            }}
                        />

                        <Box p={4}>
                            <Typography variant="h5" fontWeight="bold" mb={2}>
                                Mesaj göndərin
                            </Typography>

                            {successMessage && <Alert severity="success" sx={{ mb: 2 }}>{successMessage}</Alert>}
                            {errorMessage && <Alert severity="error" sx={{ mb: 2 }}>{errorMessage}</Alert>}

                            <Box component="form" onSubmit={formik.handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Ad"
                                            name="Name"
                                            value={formik.values.Name}
                                            onChange={formik.handleChange}
                                            error={formik.touched.Name && Boolean(formik.errors.Name)}
                                            helperText={formik.touched.Name && formik.errors.Name}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Email"
                                            name="Email"
                                            value={formik.values.Email}
                                            onChange={formik.handleChange}
                                            error={formik.touched.Email && Boolean(formik.errors.Email)}
                                            helperText={formik.touched.Email && formik.errors.Email}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Mövzu"
                                            name="Subject"
                                            value={formik.values.Subject}
                                            onChange={formik.handleChange}
                                            error={formik.touched.Subject && Boolean(formik.errors.Subject)}
                                            helperText={formik.touched.Subject && formik.errors.Subject}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Mesaj"
                                            name="Message"
                                            multiline
                                            rows={5}
                                            value={formik.values.Message}
                                            onChange={formik.handleChange}
                                            error={formik.touched.Message && Boolean(formik.errors.Message)}
                                            helperText={formik.touched.Message && formik.errors.Message}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            size="large"
                                            disabled={loading}
                                            sx={{ mt: 1, borderRadius: 3, px: 4 }}
                                        >
                                            {loading ? <CircularProgress size={24} color="inherit" /> : "Göndər"}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>

            {/* MAP */}
            <Box mt={8}>
                <Paper sx={{ borderRadius: 4, overflow: "hidden" }}>
                    <iframe
                        title="Baku Map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d194473.1858718917!2d49.85522305!3d40.394737!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d40a035441d%3A0xa97b98d248386fbb!2sBaku%2C%20Azerbaijan!5e0!3m2!1sen!2saz!4v1700000000000"
                        width="100%"
                        height="350"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                    />
                </Paper>
            </Box>
        </Container>
    );
}

export default ContactPage;