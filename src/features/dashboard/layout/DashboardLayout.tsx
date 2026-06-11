import { Outlet } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";

export default function DashboardLayout() {
  return (
    <div className="drawer lg:drawer-open mt-15">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main content */}
      <div className="drawer-content flex flex-col ">
        {/* Mobile navbar */}
        <div className="navbar bg-black lg:hidden border-b">
          <div className="flex-none">
            <label
              htmlFor="dashboard-drawer"
              className="btn btn-square btn-ghost"
            >
              ☰
            </label>
          </div>
          <div className="flex-1">
            <span className="font-semibold text-lg">
              Organizer Dashboard
            </span>
          </div>
        </div>

        <main className="bg-gray-50 min-h-screen">
          <Outlet />
        </main>
      </div>

      {/* Sidebar */}
      <DashboardSidebar />
    </div>
  );
}