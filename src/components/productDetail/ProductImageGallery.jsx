import React from 'react'
import { useState } from 'react'
import { Box, Card } from '@mui/material'
function ProductImageGallery({ images }) {
    const [selectedImage, setSelectedImage] = useState(images?.[0]);
    return (
        <>
            <Card sx={{ p: 2 }}>
                <Box
                    component="img"
                    src={selectedImage}
                    sx={{
                        width: "100%",
                        height: 420,
                        objectFit: "contain",
                    }}
                />
            </Card>
            <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                {images?.map((img, index) => (
                    <Box
                        key={index}
                        component="img"
                        src={img}
                        onClick={() => setSelectedImage(img)}
                        sx={{
                            width: 80,
                            height: 80,
                            objectFit: "cover",
                            cursor: "pointer",
                            border: selectedImage === img ? "2px solid blue" : "1px solid #ddd",
                        }}
                    />
                ))}
            </Box>
        </>
    )
}

export default ProductImageGallery