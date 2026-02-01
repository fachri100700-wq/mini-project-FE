import CategoryCard from "./_component/category-card";
import Hero from "./_component/hero";
import Event from "./_component/event";
import { type ReactNode } from "react";
import {
  IoMusicalNotesOutline,
  IoHappyOutline,
  IoBookOutline,
  IoShirtOutline,
  IoGameControllerOutline,
  IoHeartOutline,
} from "react-icons/io5";

interface categoryItem {
  id: number;
  name: string;
  count: number;
  icon: ReactNode;
}

export default function Home() {
  const categories: categoryItem[] = [
    { id: 1, name: "Music", count: 12, icon: <IoMusicalNotesOutline /> },
    { id: 2, name: "Comedy", count: 5, icon: <IoHappyOutline /> },
    { id: 3, name: "Education", count: 15, icon: <IoBookOutline /> },
    { id: 4, name: "Fashion", count: 7, icon: <IoShirtOutline /> },
    { id: 5, name: "Gaming", count: 20, icon: <IoGameControllerOutline /> },
    { id: 6, name: "Health", count: 10, icon: <IoHeartOutline /> },
  ];

  return (
    <div className="bg-gray-50">
      <Hero />
      <section className="relative flex flex-wrap justify-center gap-4 p-10 items-center -mt-30 md:-mt-20 z-10">
        {categories.map((item) => (
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
