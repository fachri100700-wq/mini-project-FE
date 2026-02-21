import { FaMapMarkerAlt } from "react-icons/fa";

interface LogisticsProps {
  values: any;
  handleChange: (e: React.ChangeEvent<any>) => void;
  errors: any; // Tambahin ini
  touched: any; // Tambahin ini
}

export default function Logistics({
  values,
  handleChange,
  errors,
  touched,
}: LogisticsProps) {
  return (
    <section className="mb-15">
      <div className="mb-5">
        <header id="logistic" className="text-black text-4xl font-bold">
          Logistics
        </header>
        <h2 className="text-gray-500">
          Set the timeline and venue for your attendees
        </h2>
      </div>
      <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="space-y-8">
          {/* DATE & TIME ROW */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Start Date */}
            <div className="relative">
              <label className="block text-sm font-bold text-gray-800 mb-2">
                Start Date & Time
              </label>
              <div className="relative">
                <input
                  name="startDate"
                  type="datetime-local"
                  value={values.startDate}
                  onChange={handleChange}
                  className={`w-full p-3.5 bg-white border ${
                    errors.startDate && touched.startDate
                      ? "border-red-500"
                      : "border-gray-200"
                  } rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-gray-700 cursor-text`}
                />
              </div>
              {/* Pesan Error */}
              {errors.startDate && touched.startDate && (
                <p className="text-red-500 text-xs mt-1 ml-1 font-medium italic">
                  *{errors.startDate}
                </p>
              )}
            </div>

            {/* End Date */}
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">
                End Date & Time
              </label>
              <input
                name="endDate"
                type="datetime-local"
                value={values.endDate}
                onChange={handleChange}
                className={`w-full p-3.5 bg-white border ${
                  errors.endDate && touched.endDate
                    ? "border-red-500"
                    : "border-gray-200"
                } rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-gray-700`}
              />
              {/* Pesan Error */}
              {errors.endDate && touched.endDate && (
                <p className="text-red-500 text-xs mt-1 ml-1 font-medium italic">
                  *{errors.endDate}
                </p>
              )}
            </div>
          </div>

          {/* VENUE LOCATION */}
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-2">
              Venue Location
            </label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                <FaMapMarkerAlt size={18} />
              </div>
              <input
                name="location"
                type="text"
                placeholder="Search for a venue or address..."
                value={values.location}
                onChange={handleChange}
                className={`w-full p-3.5 pl-12 bg-white border ${
                  errors.location && touched.location
                    ? "border-red-500"
                    : "border-gray-200"
                } rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400 text-gray-700`}
              />
            </div>
            {/* Pesan Error */}
            {errors.location && touched.location && (
              <p className="text-red-500 text-xs mt-1 ml-1 font-medium italic">
                *{errors.location}
              </p>
            )}
          </div>

          {/* MAP VISUALIZATION PLACEHOLDER */}
          <div className="w-full h-60 bg-gray-100 rounded-2xl border border-gray-200 overflow-hidden relative">
            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 space-y-2">
              <FaMapMarkerAlt size={30} className="opacity-20" />
              <p className="text-sm font-medium opacity-50">
                Map visualization will appear here
              </p>
            </div>
            <img
              src={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s+ff0000(106.8271,-6.1751)/106.8271,-6.1751,12/800x300?access_token=YOUR_TOKEN`}
              alt="Map Preview"
              className="w-full h-full object-cover opacity-60 grayscale-[30%]"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
