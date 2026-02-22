import axiosInstance from "../../../../app/utils/axiosInstance";
import type { ApiResponse } from "../../../../types/api";
import type { Profile } from "../../type";

export type UpdateProfilePayload = {
  username: string;
  avatarUrl?: string | null;
};

export async function updateProfileApi(payload: UpdateProfilePayload) {
  const res = await axiosInstance.patch<ApiResponse<Pick<Profile, "username" | "avatarUrl">>>(
    "/profile",
    payload
  );

  return res?.data?.data;
}