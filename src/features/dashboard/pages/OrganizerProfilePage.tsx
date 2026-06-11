import { useEffect, useState } from "react";
import { getOrganizerProfile } from "../api/OrganizerProfilePage.api";
import useAuthGuard from "../../../app/hoc/useAuthGuard";
import type { OrganizerProfile } from "../types";
import { IoPersonOutline, IoMailOutline, IoBusinessOutline, IoCreateOutline, IoInformationCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const [profile, setProfile] = useState<OrganizerProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getOrganizerProfile()
      .then(setProfile)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <span className="loading loading-spinner loading-lg text-blue-600" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <IoPersonOutline className="mx-auto text-gray-200 mb-4" size={64} />
          <p className="text-gray-400 font-bold text-xl">Profile not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <header className="mb-10 flex justify-between items-center">
        <div>
          <h1 className="text-black text-4xl font-bold">Organizer Profile</h1>
          <p className="text-gray-500 mt-2 font-medium">Your public and internal identity as an event organizer.</p>
        </div>
        <button
          onClick={() => navigate("/dashboard/profile/edit")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-2xl shadow-lg shadow-blue-100 transition-all active:scale-95 flex items-center gap-2"
        >
          <IoCreateOutline size={20} />
          Edit Profile
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Avatar & Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100 text-center">
            <div className="w-32 h-32 bg-blue-50 rounded-full mx-auto mb-6 flex items-center justify-center text-blue-600 font-black text-4xl border-4 border-white shadow-xl">
              {profile.avatarUrl ? (
                <img src={profile.avatarUrl} alt="Avatar" className="w-full h-full rounded-full object-cover" />
              ) : (
                profile.username.slice(0, 2).toUpperCase()
              )}
            </div>
            <h2 className="text-xl font-black text-gray-900">{profile.displayName || profile.username}</h2>
            <p className="text-blue-600 font-bold text-sm mt-1 uppercase tracking-widest">Organizer</p>
            <div className="mt-8 pt-8 border-t border-gray-50 text-left space-y-4">
              <div className="flex items-center gap-3 text-gray-500">
                <IoMailOutline size={18} className="text-gray-300" />
                <span className="text-sm font-medium">{profile.email}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-500">
                <IoPersonOutline size={18} className="text-gray-300" />
                <span className="text-sm font-medium">@{profile.username}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Info */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100">
            <h3 className="text-lg font-black text-gray-900 mb-8 flex items-center gap-2">
              <IoInformationCircleOutline size={20} className="text-blue-600" />
              Basic Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ProfileItem label="Username" value={profile.username} icon={<IoPersonOutline />} />
              <ProfileItem label="Email Address" value={profile.email} icon={<IoMailOutline />} />
              <ProfileItem label="Organization Name" value={profile.displayName || "Not specified"} icon={<IoBusinessOutline />} />
              <div className="md:col-span-2">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Biography</p>
                <div className="bg-gray-50 p-4 rounded-2xl text-gray-600 font-medium text-sm border border-gray-100 italic">
                  {profile.bio || "No biography provided yet."}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileItem({ label, value, icon }: any) {
  return (
    <div className="space-y-2">
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">{label}</p>
      <div className="flex items-center gap-4 bg-gray-50 px-5 py-4 rounded-2xl border border-gray-100 group hover:bg-white hover:border-blue-100 transition-all">
        <span className="text-gray-300 group-hover:text-blue-500 transition-colors">{icon}</span>
        <span className="font-bold text-gray-700">{value}</span>
      </div>
    </div>
  );
}

export default useAuthGuard(ProfilePage, ["organizer"]);