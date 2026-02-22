import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from './library/root';
import Register from './app/register/Register';
import Login from './app/login/Login';
import ResetPassword from './app/password/ResetPassword';
import ForgotPassword from './app/password/ForgotPassword';
import Profile from './app/profile/Profile';
import EditProfile from './app/profile/edit/EditProfile';
import ChangePassword from './app/profile/change-password/ChangePassword';
import dashboardRoutes from './app/routes/DashboardRoutes';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "forgot-password", element: <ForgotPassword />},
      { path: "reset-password", element: <ResetPassword />},
      { path: "profile", 
        children: [
          { index: true, element: <Profile />},
          { path: "edit", element: <EditProfile />},
          { path: "change-password", element: <ChangePassword/>}
        ],
      },
      dashboardRoutes,
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
