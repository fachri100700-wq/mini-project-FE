import { useEffect, useState } from "react";
import { getOrganizerEvents } from "../api/OrganizerEventsPage.api";
import type { OrganizerEvent } from "../types";
import { useNavigate } from "react-router-dom";
import useAuthGuard from "../../../app/hoc/useAuthGuard";
import { IoCalendarOutline, IoLocationOutline, IoPeopleOutline, IoCreateOutline } from "react-icons/io5";

function OrganizerEventsPage() {
  const [events, setEvents] = useState<OrganizerEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getOrganizerEvents()
      .then(setEvents)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <span className="loading loading-spinner loading-lg text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <header className="mb-10 flex justify-between items-center">
        <div>
          <h1 className="text-black text-4xl font-bold">Your Events</h1>
          <p className="text-gray-500 mt-2 font-medium">Manage and monitor all your organized events in one place.</p>
        </div>
        <button
          onClick={() => navigate("/create-event")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-2xl shadow-lg shadow-blue-100 transition-all active:scale-95 flex items-center gap-2"
        >
          <IoCreateOutline size={20} />
          Create New Event
        </button>
      </header>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Event Details</th>
              <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Date & Time</th>
              <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Location</th>
              <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Capacity</th>
              <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-50">
            {events.map((event) => (
              <tr key={event.id} className="hover:bg-blue-50/30 transition-colors group">
                <td className="px-8 py-6">
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-900 text-base group-hover:text-blue-600 transition-colors">{event.eventName}</span>
                    <span className="text-xs text-gray-400 mt-1 uppercase font-bold tracking-tighter">{event.id.slice(0, 8)}</span>
                  </div>
                </td>

                <td className="px-8 py-6">
                  <div className="flex items-center gap-3 text-gray-600">
                    <IoCalendarOutline className="text-blue-500" size={18} />
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-gray-700">{new Date(event.startDate).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                      <span className="text-[10px] text-gray-400 font-medium italic">Until {new Date(event.endDate).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}</span>
                    </div>
                  </div>
                </td>

                <td className="px-8 py-6">
                  <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
                    <IoLocationOutline className="text-red-400" size={18} />
                    {event.location}
                  </div>
                </td>

                <td className="px-8 py-6 text-center">
                  <div className="inline-flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
                    <IoPeopleOutline className="text-gray-400" size={14} />
                    <span className="text-xs font-black text-gray-700">{event.seatTotal}</span>
                  </div>
                </td>

                <td className="px-8 py-6 text-right">
                  <button
                    className="p-2.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                    onClick={() => navigate(`/dashboard/events/${event.id}`)}
                    title="Edit Event"
                  >
                    <IoCreateOutline size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {events.length === 0 && (
          <div className="p-20 text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <IoCalendarOutline size={32} className="text-gray-200" />
            </div>
            <p className="text-gray-400 font-bold">No events created yet.</p>
            <p className="text-sm text-gray-300 mt-1">Start by creating your first amazing event!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default useAuthGuard(OrganizerEventsPage, ["organizer"]);
