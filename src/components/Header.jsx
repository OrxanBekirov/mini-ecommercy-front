import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../features/Auth/authSlice";
import { toggleTheme } from "../features/thema/themaSlice";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    Button,
    IconButton,
    Badge,
    Menu,
    MenuItem,
    Avatar,
} from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useState } from "react";

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { cart } = useSelector((store) => store.cart);
    const { user, token, role } = useSelector((store) => store.auth || {});
    const mode = useSelector((store) => store.theme.mode)

    const cartCount = cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        dispatch(logout());
        setAnchorEl(null);
        navigate("/login");
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: "#1e1e1e", color: "white" }}>
            <Toolbar>
                {/* 1. Logo */}
                <Typography
                    variant="h6"
                    component={Link}
                    to="/"
                    sx={{
                        textDecoration: "none",
                        color: "white",
                        fontWeight: "bold",
                        marginRight: 4 // Logo ilə linklər arasında məsafə
                    }}
                >
                    E-Commerce
                </Typography>

                {/* 2. Naviqasiya Linkləri (Home, Products, About, Contact) */}
                <Box sx={{ display: "flex", gap: 2 }}>
                    <Button color="inherit" component={Link} to="/">
                        Home
                    </Button>

                    <Button color="inherit" component={Link} to="/products">
                        Products
                    </Button>

                    <Button color="inherit" component={Link} to="/about">
                        About
                    </Button>

                    <Button color="inherit" component={Link} to="/contact">
                        Contact
                    </Button>
                    <Button color="inherit" component={Link} to="/wishlist">
                        Wishlist
                    </Button>
                </Box>

                {/* Boşluq yaradır ki, Cart və User sağ tərəfə keçsin */}
                <Box sx={{ flexGrow: 1 }} />

                {/* 3. Səbət (Cart) */}
                <IconButton color="inherit" component={Link} to="/cart" sx={{ mr: 1 }}>
                    <Badge badgeContent={cartCount} color="error">
                        <ShoppingCartIcon />
                    </Badge>
                </IconButton>
                <IconButton color="inherit" onClick={() => dispatch(toggleTheme())}>
                    {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
                </IconButton>
                {/* 4. İstifadəçi Bölməsi */}
                {!(user || token) ? (
                    <Box sx={{ display: "flex", gap: 1 }}>
                        <Button
                            variant="outlined"
                            color="inherit"
                            component={Link}
                            to="/login"
                            sx={{ borderColor: "rgba(255,255,255,0.5)" }}
                        >
                            Login
                        </Button>

                        <Button
                            variant="contained"
                            color="secondary"
                            component={Link}
                            to="/register"
                        >
                            Register
                        </Button>
                    </Box>
                ) : (
                    <>
                        <IconButton color="inherit" onClick={handleMenuOpen}>
                            <Avatar src={user?.profileImageUrl || ""}>
                                {user?.fullName ? user.fullName[0].toUpperCase() : "U"}
                            </Avatar>
                        </IconButton>

                        <Menu
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                        >
                            <MenuItem
                                onClick={() => {
                                    navigate("/profile");
                                    handleClose();
                                }}
                            >

                                Profile
                            </MenuItem>
                            <MenuItem onClick={() => { handleClose(); navigate("/orders"); }}>
                                My Orders
                            </MenuItem>

                            {role === "Admin" && (
                                <MenuItem onClick={() => { handleClose(); navigate("/admin"); }}>
                                    Admin Panel
                                </MenuItem>
                            )}

                            <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
                                Logout
                            </MenuItem>
                        </Menu>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Header;