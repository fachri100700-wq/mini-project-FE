import { useEffect, useState } from "react";
import type { Transaction } from "../api/OrganizerTransactionPage.api";
import { getTransactions, updateTransactionStatus } from "../api/OrganizerTransactionPage.api";
import useAuthGuard from "../../../app/hoc/useAuthGuard";
import toast from "react-hot-toast";
import { IoEyeOutline, IoClose } from "react-icons/io5";

function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const res = await getTransactions(page, 10);
      setTransactions(res.data);
      setTotalPages(res.meta.totalPages);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to fetch transactions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [page]);

  const handleAction = async (transactionId: string, action: "approve" | "reject") => {
    setRefreshing(true);
    try {
      await updateTransactionStatus(transactionId, action);
      toast.success(`Transaction ${action}d successfully`);
      await fetchTransactions(); // refresh list after action
    } catch (err: any) {
      toast.error(err?.response?.data?.message || `Failed to ${action}`);
    } finally {
      setRefreshing(false);
    }
  };

  if (loading) {
    return (
      <div className="py-10 flex justify-center">
        <span className="loading loading-spinner loading-md" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* LEFT SIDE: Transactions Table */}
      <div className={`flex-1 p-8 transition-all ${selectedTransaction ? "pr-[450px]" : ""}`}>
        <header className="mb-8">
          <h1 className="text-black text-4xl font-bold">Transactions</h1>
          <p className="text-gray-500 mt-2 font-medium">Manage and verify your event transactions.</p>
        </header>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Event</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Attendee</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Ticket</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Qty</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Amount</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {transactions.map(trx => (
                <tr key={trx.id} className="hover:bg-blue-50/30 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900 text-sm">
                    {trx.booking.event.eventName}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 font-medium">
                    {trx.user.username}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {trx.booking.ticketType.ticketType}
                  </td>
                  <td className="px-6 py-4 text-center text-sm font-bold text-gray-900">
                    {trx.booking.quantity}
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-900 text-sm">
                    ${trx.amountPaid.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${trx.transactionStatus === 'DONE' ? 'bg-green-100 text-green-600' :
                      trx.transactionStatus === 'REJECTED' ? 'bg-red-100 text-red-600' :
                        'bg-yellow-100 text-yellow-600'
                      }`}>
                      {trx.transactionStatus.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end items-center gap-2">
                      <button
                        onClick={() => setSelectedTransaction(trx)}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                        title="View Receipt"
                      >
                        <IoEyeOutline size={20} />
                      </button>

                      {trx.transactionStatus === "WAITING_FOR_ADMIN_CONFIRMATION" && (
                        <>
                          <button
                            className="bg-green-500 hover:bg-green-600 text-white text-xs font-bold py-1.5 px-3 rounded-lg transition-all active:scale-95 disabled:bg-gray-300"
                            onClick={() => handleAction(trx.id, "approve")}
                            disabled={refreshing}
                          >
                            Approve
                          </button>
                          <button
                            className="bg-red-500 hover:bg-red-600 text-white text-xs font-bold py-1.5 px-3 rounded-lg transition-all active:scale-95 disabled:bg-gray-300"
                            onClick={() => handleAction(trx.id, "reject")}
                            disabled={refreshing}
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {transactions.length === 0 && (
            <div className="p-12 text-center">
              <p className="text-gray-400 font-medium">No transactions found</p>
            </div>
          )}
        </div>

        {/* Pagination - Modified to match premium style */}
        <div className="mt-8 flex justify-end items-center gap-3">
          <button
            className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            disabled={page === 1}
            onClick={() => setPage(p => p - 1)}
          >
            Previous
          </button>
          <div className="w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-100">
            {page}
          </div>
          <button
            className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            disabled={page === totalPages}
            onClick={() => setPage(p => p + 1)}
          >
            Next
          </button>
        </div>
      </div>

      {/* RIGHT SIDE: Detail Drawer */}
      {selectedTransaction && (
        <div className="fixed top-0 right-0 w-[450px] h-full bg-white shadow-2xl border-l border-gray-100 p-8 overflow-y-auto animate-in slide-in-from-right duration-300 z-50">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-xl font-black text-gray-900">Transaction Detail</h2>
              <p className="text-xs text-gray-400 mt-1">Review transaction and payment proof</p>
            </div>
            <button
              onClick={() => setSelectedTransaction(null)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <IoClose size={24} className="text-gray-400" />
            </button>
          </div>

          <div className="space-y-8">
            {/* Payment Proof Image */}
            <div className="space-y-3">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Payment Proof</p>
              <div className="w-full aspect-[4/3] bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 group relative">
                {(() => {
                  const proofUrl = selectedTransaction.paymentProof?.startsWith("http")
                    ? selectedTransaction.paymentProof
                    : `${import.meta.env.VITE_API_URL}/uploads/${selectedTransaction.paymentProof}`;

                  return (
                    <>
                      <img
                        src={proofUrl}
                        alt="Payment Proof"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                        <a
                          href={proofUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="bg-white/90 backdrop-blur p-3 rounded-2xl opacity-0 group-hover:opacity-100 transition-all scale-90 group-hover:scale-100"
                        >
                          <IoEyeOutline size={24} className="text-blue-600" />
                        </a>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>

            {/* Transaction Info */}
            <div className="bg-gray-50 rounded-3xl p-6 space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400 font-medium">Order ID</span>
                <span className="font-bold text-gray-900">#{selectedTransaction.id.slice(-6).toUpperCase()}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400 font-medium">Attendee</span>
                <span className="font-bold text-gray-900">{selectedTransaction.user.username}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400 font-medium">Ticket Type</span>
                <span className="font-bold text-gray-900">{selectedTransaction.booking.ticketType.ticketType}</span>
              </div>
              <div className="h-px bg-gray-100" />
              <div className="flex justify-between items-center">
                <span className="text-gray-400 font-medium text-sm">Total Paid</span>
                <span className="text-xl font-black text-blue-600">${selectedTransaction.amountPaid.toFixed(2)}</span>
              </div>
            </div>

            {/* Quick Actions if waiting */}
            {selectedTransaction.transactionStatus === "WAITING_FOR_ADMIN_CONFIRMATION" && (
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => {
                    handleAction(selectedTransaction.id, "approve");
                    setSelectedTransaction(null);
                  }}
                  className="py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-2xl shadow-lg shadow-green-100 transition-all active:scale-95"
                >
                  Approve
                </button>
                <button
                  onClick={() => {
                    handleAction(selectedTransaction.id, "reject");
                    setSelectedTransaction(null);
                  }}
                  className="py-4 bg-white border border-red-100 text-red-500 hover:bg-red-50 font-bold rounded-2xl transition-all active:scale-95"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default useAuthGuard(TransactionsPage, ["organizer"]);