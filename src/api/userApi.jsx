import axiosClient from "./axiosClient";


export const uploadProfileImageApi = async (formData) => {
    const response = await axiosClient.post("/Users/upload-profile-image", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data.data || response.data;
};

export const getMyProfileImageApi = async () => {
    const response = await axiosClient.get("/Users/my-profile-image");
    return response.data;
};