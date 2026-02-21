import { IoFilterOutline } from "react-icons/io5";

type Props = {
  categories: string[];
  availableCategories: string[];
  type: string;
  onCategoryChange: (val: string[]) => void;
  onTypeChange: (val: string) => void;
  onApply: () => void;
  onReset: () => void;
};

export default function SideBarFilter({
  categories,
  availableCategories,
  type,
  onCategoryChange,
  onTypeChange,
  onApply,
  onReset,
}: Props) {
  return (
    <aside className="hidden md:block w-64">
      <div className="bg-white p-6 rounded-2xl shadow sticky top-12">
        <div className="flex items-center gap-2 mb-6">
          <IoFilterOutline className="text-black" />
          <h3 className="font-bold text-lg text-black">Filters</h3>
        </div>

        {/* CATEGORY */}
        <div className="mb-6">
          <h4 className="text-sm text-gray-400 mb-3 font-semibold tracking-wider">
            CATEGORIES
          </h4>
          <div className="flex flex-col gap-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
            {availableCategories.map((item) => (
              <label
                key={item}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={categories.includes(item)}
                  onChange={() => {
                    if (categories.includes(item)) {
                      onCategoryChange(categories.filter((c) => c !== item));
                    } else {
                      onCategoryChange([...categories, item]);
                    }
                  }}
                />
                <span className="text-gray-700 text-sm group-hover:text-black transition-colors">
                  {item}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* TYPE */}
        <div className="mb-6">
          <h4 className="text-sm text-gray-400 mb-3 font-semibold tracking-wider">
            TYPE
          </h4>
          <div className="flex gap-2">
            <button
              onClick={() => onTypeChange(type === "FREE" ? "" : "FREE")}
              className={`flex-1 py-2 rounded text-sm font-medium transition-all ${
                type === "FREE"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-100"
                  : "text-gray-500 border border-gray-200 hover:border-blue-300"
              }`}
            >
              Free
            </button>
            <button
              onClick={() => onTypeChange(type === "PAID" ? "" : "PAID")}
              className={`flex-1 py-2 rounded text-sm font-medium transition-all ${
                type === "PAID"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-100"
                  : "text-gray-500 border border-gray-200 hover:border-blue-300"
              }`}
            >
              Paid
            </button>
          </div>
        </div>

        {/* ACTION */}
        <div className="space-y-3 pt-4 border-t border-gray-100">
          <button
            onClick={onApply}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold transition-colors shadow-lg shadow-blue-50"
          >
            Apply Filters
          </button>

          <button
            onClick={onReset}
            className="w-full text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            Reset All
          </button>
        </div>
      </div>
    </aside>
  );
}
