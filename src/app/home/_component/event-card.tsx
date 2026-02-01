import { type ReactNode } from "react";
import { IoLocationOutline, IoCalendarOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";

interface eventProps {
  image: string;
  categories: string;
  month: string;
  date: number;
  time: string;
  title: string;
  price: string;
  location: string;
}

export default function EventCard({
  image,
  categories,
  month,
  date,
  time,
  title,
  price,
  location,
}: eventProps) {
  return (
    <NavLink
      to="/event-detail"
      className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 max-w-[300px] cursor-pointer"
    >
      <div className="relative h-[200px] w-full overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        <div className="absolute flex flex-col top-4 left-4 bg-white rounded-lg p-2 text-center shadow-md min-w-[50px]">
          <span className="text-xs font-bold uppercase text-gray-400">
            {month}
          </span>
          <span className="text-xl font-extrabold text-black">{date}</span>
        </div>

        <div className="absolute top-4 right-4 bg-[#2563eb] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          {categories}
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-2 text-[#2563eb] text-sm font-semibold mb-2">
          <IoCalendarOutline />
          <span>{time}</span>
        </div>

        <h3 className="text-xl font-bold text-black mb-3 line-clamp-2 group-hover:text-[#2563eb] transition-colors">
          {title}
        </h3>

        <div className="flex gap-2">
          <IoLocationOutline className="text-[#2563eb]" />
          <span className="text-xs text-black font-medium italic">{location}</span>
        </div>

        <hr className="border-gray-100 mb-4 mt-4" />

        <div className="flex items-center justify-between">
          <span className="text-base text-black font-semibold">{price}</span>
          <button className="text-[#2563eb] font-bold text-xs hover:underline">
            Get Ticket
          </button>
        </div>
      </div>
    </NavLink>
  );
}
