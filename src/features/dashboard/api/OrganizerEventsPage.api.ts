import axiosInstance from "../../../app/utils/axiosInstance";
import type { OrganizerEvent, OrganizerEventDetail, UpdateOrganizerEventPayload } from "../types";

export async function getOrganizerEvents() {
  const res = await axiosInstance.get("/dashboard/events");
  return res.data.data as OrganizerEvent[];
}

export async function getOrganizerEventById(eventId: string) {
  const res = await axiosInstance.get(`/dashboard/events/${eventId}`);
  return res.data.data as OrganizerEventDetail;
}

export async function updateOrganizerEvent(
  eventId: string,
  payload: UpdateOrganizerEventPayload
) {
  const res = await axiosInstance.patch(
    `/dashboard/events/${eventId}`,
    payload
  );

  return res.data.data;
}