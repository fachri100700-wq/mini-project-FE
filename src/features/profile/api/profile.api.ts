import axiosInstance from "../../../app/utils/axiosInstance";
import type { ApiResponse } from "../../../types/api";
import type { Profile } from "../type";

export async function getProfileApi() {
  const res = await axiosInstance.get<ApiResponse<Profile>>("/profile");

  return res?.data?.data;
}