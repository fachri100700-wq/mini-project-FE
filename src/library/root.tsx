import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <>
      <Toaster position="top-right" />
      <div>
        <Outlet />
      </div>
    </>
  );
}
