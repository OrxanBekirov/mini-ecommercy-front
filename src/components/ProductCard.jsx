import React, { useEffect, useState } from 'react'
import {
    Card,
    CardContent,
    Typography,
    Button,
    Box,
    CardMedia,
    Chip,
    IconButton
} from '@mui/material'
import { addCartItem } from '../features/carts/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { addToWishlistThunk } from '../features/wishlist/wishlistSlice'

function ProductCard({ product }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { items } = useSelector((store) => store.wishlist)

    const isInWishlist = items.some((x) => x.productId === product.id)

    const [currentImage, setCurrentImage] = useState(0)
    const [isHovered, setIsHovered] = useState(false)

    const handleAddWishlist = () => {
        dispatch(addToWishlistThunk(product.id))
    }

    const handleAddCart = () => {
        dispatch(
            addCartItem({
                productId: product.id,
                quantity: 1,
            })
        )
        toast.success('Product Added to Cart')
    }

    const handleDetails = () => {
        navigate(`/products/${product.id}`)
    }

    const imagesArray =
        (product.imageUrls && product.imageUrls.length > 0
            ? product.imageUrls
            : null) ||
        (product.productImages?.length > 0
            ? product.productImages.map((img) => img.imageUrl || img.url)
            : null) ||
        (product.mainImageUrl ? [product.mainImageUrl] : []) ||
        []

    useEffect(() => {
        if (!isHovered || imagesArray.length <= 1) {
            setCurrentImage(0)
            return
        }

        const interval = setInterval(() => {
            setCurrentImage((prevIndex) => (prevIndex + 1) % imagesArray.length)
        }, 2000)

        return () => clearInterval(interval)
    }, [isHovered, imagesArray.length])

    return (
        <Card
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: '0.3s',
                '&:hover': { transform: 'translateY(-5px)' },
                boxShadow: 6,
            }}
        >
            <Box
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                sx={{
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                <IconButton
                    onClick={handleAddWishlist}
                    sx={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        backgroundColor: 'white',
                        zIndex: 2,
                        '&:hover': {
                            backgroundColor: 'white',
                        },
                    }}
                >
                    {isInWishlist ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
                </IconButton>

                <CardMedia
                    component="img"
                    height="220"
                    image={imagesArray[currentImage] || 'https://via.placeholder.com/220'}
                    alt={product.name}
                    sx={{
                        objectFit: 'cover',
                        transition: 'opacity 0.3s',
                    }}
                />
            </Box>

            <CardContent
                sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Typography
                    variant="h6"
                    sx={{
                        minHeight: 56,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                    }}
                >
                    {product.name}
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        mt: 1,
                        minHeight: 60,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                    }}
                >
                    {product.description}
                </Typography>

                <Typography sx={{ mt: 1, fontWeight: 600 }}>
                    {product.price} ₼
                </Typography>

                <Box sx={{ mt: 1 }}>
                    {product.stockQuantity > 0 ? (
                        <Chip label="In Stock" color="success" size="small" />
                    ) : (
                        <Chip label="Out of Stock" color="error" size="small" />
                    )}
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        gap: 1,
                        mt: 'auto',
                        pt: 2,
                    }}
                >
                    <Button variant="outlined" fullWidth onClick={handleDetails}>
                        Details
                    </Button>

                    <Button
                        variant="contained"
                        fullWidth
                        onClick={handleAddCart}
                        disabled={product.stockQuantity === 0}
                    >
                        Add
                    </Button>
                </Box>
            </CardContent>
        </Card>
    )
}

export default ProductCard