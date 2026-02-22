import type { RouteObject } from "react-router-dom";
import DashboardLayout from "../../features/dashboard/layout/DashboardLayout";
import EventsPage from "../../features/dashboard/pages/EventsPage";
import TransactionPage from "../../features/dashboard/pages/TransactionPage";
import StatisticPage from "../../features/dashboard/pages/StatisticPage";
import OrganizerProfilePage from "../../features/dashboard/pages/OrganizerProfilePage";
import EventsEditPage from "../../features/dashboard/pages/EventsEditPage";
import OrganizerProfileEditPage from "../../features/dashboard/pages/OrganizerProfileEditPage";

const dashboardRoutes: RouteObject = {
  path: "/dashboard",
  element: <DashboardLayout />,
  children: [
    { path: "events", element: <EventsPage /> },
    { path: "events/:eventId", element: <EventsEditPage /> },
    { path: "transactions", element: <TransactionPage /> },
    { path: "statistics", element: <StatisticPage /> },
    { path: "profile", element: <OrganizerProfilePage /> },
    { path: "profile/edit", element: <OrganizerProfileEditPage /> },
    { index: true, element: <EventsPage /> },
  ],
};

export default dashboardRoutes;