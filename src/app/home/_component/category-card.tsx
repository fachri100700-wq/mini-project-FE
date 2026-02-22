import { useState, type ReactNode } from "react";
import axiosInstance from "../../../utils/axios-instance";

interface CategoryProps {
  name: string;
  icon: ReactNode;
  count: number;
}


export default function CategoryCard({ name, icon, count }: CategoryProps) {
  
  return (
    <div className="group flex flex-col items-center justify-between bg-white w-full max-w-[160px] h-[180px] p-6 border border-gray-100 rounded-xl shadow-sm hover:shadow-xl transition-all cursor-pointer">
      <div className="text-center">
        <h3 className="font-semibold text-gray-800">{name}</h3>
        <p className="text-xs text-gray-400">({count})</p>
      </div>
      <div className="w-16 h-16 flex items-center justify-center bg-[#f3f2fd] rounded-2xl text-[#2563eb] text-3xl group-hover:bg-[#2563eb] group-hover:text-white transition-all">
        {icon}
      </div>
    </div>
  );
}
