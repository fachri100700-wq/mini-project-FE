import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../.././utils/axios-instance";
import Loading from "../../component/loading";
import ImageUpload from "./_component/image-upload";
import { IoChevronBack, IoCopyOutline, IoCalendarOutline, IoLocationOutline } from "react-icons/io5";
import { IoMdCreate } from "react-icons/io";
import useAuthGuard from "../hoc/useAuthGuard";

export default function PaymentProof() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Countdown state
  const [timeLeft, setTimeLeft] = useState({ hours: "00", minutes: "00", seconds: "00" });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const { data } = await axiosInstance.get(`/bookings/${id}`);
        setBooking(data.data);
      } catch (err) {
        toast.error("Gagal ambil data booking");
      } finally {
        setLoading(false);
      }
    };
    fetchBooking();
  }, [id]);

  // Real countdown timer based on transaction expiry
  useEffect(() => {
    if (!booking?.transactions?.[0]?.expiry) return;

    const expiryDate = new Date(booking.transactions[0].expiry).getTime();

    const tick = () => {
      const now = Date.now();
      const diff = expiryDate - now;

      if (diff <= 0) {
        setTimeLeft({ hours: "00", minutes: "00", seconds: "00" });
        setIsExpired(true);
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
      });
    };

    tick(); // initial
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [booking]);

  const handleUpload = async () => {
    const transactionsId = booking?.transactions[0]?.id;
    if (!transactionsId) return toast.error("ID Transaksi gak nemu!");

    setIsUploading(true);
    const formData = new FormData();
    formData.append("payment-proof", selectedFile!);
    formData.append("bookingId", booking.id);
    formData.append("userId", String(booking.userId));

    try {
      await axiosInstance.patch(
        `/transactions/upload/${transactionsId}`,
        formData,
      );
      toast.success("Payment proof submitted successfully!");
      navigate(`/payment-success/${booking.id}`);
    } catch (err: any) {
      toast.error("API Error: " + err.response?.data?.message);
    } finally {
      setIsUploading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.info("Copied to clipboard!");
  };

  if (loading) return <Loading />;
  if (!booking) return <div className="p-20 text-center">Data empty...</div>;

  // Fix: use totalPrice from booking (already calculated by backend)
  const totalAmount = booking.totalPrice;

  return (
    <div className="mt-10 min-h-screen bg-[#F8FAFC] py-12 px-4">
      <div className="max-w-xl mx-auto flex flex-col gap-6">
        {/* Header Section */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">
            Complete Your Payment
          </h1>
          <p className="text-sm text-gray-500">
            Please upload your payment proof before the timer expires to secure
            your tickets.
          </p>
        </div>

        {/* Countdown Timer - Real */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">
            Time Remaining
          </span>
          <div className="flex gap-4">
            <TimerBox value={timeLeft.hours} label="Hours" expired={isExpired} />
            <span className={`text-2xl font-bold self-center ${isExpired ? "text-red-500" : "text-blue-600"}`}>
              :
            </span>
            <TimerBox value={timeLeft.minutes} label="Minutes" expired={isExpired} />
            <span className={`text-2xl font-bold self-center ${isExpired ? "text-red-500" : "text-blue-600"}`}>
              :
            </span>
            <TimerBox value={timeLeft.seconds} label="Seconds" expired={isExpired} />
          </div>
          {isExpired && (
            <p className="text-red-500 text-xs font-bold mt-3">Payment time has expired!</p>
          )}
        </div>

        {/* Event Detail Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            Your Booking
          </span>
          <div className="flex gap-4">
            {/* Event Image */}
            {booking.event.imageUrl && (
              <div className="w-28 h-28 rounded-xl overflow-hidden flex-shrink-0">
                <img
                  src={booking.event.imageUrl}
                  alt={booking.event.eventName}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            {/* Event Info */}
            <div className="flex flex-col justify-center gap-1.5 flex-1 min-w-0">
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                ⊕ {booking.ticketType.ticketType}
              </span>
              <h3 className="font-bold text-gray-900 text-base leading-tight truncate">
                {booking.event.eventName}
              </h3>
              <div className="flex items-center gap-1.5 text-gray-500">
                <IoCalendarOutline className="text-sm text-blue-600 flex-shrink-0" />
                <span className="text-xs">
                  {new Date(booking.event.startDate).toLocaleDateString("en-US", {
                    weekday: "long",
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}{" "}
                  • {booking.event.startDate.split("T")[1]?.slice(0, 5)} -{" "}
                  {booking.event.endDate.split("T")[1]?.slice(0, 5)}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-500">
                <IoLocationOutline className="text-sm text-blue-600 flex-shrink-0" />
                <span className="text-xs">{booking.event.location}</span>
              </div>
            </div>
          </div>
          {/* Edit Selection Button */}
          <button
            type="button"
            onClick={() => navigate(`/event/${booking.event.id}`)}
            className="w-full flex items-center justify-center gap-2 py-2.5 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 text-sm font-bold text-gray-600 transition-colors"
          >
            <IoMdCreate className="text-base" />
            Edit Selection
          </button>
        </div>

        {/* Transaction Summary */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            Transaction Summary
          </span>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-[10px] text-gray-400 font-medium">
                ORDER #{booking.id.slice(0, 8).toUpperCase()}
              </p>
              <h3 className="font-bold text-gray-900">{booking.event.eventName}</h3>
              <p className="text-xs text-gray-500">
                {booking.ticketType.ticketType} (x{booking.quantity})
              </p>
            </div>
            <div className="bg-blue-50 px-3 py-1 rounded-full text-blue-600 font-bold text-sm">
              IDR {totalAmount.toLocaleString("id-ID")}
            </div>
          </div>
        </div>

        {/* Transfer Details */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            Transfer Details
          </span>

          <div className="space-y-3">
            <TransferCard
              label="Bank Name"
              value="Bank Central Asia (BCA)"
              onCopy={() => copyToClipboard("BCA")}
            />
            <TransferCard
              label="Account Number"
              value="8290 1234 5678"
              onCopy={() => copyToClipboard("829012345678")}
            />
            <TransferCard
              label="Account Holder"
              value="PT EVENTHUB INDONESIA"
              isCopyable={false}
            />
          </div>
        </div>

        {/* Upload Section */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
          <ImageUpload
            title="Upload Receipt"
            description="PNG, JPG or PDF (Max. 5MB)"
            onFileSelect={(file) => setSelectedFile(file)}
          />

          <button
            onClick={handleUpload}
            disabled={isUploading || !selectedFile || isExpired}
            className={`w-full py-4 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${!selectedFile || isUploading || isExpired
                ? "bg-gray-200 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-100"
              }`}
          >
            <div
              className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin"
              style={{ display: isUploading ? "block" : "none" }}
            />
            {isExpired ? "Payment Expired" : isUploading ? "Processing..." : "Submit Payment Proof"}
          </button>
        </div>

        <p className="text-[10px] text-center text-gray-400 px-10">
          By clicking submit, you agree to our terms of service regarding ticket
          verification.
        </p>
      </div>
    </div>
  );
}

// --- Sub-Components (Biar Code Lu Gak Berantakan) ---

function TimerBox({ value, label, expired = false }: { value: string; label: string; expired?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${expired ? "bg-red-50" : "bg-blue-50"}`}>
        <span className={`text-xl font-bold ${expired ? "text-red-500" : "text-blue-600"}`}>{value}</span>
      </div>
      <span className="text-[10px] text-gray-400">{label}</span>
    </div>
  );
}

function TransferCard({ label, value, onCopy, isCopyable = true }: any) {
  return (
    <div className="p-4 bg-slate-50 rounded-xl flex justify-between items-center group">
      <div className="space-y-1">
        <p className="text-[10px] text-gray-400 font-medium">{label}</p>
        <p className="text-sm font-bold text-gray-900">{value}</p>
      </div>
      {isCopyable && (
        <button
          onClick={onCopy}
          className="text-blue-600 p-2 hover:bg-blue-100 rounded-lg transition-colors"
        >
          <IoCopyOutline size={18} />
        </button>
      )}
    </div>
  );
}
