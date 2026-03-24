
import axiosClient from "./axiosClient";


export const getAllProducts = async () => {
    const response = await axiosClient.get("/Products");
    return response.data

}
export const getProductById = async (id) => {
    const response = await axiosClient.get(`/Products/${id}`);
    return response.data
}