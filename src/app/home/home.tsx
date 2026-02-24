import CategoryCard from "./_component/category-card";
import Hero from "./_component/hero";
import Event from "./_component/event";
import { useEffect, useState, type ReactNode } from "react";
import {
  IoMusicalNotesOutline,
  IoHappyOutline,
  IoBookOutline,
  IoShirtOutline,
  IoGameControllerOutline,
  IoHeartOutline,
  IoEllipsisHorizontalOutline,
} from "react-icons/io5";
import { MdOutlineFestival, MdOutlineSportsVolleyball } from "react-icons/md";
import { FaTheaterMasks } from "react-icons/fa";
import { GrWorkshop } from "react-icons/gr";
import { RiHeartAddLine } from "react-icons/ri";
import axiosInstance from "../../utils/axios-instance";
import type { ApiResponse } from "../../types/api-response";
import { EventCategory } from "../../types/enum-event";

export default function Home() {
  const [event, setEvent] = useState<any[]>([]);

  const getAllEvent = async () => {
    try {
      const res = await axiosInstance.get<ApiResponse<any>>("/events");
      setEvent(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllEvent();
  }, []);

  const getIcon = (name: string) => {
    const icons: any = {
      concert: <IoMusicalNotesOutline />,
      seminar: <IoBookOutline />,
      sports: <MdOutlineSportsVolleyball />,
      workshop: <GrWorkshop />,
      exhibition: <RiHeartAddLine />,
      theater: <FaTheaterMasks />,
      festival: <MdOutlineFestival />,
      other: <IoEllipsisHorizontalOutline />,
    };

    const key = String(name).toLowerCase();

    return icons[key] || <IoEllipsisHorizontalOutline />;
  };

  // 2. Itung jumlah event per kategori dari data API
  const categoryCounts: Record<string, number> = {};
  event.forEach((ev) => {
    const name = ev.eventCategory || "OTHER";
    categoryCounts[name] = (categoryCounts[name] || 0) + 1;
  });

  // 3. Tampilkan SEMUA kategori dari enum, dengan count 0 jika belum ada event
  const allCategoryKeys = Object.values(EventCategory);
  const displayCategories = allCategoryKeys.map((name, i) => ({
    id: i,
    name,
    count: categoryCounts[name] || 0,
    icon: getIcon(name),
  }));

  return (
    <div className="bg-gray-50">
      <Hero />
      <section className="relative flex flex-wrap justify-center gap-4 p-10 items-center -mt-30 md:-mt-20 z-10">
        {displayCategories.map((item) => (
          <CategoryCard
            key={item.id}
            name={item.name}
            icon={item.icon}
            count={item.count}
          />
        ))}
      </section>
      <Event />
    </div>
  );
}
