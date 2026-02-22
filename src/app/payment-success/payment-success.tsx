import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  IoCheckmarkCircle,
  IoTimeOutline,
  IoTicketOutline,
  IoChatbubbleEllipsesOutline,
} from "react-icons/io5";
import axiosInstance from "../../utils/axios-instance";
import Loading from "../../component/loading";
import useAuthGuard from "../hoc/useAuthGuard";

export default function PaymentSuccess() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const { data } = await axiosInstance.get(`/bookings/${id}`);
        setBooking(data.data);
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false);
      }
    };
    fetchBooking();
  }, [id]);

  if (loading) return <Loading />;
  if (!booking)
    return <div className="p-20 text-center">Data not found...</div>;

  // Itung-itungan harga sesuai data BE lu
  const totalPaid =
    booking.ticketType.price * booking.quantity -
    (booking.promo?.discAmount || 0);

  // Ambil data transaksi terbaru
  const latestTransaction = booking.transactions?.[0];

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-16 px-4 flex flex-col items-center">
      {/* Icon Success Animatif */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping opacity-25"></div>
        <div className="relative bg-blue-50 p-6 rounded-full">
          <IoTimeOutline className="text-blue-600 text-5xl" />
        </div>
      </div>

      {/* Header Text */}
      <div className="text-center max-w-md mb-10 space-y-3">
        <h1 className="text-3xl font-black text-gray-900">
          Payment Proof Submitted
        </h1>
        <p className="text-gray-500 text-sm leading-relaxed">
          Thank you for your payment. The event organizer is currently verifying
          your transaction. This process usually takes up to{" "}
          <span className="font-bold text-gray-700">24 hours</span>.
        </p>
      </div>

      {/* Info Card (Sesuai Screenshot 2) */}
      <div className="w-full max-w-lg bg-white rounded-[32px] shadow-xl shadow-blue-900/5 border border-gray-100 p-8 mb-8 relative overflow-hidden">
        {/* Status Badge */}
        <div className="flex justify-between items-start mb-8">
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Transaction ID
            </p>
            <p className="font-black text-gray-900">
              EH-{booking.id.slice(0, 5).toUpperCase()}-
              {latestTransaction?.id.slice(0, 4).toUpperCase()}
            </p>
          </div>
          <div className="flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
            <span className="text-xs font-bold uppercase tracking-wider">
              Waiting for Confirmation
            </span>
          </div>
        </div>

        {/* Detail List */}
        <div className="space-y-5">
          <DetailRow label="Event Name" value={booking.event.eventName} />
          <DetailRow
            label="Amount Paid"
            value={`IDR ${totalPaid.toLocaleString("id-ID")}`}
            isBlue
          />
          <DetailRow
            label="Submission Date"
            value={
              new Date(
                latestTransaction?.createdAt || Date.now(),
              ).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              }) +
              " • " +
              new Date(
                latestTransaction?.createdAt || Date.now(),
              ).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })
            }
          />
        </div>

        {/* Decorative Element */}
        <div className="absolute -bottom-6 -right-6 text-gray-50 opacity-[0.03]">
          <IoCheckmarkCircle size={200} />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-lg">
        <button
          onClick={() => navigate("/")}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2"
        >
          <IoTicketOutline size={20} />
          Back to My Events
        </button>
        <button
          onClick={() =>
            window.open("https://wa.me/your-support-number", "_blank")
          }
          className="flex-1 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2"
        >
          <IoChatbubbleEllipsesOutline size={20} />
          Contact Support
        </button>
      </div>

      <p className="mt-8 text-[11px] text-gray-400">
        We'll notify you via email as soon as your payment is approved.
      </p>
    </div>
  );
}

// Sub-component Helper
function DetailRow({
  label,
  value,
  isBlue = false,
}: {
  label: string;
  value: string;
  isBlue?: boolean;
}) {
  return (
    <div className="flex justify-between items-center border-b border-gray-50 pb-4">
      <span className="text-sm text-gray-400 font-medium">{label}</span>
      <span
        className={`text-sm font-bold ${isBlue ? "text-blue-600" : "text-gray-900"}`}
      >
        {value}
      </span>
    </div>
  );
}
