import { useEffect, useState } from "react";
import useAuthGuard from "../../../app/hoc/useAuthGuard";
import toast from "react-hot-toast";
import { getStatistics } from "../api/OrganizerStatisticPage.api";
import { IoCashOutline, IoPeopleOutline, IoCalendarOutline, IoChevronDownOutline } from "react-icons/io5";
import {
  AreaChart,
  Area,
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
      <div className="flex justify-center items-center min-h-[400px]">
        <span className="loading loading-spinner loading-lg text-blue-600" />
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <IoCalendarOutline className="mx-auto text-gray-200 mb-4" size={64} />
          <p className="text-gray-400 font-bold text-xl">No statistics found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <header className="mb-10 flex justify-between items-end">
        <div>
          <h1 className="text-black text-4xl font-bold">Performance Statistics</h1>
          <p className="text-gray-500 mt-2 font-medium">Track your revenue and attendee growth across your events.</p>
        </div>

        <div className="relative">
          <select
            className="appearance-none bg-white border border-gray-100 py-3 pl-6 pr-12 rounded-2xl font-bold text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all cursor-pointer"
            value={groupBy}
            onChange={(e) => setGroupBy(e.target.value as GroupBy)}
          >
            <option value="year">By Year</option>
            <option value="month">By Month</option>
            <option value="day">By Day</option>
          </select>
          <IoChevronDownOutline className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
        </div>
      </header>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          label="Total Revenue"
          value={`$${stats.totalRevenue.toLocaleString()}`}
          icon={<IoCashOutline size={24} />}
          color="blue"
        />
        <StatCard
          label="Total Attendees"
          value={stats.totalAttendees.toLocaleString()}
          icon={<IoPeopleOutline size={24} />}
          color="green"
        />
        <StatCard
          label="Active Events"
          value={stats.activeEvents.toString()}
          icon={<IoCalendarOutline size={24} />}
          color="purple"
        />
      </div>

      {/* Revenue Graph */}
      <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-xl font-black text-gray-900">Revenue Analysis</h2>
            <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-bold">Trend showing total earnings per {groupBy}</p>
          </div>
        </div>

        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={stats.revenueGraph} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis
                dataKey="period"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fontWeight: 600, fill: '#9ca3af' }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fontWeight: 600, fill: '#9ca3af' }}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: '16px',
                  border: 'none',
                  boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                  fontWeight: 'bold',
                  fontSize: '14px'
                }}
              />
              <Area
                type="monotone"
                dataKey="total"
                stroke="#3b82f6"
                strokeWidth={4}
                fillOpacity={1}
                fill="url(#colorRevenue)"
                dot={{ r: 6, fill: '#3b82f6', strokeWidth: 3, stroke: '#fff' }}
                activeDot={{ r: 8, strokeWidth: 0 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon, color }: any) {
  const colors: any = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
  };

  return (
    <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100 flex items-center gap-6">
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${colors[color]}`}>
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{label}</p>
        <p className="text-3xl font-black text-gray-900">{value}</p>
      </div>
    </div>
  );
}

export default useAuthGuard(StatisticsPage, ["organizer"]);
