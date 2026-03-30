import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    fetchAdminProducts,
    createAdminProduct,
    deleteAdminProduct,
    updateAdminProduct,
} from "../../features/Auth/adminProducts/adminProductSlice";

import AdminProductTable from "../../components/admin/AdminProductTable";
import ProductForm from "../../components/ProductForm";

import { getAllBrands } from "../../api/adminBrandApi";
import { getAllCategory } from "../../api/categoryApi"
import ProductImageManager from "../../components/admin/ProductImageManager";
import {
    Typography,
    CircularProgress,
    Alert,
    Box,
    Button,
} from "@mui/material";

const AdminProductsPage = () => {
    const dispatch = useDispatch();
    const { items, loading, error, creating } = useSelector(
        (s) => s.adminProducts
    );

    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            dispatch(fetchAdminProducts());
            try {
                const [brandRes, catRes] = await Promise.all([getAllBrands(), getAllCategory()]);
                setBrands(brandRes?.data?.data || brandRes?.data || brandRes);
                setCategories(catRes?.data?.data || catRes?.data || catRes);
            } catch (err) {
                console.error("Data fetch error", err);
            }
        };
        fetchData();
    }, [dispatch]);




    const handleEdit = (product) => {
        setEditingProduct(product);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Məhsulu silmək istədiyinizə əminsiniz?")) return;
        await dispatch(deleteAdminProduct(id));
    };
    const handleCreateProduct = async (values) => {
        // API-nin gözlədiyi təmiz DTO
        const payload = {
            name: values.name,
            description: values.description,
            price: Number(values.price),    // String gəlirsə rəqəmə çeviririk
            stockQuantity: Number(values.stockQuantity) || 0,    // String gəlirsə rəqəmə çeviririk
            categoryId: values.categoryId,  // Seçilən kateqoriya ID-si
            brandId: values.brandId,        // Seçilən brend ID-si
        };

        console.log("Yaradılan Məhsul:", payload); // Bazaya nə getdiyini yoxlamaq üçün

        await dispatch(createAdminProduct(payload));
        setShowForm(false);
    };
    const handleUpdateProduct = async (values) => {
        if (!editingProduct) return;

        const payload = {
            name: values.name,
            description: values.description,
            price: Number(values.price),
            stockQuantity: Number(values.stockQuantity) || 0,
            categoryId: values.categoryId,
            brandId: values.brandId,
        };

        await dispatch(
            updateAdminProduct({
                id: editingProduct.id, // ID ayrıca gedir
                dto: payload,          // Məlumatlar obyekt daxilində
            })
        );

        setEditingProduct(null);
        setShowForm(false);
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setEditingProduct(null);
    };

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <Box>
            <Box
                sx={{
                    mb: 2,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Typography variant="h5">Admin Products</Typography>

                <Button
                    variant="contained"
                    onClick={() => {
                        setEditingProduct(null);
                        setShowForm(!showForm);
                    }}
                >
                    {showForm ? "Close Form" : "Add Product"}
                </Button>
            </Box>

            {showForm && (
                <ProductForm
                    onSubmit={editingProduct ? handleUpdateProduct : handleCreateProduct}
                    brands={brands}
                    categories={categories}
                    loading={creating}
                    initialData={editingProduct}
                    isEdit={Boolean(editingProduct)}
                    onCancel={handleCloseForm}
                />
            )}
            {editingProduct && (
                <Box sx={{ mt: 4, pt: 2, borderTop: '1px solid #ddd' }}>
                    <ProductImageManager productId={editingProduct.id} />
                </Box>
            )}

            <AdminProductTable
                products={items}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </Box>
    );
};

export default AdminProductsPage;