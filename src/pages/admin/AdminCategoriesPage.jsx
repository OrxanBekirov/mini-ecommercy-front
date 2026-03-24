import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    fetchAdminCategories,
    createAdminCategory,
    updateAdminCategory,
    deleteAdminCategory,
} from "../../features/adminCategories/adminCatgeoriesSlice";

import CategoryForm from "../../components/admin/CategoryForm";


import { Typography, CircularProgress, Box, Button } from "@mui/material";
import AdminProductTable from "../../components/admin/AdminProductTable";
import AdminCategoryTable from "../../components/admin/AdminCategoryTable";

const AdminCategoriesPage = () => {
    const dispatch = useDispatch();
    const { items, loading } = useSelector((store) => store.adminCategory);

    const [showForm, setShowForm] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);

    useEffect(() => {
        dispatch(fetchAdminCategories());
    }, [dispatch]);

    const handleEdit = (category) => {
        setEditingCategory(category);
        setShowForm(true);
    };

    const handleDelete = (id) => {
        dispatch(deleteAdminCategory(id));
    };

    const handleSubmit = (values) => {
        if (editingCategory) {
            dispatch(updateAdminCategory({ id: editingCategory.id, dto: values }));
        } else {
            dispatch(createAdminCategory(values));
        }

        setEditingCategory(null);
        setShowForm(false);
    };

    if (loading) return <CircularProgress />;

    return (
        <Box>
            <Typography variant="h5" sx={{ mb: 2 }}>
                Admin Categories
            </Typography>

            <Button
                variant="contained"
                sx={{ mb: 2 }}
                onClick={() => {
                    setEditingCategory(null);
                    setShowForm(!showForm);
                }}
            >
                Add Category
            </Button>

            {showForm && (
                <CategoryForm
                    onSubmit={handleSubmit}
                    initialData={editingCategory}
                    isEdit={Boolean(editingCategory)}
                    onCancel={() => setShowForm(false)}
                />
            )}

            <AdminCategoryTable
                categories={items}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </Box>
    );
};

export default AdminCategoriesPage;