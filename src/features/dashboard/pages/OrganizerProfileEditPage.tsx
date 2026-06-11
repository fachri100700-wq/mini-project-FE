import { useEffect, useState } from "react";
import { getOrganizerProfile, updateOrganizerProfile } from "../api/OrganizerProfilePage.api";
import useAuthGuard from "../../../app/hoc/useAuthGuard";
import toast from "react-hot-toast";
import type { OrganizerProfile, UpdateOrganizerProfilePayload } from "../types";
import { IoArrowBackOutline, IoSaveOutline, IoPersonOutline, IoCreateOutline, IoImageOutline, IoBusinessOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function EditProfilePage() {
  const [profile, setProfile] = useState<OrganizerProfile | null>(null);
  const [formData, setFormData] = useState<UpdateOrganizerProfilePayload>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getOrganizerProfile()
      .then((data) => {
        setProfile(data);
        setFormData({
          username: data.username,
          displayName: data.displayName || "",
          bio: data.bio || "",
          avatarUrl: data.avatarUrl || "",
        });
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <span className="loading loading-spinner loading-lg text-blue-600" />
      </div>
    );
  }

  if (!profile) return <div className="py-20 text-center text-gray-400 font-bold text-xl">Profile not found</div>;

  const handleChange = (field: keyof UpdateOrganizerProfilePayload, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setSaving(true);
    try {
      await updateOrganizerProfile(formData);
      toast.success("Profile updated successfully");
      navigate("/dashboard/profile");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <header className="mb-10 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/dashboard/profile")}
            className="p-3 bg-white hover:bg-gray-100 text-gray-400 rounded-2xl transition-all shadow-sm border border-gray-100"
          >
            <IoArrowBackOutline size={20} />
          </button>
          <div>
            <h1 className="text-black text-4xl font-bold">Edit Profile</h1>
            <p className="text-gray-500 mt-1 font-medium">Update your organizer information and public profile.</p>
          </div>
        </div>
        <button
          onClick={handleSubmit}
          disabled={saving}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-2xl shadow-lg shadow-blue-100 transition-all active:scale-95 flex items-center gap-2 disabled:bg-gray-300 disabled:shadow-none"
        >
          {saving ? (
            <span className="loading loading-spinner loading-xs" />
          ) : (
            <IoSaveOutline size={20} />
          )}
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </header>

      <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 p-8 md:p-12 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          <EditField
            label="Username"
            icon={<IoPersonOutline />}
            value={formData.username || ""}
            onChange={(v: string) => handleChange("username", v)}
            placeholder="e.g. johndoe"
          />

          <EditField
            label="Organization Name"
            icon={<IoBusinessOutline />}
            value={formData.displayName || ""}
            onChange={(v: string) => handleChange("displayName", v)}
            placeholder="e.g. Acme Events"
          />

          <EditField
            label="Avatar URL"
            icon={<IoImageOutline />}
            value={formData.avatarUrl || ""}
            onChange={(v: string) => handleChange("avatarUrl", v)}
            placeholder="https://example.com/image.png"
          />

          <div className="md:col-span-2 space-y-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
              <IoCreateOutline size={14} className="text-blue-500" />
              Biography
            </label>
            <textarea
              className="w-full p-5 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-50 focus:bg-white focus:border-blue-100 transition-all text-gray-700 font-medium placeholder:text-gray-300 resize-none h-32"
              value={formData.bio || ""}
              onChange={(e) => handleChange("bio", e.target.value)}
              placeholder="Tell attendees about your organization..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function EditField({ label, icon, value, onChange, placeholder }: any) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
        <span className="text-blue-500">{icon}</span>
        {label}
      </label>
      <input
        type="text"
        className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-50 focus:bg-white focus:border-blue-100 transition-all text-gray-700 font-bold placeholder:text-gray-200"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}

export default useAuthGuard(EditProfilePage, ["organizer"]);
