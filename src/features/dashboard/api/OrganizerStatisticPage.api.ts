import axiosInstance from "../../../app/utils/axiosInstance";

export type GroupBy = "year" | "month" | "day";

export interface RevenueGraph {
  period: string;
  total: number;
}

export interface StatisticsResponse {
  totalRevenue: number;
  totalAttendees: number;
  activeEvents: number;
  revenueGraph: RevenueGraph[];
  groupBy: GroupBy;
}

export async function getStatistics(groupBy: GroupBy = "month") {
  const res = await axiosInstance.get("/dashboard/statistics", {
    params: { groupBy },
  });
  return res.data.data as StatisticsResponse;
}