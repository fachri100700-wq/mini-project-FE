import { useEffect, useState } from "react";
import type { Transaction } from "../api/OrganizerTransactionPage.api";
import { getTransactions, updateTransactionStatus } from "../api/OrganizerTransactionPage.api";
import useAuthGuard from "../../../app/hoc/useAuthGuard";
import toast from "react-hot-toast";

function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

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
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Transactions</h1>

      <div className="overflow-x-auto rounded-xl border">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Event</th>
              <th>Attendee</th>
              <th>Ticket</th>
              <th>Quantity</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
              <th className="text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map(trx => (
              <tr key={trx.id}>
                <td>{trx.booking.event.eventName}</td>
                <td>{trx.user.username}</td>
                <td>{trx.booking.ticketType.ticketType}</td>
                <td>{trx.booking.quantity}</td>
                <td>${trx.amountPaid.toFixed(2)}</td>
                <td>{new Date(trx.createdAt).toLocaleDateString()}</td>
                <td>{trx.transactionStatus}</td>
                <td className="text-right">
                  {trx.transactionStatus === "WAITING_FOR_ADMIN_CONFIRMATION" && (
                    <>
                      <button
                        className={`btn btn-sm btn-success ${refreshing ? "loading" : ""}`}
                        onClick={() => handleAction(trx.id, "approve")}
                        disabled={refreshing}
                      >
                        Approve
                      </button>
                      <button
                        className={`btn btn-sm btn-error ${refreshing ? "loading" : ""}`}
                        onClick={() => handleAction(trx.id, "reject")}
                        disabled={refreshing}
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}

            {transactions.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center py-6 text-gray-500">
                  No transactions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end gap-2">
        <button
          className="btn btn-sm"
          disabled={page === 1}
          onClick={() => setPage(p => p - 1)}
        >
          Previous
        </button>
        <span className="btn btn-sm btn-disabled">{page}</span>
        <button
          className="btn btn-sm"
          disabled={page === totalPages}
          onClick={() => setPage(p => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default useAuthGuard(TransactionsPage, ["organizer"]);