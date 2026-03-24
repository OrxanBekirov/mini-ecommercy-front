import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductImages, uploadProductImage, deleteProductImage, clearMedia } from '../../features/media/mediaSlice'
import { Box, Button, Card, CardContent, Typography, Checkbox, FormControlLabel, CircularProgress } from '@mui/material'
function ProductImageManager({ productId }) {
    const dispatch = useDispatch();
    const { items, loading, uploading } = useSelector((store) => store.media);

    const [isMain, setisMain] = useState(false)
    const [file, setFile] = useState(null)

    useEffect(() => {
        if (productId) {
            dispatch(fetchProductImages(productId))
        }
        return () => {
            dispatch(clearMedia())
        }
    }, [dispatch, productId])

    const handleUpload = async () => {
        if (!file) return;

        await dispatch(
            uploadProductImage({
                file,
                productId,
                isMain: false
            })
        );

        setFile(null);
        setisMain(false);
    };
    const handleDelete = async (imageId) => {
        if (!window.confirm("Sekil silmek isteidiyinize eminsiniz?")) return;
        await dispatch(deleteProductImage({ imageId, productId }));
    }
    return (
        <Box sx={{ mt: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
                Product Images
            </Typography>

            <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 3, flexWrap: "wrap" }}>
                <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                />

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={isMain}
                            onChange={(e) => isMain(e.target.checked)}
                        />
                    }
                    label="Main image"
                />

                <Button
                    variant="contained"
                    onClick={handleUpload}
                    disabled={!file || uploading}
                >
                    {uploading ? "Uploading..." : "Upload"}
                </Button>
            </Box>

            {loading ? (
                <CircularProgress />
            ) : items.length === 0 ? (
                <Typography>Şəkil yoxdur</Typography>
            ) : (
                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                    {items.map((img) => (
                        <Card key={img.id} sx={{ width: 220 }}>
                            <CardContent>
                                <img
                                    src={img.url}
                                    alt="product"
                                    style={{
                                        width: "100%",
                                        height: "140px",
                                        objectFit: "cover",
                                        borderRadius: "8px",
                                    }}
                                />

                                <Typography sx={{ mt: 1 }}>
                                    {img.isMain ? "Main Image" : "Secondary"}
                                </Typography>

                                <Button
                                    color="error"
                                    variant="outlined"
                                    size="small"
                                    sx={{ mt: 1 }}
                                    onClick={() => handleDelete(img.id)}
                                >
                                    Delete
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            )}
        </Box>
    )
}

export default ProductImageManager