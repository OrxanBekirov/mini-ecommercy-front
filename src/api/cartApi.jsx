
import axiosClient from "./axiosClient";
export const getAllCarts = () => axiosClient.get("/carts")
export const addToCart = (cartItem) => axiosClient.post("/carts", cartItem);
export const updateCartItem = (data) => axiosClient.put("/carts/update", data);

export const removeCartItem = (productId) => axiosClient.delete(`/carts/remove/${productId}`);