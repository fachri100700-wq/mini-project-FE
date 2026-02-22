import axiosInstance from "../../../app/utils/axiosInstance";
import type { ApiResponse } from "../../../types/api";

type ResetPasswordPayload = {
    token: string;
    newPassword: string;
};

export async function resetPasswordApi(payload: ResetPasswordPayload) {
    const response = await axiosInstance.post<ApiResponse<any>>(
        "/auth/reset-password",
        payload
    );

    return response?.data?.data;
}