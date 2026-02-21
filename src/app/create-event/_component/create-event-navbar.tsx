import { useState } from "react";
import { BsFillTicketPerforatedFill } from "react-icons/bs";
import { FaLocationDot, FaTag } from "react-icons/fa6";
import { IoMdInformationCircle } from "react-icons/io";

export default function CreateEventNavbar() {
  // State buat nandaian mana yang lagi aktif
  const [activeNav, setActiveNav] = useState("#general-info");

  const navItems = [
    { id: "#general-info", label: "General Info", icon: IoMdInformationCircle },
    { id: "#logistic", label: "Logistics", icon: FaLocationDot },
    { id: "#ticketing", label: "Ticketing", icon: BsFillTicketPerforatedFill },
    { id: "#promotion", label: "Promotion", icon: FaTag },
  ];

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setActiveNav(id);

    // LOGIC SCROLL: Biar pas di header section-nya
    const element = document.querySelector(id);
    if (element) {
      const offset = 80; 
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <aside className="w-72 bg-white hidden lg:block sticky top-0 shadow-sm min-h-screen pt-20 pb-32 px-4 md:px-10">
      <div className="mb-10 px-2">
        <h2 className="text-2xl font-black tracking-tight text-black">
          CREATE EVENT
        </h2>
      </div>

      <nav className="space-y-2">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 px-2">
          Main Menu
        </p>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeNav === item.id;

          return (
            <a
              key={item.id}
              href={item.id}
              onClick={(e) => handleNavClick(e, item.id)}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all group ${
                isActive
                  ? "text-blue-600 bg-blue-50 shadow-sm"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              <Icon
                size={22}
                className={
                  isActive ? "text-blue-500" : "group-hover:text-blue-500"
                }
              />
              <span className={isActive ? "font-bold" : "font-medium"}>
                {item.label}
              </span>
            </a>
          );
        })}
      </nav>
    </aside>
  );
}
