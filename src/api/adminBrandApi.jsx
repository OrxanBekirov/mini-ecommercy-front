import axiosClient from "./axiosClient";


export const getAllBrands = async () => {
    const res = await axiosClient.get("/brands");
    return res.data.data || res.data
}

export const createBrandApi = async (data) => {
    const res = await axiosClient.post("/brands", data);
    return res.data.data || res.data
}

export const deleteBrandApi = async (id) => {
    const res = await axiosClient.delete(`/brands/${id}`);
    return res.data.data || res.data
}

export const updateBrandApi = async (id, data) => {
    const res = await axiosClient.put(`/brands/${id}`, data);
    return res.data.data || res.data
}