
import axiosClient from "./axiosClient";



export const getWishlistApi = async () => {
    const response = await axiosClient.get("/Wishlist");
    return response.data.data || response.data
}

export const addToWishlistApi = async (productId) => {
    const response = await axiosClient.post(`/Wishlist/add/${productId}`);
    return response.data.data || response.data
}
export const removeFromWishlistApi = async (productId) => {
    const response = await axiosClient.delete(`/Wishlist/remove/${productId}`);
    return response.data.data || response.data
}