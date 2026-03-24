import axios from "axios";
import axiosClient from "./axiosClient";




export const createCheckoutSessionApi = async (orderId) => {
    const response = await axiosClient.post("/Payments/create-checkout-session", {
        orderId,
    });

    return response.data;
};





export const markPaymentSuccess = (orderId) =>
    axiosClient.post(`/payments/mark-success`, {
        orderId,
        providerReference: "Test-payment"
    });