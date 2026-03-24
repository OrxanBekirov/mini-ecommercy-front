import { AppBar, Button, Toolbar, Typography, Box } from '@mui/material'
import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { logout } from '../features/Auth/authSlice'
import { useDispatch } from 'react-redux'
function AdminLayout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(logout())
        navigate("/login")
    }
    return (
        <>
            <AppBar position='static' color='secondary'>
                <Toolbar>
                    <Typography variant='h6' component={Link} to="/admin" sx={{ color: 'inherit', textDecoration: "none" }}>
                        Admin Panel
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />

                    <Button color="inherit" component={Link} to="/"> Home</Button>
                    <Button color='inherit' component={Link} to="/admin/products">Products</Button>
                    <Button color='inherit' component={Link} to="/admin/orders">Orders</Button>
                    <Button color='inherit' component={Link} to="/admin/brands">Brands</Button>
                    <Button color='inherit' component={Link} to="/admin/categories">Categories</Button>

                    <Button color="inherit" onClick={handleLogout}>
                        Logout
                    </Button>
                </Toolbar>

            </AppBar>
            <Box sx={{ p: 3 }}>
                <Outlet />
            </Box>

        </>
    )
}

export default AdminLayout