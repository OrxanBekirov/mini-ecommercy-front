import React from "react";
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    Stack,
    Button,
} from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import VerifiedIcon from "@mui/icons-material/Verified";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import aboutImage from "../assets/AboutPage/ori.webp"; // oz sekilinin yolunu yaz
import { Link } from "react-router-dom";

function AboutPage() {
    return (
        <Box sx={{ backgroundColor: "#f9fafbe5", py: 6 }}>
            <Container maxWidth="lg">
                {/* Header */}
                <Box sx={{ textAlign: "center", mb: 6 }}>
                    <Typography variant="h3" fontWeight="bold" gutterBottom>
                        Haqqımızda
                    </Typography>
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        maxWidth="750px"
                        mx="auto"
                    >
                        Biz müasir e-commerce təcrübəsi təqdim edən, keyfiyyətli idman
                        geyimləri və ayaqqabıları bir araya gətirən onlayn mağazayıq.
                        Məqsədimiz müştərilərimizə rahat alış-veriş, güvənli xidmət və
                        yüksək keyfiyyət təqdim etməkdir.
                    </Typography>
                </Box>

                {/* Main About Section */}
                <Grid container spacing={4} alignItems="center" sx={{ mb: 6 }}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Card
                            sx={{
                                borderRadius: 4,
                                overflow: "hidden",
                                boxShadow: 4,
                            }}
                        >
                            <Box
                                component="img"
                                src={aboutImage}
                                alt="About us"
                                sx={{
                                    width: "100%",
                                    minHeight: { xs: 260, md: 420 },
                                    objectFit: "cover",
                                    display: "block",
                                }}
                            />
                        </Card>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography variant="h4" fontWeight="bold" gutterBottom>
                            Stil, rahatlıq və keyfiyyət bir arada
                        </Typography>

                        <Typography variant="body1" color="text.secondary" paragraph>
                            Saytımız idman tərzini sevən insanlar üçün yaradılıb. Burada
                            həm gündəlik istifadə, həm də aktiv həyat tərzi üçün uyğun
                            məhsullar tapa bilərsiniz.
                        </Typography>

                        <Typography variant="body1" color="text.secondary" paragraph>
                            Biz müxtəlif məşhur brendlərin geyim və ayaqqabılarını bir
                            platformada təqdim edərək seçim imkanını genişləndiririk.
                            Məhsullarımız həm görünüş, həm rahatlıq, həm də uzunömürlülük
                            baxımından seçilir.
                        </Typography>

                        <Typography variant="body1" color="text.secondary" paragraph>
                            Məqsədimiz sadəcə məhsul satmaq deyil, istifadəçilərə rahat,
                            sürətli və etibarlı alış-veriş təcrübəsi təqdim etməkdir.
                        </Typography>

                        <Button
                            component={Link}
                            to="/products"
                            variant="contained"
                            size="large"
                            sx={{
                                mt: 2,
                                borderRadius: 3,
                                textTransform: "none",
                                px: 4,
                                py: 1.3,
                                fontWeight: "bold",
                            }}
                        >
                            Məhsullara Bax
                        </Button>
                    </Grid>
                </Grid>

                {/* Features Section */}
                <Box sx={{ mb: 6 }}>
                    <Typography
                        variant="h4"
                        fontWeight="bold"
                        textAlign="center"
                        gutterBottom
                    >
                        Niyə bizi seçməlisiniz?
                    </Typography>

                    <Typography
                        variant="body1"
                        color="text.secondary"
                        textAlign="center"
                        maxWidth="700px"
                        mx="auto"
                        sx={{ mb: 4 }}
                    >
                        Müştəri məmnuniyyəti bizim üçün ön plandadır. Buna görə xidmətimizi
                        hər zaman daha peşəkar və rahat etməyə çalışırıq.
                    </Typography>

                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <Card sx={{ height: "100%", borderRadius: 4, boxShadow: 3 }}>
                                <CardContent sx={{ textAlign: "center", py: 4 }}>
                                    <LocalShippingIcon
                                        color="primary"
                                        sx={{ fontSize: 45, mb: 2 }}
                                    />
                                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                                        Sürətli Çatdırılma
                                    </Typography>
                                    <Typography color="text.secondary">
                                        Sifarişlərinizi qısa müddətdə təhlükəsiz şəkildə sizə
                                        çatdırırıq.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid size={{ xs: 12, md: 4 }}>
                            <Card sx={{ height: "100%", borderRadius: 4, boxShadow: 3 }}>
                                <CardContent sx={{ textAlign: "center", py: 4 }}>
                                    <VerifiedIcon
                                        color="primary"
                                        sx={{ fontSize: 45, mb: 2 }}
                                    />
                                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                                        Keyfiyyətli Məhsullar
                                    </Typography>
                                    <Typography color="text.secondary">
                                        Saytımızda təqdim olunan məhsullar keyfiyyət və rahatlıq
                                        baxımından seçilir.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid size={{ xs: 12, md: 4 }}>
                            <Card sx={{ height: "100%", borderRadius: 4, boxShadow: 3 }}>
                                <CardContent sx={{ textAlign: "center", py: 4 }}>
                                    <SupportAgentIcon
                                        color="primary"
                                        sx={{ fontSize: 45, mb: 2 }}
                                    />
                                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                                        Müştəri Dəstəyi
                                    </Typography>
                                    <Typography color="text.secondary">
                                        Suallarınız və problemləriniz üçün sizə dəstək olmağa
                                        hər zaman hazırıq.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>

                {/* Stats Section */}
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Card sx={{ borderRadius: 4, textAlign: "center", boxShadow: 2 }}>
                            <CardContent>
                                <Typography variant="h4" fontWeight="bold" color="primary">
                                    500+
                                </Typography>
                                <Typography color="text.secondary">
                                    Məmnun Müştəri
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Card sx={{ borderRadius: 4, textAlign: "center", boxShadow: 2 }}>
                            <CardContent>
                                <Typography variant="h4" fontWeight="bold" color="primary">
                                    100+
                                </Typography>
                                <Typography color="text.secondary">
                                    Keyfiyyətli Məhsul
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Card sx={{ borderRadius: 4, textAlign: "center", boxShadow: 2 }}>
                            <CardContent>
                                <Typography variant="h4" fontWeight="bold" color="primary">
                                    24/7
                                </Typography>
                                <Typography color="text.secondary">
                                    Dəstək Xidməti
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Card sx={{ borderRadius: 4, textAlign: "center", boxShadow: 2 }}>
                            <CardContent>
                                <Typography variant="h4" fontWeight="bold" color="primary">
                                    99%
                                </Typography>
                                <Typography color="text.secondary">
                                    Müştəri Məmnuniyyəti
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default AboutPage;