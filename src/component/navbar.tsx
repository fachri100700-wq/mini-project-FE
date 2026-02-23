import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  IoCalendarOutline,
  IoCompassOutline,
  IoHomeOutline,
} from "react-icons/io5";
import { FaRegUser } from "react-icons/fa6";
import { useLocation } from "react-router-dom";
import useAuthStore from "../stores/useAuthStore";
import { useLogout } from "../features/login/hooks/useLogout";

export default function Navbar() {
  const { pathname } = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const { auth } = useAuthStore();
  const logout = useLogout();

  useEffect(() => {
    const handleScroll = () => {
      if (pathname === "/") {
        setIsScrolled(window.scrollY > 50);
      } else {
        setIsScrolled(true);
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll); //eventlistener bawaan browser
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  return (
    <>
      <nav
        className={`fixed w-full py-4 md:py-2 px-5 md:px-10 flex items-center justify-between top-0 z-[100] transition-all duration-500 ${
          isScrolled
            ? "bg-white border-b border-gray-100 shadow-sm text-black"
            : "bg-transparent text-white border-transparent"
        }`}
      >
        {/* 1. LOGO */}
        <NavLink 
          to="/"
          className="flex items-center gap-2 cursor-pointer group">
          <span
            className={`text-xl font-black tracking-tighter uppercase transition-colors ${isScrolled ? "text-black" : "text-white"}`}
          >
            Event<span className="text-[#2563eb]">aja.</span>
          </span>
        </NavLink>

        {/* 2. MIDDLE MENU */}
        <div
          className={`hidden md:flex items-center gap-10 font-semibold text-sm tracking-wide transition-colors ${isScrolled ? "text-black" : "text-white"}`}
        >
          <NavLink
            to="/explore-event"
            className="flex items-center gap-2 cursor-pointer hover:text-[#2563eb] transition-colors group"
          >
            <IoCompassOutline className="text-lg text-[#2563eb]" />
            <span>Explore Event</span>
          </NavLink>
          <NavLink
            to="/create-event"
            className="flex items-center gap-2 cursor-pointer hover:text-[#2563eb] transition-colors group"
          >
            <IoCalendarOutline className="text-xl text-[#2563eb]" />
            <span>Create Event</span>
          </NavLink>
        </div>

        {/* 3. RIGHT SECTION */}
        <div className="flex items-center gap-3">
          {auth ? (
            <button
              onClick={logout}
              className={`px-5 py-2 font-bold text-sm rounded-full transition-all cursor-pointer ${
                isScrolled ? "text-black hover:bg-gray-200" : "text-white hover:bg-white/20"
              }`}
            >
              Logout
            </button>
          ) : (
            <>
              <NavLink
                to="/login"
                className={`px-5 py-2 font-bold text-sm rounded-full transition-all cursor-pointer ${
                  isScrolled ? "text-black hover:bg-gray-200" : "text-white hover:bg-white/20"
                }`}
              >
                Log In
              </NavLink>
              <div
                className={`hidden md:block h-6 w-[1px] ${isScrolled ? "bg-gray-200" : "bg-white/30"}`}
              ></div>
              <NavLink
                to="/register"
                className="bg-[#2563eb] text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-[#1a47aa] transition-all cursor-pointer"
              >
                Sign Up
              </NavLink>
            </>
          )}
        </div>
      </nav>

      {/* Navbar Bawah */}
      <nav className="lg:hidden fixed bottom-0 left-0 z-[100] w-full border-t border-gray-100 bg-white">
        <div className="grid grid-cols-4 h-16">
          {/* Home */}
          <NavLink
            to="/"
            className="flex flex-col justify-center items-center gap-1 text-gray-500 hover:text-[#2563eb]"
          >
            <IoHomeOutline className="text-xl" />
            <span className="text-[10px] font-bold uppercase tracking-wider">
              Home
            </span>
          </NavLink>

          {/* Explore */}
          <NavLink
            to="/explore-event"
            className="flex flex-col justify-center items-center gap-1 text-gray-500 hover:text-[#2563eb]"
          >
            <IoCompassOutline className="text-xl" />
            <span className="text-[10px] font-medium uppercase tracking-wider">
              Explore
            </span>
          </NavLink>

          {/* Create */}
          <button className="flex flex-col justify-center items-center gap-1 text-gray-500 hover:text-[#2563eb]">
            <IoCalendarOutline className="text-xl" />
            <span className="text-[10px] font-medium uppercase tracking-wider">
              Create
            </span>
          </button>

          {/* Profile */}
          <button className="flex flex-col justify-center items-center gap-1 text-gray-500 hover:text-[#2563eb]">
            <FaRegUser className="text-xl" />
            <span className="text-[10px] font-medium uppercase tracking-wider">
              Profile
            </span>
          </button>
        </div>
      </nav>
    </>
  );
}
