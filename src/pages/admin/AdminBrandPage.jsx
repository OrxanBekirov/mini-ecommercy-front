import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import {
    fetchAdminBrands,
    createAdminBrand,
    updateAdminBrand,
    deleteAdminBrand,
} from "../../features/brand/brandSlice";

import BrandForm from "../../components/admin/BrandForm";
import AdminBrandTable from "../../components/admin/AdminBrandTable";

import { Typography, CircularProgress, Alert, Box, Button } from "@mui/material";

const AdminBrandsPage = () => {
    const dispatch = useDispatch();
    const { items, loading, error, saving } = useSelector((store) => store.adminBrands);

    const [showForm, setShowForm] = useState(false);
    const [editingBrand, setEditingBrand] = useState(null);

    useEffect(() => {
        dispatch(fetchAdminBrands());
    }, [dispatch]);

    const handleEdit = (brand) => {
        setEditingBrand(brand);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Brand silinsin?")) return;
        await dispatch(deleteAdminBrand(id));
    };

    const handleCreate = async (values) => {
        await dispatch(createAdminBrand(values));
        setShowForm(false);
    };

    const handleUpdate = async (values) => {
        if (!editingBrand) return;

        await dispatch(
            updateAdminBrand({
                id: editingBrand.id,
                dto: values,
            })
        );

        setEditingBrand(null);
        setShowForm(false);
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setEditingBrand(null);
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
                <Typography variant="h5">Admin Brands</Typography>

                <Button
                    variant="contained"
                    onClick={() => {
                        setEditingBrand(null);
                        setShowForm(!showForm);
                    }}
                >
                    {showForm ? "Close Form" : "Add Brand"}
                </Button>
            </Box>

            {showForm && (
                <BrandForm
                    onSubmit={editingBrand ? handleUpdate : handleCreate}
                    loading={saving}
                    initialData={editingBrand}
                    isEdit={Boolean(editingBrand)}
                    onCancel={handleCloseForm}
                />
            )}

            <AdminBrandTable
                brands={items}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </Box>
    );
};

export default AdminBrandsPage;