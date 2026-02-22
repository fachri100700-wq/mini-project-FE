import { useEffect, useState } from "react";
import { getOrganizerEvents } from "../api/OrganizerEventsPage.api";
import type { OrganizerEvent } from "../types";
import { useNavigate } from "react-router-dom";
import useAuthGuard from "../../../app/hoc/useAuthGuard";

export default function OrganizerEventsPage() {
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
      <div className="flex justify-center py-10">
        <span className="loading loading-spinner loading-md" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Your Events</h1>
      </div>

      <div className="overflow-x-auto rounded-xl border">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Event</th>
              <th>Date</th>
              <th>Location</th>
              <th>Seats</th>
              <th className="text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <td className="font-medium">{event.eventName}</td>

                <td>
                  <div className="text-sm">
                    <div>{new Date(event.startDate).toLocaleDateString()}</div>
                    <div className="text-gray-500">
                      → {new Date(event.endDate).toLocaleDateString()}
                    </div>
                  </div>
                </td>

                <td>{event.location}</td>

                <td>{event.seatTotal}</td>

                <td className="text-right">
                  <button
                    className="btn btn-sm btn-outline"
                    onClick={() =>
                      navigate(`/dashboard/events/${event.id}`)
                    }
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}

            {events.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">
                  No events found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}