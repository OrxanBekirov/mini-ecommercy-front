
import React from 'react'
import HeroSection from '../components/home/HeroSection'
import CategorySection from '../components/home/CategorySection'
import FeaturedProduct from '../components/home/FeaturedProduct'
import DiscountBannerSection from '../components/home/DiscountBannerSection'
import BrandSection from '../components/home/BrandSection'
import SponserMiniSection from '../components/home/SponserMiniSection'
import { Box } from '@mui/material'
function HomePage() {
    return (
        <Box>
            <HeroSection />
            <CategorySection />
            <FeaturedProduct />
            <DiscountBannerSection />
            <BrandSection />
            <SponserMiniSection />

        </Box>
    )
}

export default HomePage