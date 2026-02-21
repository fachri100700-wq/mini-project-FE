import { Link } from "react-router-dom";
import { useProfile } from "../../features/profile/hooks/useProfile";
import { useReferralInfo } from "../../features/profile/hooks/useReferralInfo";
import { useCoupons } from "../../features/profile/hooks/useCoupons";
import { useState } from "react";
import { FiClipboard } from "react-icons/fi";

export default function Profile() {
  const profileState = useProfile();
  const { data: referralInfo, loading: loadingReferral, nextExpiringReward } = useReferralInfo();
  const { data: coupons, loading: loadingCoupons } = useCoupons();
  
  const [copyToast, setCopyToast] = useState(false);

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
    <div className="min-h-screen bg-gray-100 py-8 px-4">

      {/* Profile Card */}
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between bg-white shadow-md rounded-lg p-4 w-full max-w-3xl mx-auto">
          {/* Avatar */}
          <div className="flex-shrink-0">
            {profile?.avatarUrl ? (
              <img
                src={profile?.avatarUrl}
                alt={profile?.username}
                className="w-20 h-20 rounded-full object-cover"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center text-xl font-bold text-gray-600">
                {profile?.username.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          {/* Username & Info */}
          <div className="mt-3 sm:mt-0 sm:ml-4 flex-1 flex flex-col justify-center">
            <h2 className="text-xl font-semibold">{profile?.username}</h2>
            <p className="badge badge-outline badge-primary text-primary-500">{profile?.role}</p>
            <p className="text-gray-400 text-sm">Joined: {new Date(profile?.createdAt).toLocaleDateString()}</p>
          </div>

          {/* Edit & Change Password Buttons */}
          <div className="mt-3 sm:mt-0 sm:ml-4 flex-shrink-0 flex flex-col items-end gap-2 w-full sm:w-auto">
            <Link
              to="/profile/edit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full text-center"
            >
              Edit Profile
            </Link>

            <Link
              to="/profile/change-password"
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition w-full text-center"
            >
              Change Password
            </Link>
          </div>
        </div>
      </div>

      {/* Points and Referral Program */}
      <div className="max-w-3xl mx-auto mt-6 flex flex-col sm:flex-row gap-4">
        {/* Referral Points Section */}
        <div className="flex-1 flex flex-col gap-2">
          <p className="text-xl font-semibold text-gray-600">Points Balance</p>
          <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-start justify-center flex-1 h-full">
            <p className="text-sm font-medium text-gray-500">Total Points</p>
            <p className="text-2xl font-bold text-green-600">
              {(referralInfo?.availablePoints ?? 0).toLocaleString()}
            </p>
            {nextExpiringReward && (
              <p className="text-gray-500 text-xs mt-1 text-red-500">
                ⚠ {nextExpiringReward.points} points will expire on{" "}
                {new Date(nextExpiringReward.expireDate).toLocaleDateString()}
              </p>
            )}
            <p className="text-gray-500 text-xs mt-1">
              You can redeem your points for discounts or rewards!
            </p>
          </div>
        </div>

        {/* Referral Code Section */}
        <div className="flex-1 flex flex-col gap-2">
          <p className="text-xl font-semibold text-gray-600">Referral Program</p>
          <div className="bg-white shadow-md rounded-lg p-4 flex flex-col gap-2 flex-1 h-full">
            <p className="text-sm font-medium text-gray-500">Your Unique Code</p>
            <div className="flex w-full items-center gap-2">
              <input
                type="text"
                value={profile?.referralCode ?? ""}
                readOnly
                className="input input-bordered flex-1 font-mono cursor-pointer"
              />
              <button
                onClick={() => {
                  navigator.clipboard.writeText(profile?.referralCode ?? "");
                  setCopyToast(true);
                  setTimeout(() => setCopyToast(false), 2000);
                }}
                className="btn btn-primary btn-square"
              >
                <FiClipboard className="h-5 w-5" />
              </button>
            </div>
            <p className="text-gray-500 text-xs">
              Share this code with your friends to earn points and unlock rewards faster!
            </p>
          </div>
        </div>
      </div>

      {/* Coupons Section */}
      <div className="max-w-3xl mx-auto mt-6 flex flex-col gap-2">
        {/* Title outside the card */}
        <p className="text-xl font-semibold text-gray-600">Your Coupons</p>

        {/* Coupons Card */}
        <div className="bg-white shadow-md rounded-lg p-4">
          {loadingCoupons ? (
            <div className="flex items-center justify-center py-8">
              <span className="loading loading-spinner loading-lg" />
            </div>
          ) : coupons?.length ? (
            <div className="flex flex-col gap-3 max-h-96 overflow-y-auto">
              {coupons.map((coupon) => (
                <div
                  key={coupon.id}
                  className="flex justify-between items-center bg-gray-50 px-4 py-3 rounded border border-gray-200"
                >
                  <div className="flex-1">
                    <p className="font-mono font-semibold">{coupon.code}</p>
                    <p className="text-sm text-gray-500">Rp. {coupon.discount.toLocaleString()}</p>
                  </div>
                  <p className="text-sm text-gray-400">
                    Exp: {new Date(coupon.expiredDate).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">
              You don’t have any active coupons.
            </p>
          )}
        </div>
      </div>
    

    {/* Toast Notification */}
    {copyToast && (
      <div className="toast toast-end toast-top">
        <div className="alert alert-success shadow-lg">
          <span>Referral code copied!</span>
        </div>
      </div>
    )}
    </div>
  );
}