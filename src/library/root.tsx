import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import Navbar from "../component/navbar";

export default function Root() {
  return (
    <>
      <Navbar />
      <Toaster position="top-right" />
      <div>
        <Outlet />
      </div>
    </>
  );
}
