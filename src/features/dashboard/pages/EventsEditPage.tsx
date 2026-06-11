import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getOrganizerEventById,
  updateOrganizerEvent,
} from "../api/OrganizerEventsPage.api";
import type { OrganizerEventDetail, UpdateOrganizerEventPayload } from "../types";
import useAuthGuard from "../../../app/hoc/useAuthGuard";
import toast from "react-hot-toast";
import { IoArrowBackOutline, IoSaveOutline, IoInformationCircleOutline, IoLocationOutline, IoLayersOutline, IoTicketOutline, IoPeopleOutline, IoCreateOutline } from "react-icons/io5";

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
          eventType: e.eventType,
          eventCategory: e.eventCategory,
        });
      })
      .catch(() => {
        toast.error("Failed to fetch event");
      })
      .finally(() => setLoading(false));
  }, [eventId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <span className="loading loading-spinner loading-lg text-blue-600" />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <IoLayersOutline className="mx-auto text-gray-200 mb-4" size={64} />
          <p className="text-gray-400 font-bold text-xl">Event not found</p>
        </div>
      </div>
    );
  }

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
    <div className="min-h-screen bg-gray-50 p-8">
      <header className="mb-10 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/dashboard/events")}
            className="p-3 bg-white hover:bg-gray-100 text-gray-400 rounded-2xl transition-all shadow-sm border border-gray-100"
          >
            <IoArrowBackOutline size={20} />
          </button>
          <div>
            <h1 className="text-black text-4xl font-bold">Edit Event</h1>
            <p className="text-gray-500 mt-1 font-medium">Refine your event details to attract more attendees.</p>
          </div>
        </div>
        <button
          onClick={handleSubmit}
          disabled={saving}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-2xl shadow-lg shadow-blue-100 transition-all active:scale-95 flex items-center gap-2 disabled:bg-gray-300"
        >
          {saving ? (
            <span className="loading loading-spinner loading-xs" />
          ) : (
            <IoSaveOutline size={20} />
          )}
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </header>

      <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 p-8 md:p-12 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          <div className="md:col-span-2 flex items-center gap-2 border-b border-gray-50 pb-4 mb-2">
            <IoInformationCircleOutline className="text-blue-500" size={24} />
            <h2 className="text-lg font-black text-gray-900">General Information</h2>
          </div>

          <EditField
            label="Event Name"
            icon={<IoCreateOutline />}
            value={formData.eventName || ""}
            onChange={(v: string) => handleChange("eventName", v)}
            placeholder="Enter event name"
          />

          <EditField
            label="Location"
            icon={<IoLocationOutline />}
            value={formData.location || ""}
            onChange={(v: string) => handleChange("location", v)}
            placeholder="Enter venue location"
          />

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
              <IoTicketOutline size={14} className="text-blue-500" />
              Event Type
            </label>
            <select
              className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-50 focus:bg-white focus:border-blue-100 transition-all text-gray-700 font-bold appearance-none cursor-pointer"
              value={formData.eventType || event.eventType}
              onChange={(e) => handleChange("eventType", e.target.value)}
            >
              <option value="FREE">FREE</option>
              <option value="PAID">PAID</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
              <IoLayersOutline size={14} className="text-blue-500" />
              Category
            </label>
            <select
              className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-50 focus:bg-white focus:border-blue-100 transition-all text-gray-700 font-bold appearance-none cursor-pointer"
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

          <EditField
            label="Total Seats"
            icon={<IoPeopleOutline />}
            value={formData.seatTotal?.toString() || ""}
            onChange={(v: string) => handleChange("seatTotal", parseInt(v) || 0)}
            placeholder="e.g. 100"
            type="number"
          />

          <div className="md:col-span-2 space-y-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
              <IoCreateOutline size={14} className="text-blue-500" />
              Event Description
            </label>
            <textarea
              className="w-full p-6 bg-gray-50 border border-gray-100 rounded-[24px] focus:outline-none focus:ring-4 focus:ring-blue-50 focus:bg-white focus:border-blue-100 transition-all text-gray-700 font-medium placeholder:text-gray-300 resize-none h-48"
              value={formData.description || ""}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Describe what people can expect at your event..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function EditField({ label, icon, value, onChange, placeholder, type = "text" }: any) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
        <span className="text-blue-500">{icon}</span>
        {label}
      </label>
      <input
        type={type}
        className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-50 focus:bg-white focus:border-blue-100 transition-all text-gray-700 font-bold placeholder:text-gray-200"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}

export default useAuthGuard(OrganizerEventDetailPage, ["organizer"]);
