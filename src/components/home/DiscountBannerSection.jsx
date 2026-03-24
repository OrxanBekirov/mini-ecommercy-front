import React from 'react'
import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
function DiscountBannerSection() {
    const navigate = useNavigate();
    return (
        <Box
            sx={{
                py: 10,
                background: "linear-gradient(135deg,#1f2937,#111827)",
                color: "#fff",
            }}
        >
            <Container>
                <Box
                    sx={{
                        textAlign: "center",
                        maxWidth: 700,
                        margin: "0 auto",
                    }}
                >
                    <Typography
                        variant="h4"
                        fontWeight="bold"
                        sx={{ mb: 2 }}
                    >
                        Spring Sale
                    </Typography>

                    <Typography
                        variant="h3"
                        fontWeight="bold"
                        sx={{ mb: 3 }}
                    >
                        Up to 40% Off
                    </Typography>

                    <Typography
                        variant="body1"
                        sx={{
                            mb: 4,
                            color: "hsla(0, 0%, 100%, 0.80)",
                            lineHeight: 1.7,
                        }}
                    >
                        Seçilmiş idman ayaqqabıları və geyimlərdə böyük endirimlər.
                        Kampaniya məhdud müddət üçün keçərlidir.
                    </Typography>

                    <Button
                        variant="contained"
                        size="large"
                        onClick={() => navigate("/products")}
                        sx={{
                            px: 5,
                            py: 1.5,
                            borderRadius: 3,
                            fontWeight: "bold",
                        }}
                    >
                        Shop Now
                    </Button>
                </Box>
            </Container>
        </Box>
    )
}

export default DiscountBannerSection