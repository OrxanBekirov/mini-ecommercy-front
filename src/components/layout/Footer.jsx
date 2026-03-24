import React from "react";
import { Box, Container, Grid, Typography, Link, IconButton, Divider } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ReplayIcon from "@mui/icons-material/Replay";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import { Link as RouterLink } from "react-router-dom";

function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                mt: 8,
                bgcolor: "#111827",
                color: "#fff",
                pt: 6,
                pb: 2,
            }}
        >
            <Container maxWidth="xl">
                {/* Üst servis hissəsi */}
                <Grid container spacing={3} sx={{ mb: 5 }}>
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                            <LocalShippingIcon sx={{ fontSize: 32, color: "#60a5fa" }} />
                            <Box>
                                <Typography variant="subtitle1" fontWeight="bold">
                                    Sürətli Çatdırılma
                                </Typography>
                                <Typography variant="body2" sx={{ color: "#cbd5e1" }}>
                                    Sifarişləriniz tez və təhlükəsiz çatdırılır
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                            <ReplayIcon sx={{ fontSize: 32, color: "#60a5fa" }} />
                            <Box>
                                <Typography variant="subtitle1" fontWeight="bold">
                                    Asan Geri Qaytarma
                                </Typography>
                                <Typography variant="body2" sx={{ color: "#cbd5e1" }}>
                                    Məhsulu rahat şəkildə geri qaytara bilərsiniz
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                            <VerifiedUserIcon sx={{ fontSize: 32, color: "#60a5fa" }} />
                            <Box>
                                <Typography variant="subtitle1" fontWeight="bold">
                                    Təhlükəsiz Ödəniş
                                </Typography>
                                <Typography variant="body2" sx={{ color: "#cbd5e1" }}>
                                    Ödənişləriniz qorunmuş sistem üzərindən keçir
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                            <SupportAgentIcon sx={{ fontSize: 32, color: "#60a5fa" }} />
                            <Box>
                                <Typography variant="subtitle1" fontWeight="bold">
                                    24/7 Dəstək
                                </Typography>
                                <Typography variant="body2" sx={{ color: "#cbd5e1" }}>
                                    İstənilən vaxt bizimlə əlaqə saxlaya bilərsiniz
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>

                <Divider sx={{ borderColor: "rgba(255,255,255,0.12)", mb: 5 }} />

                {/* Əsas footer hissəsi */}
                <Grid container spacing={4}>
                    {/* Sol hissə */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
                            E-Commercy
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#cbd5e1", lineHeight: 1.8, maxWidth: 320 }}>
                            Keyfiyyətli idman geyimləri, ayaqqabılar və aksessuarlar bir arada.
                            Müasir görünüş, rahat alış-veriş və etibarlı xidmət.
                        </Typography>
                    </Grid>

                    {/* Sürətli linklər */}
                    <Grid size={{ xs: 6, md: 2 }}>
                        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                            Sürətli Linklər
                        </Typography>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                            <Link
                                component={RouterLink}
                                to="/"
                                underline="none"
                                color="inherit"
                                sx={{ color: "#cbd5e1", "&:hover": { color: "#60a5fa" } }}
                            >
                                Ana Səhifə
                            </Link>
                            <Link
                                component={RouterLink}
                                to="/products"
                                underline="none"
                                color="inherit"
                                sx={{ color: "#cbd5e1", "&:hover": { color: "#60a5fa" } }}
                            >
                                Məhsullar
                            </Link>
                            <Link
                                component={RouterLink}
                                to="/about"
                                underline="none"
                                color="inherit"
                                sx={{ color: "#cbd5e1", "&:hover": { color: "#60a5fa" } }}
                            >
                                Haqqımızda
                            </Link>
                            <Link
                                component={RouterLink}
                                to="/contact"
                                underline="none"
                                color="inherit"
                                sx={{ color: "#cbd5e1", "&:hover": { color: "#60a5fa" } }}
                            >
                                Əlaqə
                            </Link>
                        </Box>
                    </Grid>

                    {/* Kateqoriyalar */}
                    <Grid size={{ xs: 6, md: 3 }}>
                        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                            Kateqoriyalar
                        </Typography>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                            <Typography sx={{ color: "#cbd5e1" }}>İdman Ayaqqabıları</Typography>
                            <Typography sx={{ color: "#cbd5e1" }}>İdman Geyimləri</Typography>
                            <Typography sx={{ color: "#cbd5e1" }}>Aksessuarlar</Typography>
                            <Typography sx={{ color: "#cbd5e1" }}>Yeni Gələnlər</Typography>
                        </Box>
                    </Grid>

                    {/* Əlaqə */}
                    <Grid size={{ xs: 12, md: 3 }}>
                        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                            Əlaqə
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#cbd5e1", mb: 1 }}>
                            Email: commercytest@gmail.com
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#cbd5e1", mb: 1 }}>
                            Telefon: +994 50 000 00 00
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#cbd5e1", mb: 2 }}>
                            Ünvan: Bakı, Azərbaycan
                        </Typography>

                        <Box>
                            <IconButton sx={{ color: "#fff", "&:hover": { color: "#60a5fa" } }}>
                                <FacebookIcon />
                            </IconButton>
                            <IconButton sx={{ color: "#fff", "&:hover": { color: "#60a5fa" } }}>
                                <InstagramIcon />
                            </IconButton>
                            <IconButton sx={{ color: "#fff", "&:hover": { color: "#60a5fa" } }}>
                                <YouTubeIcon />
                            </IconButton>
                            <IconButton sx={{ color: "#fff", "&:hover": { color: "#60a5fa" } }}>
                                <TwitterIcon />
                            </IconButton>
                        </Box>
                    </Grid>
                </Grid>

                <Divider sx={{ borderColor: "rgba(255,255,255,0.12)", my: 4 }} />

                {/* Alt xətt */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: { xs: "center", md: "space-between" },
                        alignItems: "center",
                        flexDirection: { xs: "column", md: "row" },
                        gap: 1,
                    }}
                >
                    <Typography variant="body2" sx={{ color: "#94a3b8" }}>
                        © 2026 E-Commercy. Bütün hüquqlar qorunur.
                    </Typography>

                    <Typography variant="body2" sx={{ color: "#94a3b8" }}>
                        Designed with care for modern shopping
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
}

export default Footer;