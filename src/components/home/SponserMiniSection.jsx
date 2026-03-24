import React from 'react'
import { Box, Button, Container, Paper, Typography } from "@mui/material";
import sponsorImage from "../../assets/HomePage/SponserSection/fitnes.jpg";
function SponserMiniSection() {
    const handleRedirect = () => {
        window.open("https://example.com", "_blank");
    };
    return (
        <Box
            sx={{
                py: 10,
                backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${sponsorImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                color: "#fff",
            }}
        >
            <Container>
                <Paper
                    elevation={3}
                    sx={{
                        p: { xs: 3, md: 5 },
                        borderRadius: 4,
                        textAlign: "center",
                    }}
                >
                    <Typography
                        variant="overline"
                        sx={{
                            color: "text.secondary",
                            letterSpacing: 2,
                        }}
                    >
                        Sponsored
                    </Typography>

                    <Typography
                        variant="h5"
                        fontWeight="bold"
                        sx={{ mt: 1, mb: 2 }}
                    >
                        Fitness Club Special Offer
                    </Typography>

                    <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{
                            maxWidth: 700,
                            mx: "auto",
                            mb: 3,
                            lineHeight: 1.8,
                        }}
                    >
                        Sağlam həyat tərzi üçün premium fitness üzvlüyü və xüsusi
                        kampaniyalardan yararlan.
                    </Typography>

                    <Button
                        variant="outlined"
                        onClick={handleRedirect}
                        sx={{ borderRadius: 3, px: 4 }}
                    >
                        Learn More
                    </Button>
                </Paper>
            </Container>
        </Box>
    )
}

export default SponserMiniSection