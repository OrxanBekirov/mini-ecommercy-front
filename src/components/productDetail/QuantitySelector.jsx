import React from "react"; // Yalnız bir dəfə
import { Box, IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

function QuantitySelector({ quantity, setQuantity, maxQuantity }) {
    const handleIncrease = () => {
        if (quantity < maxQuantity) {
            setQuantity((prev) => prev + 1);
        }
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity((prev) => prev - 1);
        }
    };

    return (
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography fontWeight="bold">Miqdar:</Typography>

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid #ddd",
                    borderRadius: 2,
                    px: 1,
                }}
            >
                {/* Kəmiyyət 1 olduqda azaltma düyməsini deaktiv edirik */}
                <IconButton onClick={handleDecrease} disabled={quantity <= 1}>
                    <RemoveIcon />
                </IconButton>

                <Typography sx={{ minWidth: 30, textAlign: "center" }}>
                    {quantity}
                </Typography>

                {/* Kəmiyyət maxQuantity-yə çatdıqda artırma düyməsini deaktiv edirik */}
                <IconButton onClick={handleIncrease} disabled={quantity >= maxQuantity}>
                    <AddIcon />
                </IconButton>
            </Box>
        </Box>
    );
}

export default QuantitySelector;