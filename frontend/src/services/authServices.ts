import axiosInstance from "@/lib/axios";
import type { Credentials, ICustomResponse, IUser } from "@/types/types";

// Base API URL
const BASE_URL = "/auth";

export const fetchMe = async (): Promise<ICustomResponse<IUser>> => {
    const { data } = await axiosInstance.post(`${BASE_URL}/fetch-me`);
    return data
}

// User Registration
export const registerUser = async (credentials: Credentials): Promise<ICustomResponse<
    { id: string; email: string; role: string }>> => {
    const { data } = await axiosInstance.post(`${BASE_URL}/register`, credentials);
    return data;
};

// User Login
export const loginUser = async (credentials: Credentials): Promise<ICustomResponse<{ id: string; email: string; role: string }>> => {
    const { data } = await axiosInstance.post(`${BASE_URL}/login`, credentials);
    return data;
};

// Forget Password
export const forgetPassword = async (email: string) => {
    const { data } = await axiosInstance.post(`${BASE_URL}/forget-password`, {
        email,
    });
    return data;
};

// Reset Password
export const resetPassword = async (token: string, newPassword: string) => {
    const { data } = await axiosInstance.put(
        `${BASE_URL}/reset-password/${token}`,
        { newPassword }
    );
    return data;
}

// Logout User
export const logoutUser = async () => {
    const { data } = await axiosInstance.post(`${BASE_URL}/logout`);
    return data;
};

// Refresh Token
export const refreshToken = async () => {
    const { data } = await axiosInstance.post(`${BASE_URL}/refresh-token`);
    return data;
};