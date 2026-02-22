import axiosInstance from "../../../../app/utils/axiosInstance";
import type { ApiResponse } from "../../../../types/api";

type ChangePasswordPayload = {
  currentPassword: string;
  newPassword: string;
};

export async function changePasswordApi(payload: ChangePasswordPayload) {
  const response = await axiosInstance.patch<ApiResponse<any>>(
    "/profile/change-password",
    payload
  );

  return response?.data?.data;
}