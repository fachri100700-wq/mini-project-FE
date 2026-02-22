import { useEffect, useState } from "react";
import { getOrganizerProfile, updateOrganizerProfile } from "../api/OrganizerProfilePage.api";
import useAuthGuard from "../../../app/hoc/useAuthGuard";
import toast from "react-hot-toast";
import type { OrganizerProfile, UpdateOrganizerProfilePayload } from "../types";

export default function EditProfilePage() {
  const [profile, setProfile] = useState<OrganizerProfile | null>(null);
  const [formData, setFormData] = useState<UpdateOrganizerProfilePayload>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getOrganizerProfile()
      .then((data) => {
        setProfile(data);
        setFormData({
          username: data.username,
          phone: data.phone,
          organizationName: data.organizationName,
        });
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="py-10 flex justify-center">Loading...</div>;
  if (!profile) return <div className="py-10 text-center text-gray-500">Profile not found</div>;

  const handleChange = (field: keyof UpdateOrganizerProfilePayload, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setSaving(true);
    try {
      await updateOrganizerProfile(formData);
      toast.success("Profile updated successfully");
      window.location.href = "/dashboard/profile";
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Edit Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-control">
          <label className="label">Username</label>
          <input
            type="text"
            className="input input-bordered"
            value={formData.username || ""}
            onChange={e => handleChange("username", e.target.value)}
          />
        </div>

        <div className="form-control">
          <label className="label">Bio</label>
          <input
            type="text"
            className="input input-bordered"
            value={formData.bio || ""}
            onChange={e => handleChange("bio", e.target.value)}
          />
        </div>

        <div className="form-control md:col-span-2">
          <label className="label">Organization Name</label>
          <input
            type="text"
            className="input input-bordered"
            value={formData.displayName || ""}
            onChange={e => handleChange("displayName", e.target.value)}
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