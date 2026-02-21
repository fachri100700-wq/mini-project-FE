import axiosInstance from "../../../app/utils/axiosInstance";
import type { ApiResponse } from "../../../types/api";

export async function forgotPasswordApi(email: string) {
    const response = await axiosInstance.post<ApiResponse<any>>(
        "/auth/forgot-password",
        { email }
    );

    return response?.data?.data;
}