import { useEffect, useState } from "react";
import { IoFilterOutline, IoSearchOutline } from "react-icons/io5";
import { useDebounce } from "../../../hooks/useDebouns";

type Props = {
  search: string;
  onSearch: (val: string) => void;
  categories: string[];
  availableCategories: string[];
  type: string;
  onCategoryChange: (val: string[]) => void;
  onTypeChange: (val: string) => void;
  onApply: () => void;
  onReset: () => void;
};

export default function SearchBar({
  search,
  onSearch,
  categories,
  availableCategories,
  type,
  onCategoryChange,
  onTypeChange,
  onApply,
  onReset,
}: Props) {
  const [show, setShow] = useState(false);
  const [localSearch, setLocalSearch] = useState(search);
  const debouncedSearch = useDebounce(localSearch, 500);

  useEffect(() => {
    onSearch(debouncedSearch);
  }, [debouncedSearch]);

  // Sync internal state if search is reset from parent
  useEffect(() => {
    setLocalSearch(search);
  }, [search]);

  return (
    <>
      <div className="flex items-center gap-2 mb-8">
        <div className="relative flex-1">
          <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
          <input
            type="text"
            placeholder="Search event or location..."
            className="w-full pl-12 pr-4 py-4 text-black bg-white rounded-2xl border border-gray-100 shadow-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
          />
        </div>

        <button
          onClick={() => setShow(!show)}
          className="md:hidden bg-blue-600 p-4 rounded-2xl text-white text-xl shadow-lg shadow-blue-100"
        >
          <IoFilterOutline />
        </button>
      </div>

      {show && (
        <aside className="md:hidden mb-6 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-50">
            <div className="mb-6">
              <h4 className="text-xs font-bold text-gray-400 mb-4 tracking-widest">
                CATEGORIES
              </h4>
              <div className="flex flex-wrap gap-2">
                {availableCategories.map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      if (categories.includes(item)) {
                        onCategoryChange(categories.filter((c) => c !== item));
                      } else {
                        onCategoryChange([...categories, item]);
                      }
                    }}
                    className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                      categories.includes(item)
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-xs font-bold text-gray-400 mb-4 tracking-widest">
                TYPE
              </h4>
              <div className="flex gap-2">
                <button
                  onClick={() => onTypeChange("FREE")}
                  className={`flex-1 py-3 rounded-xl text-sm font-bold ${
                    type === "FREE"
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-100"
                      : "bg-gray-50 text-gray-500 border border-gray-100"
                  }`}
                >
                  Free
                </button>
                <button
                  onClick={() => onTypeChange("PAID")}
                  className={`flex-1 py-3 rounded-xl text-sm font-bold ${
                    type === "PAID"
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-100"
                      : "bg-gray-50 text-gray-500 border border-gray-100"
                  }`}
                >
                  Paid
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => {
                  onApply();
                  setShow(false);
                }}
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-50"
              >
                Apply Filters
              </button>

              <button
                onClick={() => {
                  onReset();
                  setShow(false);
                }}
                className="w-full py-2 text-sm text-gray-400"
              >
                Reset All
              </button>
            </div>
          </div>
        </aside>
      )}
    </>
  );
}
