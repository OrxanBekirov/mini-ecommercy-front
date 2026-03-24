import axiosClient from "./axiosClient";



export const sendContactMessageApi = async (formData) => {
    const res = await axiosClient.post("/Contact/send", formData,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    return res.data || res.data.data

}