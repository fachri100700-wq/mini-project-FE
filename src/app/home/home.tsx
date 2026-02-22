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
    };

    // Pastiin 'name' nya string, terus kecilin semua biar pas sama kunci di atas
    const key = String(name).toLowerCase();

    return icons[key] || <IoEllipsisHorizontalOutline />;
  };

  // 2. Itung Kategorinya langsung di sini
  const categoryCounts: any = {};
  event.forEach((ev) => {
    // Ambil namanya, kalau kosong kasih "Other"
    const name = ev.eventCategory || "Other";
    categoryCounts[name] = (categoryCounts[name] || 0) + 1;
  });

  // 3. Ubah jadi array buat di-map
  const displayCategories = Object.keys(categoryCounts).map((name, i) => ({
    id: i,
    name,
    count: categoryCounts[name],
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
