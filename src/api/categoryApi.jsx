
import axiosClient from "./axiosClient";

export const getAllCategory = async () => {
    const response = await axiosClient.get("/Categories");
    return response.data
}

export const createCategoryApi = async (data) => {
    const response = await axiosClient.post("/Categories", data);
    return response.data;
};

export const updateCategoryApi = async (id, data) => {
    const response = await axiosClient.put(`/Categories/${id}`, data);
    return response.data;
};

export const deleteCategoryApi = async (id) => {
    const response = await axiosClient.delete(`/Categories/${id}`);
    return response.data;
};