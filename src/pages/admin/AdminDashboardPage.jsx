import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAdminBrands } from '../../features/brand/brandSlice'
import { fetchAdminOrders } from '../../features/Auth/adminOrders/adminOrderSlice'
import { fetchAdminCategories } from '../../features/adminCategories/adminCatgeoriesSlice'
import { fetchAdminProducts } from '../../features/Auth/adminProducts/adminProductSlice'
import { Box, Grid, Card, CardContent, Typography, CircularProgress, Paper, Divider } from '@mui/material'

function AdminDashboardPage() {
    const distpatch = useDispatch();
    const { items: products, loading: productsLoading } = useSelector((store) => store.adminProducts);
    const { items: brands, loading: brandsLoading } = useSelector((store) => store.adminBrands);
    const { items: categories, loading: categoriesLoading } = useSelector((store) => store.adminCategory);
    const { items: orders, loading: ordersLoading } = useSelector((store) => store.adminOrders);
    useEffect(() => {
        distpatch(fetchAdminBrands);
        distpatch(fetchAdminCategories);
        distpatch(fetchAdminOrders);
        distpatch(fetchAdminProducts);

    })

    const loading = productsLoading || categoriesLoading || productsLoading || brandsLoading;
    const totalRevenue = orders.reduce((sum, order) => {
        return sum + (order.totalAmount || 0);
    }, 0);

    const recentOrders = [...orders].slice(0, 5);
    if (loading) return <CircularProgress />
    return (
        <Box>
            <Typography variant='h4' sx={{ mb: 3 }}>
                Admin Dashboard
            </Typography>
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item sx={12} sm={6} md={4}>
                    <Card>
                        <CardContent>
                            <Typography color='text.secondary'>Total Products</Typography>
                            <Typography variant='h4'>{products.length}</Typography>

                        </CardContent>
                    </Card>
                </Grid>

                <Grid item sx={12} sm={6} md={4}>
                    <Card>
                        <CardContent>
                            <Typography color='text.secondary'>Total Orders</Typography>
                            <Typography variant='h4'>{orders.length}</Typography>

                        </CardContent>
                    </Card>
                </Grid>
                <Grid item sx={12} sm={6} md={4}>
                    <Card>
                        <CardContent>
                            <Typography color='text.secondary'>Total Brands</Typography>
                            <Typography variant='h4'>{brands.length}</Typography>

                        </CardContent>
                    </Card>
                </Grid>
                <Grid item sx={12} sm={6} md={4}>
                    <Card>
                        <CardContent>
                            <Typography color='text.secondary'>Total Categories</Typography>
                            <Typography variant='h4'>{categories.length}</Typography>

                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Card sx={{ mb: 4 }}>
                <CardContent>
                    <Typography color='text.secondary'>Total Revenue</Typography>
                    <Typography variant='h4'>{totalRevenue.toFixed(2)}azn</Typography>

                </CardContent>
            </Card>
            <Typography variant='h5' sx={{ mb: 2 }}>Recent Orders</Typography>
            <Paper sx={{ p: 2 }}>
                {recentOrders.length === 0 ? (<Typography>No Recent Orders</Typography>) :
                    (recentOrders.map((order) => (
                        <Box key={order.id} sx={{ py: 1.5, borderBottom: "1px solid", borderColor: "divider" }}>
                            <Typography variant="subtitle1">
                                #{order.orderNumber}
                            </Typography>
                            <Typography variant="body2">
                                Total: {order.totalAmount} ₼
                            </Typography>
                            <Typography variant="body2">
                                Status: {order.orderStatus}
                            </Typography>
                        </Box>
                    )))}
            </Paper>
        </Box>
    )
}

export default AdminDashboardPage