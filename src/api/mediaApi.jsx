import axiosClient from "./axiosClient";



export const uploadImage = async (formData) => {
    const response = await axiosClient.post("Media/Upload", formData, {
        headers: { "Content-Type": "multipart/form-data" }
    })

    return response.data
}

export const getProductImages = async (productId) => {

    const response = await axiosClient.get(`/Media/GetByOwner`, {
        params: {
            ownerType: 1,
            ownerId: productId
        }
    });
    return response.data;
}

export const deleteImage = async (id) => {
    const response = await axiosClient.delete(`/Media/${id}`);
    return response.data
}