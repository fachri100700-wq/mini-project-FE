import { Link } from "react-router-dom";
import { useProfile } from "../../features/profile/hooks/useProfile";

export default function Profile() {
  const profileState = useProfile();

  if (profileState.status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  if (profileState.status === "error") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-error">Profile not found</p>
      </div>
    );
  }

  const { profile } = profileState;

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="card w-full max-w-md bg-base-100 shadow-xl border border-zinc-300">
        <div className="card-body space-y-4">
          <h2 className="card-title justify-center text-2xl">My Profile</h2>

          <div className="flex flex-col items-center space-y-2">
            <img
              src={profile.avatarUrl ?? "/avatar-placeholder.png"}
              alt="avatar"
              className="w-24 h-24 rounded-full border"
            />
            <p className="font-semibold text-lg">{profile.username}</p>
            <p className="text-sm text-zinc-500">{profile.email}</p>
          </div>

          <div className="divider" />

          <div className="text-sm space-y-1">
            <p>
              <span className="font-semibold">Role:</span> {profile.role}
            </p>
            <p>
              <span className="font-semibold">Referral Code:</span>{" "}
              {profile.referralCode}
            </p>
            <p>
              <span className="font-semibold">Joined:</span>{" "}
              {new Date(profile.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div className="card-actions flex-col gap-2 mt-4">
            <Link to="/profile/edit" className="btn btn-outline w-full">
              Edit Profile
            </Link>
            <Link
              to="/profile/change-password"
              className="btn btn-outline w-full"
            >
              Change Password
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}