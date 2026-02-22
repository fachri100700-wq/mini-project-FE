import { useState, useRef } from "react";
import { IoMdCloudUpload } from "react-icons/io";

interface ImageUploadProps {
  title: string;
  description: string;
  onFileSelect: (file: File) => void; // Dibenarkan: sekarang nerima fungsi
}

export default function ImageUpload({
  title,
  description,
  onFileSelect,
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDivClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file); // Lapor ke parent
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      onClick={handleDivClick}
      className="group relative w-full h-80 bg-white rounded-lg cursor-pointer mb-5 shadow-sm border-2 border-dashed border-gray-200 hover:border-[#2563eb] overflow-hidden"
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {preview ? (
        <img
          src={preview}
          alt="Preview"
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : null}

      <div
        className={`absolute inset-0 flex flex-col items-center justify-center rounded-lg transition-all ${preview ? "bg-black/40 opacity-0 group-hover:opacity-100" : "bg-gradient-to-t from-black/5 to-transparent"}`}
      >
        <IoMdCloudUpload className="bg-white rounded-full w-10 h-10 p-2 text-[#2563eb] mb-2 shadow-lg group-hover:bg-[#2563eb] group-hover:text-white group-hover:scale-110 transition-all" />
        <h1
          className={`text-xl font-bold ${preview ? "text-white" : "text-black"}`}
        >
          {preview ? "Change Photo" : title}
        </h1>
        <p className={`${preview ? "text-gray-200" : "text-gray-500"} text-sm`}>
          {description}
        </p>
      </div>
    </div>
  );
}
