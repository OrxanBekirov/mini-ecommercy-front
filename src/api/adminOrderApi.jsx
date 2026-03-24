import axiosClient from "./axiosClient";


export const getAllAdminOrders = async () => {
    const response = await axiosClient.get("/Orders");
    return response.data
}

export const updateOrderStatus = async (id, statusValue) => {
    const response = await axiosClient.put(`/Orders/${id}/status`, { status: Number(statusValue) });
    return response.data
}