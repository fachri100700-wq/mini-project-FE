import { NavLink } from "react-router-dom";
import {
  CalendarDays,
  CreditCard,
  BarChart3,
  User,
} from "lucide-react";

const navItems = [
  {
    label: "Events",
    to: "/dashboard/events",
    icon: CalendarDays,
  },
  {
    label: "Transactions",
    to: "/dashboard/transactions",
    icon: CreditCard,
  },
  {
    label: "Statistics",
    to: "/dashboard/statistics",
    icon: BarChart3,
  },
  {
    label: "Profile",
    to: "/dashboard/profile",
    icon: User,
  },
];

export default function DashboardSidebar() {
  return (
    <div className="drawer-side z-50">
      <label
        htmlFor="dashboard-drawer"
        className="drawer-overlay"
      ></label>

      <aside className="w-72 bg-white sticky top-0 shadow-sm min-h-screen pt-5 pb-32 px-4 md:px-10 border-r border-gray-100">
        <div className="mb-10 px-2">
          <h2 className="text-2xl font-black tracking-tight uppercase">
            Dashboard
          </h2>
        </div>

        <nav className="space-y-2">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 px-2">
            Main Menu
          </p>

          <ul className="space-y-2">
            {navItems.map(({ label, to, icon: Icon }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all group ${isActive
                      ? "text-blue-600 bg-blue-50 shadow-sm font-bold"
                      : "text-gray-500 hover:bg-gray-50 font-medium"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        size={22}
                        className={
                          isActive ? "text-blue-500" : "group-hover:text-blue-500"
                        }
                      />
                      <span>{label}</span>
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </div>
  );
}