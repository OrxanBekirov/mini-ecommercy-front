import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, CircularProgress, Alert, Box, Typography, Pagination } from "@mui/material";
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../features/products/productSlice";
import { getAllBrands } from "../api/adminBrandApi"
import { getAllCategory } from "../api/categoryApi"

import ProductFilter from "../components/ProductFilter";
function ProductPage() {
    const dispatch = useDispatch();
    const { items = [], loading, error } = useSelector((store) => store.product);

    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedBrand, setSelectedBrand] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [page, setPage] = useState(1);
    const productsPerPage = 8;
    useEffect(() => {
        setPage(1);
    }, [searchTerm, selectedBrand, selectedCategory, sortBy, minPrice, maxPrice]);

    useEffect(() => {
        dispatch(fetchProducts());
        fetchBrands();
        fetchCategories();
    }, [dispatch]);
    const fetchBrands = async () => {
        try {
            const res = await getAllBrands();
            setBrands(res || [])
        } catch (error) {
            console.log("Brandsfetch err", error)
        }
    }
    const fetchCategories = async () => {
        try {
            const res = await getAllCategory();
            setCategories(res.data.data || res.data)
        } catch (error) {
            console.log("Categoriesfetch err", error)
        }
    }
    const filteredProducts = useMemo(() => {
        let result = [...items];
        result = result.filter((product) => {
            const matchesSearch =
                product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description?.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesBrand = selectedBrand
                ? product.brandId === Number(selectedBrand)
                : true;

            const matchesCategory = selectedCategory
                ? product.categoryId === Number(selectedCategory)
                : true;
            const matchesMinPrice = minPrice !== "" ? product.price >= Number(minPrice) : true;
            const matchesMaxPrice = maxPrice !== "" ? product.price <= Number(maxPrice) : true;
            return (matchesSearch && matchesBrand && matchesCategory && matchesMinPrice && matchesMaxPrice);
        });
        if (sortBy === "priceAsc") {
            result.sort((a, b) => a.price - b.price);
        }

        if (sortBy === "priceDesc") {
            result.sort((a, b) => b.price - a.price);
        }

        if (sortBy === "nameAsc") {
            result.sort((a, b) => a.name.localeCompare(b.name));
        }

        if (sortBy === "nameDesc") {
            result.sort((a, b) => b.name.localeCompare(a.name));
        }

        return result;
    }, [
        items,
        searchTerm,
        selectedBrand,
        selectedCategory,
        sortBy,
        minPrice,
        maxPrice,
    ]);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const paginatedProducts = filteredProducts.slice((page - 1) * productsPerPage, page * productsPerPage);

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;
    return (
        <Box>
            <Typography
                variant="h4"
                sx={{ mb: 4, textAlign: "center" }}
            >
                Our Products
            </Typography>
            <ProductFilter
                searchTerm={searchTerm} setSearchTerm={setSearchTerm} selectedBrand={selectedBrand} setSelectedBrand={setSelectedBrand} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} setCategories={setCategories} brands={brands} categories={categories} sortBy={sortBy}
                setSortBy={setSortBy}
                minPrice={minPrice}
                setMinPrice={setMinPrice}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice} />
            <Grid container spacing={3}>
                {paginatedProducts.map((product) => (
                    <Grid
                        item
                        key={product.id}
                        xs={12}
                        sm={6}
                        md={4}
                        lg={3}
                    >
                        <ProductCard product={product} />
                    </Grid>
                ))}
            </Grid>
            {totalPages > 1 && (
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={(e, value) => setPage(value)}
                    color="primary"
                    sx={{ mt: 4, display: "flex", justifyContent: "center" }}
                />
            )}
            {filteredProducts.length === 0 && (
                <Typography sx={{ mt: 4, textAlign: "center" }}>No Products Founds</Typography>
            )}
        </Box>
    )
}

export default ProductPage