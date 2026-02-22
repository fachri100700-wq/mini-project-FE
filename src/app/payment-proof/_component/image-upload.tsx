import { useState, useRef } from "react";
import { IoMdCloudUpload } from "react-icons/io";

interface imageProps {
  title: string;
  description: string;
  onFileSelect: (file: File) => void; // Fungsi buat lapor ke parent
}

export default function ImageUpload({
  title,
  description,
  onFileSelect,
}: imageProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDivClick = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file); // Kirim file ke parent
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      onClick={handleDivClick}
      className="group relative w-full h-80 bg-white rounded-[32px] cursor-pointer mb-5 shadow-sm border-2 border-dashed border-gray-200 hover:border-[#2563eb] overflow-hidden transition-all"
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* TAMPILIN PREVIEW KALAU ADA */}
      {preview && (
        <img
          src={preview}
          alt="Receipt Preview"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      <div
        className={`absolute inset-0 flex flex-col items-center justify-center rounded-lg transition-all ${preview ? "bg-black/50 opacity-0 group-hover:opacity-100" : "bg-gradient-to-t from-black/5 to-transparent"}`}
      >
        <IoMdCloudUpload className="bg-white rounded-full w-12 h-12 p-3 text-[#2563eb] mb-2 shadow-lg group-hover:bg-[#2563eb] group-hover:text-white group-hover:scale-110 transition-all" />
        <h1
          className={`text-xl font-bold ${preview ? "text-white" : "text-gray-800"}`}
        >
          {preview ? "Change Receipt" : title}
        </h1>
        <p className={`text-sm ${preview ? "text-gray-200" : "text-gray-500"}`}>
          {description}
        </p>
      </div>
    </div>
  );
}
