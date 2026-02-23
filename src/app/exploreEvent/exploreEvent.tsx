import React, { useEffect, useState } from "react";
import SideBarFilter from "./_component/SideBarFilter";
import EventCard from "../home/_component/event-card";
import SearchBar from "./_component/SearchBar";
import axiosInstance from "../../utils/axios-instance";

export default function ExploreEvent() {
  const [event, setEvent] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [type, setType] = useState<string>("");

  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [totalPage, setTotalPage] = useState<number>(0);

  const getInitialCategories = async () => {
    try {
      const res = await axiosInstance.get(`/events?limit=100`); // Ambil banyak data buat list kategori
      const allEvents = res.data.data;
      const uniqueCategories = Array.from(
        new Set(allEvents.map((item: any) => item.eventCategory)),
      ) as string[];
      setAvailableCategories(uniqueCategories);
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
  };

  const getAllEvent = async () => {
    try {
      const queryParts: string[] = [];

      if (search) queryParts.push(`search=${search}`);
      if (categories.length > 0) {
        queryParts.push(`category=${categories[0]}`);
      }
      if (type) queryParts.push(`type=${type}`);

      queryParts.push(`page=${page}`);
      queryParts.push(`limit=${limit}`);

      const queryString = queryParts.join("&");
      const res = await axiosInstance.get(`/events?${queryString}`);

      const events = res.data.data;
      setEvent(events);
      setTotalPage(res.data.totalPage);

    } catch (err) {
      console.error("Get data failed", err);
    }
  };

  useEffect(() => {
    getInitialCategories();
  }, []);

  useEffect(() => {
    getAllEvent();
  }, [search, page]);

  const getPaginationNumbers = () => {
    const pages: (number | string)[] = [];
    const delta = 2;

    for (let i = 1; i <= totalPage; i++) {
      if (
        i === 1 ||
        i === totalPage ||
        (i >= page - delta && i <= page + delta)
      ) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
    }
    return pages;
  };

  return (
    <div className="min-h-screen mt-10 bg-gray-50 pt-10 pb-24 px-4 md:px-10">
      <div className="max-w-7xl flex gap-8">
        {/* SIDEBAR */}
        <SideBarFilter
          categories={categories}
          availableCategories={availableCategories}
          type={type}
          onCategoryChange={setCategories}
          onTypeChange={setType}
          onApply={() => {
            setPage(1);
            getAllEvent();
          }}
          onReset={() => {
            setCategories([]);
            setType("");
            setPage(1);
            getAllEvent();
          }}
        />

        <main className="flex-1">
          {/* HEADER */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-black">Upcoming Events</h1>
              <p className="text-sm text-gray-500">
                Found {event.length} events
              </p>
            </div>
          </div>

          {/* SEARCH */}
          <SearchBar
            search={search}
            onSearch={setSearch}
            categories={categories}
            availableCategories={availableCategories}
            type={type}
            onCategoryChange={setCategories}
            onTypeChange={setType}
            onApply={() => {
              setPage(1);
              getAllEvent();
            }}
            onReset={() => {
              setSearch("");
              setCategories([]);
              setType("");
              setPage(1);
              getAllEvent();
            }}
          />

          {/* EVENT GRID */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {event.map((item) => (
              <EventCard
                key={item.id}
                id={item.id}
                image={item.imageUrl}
                categories={item.eventCategory}
                month={item.month}
                date={item.date}
                time={item.startDate.split("T")[0]}
                title={item.eventName}
                price={item.eventType}
                location={item.location}
              />
            ))}
          </div>

          {/* PAGINATION */}
          <div className="flex justify-center mt-12 gap-2">
            <button
              className="text-black p-2 border border-black rounded-lg hover:bg-gray-300 cursor-pointer disabled:opacity-50"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              &lt;
            </button>

            {getPaginationNumbers().map((num, i) => (
              <button
                key={i}
                disabled={num === "..."}
                onClick={() => typeof num === "number" && setPage(num)}
                className={`w-10 h-10 rounded-lg font-semibold cursor-pointer ${
                  num === page
                    ? "bg-blue-600 text-white px-3 py-1 rounded"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
              >
                {num}
              </button>
            ))}

            <button
              className="text-black p-2 border border-black rounded-lg hover:bg-gray-300 cursor-pointer disabled:opacity-50"
              disabled={page === totalPage || totalPage === 0}
              onClick={() => setPage((p) => p + 1)}
            >
              &gt;
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
