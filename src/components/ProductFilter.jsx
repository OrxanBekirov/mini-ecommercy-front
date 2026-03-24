import React from 'react'
import { Box, TextField, MenuItem } from '@mui/material'
function ProductFilter({ searchTerm,
    setSearchTerm,
    selectedBrand,
    setSelectedBrand,
    selectedCategory,
    setSelectedCategory,
    brands = [],
    categories = [],
    sortBy,
    setSortBy,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
}) {


    return (
        <Box
            sx={{
                display: "flex",
                gap: 2,
                flexWrap: "wrap",
                mb: 4,
            }}
        >
            <TextField
                label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ minWidth: 220 }}
            />

            <TextField
                select
                label="Brand"
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                sx={{ minWidth: 180 }}
            >
                <MenuItem value="">All Brands</MenuItem>
                {brands?.map((brand) => (
                    <MenuItem key={brand.id} value={brand.id}>
                        {brand.name}
                    </MenuItem>
                ))}
            </TextField>

            <TextField
                select
                label="Category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                sx={{ minWidth: 180 }}
            >
                <MenuItem value="">All Categories</MenuItem>
                {categories?.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                        {category.name}
                    </MenuItem>
                ))}
            </TextField>
            <TextField select label="SortBy" value={sortBy} onChange={(e) => setSortBy(e.target.value)} sx={{ minWidth: 180 }}>
                <MenuItem value="">Default</MenuItem>
                <MenuItem value="priceAsc">Price Low → High</MenuItem>
                <MenuItem value="priceDesc">Price High → Low</MenuItem>
                <MenuItem value="nameAsc">Name A → Z</MenuItem>
                <MenuItem value="nameDesc">Name Z → A</MenuItem>

            </TextField>
            <TextField
                label="Min Price"
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                sx={{ minWidth: 150 }}
            />

            <TextField
                label="Max Price"
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                sx={{ minWidth: 150 }}
            />
        </Box>
    )
}

export default ProductFilter