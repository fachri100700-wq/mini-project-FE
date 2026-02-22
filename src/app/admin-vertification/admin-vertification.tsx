import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  IoEyeOutline,
  IoCheckmarkCircle,
  IoCloseCircle,
  IoClose,
} from "react-icons/io5";
import axiosInstance from "../../utils/axios-instance";
import Loading from "../../component/loading";

export default function AdminVerification() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  // 1. Fetch data antrean (disini gue asumsikan lu ada endpoint buat list semua yg WAITING)
  // Kalau belum ada, lu bisa pake query getWaitingConfirm lu di loop atau sesuaikan endpointnya
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Ganti URL ini dengan endpoint list antrean lu Ri
      const { data } = await axiosInstance.get("/transactions/all-waiting");
      setBookings(data.data);
    } catch (err) {
      toast.error("Gagal ambil daftar verifikasi");
    } finally {
      setLoading(false);
    }
  };

  // 2. Logic buat Update Status (Verify)
  const handleVerify = async (
    transactionId: string,
    status: "DONE" | "REJECTED",
  ) => {
    setIsProcessing(true);
    try {
      await axiosInstance.patch(`/transactions/verify/${transactionId}`, {
        status,
      });
      toast.success(
        `Transaksi berhasil di-${status === "DONE" ? "Approve" : "Reject"}`,
      );
      setSelectedBooking(null); // Tutup panel detail
      fetchData(); // Refresh list
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Gagal verifikasi");
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* LEFT SIDE: List Table */}
      <div
        className={`flex-1 p-8 transition-all ${selectedBooking ? "pr-[400px]" : ""}`}
      >
        <header className="mb-8">
          <h1 className="text-2xl font-black text-gray-900">
            Payment Verifications
          </h1>
          <p className="text-sm text-gray-500">
            Review and verify pending payment proofs from attendees.
          </p>
        </header>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  User Name
                </th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Event
                </th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Amount (IDR)
                </th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {bookings?.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-blue-50/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                        {item.user.username.slice(0, 2).toUpperCase()}
                      </div>
                      <span className="font-bold text-gray-900 text-sm">
                        {item.user.username}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 font-medium">
                    {item.event.eventName}
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-900 text-sm">
                    Rp{" "}
                    {item.transactions[0]?.amountPaid.toLocaleString("id-ID")}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => setSelectedBooking(item)}
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                    >
                      <IoEyeOutline size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* RIGHT SIDE: Verification Detail Panel (Drawer Style) */}
      {selectedBooking && (
        <div className="fixed top-0 right-0 w-[400px] h-full bg-white shadow-2xl border-l border-gray-100 p-6 overflow-y-auto animate-in slide-in-from-right duration-300 z-50">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-black text-gray-900">
              Verification Detail
            </h2>
            <button
              onClick={() => setSelectedBooking(null)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <IoClose size={24} className="text-gray-400" />
            </button>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Uploaded Receipt
              </p>
              <div className="w-full aspect-[3/4] bg-gray-100 rounded-2xl overflow-hidden border border-gray-100">
                <img
                  src={`${import.meta.env.VITE_API_URL}/uploads/${selectedBooking.transactions[0].paymentProof}`}
                  alt="Receipt"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl space-y-3">
              <DetailItem
                label="Transaction ID"
                value={`TXN-${selectedBooking.id.slice(0, 6).toUpperCase()}`}
              />
              <DetailItem
                label="User Email"
                value={selectedBooking.user.username}
              />
              <DetailItem
                label="Amount to Verify"
                value={`Rp ${selectedBooking.transactions[0].amountPaid.toLocaleString("id-ID")}`}
                isBlue
              />
            </div>

            <div className="grid grid-cols-1 gap-3">
              <button
                disabled={isProcessing}
                onClick={() =>
                  handleVerify(selectedBooking.transactions[0].id, "DONE")
                }
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-100 transition-all flex items-center justify-center gap-2"
              >
                <IoCheckmarkCircle size={20} /> Approve Payment
              </button>
              <button
                disabled={isProcessing}
                onClick={() =>
                  handleVerify(selectedBooking.transactions[0].id, "REJECTED")
                }
                className="w-full py-4 bg-white hover:bg-red-50 text-red-500 border border-red-100 font-bold rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <IoCloseCircle size={20} /> Reject Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper UI
function DetailItem({ label, value, isBlue = false }: any) {
  return (
    <div className="flex justify-between items-center text-xs">
      <span className="text-gray-400">{label}</span>
      <span
        className={`font-bold ${isBlue ? "text-blue-600" : "text-gray-900"}`}
      >
        {value}
      </span>
    </div>
  );
}
