import React from "react";
import { useParams } from "react-router-dom";
import { LuGhost } from "react-icons/lu";
import { BsBuildings } from "react-icons/bs";
import { IoCalendarOutline, IoLocationOutline } from "react-icons/io5";

import TabsNavigation from "./_component/tabsNavigation";
import InformationColumn from "./_component/informationColumn";
import Loading from "../../component/loading";

import { useGetevent } from "./api/get-by-id.api";
import useAuthGuard from "../hoc/useAuthGuard";

export default function EventDetail() {
  const { id } = useParams();
  const { event, loading } = useGetevent(id);

  if (loading) return <Loading />;

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LuGhost className="text-gray-600 text-xl" />
        <p className="ml-3 text-gray-600 font-medium">event not found ...</p>
      </div>
    );
  }

  const lowestPrice =
    event.ticketType && event.ticketType.length > 0
      ? Math.min(...event.ticketType.map((t: any) => t.price))
      : 0;

  return (
    <div className="mt-10 min-h-screen bg-gray-50 pt-10 pb-32 md:pb-24 px-4 md:px-10 mb-20 lg:mb-0">
      {/* 1. HERO IMAGE */}
      <div className="w-full h-[300px] md:h-[450px] rounded-3xl overflow-hidden mb-8 shadow-lg">
        <img
          src={event.imageUrl}
          alt="Event Banner"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col lg:flex-row justify-between gap-10 items-start">
        <div className="flex flex-col gap-5 w-full lg:flex-1 max-w-4xl">
          {/* Tags */}
          <div className="bg-[#2563eb]/30 text-[#2563eb] text-xs uppercase font-bold tracking-widest rounded-full w-fit py-1 px-4">
            {event.eventCategory}
          </div>

          {/* Header */}
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
            {event.eventName}
          </h1>

          {/* Quick Info Bar */}
          <div className="flex flex-wrap mb-10 text-gray-500">
            <div className="flex items-center gap-6 flex-wrap">
              <div className="flex gap-2">
                <BsBuildings className="text-xl text-[#2563eb]" />
                <span className="font-medium text-sm">
                  {event.user?.displayName || "Organizer"}
                </span>
              </div>
              <div className="flex gap-1">
                <IoLocationOutline className="text-xl text-[#2563eb]" />
                <span className="font-medium text-sm">{event.location}</span>
              </div>
              <div className="flex gap-2">
                <IoCalendarOutline className="text-xl text-[#2563eb]" />
                <span className="font-medium text-sm">
                  {new Date(event.startDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                  , {event.startDate.split("T")[1].slice(0, 5)} -{" "}
                  {new Date(event.endDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                  , {event.endDate.split("T")[1].slice(0, 5)}
                </span>
              </div>
            </div>
          </div>

          {/* Tabs Navigation */}
          <TabsNavigation />
        </div>

        {/* 2. INFORMATION COLUMN (DESKTOP) */}
        <InformationColumn event={event} />
      </div>

      {/* 3. RESPONSIVE: CTA (MOBILE VERSION) */}
      <nav className="lg:hidden fixed bottom-0 left-0 z-[100] w-full border-t border-gray-100 bg-white shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
        <div className="flex justify-between items-center py-4 px-6">
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
              Starting From
            </p>
            <h1 className="text-xl font-black text-[#2563eb]">
              IDR {lowestPrice.toLocaleString("id-ID")}
            </h1>
          </div>
          <button
            onClick={() => window.scrollTo({ top: 800, behavior: "smooth" })}
            className="text-white font-bold bg-[#2563eb] hover:bg-[#1a47aa] rounded-2xl py-3 px-6 shadow-lg shadow-blue-200"
          >
            Buy Tickets
          </button>
        </div>
      </nav>
    </div>
  );
}
