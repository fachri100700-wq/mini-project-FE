import axiosInstance from "../../../../app/utils/axiosInstance";

export async function updateAvatarApi(file: File) {
  const formData = new FormData();
  formData.append("avatar", file);

  const res = await axiosInstance.patch("/profile/avatar", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res?.data?.data;
}