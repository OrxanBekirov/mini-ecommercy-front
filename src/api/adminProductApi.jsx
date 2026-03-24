import axiosClient from "./axiosClient";

export const getAllAdminProducts = async () => {
    const response = await axiosClient.get("/Products");

    return response.data

}


export const createProduct = async (data) => {
    const response = await axiosClient.post("/Products", data);
    return response.data
}

export const deleteProduct = async (id) => {
    const response = await axiosClient.delete(`/Products/${id}`);
    return response.data
}

export const updateProduct = async (id, data) => {
    const response = await axiosClient.put(`/Products/${id}`, data);
    return response.data
}