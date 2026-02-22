import { useEffect, useState } from "react";
import EventCard from "../_component/event-card";
import axiosInstance from "../../../utils/axios-instance";
import { Swiper, SwiperSlide } from "swiper/react";
import type { ApiResponse } from "../../../types/api-response";

export default function Event() {
  const [event, setEvent] = useState<any[]>([]);

  const getAllEvent = async () => {
    try {
      const res = await axiosInstance.get<ApiResponse<any>>("/events");
      setEvent(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllEvent();
  }, []);

  return (
    <section className="flex flex-col justify-center items-center gap-3 px-3">
      <h2 className="text-base text-[#2563eb] font-semibold text-center">
        OUR LATEST LISTING
      </h2>
      <h1 className="text-4xl text-black font-bold text-center">
        DISCOVER TRENDING EXPERIENCES
      </h1>
      <p className="text-sm text-black/70 text-center">
        Stay ahead of the curve. Access the most anticipated events and trending
        meetups, updated daily just for you.
      </p>

      <div className="w-full max-w-[400px] md:max-w-[1200px]  mt-10 px-10 md:px-0">
        <Swiper
          centeredSlides={true}
          loop={true}
          spaceBetween={16}
          slidesPerView={1}
          grabCursor={true}
          breakpoints={{
            640: { slidesPerView: 1 },
            1024: { slidesPerView: 4 },
          }}
        >
          {event?.map((item: any) => (
            <SwiperSlide key={item.id}>
              <EventCard
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
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
