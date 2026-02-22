import { useEffect, useState } from "react";
import useAuthGuard from "../../../app/hoc/useAuthGuard";
import toast from "react-hot-toast";
import { getStatistics } from "../api/OrganizerStatisticPage.api";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type GroupBy = "year" | "month" | "day";

interface RevenueGraph {
  period: string;
  total: number;
}

interface Statistics {
  totalRevenue: number;
  totalAttendees: number;
  activeEvents: number;
  revenueGraph: RevenueGraph[];
  groupBy: GroupBy;
}

function StatisticsPage() {
  const [stats, setStats] = useState<Statistics | null>(null);
  const [loading, setLoading] = useState(true);
  const [groupBy, setGroupBy] = useState<GroupBy>("month");

  const fetchStatistics = async (group: GroupBy) => {
    setLoading(true);
    try {
      const res = await getStatistics(group);
      setStats(res);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to fetch statistics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatistics(groupBy);
  }, [groupBy]);

  if (loading) {
    return (
      <div className="py-10 flex justify-center">
        <span className="loading loading-spinner loading-md" />
      </div>
    );
  }

  if (!stats) {
    return <div className="py-10 text-center text-gray-500">No statistics found</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard Statistics</h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-base-100 p-4 rounded-lg shadow text-center">
          <div className="text-gray-500">Total Revenue</div>
          <div className="text-2xl font-bold">${stats.totalRevenue.toFixed(2)}</div>
        </div>
        <div className="bg-base-100 p-4 rounded-lg shadow text-center">
          <div className="text-gray-500">Total Attendees</div>
          <div className="text-2xl font-bold">{stats.totalAttendees}</div>
        </div>
        <div className="bg-base-100 p-4 rounded-lg shadow text-center">
          <div className="text-gray-500">Active Events</div>
          <div className="text-2xl font-bold">{stats.activeEvents}</div>
        </div>
      </div>

      {/* Group By Selector */}
      <div className="flex justify-end">
        <select
          className="select select-bordered w-40"
          value={groupBy}
          onChange={(e) => setGroupBy(e.target.value as GroupBy)}
        >
          <option value="year">Year</option>
          <option value="month">Month</option>
          <option value="day">Day</option>
        </select>
      </div>

      {/* Revenue Graph */}
      <div className="bg-base-100 p-4 rounded-lg shadow">
        <h2 className="font-semibold mb-2">Revenue Graph ({groupBy})</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={stats.revenueGraph}>
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="period" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="total"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default useAuthGuard(StatisticsPage, ["organizer"]);