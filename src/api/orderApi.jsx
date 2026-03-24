import axios from "axios";
import axiosClient from "./axiosClient";

export const createOrderFromCart = async (data) => {
    const response = await axiosClient.post("/Orders/from-cart", data);
    return response.data;
};

export const getMyOrdersApi = async () => {
    const response = await axiosClient.get("Orders/my");
    return response.data
}


export const cancelOrderApi = async (orderId, reason) => {
    const response = await axiosClient.post(`/Orders/${orderId}/cancel`, { Reason: reason });
    return response.data
}

export const getOrderByIdApi = async (id) => {
    const response = await axiosClient.get(`/Orders/${id}`);
    return response.data
}
