import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../features/Auth/authSlice";
import productReducer from "../features/products/productSlice"
import cartReducer from "../features/carts/cartSlice"
import orderReducer from "../features/order/orderSlice"
import paymentReducer from "../features/payments/payment.Slice"
import adminProducsReducer from "../features/Auth/adminProducts/adminProductSlice"
import adminOrdersReducer from "../features/Auth/adminOrders/adminOrderSlice"
import mediaReducer from "../features/media/mediaSlice"
import themeReducer from "../features/thema/themaSlice"
import adminBrandReducer from "../features/brand/brandSlice";
import categoryReducer from "../features/categories/categorySlice";
import adminCategoryReducer from "../features/adminCategories/adminCatgeoriesSlice";
import wishlistReducer from "../features/wishlist/wishlistSlice";
export const store = configureStore({
    reducer: {
        auth: authReducer,
        product: productReducer,
        cart: cartReducer,
        orders: orderReducer,
        payment: paymentReducer,
        adminProducts: adminProducsReducer,
        adminOrders: adminOrdersReducer,
        media: mediaReducer,
        theme: themeReducer,
        adminBrands: adminBrandReducer,
        category: categoryReducer,
        adminCategory: adminCategoryReducer,
        wishlist: wishlistReducer,
    },
});