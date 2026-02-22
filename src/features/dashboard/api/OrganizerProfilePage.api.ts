import axiosInstance from "../../../app/utils/axiosInstance";
import type { OrganizerProfile, UpdateOrganizerProfilePayload } from "../types";

export async function getOrganizerProfile() {
  const res = await axiosInstance.get("/dashboard/profile");
  return res.data.data as OrganizerProfile;
}

export async function updateOrganizerProfile(payload: UpdateOrganizerProfilePayload) {
  const res = await axiosInstance.patch("/dashboard/profile", payload);
  return res.data.data as OrganizerProfile;
}