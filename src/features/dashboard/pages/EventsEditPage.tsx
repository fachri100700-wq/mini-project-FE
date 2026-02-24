import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getOrganizerEventById,
  updateOrganizerEvent,
} from "../api/OrganizerEventsPage.api";
import type { OrganizerEventDetail, UpdateOrganizerEventPayload } from "../types";
import useAuthGuard from "../../../app/hoc/useAuthGuard";
import toast from "react-hot-toast";

function OrganizerEventDetailPage() {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();

  const [event, setEvent] = useState<OrganizerEventDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState<UpdateOrganizerEventPayload>({});

  // Fetch single event
  useEffect(() => {
    if (!eventId) return;

    setLoading(true);
    getOrganizerEventById(eventId)
      .then((e) => {
        setEvent(e);
        setFormData({
          eventName: e.eventName,
          location: e.location,
          description: e.description,
          seatTotal: e.seatTotal,
        });
      })
      .catch(() => {
        toast.error("Failed to fetch event");
      })
      .finally(() => setLoading(false));
  }, [eventId]);

  if (loading)
    return <div className="py-10 flex justify-center">Loading...</div>;
  if (!event)
    return (
      <div className="py-10 text-center text-gray-500">Event not found</div>
    );

  const handleChange = (field: keyof UpdateOrganizerEventPayload, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setSaving(true);
    try {
      await updateOrganizerEvent(eventId!, formData);
      toast.success("Event updated successfully");
      navigate("/dashboard/events");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{event.eventName}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Event Name */}
        <div className="form-control">
          <label className="label">Event Name</label>
          <input
            type="text"
            className="input input-bordered"
            value={formData.eventName || ""}
            onChange={(e) => handleChange("eventName", e.target.value)}
          />
        </div>

        {/* Location */}
        <div className="form-control">
          <label className="label">Location</label>
          <input
            type="text"
            className="input input-bordered"
            value={formData.location || ""}
            onChange={(e) => handleChange("location", e.target.value)}
          />
        </div>

        {/* Event Type */}
        <div className="form-control">
          <label className="label">Event Type</label>
          <select
            className="select select-bordered"
            value={formData.eventType || event.eventType}
            onChange={(e) => handleChange("eventType", e.target.value)}
          >
            <option value="FREE">FREE</option>
            <option value="PAID">PAID</option>
          </select>
        </div>

        {/* Event Category */}
        <div className="form-control">
          <label className="label">Event Category</label>
          <select
            className="select select-bordered"
            value={formData.eventCategory || event.eventCategory}
            onChange={(e) => handleChange("eventCategory", e.target.value)}
          >
            <option value="CONCERT">CONCERT</option>
            <option value="SEMINAR">SEMINAR</option>
            <option value="SPORTS">SPORTS</option>
            <option value="WORKSHOP">WORKSHOP</option>
            <option value="EXHIBITION">EXHIBITION</option>
            <option value="THEATER">THEATER</option>
            <option value="FESTIVAL">FESTIVAL</option>
            <option value="OTHER">OTHER</option>
          </select>
        </div>

        {/* Description */}
        <div className="form-control md:col-span-2">
          <label className="label">Description</label>
          <textarea
            className="textarea textarea-bordered"
            value={formData.description || ""}
            onChange={(e) => handleChange("description", e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          className={`btn btn-primary ${saving ? "loading" : ""}`}
          onClick={handleSubmit}
          disabled={saving}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default useAuthGuard(OrganizerEventDetailPage, ["organizer"]);