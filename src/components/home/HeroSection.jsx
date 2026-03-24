import React from 'react'
import { Box, Typography, Button, Container } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import heroImage from "../../assets/HomePage/heroSection/jpeg.webp"
function HeroSection() {
    const navigate = useNavigate();
    return (
        <Box
            sx={{
                minHeight: { xs: "70vh", md: "85vh" },
                display: "flex",
                alignItems: "center",
                backgroundImage: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url(${heroImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                color: "#fff",
            }}
        >
            <Container>
                <Box sx={{ maxWidth: 650 }}>
                    <Typography
                        variant="h2"
                        sx={{
                            fontWeight: "bold",
                            mb: 2,
                            fontSize: { xs: "2.2rem", sm: "2.8rem", md: "4rem" },
                            lineHeight: 1.2,
                        }}
                    >
                        New Season Sports Collection
                    </Typography>

                    <Typography
                        variant="h6"
                        sx={{
                            mb: 4,
                            color: "rgba(255,255,255,0.85)",
                            lineHeight: 1.8,
                            fontSize: { xs: "1rem", md: "1.15rem" },
                        }}
                    >
                        Premium idman ayaqqabıları, geyimlər və aksesuarlarla öz stilini
                        və rahatlığını yüksəlt.
                    </Typography>

                    <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={() => navigate("/products")}
                            sx={{
                                px: 4,
                                py: 1.5,
                                borderRadius: "12px",
                                fontWeight: "bold",
                            }}
                        >
                            Shop Now
                        </Button>

                        <Button
                            variant="outlined"
                            size="large"
                            onClick={() => navigate("/products")}
                            sx={{
                                px: 4,
                                py: 1.5,
                                borderRadius: "12px",
                                fontWeight: "bold",
                                borderColor: "#fff",
                                color: "#fff",
                                "&:hover": {
                                    borderColor: "#fff",
                                    backgroundColor: "rgba(255,255,255,0.08)",
                                },
                            }}
                        >
                            Explore More
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}

export default HeroSection