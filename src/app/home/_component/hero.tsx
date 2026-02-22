import heroImg from "../../../assets/home/abstract-dark-background-with-purple-lines-generative-ai (1).jpg";
import { IoMdSearch } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { BiCategory } from "react-icons/bi";

export default function Hero() {
  return (
    <section className="relative w-full h-[770px] md:h-[600px] overflow-hidden">
      <img
        src={heroImg}
        alt="Hero Image"
        className="w-full h-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center gap-2">
        {/* Header */}
        <h2 className="text-xs md:text-base text-white text-center">
          Discover & Connect With Great Events Around The World
        </h2>
        <h1 className="text-4xl md:text-5xl text-white font-semibold text-center">
          Find Your Next Experience
        </h1>

        {/* Seacrhbar */}
        <div className="flex justify-between items-center bg-white rounded-full w-90 md:w-4xl mt-5">
          <input
            type="text"
            placeholder="What are you looking for?"
            className="w-full px-5 outline-none rounded-full placeholder-black/50 text-center md:text-left"
          />

          <div className="hidden md:flex flex items-center gap-2 text-black/50 border-l px-5 relative">
            <IoLocationOutline className="text-gray-400" />

            <select className="outline-none appearance-none bg-transparent text-black/50 cursor-pointer">
              <option>Select Location</option>
              <option value="jakarta">Jakarta</option>
            </select>
          </div>

          <div className="hidden md:flex items-center gap-2 text-black/50 border-l px-5 relative">
            <BiCategory className="text-gray-400" />

            <select className="outline-none appearance-none bg-transparent text-black/50 cursor-pointer">
              <option>Select Category</option>
              <option value="jakarta">music</option>
            </select>
          </div>

          <button className="flex items-center gap-1 bg-[#2563eb] text-white px-6 md:px-10 py-3 rounded-full hover:bg-[#1a47aa] duration-300 cursor-pointer">
            <span className="hidden md:block">Search</span>
            <IoMdSearch className="text-2xl" />
          </button>
        </div>
      </div>
    </section>
  );
}
