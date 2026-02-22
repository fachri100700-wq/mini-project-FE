import React, { useState } from "react";
import { FaUsers, FaClock } from "react-icons/fa";

interface PromotionsProps {
  values: any;
  handleChange: (e: React.ChangeEvent<any>) => void;
  setFieldValue: (field: string, value: any) => void;
  errors: any; // Tambahin ini
  touched: any; // Tambahin ini
}

export default function Promotions({
  values,
  handleChange,
  setFieldValue,
  errors,
  touched,
}: PromotionsProps) {
  const [isPromoActive, setIsPromoActive] = useState(false);

  const handleToggle = () => {
    const newState = !isPromoActive;
    setIsPromoActive(newState);

    if (!newState) {
      setFieldValue("promoName", "");
      setFieldValue("discAmount", 0);
      setFieldValue("promoStartDate", "");
      setFieldValue("promoEndDate", "");
    }
  };

  return (
    <section id="promotion" className="space-y-6">
      {/* HEADER */}
      <div>
        <h2 id="promotion-title" className="text-3xl font-bold text-gray-900">
          Promotions
        </h2>
        <p className="text-gray-500 mt-1">
          Setup discounts to boost your sales.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                <FaClock size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">
                  Early Bird Discounts
                </h3>
                <p className="text-gray-500 text-sm">
                  Set a specific timeframe for discounted ticket prices.
                </p>
              </div>
            </div>
            {/* Toggle Switch */}
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={isPromoActive}
                onChange={handleToggle}
              />
              <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          {isPromoActive && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-top-2 duration-500">
                {/* Promo Code Name */}
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">
                    Promo Code
                  </label>
                  <input
                    name="promoName"
                    type="text"
                    value={values.promoName}
                    onChange={handleChange}
                    placeholder="e.g. EARLYBIRDRocks"
                    className={`w-full p-4 bg-gray-50 border ${
                      errors.promoName && touched.promoName
                        ? "border-red-500"
                        : "border-gray-100"
                    } rounded-xl focus:bg-white focus:border-blue-500 outline-none transition-all font-bold text-gray-700 placeholder:font-normal`}
                  />
                  {errors.promoName && touched.promoName && (
                    <p className="text-red-500 text-[10px] mt-1 font-medium italic">
                      *{errors.promoName}
                    </p>
                  )}
                </div>

                {/* Discount Amount */}
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">
                    Discount Amount (%)
                  </label>
                  <input
                    name="discAmount"
                    type="number"
                    value={values.discAmount}
                    onChange={handleChange}
                    placeholder="20"
                    className={`w-full p-4 bg-gray-50 border ${
                      errors.discAmount && touched.discAmount
                        ? "border-red-500"
                        : "border-gray-100"
                    } rounded-xl focus:bg-white focus:border-blue-500 outline-none transition-all font-bold text-gray-700`}
                  />
                  {errors.discAmount && touched.discAmount && (
                    <p className="text-red-500 text-[10px] mt-1 font-medium italic">
                      *{errors.discAmount}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-top-2 duration-500 mt-5">
                {/* Starts On */}
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">
                    Starts On
                  </label>
                  <input
                    name="promoStartDate"
                    type="date"
                    value={values.promoStartDate}
                    onChange={handleChange}
                    className={`w-full p-4 bg-gray-50 border ${
                      errors.promoStartDate && touched.promoStartDate
                        ? "border-red-500"
                        : "border-gray-100"
                    } rounded-xl focus:bg-white focus:border-blue-500 outline-none transition-all font-medium text-gray-700`}
                  />
                  {errors.promoStartDate && touched.promoStartDate && (
                    <p className="text-red-500 text-[10px] mt-1 font-medium italic">
                      *{errors.promoStartDate}
                    </p>
                  )}
                </div>
                {/* Ends On */}
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">
                    Ends On
                  </label>
                  <input
                    name="promoEndDate"
                    type="date"
                    value={values.promoEndDate}
                    onChange={handleChange}
                    className={`w-full p-4 bg-gray-50 border ${
                      errors.promoEndDate && touched.promoEndDate
                        ? "border-red-500"
                        : "border-gray-100"
                    } rounded-xl focus:bg-white focus:border-blue-500 outline-none transition-all font-medium text-gray-700`}
                  />
                  {errors.promoEndDate && touched.promoEndDate && (
                    <p className="text-red-500 text-[10px] mt-1 font-medium italic">
                      *{errors.promoEndDate}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">
                    Promo Quota
                  </label>
                  <input
                    name="quota"
                    type="number"
                    value={values.quota}
                    onChange={handleChange}
                    placeholder="e.g. 50"
                    className={`w-full p-4 bg-gray-50 border ${
                      errors.quota && touched.quota
                        ? "border-red-500"
                        : "border-gray-100"
                    } rounded-xl focus:bg-white focus:border-blue-500 outline-none transition-all font-bold text-gray-700`}
                  />
                  {errors.quota && touched.quota && (
                    <p className="text-red-500 text-[10px] mt-1 font-medium italic">
                      *{errors.quota}
                    </p>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
