import axiosClient from "./axiosClient";

export const loginRequest = (data) =>
    axiosClient.post("/auth/login", data);

export const registerRequest = (data) =>
    axiosClient.post("/auth/register", data);