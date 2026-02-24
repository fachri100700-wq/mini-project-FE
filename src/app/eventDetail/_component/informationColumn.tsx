import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IoChevronForward } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../../utils/axios-instance";
import useAuthStore from "../../../stores/useAuthStore";

const MAX_TICKETS_PER_TYPE = 10;

const BookingSchema = Yup.object().shape({
  selectedTickets: Yup.object()
    .test(
      "at-least-one",
      "Please select at least one ticket to proceed.",
      (value) => Object.values(value || {}).some((qty) => (qty as number) > 0),
    )
    .test(
      "max-per-type",
      `Maximum ${MAX_TICKETS_PER_TYPE} tickets per type.`,
      (value) =>
        Object.values(value || {}).every(
          (qty) => (qty as number) <= MAX_TICKETS_PER_TYPE,
        ),
    ),
  promoId: Yup.string().nullable(),
});

export default function InformationColumn({ event }: { event: any }) {
  const navigate = useNavigate();

  const auth = useAuthStore((state) => state.auth);

  // State for coupon & referral reward
  const [coupons, setCoupons] = useState<any[]>([]);
  const [referralInfo, setReferralInfo] = useState<any>(null);
  const [useCoupon, setUseCoupon] = useState(false);
  const [useReward, setUseReward] = useState(false);

  // Fetch coupons & referral rewards
  useEffect(() => {
    if (!auth) return;

    const fetchDiscounts = async () => {
      try {
        const [couponRes, rewardRes] = await Promise.all([
          axiosInstance.get("/profile/coupons"),
          axiosInstance.get("/profile/referrals"),
        ]);
        setCoupons(couponRes.data.data || []);
        setReferralInfo(rewardRes.data.data || null);
      } catch (err) {
        console.log("Failed to fetch discounts", err);
      }
    };
    fetchDiscounts();
  }, [auth]);

  const activeCoupon = coupons.length > 0 ? coupons[0] : null;
  const hasAvailableReward =
    referralInfo &&
    referralInfo.availablePoints > 0 &&
    referralInfo.history?.some(
      (r: any) => r.points > 0 && new Date(r.expireDate) > new Date(),
    );
  const activeReward = hasAvailableReward
    ? referralInfo.history.find(
      (r: any) => r.points > 0 && new Date(r.expireDate) > new Date(),
    )
    : null;

  const formik = useFormik({
    initialValues: {
      selectedTickets: {} as Record<string, number>,
      promoId: "",
    },
    validationSchema: BookingSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const ticketId = Object.keys(values.selectedTickets).find(
          (id) => values.selectedTickets[id] > 0,
        );

        if (!ticketId) return;

        const payload: any = {
          eventId: event.id,
          ticketTypeId: ticketId,
          quantity: values.selectedTickets[ticketId],
          promoId: values.promoId || null,
        };

        if (useCoupon && activeCoupon) {
          payload.couponId = activeCoupon.id;
        }
        if (useReward && activeReward) {
          payload.referralRewardId = activeReward.id;
        }

        const { data } = await axiosInstance.post("/bookings", payload);
        toast.success("Booking successful!");
        navigate(`/payment-proof/${data.data.booking.id}`);
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Booking failed.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  // Kalkulasi
  const subtotal =
    event?.ticketType?.reduce((acc: number, ticket: any) => {
      const qty = formik.values.selectedTickets[ticket.id] || 0;
      return acc + ticket.price * qty;
    }, 0) || 0;

  const activePromo = event?.promotion?.find(
    (p: any) => p.id === formik.values.promoId,
  );
  const promoDiscount = activePromo ? activePromo.discAmount : 0;
  const couponDiscount = useCoupon && activeCoupon ? activeCoupon.discount : 0;
  const rewardDiscount = useReward && activeReward ? activeReward.points : 0;
  const totalDiscount = promoDiscount + couponDiscount + rewardDiscount;
  const finalTotal = Math.max(0, subtotal - totalDiscount);
  const totalQty = Object.values(formik.values.selectedTickets).reduce(
    (a, b) => a + b,
    0,
  );

  return (
    <aside className="hidden lg:block w-[400px] flex-shrink-0">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] sticky top-24"
      >
        <div className="mb-8">
          <h3 className="text-xl font-black text-gray-900 mb-5">
            Select Tickets
          </h3>

          {formik.errors.selectedTickets && formik.submitCount > 0 && (
            <p className="text-red-500 text-xs font-bold mb-4 bg-red-50 p-2 rounded-lg">
              {formik.errors.selectedTickets as unknown as string}
            </p>
          )}

          <div className="space-y-4">
            {event?.ticketType?.map((ticket: any) => (
              <div
                key={ticket.id}
                className="bg-gray-50/50 p-4 rounded-3xl border border-gray-100 flex items-center justify-between"
              >
                <div>
                  <p className="text-sm font-black text-gray-800">
                    {ticket.ticketType}
                  </p>
                  <p className="text-blue-600 font-bold text-sm">
                    IDR {ticket.price.toLocaleString("id-ID")}
                  </p>
                  <p className="text-[10px] text-gray-400 mt-1 italic">
                    {ticket.seatAvailable} spots left
                  </p>
                </div>

                <div className="flex items-center gap-3 bg-white p-1.5 rounded-2xl border border-gray-100">
                  <button
                    type="button"
                    onClick={() => {
                      const current =
                        formik.values.selectedTickets[ticket.id] || 0;
                      formik.setFieldValue(
                        `selectedTickets.${ticket.id}`,
                        Math.max(0, current - 1),
                      );
                    }}
                    className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-400 hover:text-red-500 font-bold"
                  >
                    {" "}
                    −{" "}
                  </button>
                  <span className="w-6 text-center font-black text-gray-800">
                    {formik.values.selectedTickets[ticket.id] || 0}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      const current =
                        formik.values.selectedTickets[ticket.id] || 0;
                      if (current < ticket.seatAvailable && current < MAX_TICKETS_PER_TYPE) {
                        formik.setFieldValue(
                          `selectedTickets.${ticket.id}`,
                          current + 1,
                        );
                      }
                    }}
                    className="w-9 h-9 flex items-center justify-center rounded-xl bg-blue-600 text-white font-bold"
                  >
                    {" "}
                    +{" "}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PROMO SECTION */}
        <div className="space-y-4 pt-6 border-t border-gray-100">
          <p className="text-xs font-black text-gray-800">
            Available Promotions:
          </p>
          <div className="flex flex-wrap gap-2">
            {event?.promotion?.map((p: any) => (
              <button
                key={p.id}
                type="button"
                onClick={() => formik.setFieldValue("promoId", p.id)}
                className={`px-3 py-2 rounded-xl text-[10px] font-bold border transition-all ${formik.values.promoId === p.id
                  ? "bg-blue-600 border-blue-600 text-white"
                  : "bg-blue-50 border-blue-100 text-blue-600"
                  }`}
              >
                {" "}
                Save {p.discAmount.toLocaleString("id-ID")}{" "}
              </button>
            ))}
          </div>
          <input
            name="promoId"
            value={formik.values.promoId}
            onChange={formik.handleChange}
            placeholder="Enter Promo ID"
            className="w-full bg-gray-50 p-4 rounded-2xl border-none text-xs font-bold"
          />
        </div>

        {/* COUPON TOGGLE */}
        <div className="pt-6 border-t border-gray-100 mt-6">
          <p className="text-xs font-black text-gray-800 mb-3">Coupon</p>
          {!activeCoupon && (
            <p className="text-red-500 text-[10px] font-bold mb-2">
              You don't have any coupon available
            </p>
          )}
          <div
            className={`flex items-center justify-between bg-gray-50/50 p-4 rounded-3xl border border-gray-100 ${!activeCoupon ? "opacity-50" : ""
              }`}
          >
            <div className="flex-1">
              {activeCoupon ? (
                <>
                  <p className="text-sm font-bold text-gray-800">
                    {activeCoupon.code}
                  </p>
                  <p className="text-[10px] text-green-600 font-bold">
                    - IDR {activeCoupon.discount.toLocaleString("id-ID")}
                  </p>
                </>
              ) : (
                <p className="text-sm text-gray-400">No coupon</p>
              )}
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={useCoupon}
                disabled={!activeCoupon}
                onChange={(e) => setUseCoupon(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 peer-disabled:opacity-50 peer-disabled:cursor-not-allowed"></div>
            </label>
          </div>
        </div>

        {/* REFERRAL REWARD TOGGLE */}
        <div className="pt-6 border-t border-gray-100 mt-6">
          <p className="text-xs font-black text-gray-800 mb-3">
            Referral Reward
          </p>
          {!hasAvailableReward && (
            <p className="text-red-500 text-[10px] font-bold mb-2">
              You don't have any referral reward available
            </p>
          )}
          <div
            className={`flex items-center justify-between bg-gray-50/50 p-4 rounded-3xl border border-gray-100 ${!hasAvailableReward ? "opacity-50" : ""
              }`}
          >
            <div className="flex-1">
              {hasAvailableReward && activeReward ? (
                <>
                  <p className="text-sm font-bold text-gray-800">
                    Points: {activeReward.points.toLocaleString("id-ID")}
                  </p>
                  <p className="text-[10px] text-green-600 font-bold">
                    - IDR {activeReward.points.toLocaleString("id-ID")}
                  </p>
                </>
              ) : (
                <p className="text-sm text-gray-400">No reward points</p>
              )}
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={useReward}
                disabled={!hasAvailableReward}
                onChange={(e) => setUseReward(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 peer-disabled:opacity-50 peer-disabled:cursor-not-allowed"></div>
            </label>
          </div>
        </div>

        {/* SUMMARY */}
        <div className="mt-8 pt-6 border-t border-dashed border-gray-200 space-y-2">
          <div className="flex justify-between text-xs font-medium text-gray-500">
            <span>Subtotal ({totalQty} Ticket)</span>
            <span className="text-gray-900 font-bold">
              IDR {subtotal.toLocaleString("id-ID")}
            </span>
          </div>
          {promoDiscount > 0 && (
            <div className="flex justify-between text-xs font-medium text-green-600">
              <span>Promo Discount</span>
              <span className="font-bold">
                - IDR {promoDiscount.toLocaleString("id-ID")}
              </span>
            </div>
          )}
          {useCoupon && couponDiscount > 0 && (
            <div className="flex justify-between text-xs font-medium text-green-600">
              <span>Coupon Discount</span>
              <span className="font-bold">
                - IDR {couponDiscount.toLocaleString("id-ID")}
              </span>
            </div>
          )}
          {useReward && rewardDiscount > 0 && (
            <div className="flex justify-between text-xs font-medium text-green-600">
              <span>Referral Reward</span>
              <span className="font-bold">
                - IDR {rewardDiscount.toLocaleString("id-ID")}
              </span>
            </div>
          )}
          <div className="flex justify-between items-center pt-4">
            <p className="text-sm font-bold text-gray-400">Total Price</p>
            <p className="text-2xl font-black text-gray-900">
              IDR {finalTotal.toLocaleString("id-ID")}
            </p>
          </div>
        </div>

        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="w-full mt-6 bg-blue-600 text-white py-5 rounded-[24px] font-black text-lg shadow-2xl hover:bg-blue-700 disabled:bg-gray-300 transition-all flex items-center justify-center gap-3"
        >
          {formik.isSubmitting ? "Processing..." : "Pay Now"}{" "}
          <IoChevronForward />
        </button>
      </form>
    </aside>
  );
}
