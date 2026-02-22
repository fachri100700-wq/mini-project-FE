import axiosInstance from "../../../app/utils/axiosInstance";
import type { ApiResponse } from "../../../types/api";
import type { CouponResponseDTO } from "../coupon-response.dto";
import type { ReferralInfoResponseDTO } from "../referral-response.dto";
import type { Profile } from "../type";

export async function getProfileApi() {
  const res = await axiosInstance.get<ApiResponse<Profile>>("/profile");

  return res?.data?.data;
}

export async function getReferralInfoApi() {
  const res = await axiosInstance.get<ApiResponse<ReferralInfoResponseDTO>>("/profile/referrals");
  return res?.data?.data;
}

export async function getCouponsApi() {
  const res = await axiosInstance.get<ApiResponse<CouponResponseDTO[]>>("/profile/coupons");
  return res?.data?.data;
}