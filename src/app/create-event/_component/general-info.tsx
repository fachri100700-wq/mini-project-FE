import { FaChevronDown } from "react-icons/fa6";
import ImageUpload from "../../../component/image-upload";
import { EventCategory, EventType } from "../../../types/enum-event";

interface createGeneralInfo {
  values: any;
  handleChange: (e: React.ChangeEvent<any>) => void;
  setFieldValue: (field: string, value: any) => void;
  errors: any; // Tambahin ini
  touched: any; // Tambahin ini
}

export default function GeneralInfo({
  values,
  handleChange,
  setFieldValue,
  errors,
  touched,
}: createGeneralInfo) {
  const uploadCover = [
    {
      title: "Upload Event Cover",
      description: "Recommend size: 1600x900px (Max 5MB)",
    },
  ];

  return (
    <section className="flex-1 flex-col mb-15">
      <div className="mb-5">
        <header id="general-info" className="text-black text-4xl font-bold">
          General Information
        </header>
        <h2 className="text-gray-500">
          Start with the basic detail of your event
        </h2>
      </div>

      {/* UPLOAD PHOTO */}
      {uploadCover.map((item, index) => (
        <div key={index}>
          <ImageUpload
            onFileSelect={(file) => setFieldValue("image", file)}
            title={item.title}
            description={item.description}
          />
          {/* Error Image */}
          {errors.image && touched.image && (
            <p className="text-red-500 text-xs mt-2 ml-1 font-medium italic">
              *{errors.image}
            </p>
          )}
        </div>
      ))}

      <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mt-6">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* EVENT NAME */}
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">
                Event Name
              </label>
              <input
                name="eventName"
                type="text"
                placeholder="e.g. Jakarta Tech Conference 2024"
                value={values.eventName}
                onChange={handleChange}
                className={`w-full p-3.5 border ${
                  errors.eventName && touched.eventName
                    ? "border-red-500"
                    : "border-gray-200"
                } rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400 text-gray-700`}
              />
              {errors.eventName && touched.eventName && (
                <p className="text-red-500 text-xs mt-1 ml-1 font-medium italic">
                  *{errors.eventName}
                </p>
              )}
            </div>

            {/* TOTAL SEAT */}
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">
                Total Seat
              </label>
              <input
                name="seatTotal"
                type="number"
                placeholder="e.g.100"
                value={values.seatTotal}
                onChange={handleChange}
                className={`w-full p-3.5 border ${
                  errors.seatTotal && touched.seatTotal
                    ? "border-red-500"
                    : "border-gray-200"
                } rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400 text-gray-700`}
              />
              {errors.seatTotal && touched.seatTotal && (
                <p className="text-red-500 text-xs mt-1 ml-1 font-medium italic">
                  *{errors.seatTotal}
                </p>
              )}
            </div>
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-2">
              Description
            </label>
            <textarea
              name="description"
              rows={6}
              placeholder="Describe what makes your event special..."
              value={values.description}
              onChange={handleChange}
              className={`w-full p-3.5 border ${
                errors.description && touched.description
                  ? "border-red-500"
                  : "border-gray-200"
              } rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all resize-none placeholder:text-gray-400 text-gray-700`}
            />
            {errors.description && touched.description && (
              <p className="text-red-500 text-xs mt-1 ml-1 font-medium italic">
                *{errors.description}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category Dropdown */}
            <div className="relative">
              <label className="block text-sm font-bold text-gray-800 mb-2">
                Category
              </label>
              <div className="relative group">
                <select
                  name="eventCategory"
                  value={values.eventCategory}
                  onChange={handleChange}
                  className="w-full p-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all appearance-none text-gray-700 cursor-pointer"
                >
                  {Object.values(EventCategory).map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                  <FaChevronDown size={14} />
                </div>
              </div>
            </div>

            {/* Visibility Dropdown */}
            <div className="relative">
              <label className="block text-sm font-bold text-gray-800 mb-2">
                Visibility
              </label>
              <div className="relative group">
                <select
                  name="eventType"
                  value={values.eventType}
                  onChange={handleChange}
                  className="w-full p-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all appearance-none text-gray-700 cursor-pointer"
                >
                  {Object.values(EventType).map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                  <FaChevronDown size={14} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
