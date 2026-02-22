import { useEffect, useState } from "react";
import { getOrganizerProfile } from "../api/OrganizerProfilePage.api";
import useAuthGuard from "../../../app/hoc/useAuthGuard";
import type { OrganizerProfile } from "../types";

export default function ProfilePage() {
  const [profile, setProfile] = useState<OrganizerProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrganizerProfile()
      .then(setProfile)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="py-10 flex justify-center">Loading...</div>;
  if (!profile) return <div className="py-10 text-center text-gray-500">Profile not found</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="label">Username</label>
          <div className="p-2 border rounded">{profile.username}</div>
        </div>

        <div>
          <label className="label">Email</label>
          <div className="p-2 border rounded">{profile.email}</div>
        </div>

        <div>
          <label className="label">Bio</label>
          <div className="p-2 border rounded">{profile.bio || "-"}</div>
        </div>

        <div>
          <label className="label">Organization Name</label>
          <div className="p-2 border rounded">{profile.displayName || "-"}</div>
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        <button
          className="btn btn-primary"
          onClick={() => window.location.href = "/dashboard/profile/edit"}
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
}