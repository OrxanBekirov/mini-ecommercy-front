import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminOrders, changeOrderStatus } from "../../features/Auth/adminOrders/adminOrderSlice";
import AdminOrderTable from "../../components/admin/adminOrdertable"
import {
    Typography,
    CircularProgress,
    Alert,

    Box,
} from "@mui/material";

const AdminOrdersPage = () => {
    const dispatch = useDispatch();
    const { items, loading, error } = useSelector((store) => store.adminOrders);

    const handleStatusChange = (orderId, newStatus) => {
        dispatch(changeOrderStatus({ id: orderId, status: newStatus }))
            .unwrap() // Xətanı tutmaq üçün (opsional)
            .then(() => {
                // Uğurlu olduqda datanı yeniləyirik
                dispatch(fetchAdminOrders());
            })
            .catch((err) => {
                alert("Xəta baş verdi: " + err);
            });
    };
    useEffect(() => {
        dispatch(fetchAdminOrders());
    }, []);

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <Box>
            <Typography variant="h5" sx={{ mb: 2 }}>
                Admin Orders
            </Typography>

            <AdminOrderTable
                orders={items}
                onStatusChange={handleStatusChange}
            />
        </Box>
    );
};

export default AdminOrdersPage;