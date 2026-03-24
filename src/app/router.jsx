import { createBrowserRouter } from "react-router-dom"

import LoginPage from "../pages/LoginPage"
import NotFoundPage from "../pages/NotFoundPage"
import PublicLayout from "../layouts/PublicLayout"
import HomePage from "../pages/HomePage"
import RegisterPage from "../pages/RegisterPage"
import ProdectedRoute from "../components/ProtectedRouter"
import CartPage from "../pages/CartPage"
import OrderPage from "../pages/OrderPage"
import ChekoutPage from "../pages/ChekoutPage"
import OrderDetailPage from "../pages/OrderDetailPage"
import AdminRoute from "../components/admin/AdminRoute"
import AdminLayout from "../layouts/AdminLayout"
import AdminDashboardPage from "../pages/admin/AdminDashboardPage"
import AdminProductsPage from "../pages/admin/AdminProductsPage"
import AdminOrdersPage from "../pages/admin/AdminOrdersPage"
import ProductDetailPage from "../pages/ProductDetailPage"
import App from "../App"
import AboutPage from "../pages/AboutPage"
import ContactPage from "../pages/ContactPage"
import ProductPage from "../pages/ProductPage"
import AdminBrandPage from "../pages/admin/AdminBrandPage"
import AdminCategoriesPage from "../pages/admin/AdminCategoriesPage"
import ProfilePage from "../pages/ProfilePage"
import WishlistPage from "../pages/WishlistPage"
import PaymentSuccessPage from "../pages/PaymentSuccessPage"
import PaymentCancelPage from "../pages/PaymentCancelPage"
export const router = createBrowserRouter([
    {
        // ƏN ÜST QAT: App.jsx burada render olunur
        path: "/",
        element: <App />,
        children: [
            // 1. PUBLIC ROUTES
            {
                path: "/",
                element: <PublicLayout />,
                children: [
                    { index: true, element: <HomePage /> },
                    { path: "products", element: <ProductPage /> },
                    { path: "about", element: <AboutPage /> },
                    { path: "contact", element: <ContactPage /> },

                    { path: "login", element: <LoginPage /> },
                    { path: "register", element: <RegisterPage /> },
                    {
                        path: "cart",
                        element: <ProdectedRoute><CartPage /></ProdectedRoute>,
                    },
                    { path: "products/:id", element: <ProductDetailPage /> },
                    {
                        path: "checkout",
                        element: <ProdectedRoute><ChekoutPage /></ProdectedRoute>,
                    },
                    {
                        path: "orders",
                        element: <ProdectedRoute><OrderPage /></ProdectedRoute>,
                    },
                    {
                        path: "orders/:id",
                        element: <ProdectedRoute><OrderDetailPage /></ProdectedRoute>,
                    },
                    {
                        path: "profile",
                        element: <ProdectedRoute><ProfilePage /></ProdectedRoute>
                    },
                    {
                        path: "wishlist",
                        element: <ProdectedRoute><WishlistPage /></ProdectedRoute>
                    },
                    {
                        path: "payment/success", element: <ProdectedRoute><PaymentSuccessPage /></ProdectedRoute>
                    },
                    {
                        path: "payment/cancel", element: <ProdectedRoute><PaymentCancelPage /></ProdectedRoute>
                    }
                ],
            },
            // 2. ADMIN ROUTES
            {
                path: "admin",
                element: (
                    <AdminRoute>
                        <AdminLayout />
                    </AdminRoute>
                ),
                children: [
                    { index: true, element: <AdminDashboardPage /> },
                    { path: "products", element: <AdminProductsPage /> },
                    { path: "orders", element: <AdminOrdersPage /> },
                    { path: "brands", element: <AdminBrandPage /> },
                    { path: "categories", element: <AdminCategoriesPage /> },

                    ,
                ],
            },
            // 3. NOT FOUND
            { path: "*", element: <NotFoundPage /> },
        ],
    },
]);


