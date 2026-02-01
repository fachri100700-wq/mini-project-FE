import { Outlet } from "react-router-dom";
import Navbar from "../component/navbar";

export default function Root() {
  return (
    <>
    <Navbar/>
      <div>
        <Outlet />
      </div>
    </>
  );
}
