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
    <div className="drawer-side">
      <label
        htmlFor="dashboard-drawer"
        className="drawer-overlay"
      ></label>

      <aside className="w-64 min-h-full bg-base-100 border-r">
        <div className="p-4 font-bold text-xl">
          Dashboard
        </div>

        <ul className="menu p-2 gap-1">
          {navItems.map(({ label, to, icon: Icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `
                  flex items-center gap-3
                  ${
                    isActive
                      ? "bg-primary text-primary-content border-l-4 border-primary"
                      : ""
                  }
                `
                }
              >
                <Icon size={18} />
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}