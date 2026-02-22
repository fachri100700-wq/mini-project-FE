import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";

interface Ticket {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

interface TicketingProps {
  formik: any;
}

export default function Ticketing({ formik }: TicketingProps) {
  // State lokal tetap untuk UI dinamis
  const [ticket, setTicket] = useState<Ticket[]>([
    { id: Date.now(), name: "", quantity: 0, price: 0 },
  ]);

  // Fungsi sinkronisasi ke Formik
  const syncToFormik = (updatedTickets: Ticket[]) => {
    formik.setFieldValue("ticketType", updatedTickets);
    // Mark as touched supaya error langsung muncul kalau validasi gagal
    formik.setFieldTouched("ticketType", true, false);
  };

  const handleAddTicket = () => {
    const newTicket: Ticket = {
      id: Date.now(),
      name: "",
      quantity: 0,
      price: 0,
    };
    const updated = [...ticket, newTicket];
    setTicket(updated);
    syncToFormik(updated);
  };

  const handleDeleteTicketing = (id: number) => {
    if (ticket.length > 1) {
      const updated = ticket.filter((t) => t.id !== id);
      setTicket(updated);
      syncToFormik(updated);
    }
  };

  const handleInputChange = (
    id: number,
    field: keyof Ticket,
    value: string | number,
  ) => {
    const updated = ticket.map((t) =>
      t.id === id ? { ...t, [field]: value } : t,
    );
    setTicket(updated);
    syncToFormik(updated);
  };

  return (
    <section className="mb-15">
      {/* HEADER SECTION */}
      <div className="flex justify-between items-end mb-5">
        <div>
          <h2 id="ticketing" className="text-3xl font-bold text-gray-900">
            Ticketing
          </h2>
          <p className="text-gray-500 mt-1">
            Add ticket types for your attendees.
          </p>
          {/* Error Global jika ticketType bermasalah secara keseluruhan */}
          {typeof formik.errors.ticketType === "string" && (
            <p className="text-red-500 text-xs mt-1 font-bold italic">
              *{formik.errors.ticketType}
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={handleAddTicket}
          className="flex items-center space-x-2 bg-[#2563eb] hover:bg-[#1a47aa] text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-100 cursor-pointer"
        >
          <FaPlus size={14} />
          <span>Add Ticket Type</span>
        </button>
      </div>

      {/* TICKET CARD LIST */}
      <div className="space-y-4">
        {ticket.map((t, index) => {
          // Akses error per baris berdasarkan index
          const ticketErrors: any = formik.errors.ticketType?.[index];
          const ticketTouched: any = formik.touched.ticketType?.[index];

          return (
            <div
              key={t.id}
              className={`bg-white p-8 rounded-3xl border ${
                ticketErrors
                  ? "border-red-200 shadow-red-50/50"
                  : "border-blue-100"
              } shadow-sm relative group transition-all`}
            >
              {/* Tombol Delete */}
              <button
                type="button"
                onClick={() => handleDeleteTicketing(t.id)}
                className="absolute top-6 right-8 text-gray-400 hover:text-red-500 transition-colors"
              >
                <FaRegTrashAlt size={20} />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
                {/* TICKET NAME */}
                <div className="md:col-span-5">
                  <label className="block text-sm font-bold text-gray-800 mb-2">
                    Ticket Name
                  </label>
                  <input
                    type="text"
                    value={t.name}
                    onChange={(e) =>
                      handleInputChange(t.id, "name", e.target.value)
                    }
                    placeholder="e.g. Reguler or VIP"
                    className={`w-full p-4 bg-white border ${
                      ticketErrors?.name && ticketTouched?.name
                        ? "border-red-500"
                        : "border-gray-200"
                    } rounded-xl focus:border-blue-500 outline-none transition-all font-medium text-gray-700`}
                  />
                  {ticketErrors?.name && ticketTouched?.name && (
                    <p className="text-red-500 text-[10px] mt-1 italic font-medium">
                      *{ticketErrors.name}
                    </p>
                  )}
                </div>

                {/* QUANTITY */}
                <div className="md:col-span-3">
                  <label className="block text-sm font-bold text-gray-800 mb-2">
                    Quantity
                  </label>
                  <input
                    type="number"
                    value={t.quantity}
                    onChange={(e) =>
                      handleInputChange(
                        t.id,
                        "quantity",
                        Number(e.target.value),
                      )
                    }
                    placeholder="100"
                    className={`w-full p-4 bg-white border ${
                      ticketErrors?.quantity && ticketTouched?.quantity
                        ? "border-red-500"
                        : "border-gray-200"
                    } rounded-xl focus:border-blue-500 outline-none transition-all font-medium text-gray-700`}
                  />
                  {ticketErrors?.quantity && ticketTouched?.quantity && (
                    <p className="text-red-500 text-[10px] mt-1 italic font-medium">
                      *{ticketErrors.quantity}
                    </p>
                  )}
                </div>

                {/* PRICE */}
                <div className="md:col-span-4">
                  <label className="block text-sm font-bold text-gray-800 mb-2">
                    Price (IDR)
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-4 text-gray-400 font-bold border-r pr-3 border-gray-100">
                      Rp
                    </span>
                    <input
                      type="number"
                      value={t.price}
                      onChange={(e) =>
                        handleInputChange(t.id, "price", Number(e.target.value))
                      }
                      placeholder="250.000"
                      className={`w-full p-4 pl-16 bg-white border ${
                        ticketErrors?.price && ticketTouched?.price
                          ? "border-red-500"
                          : "border-gray-200"
                      } rounded-xl focus:border-blue-500 outline-none transition-all font-bold text-gray-800`}
                    />
                  </div>
                  {ticketErrors?.price && ticketTouched?.price && (
                    <p className="text-red-500 text-[10px] mt-1 italic font-medium">
                      *{ticketErrors.price}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
