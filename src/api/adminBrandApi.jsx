import axiosClient from "./axiosClient";


export const getAllBrands = async () => {
    const res = await axiosClient.get("/Brands");
    return res.data.data || res.data
}

export const createBrandApi = async (data) => {
    const res = await axiosClient.post("/Brands", data);
    return res.data.data || res.data
}

export const deleteBrandApi = async (id) => {
    const res = await axiosClient.delete(`/Brands/${id}`);
    return res.data.data || res.data
}

export const updateBrandApi = async (id, data) => {
    const res = await axiosClient.put(`/Brands/${id}`, data);
    return res.data.data || res.data
}