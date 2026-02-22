import axiosInstance from "../../../app/utils/axiosInstance";

export interface Transaction {
  id: string;
  transactionStatus: "WAITING_FOR_ADMIN_CONFIRMATION" | "DONE" | "REJECTED";
  amountPaid: number;
  createdAt: string;
  user: {
    id: string;
    username: string;
    email: string;
  };
  booking: {
    event: {
      id: string;
      eventName: string;
    };
    ticketType: {
      ticketType: string;
    };
    quantity: number;
  };
}

export interface TransactionListResponse {
  data: Transaction[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export async function getTransactions(page = 1, limit = 10) {
  const res = await axiosInstance.get("/dashboard/transactions", {
    params: { page, limit },
  });
  return res.data as TransactionListResponse;
}

export async function updateTransactionStatus(transactionId: string, action: "approve" | "reject") {
  const res = await axiosInstance.patch(`/dashboard/transactions/${transactionId}`, { action });
  return res.data;
}