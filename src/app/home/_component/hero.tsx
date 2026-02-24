import { useState } from "react";
import { useNavigate } from "react-router-dom";
import heroImg from "../../../assets/home/abstract-dark-background-with-purple-lines-generative-ai (1).jpg";
import { IoMdSearch } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { BiCategory } from "react-icons/bi";
import { EventCategory } from "../../../types/enum-event";

const allCategories = Object.values(EventCategory);

export default function Hero() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (location) params.set("location", location);
    if (category) params.set("category", category);
    navigate(`/explore-event?${params.toString()}`);
  };

  return (
    <section className="relative w-full h-[770px] md:h-[670px] overflow-hidden">
      <img
        src={heroImg}
        alt="Hero Image"
        className="w-full h-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center gap-2 px-4">
        {/* Header */}
        <h2 className="text-xs md:text-base text-white text-center">
          Discover & Connect With Great Events Around The World
        </h2>
        <h1 className="text-4xl md:text-5xl text-white font-semibold text-center">
          Find Your Next Experience
        </h1>

        {/* Searchbar */}
        <div className="flex flex-wrap justify-between items-center bg-white rounded-full w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl mt-5">
          <input
            type="text"
            placeholder="What are you looking for?"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="w-full md:flex-1 px-5 py-3 outline-none rounded-full placeholder-black/50 text-center md:text-left text-sm"
          />

          <div className="hidden md:flex items-center gap-2 text-black/50 border-l px-5 relative">
            <IoLocationOutline className="text-gray-400" />
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="outline-none bg-transparent text-black/50 text-sm w-28 placeholder-black/50"
            />
          </div>

          <div className="hidden md:flex items-center gap-2 text-black/50 border-l px-5 relative">
            <BiCategory className="text-gray-400" />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="outline-none appearance-none bg-transparent text-black/50 cursor-pointer text-sm"
            >
              <option value="">All Categories</option>
              {allCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0) + cat.slice(1).toLowerCase()}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleSearch}
            className="flex items-center gap-1 bg-[#2563eb] text-white px-6 md:px-10 py-3 rounded-full hover:bg-[#1a47aa] duration-300 cursor-pointer"
          >
            <span className="hidden md:block">Search</span>
            <IoMdSearch className="text-2xl" />
          </button>
        </div>
      </div>
    </section>
  );
}
