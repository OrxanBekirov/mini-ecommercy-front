import axiosClient from "./axiosClient";


export const getAllAdminCatgeories = async () => {
    const res = await axiosClient.get("/Categories");
    return res.data.data || res.data
}

export const createCatgeory = async (data) => {
    const res = await axiosClient.post("/Categories", data);
    return res.data.data || res.data
}

export const deleteCategory = async (id) => {
    const res = await axiosClient.delete(`/Categories/${id}`);
    return res.data.data || res.data
}
export const updateCatgeory = async (id, data) => {
    const res = await axiosClient.put(`/Categories/${id}`, data);
    return res.data.data || res.data
}