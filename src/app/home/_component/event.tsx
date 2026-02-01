import EventCard from "../_component/event-card";

interface eventItem {
  id: number;
  image: string;
  categories: string;
  month: string;
  date: number;
  time: string;
  title: string;
  price: string;
  location: string;
}
export default function Event() {
  const eventList: eventItem[] = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?q=80&w=1974&auto=format&fit=crop",
      categories: "Music",
      month: "FEB",
      date: 14,
      time: "Saturday, 08:00 PM",
      title: "Valentine Soul Session: Romantic Jazz Night",
      price: "Free",
      location: "Titan Center, Bintaro",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop",
      categories: "Education",
      month: "FEB",
      date: 20,
      time: "Friday, 10:00 AM",
      title: "UI/UX Masterclass: Building User-Centric Products",
      price: "Rp. 125.000",
      location: "GoWork Coworking, Jakarta",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1974&auto=format&fit=crop",
      categories: "Food",
      month: "MAR",
      date: 5,
      time: "Sunday, 04:00 PM",
      title: "Jakarta Street Food Festival 2026",
      price: "Rp. 100.000",
      location: "GBK Area, Senayan",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2070&auto=format&fit=crop",
      categories: "Gaming",
      month: "MAR",
      date: 12,
      time: "Thursday, 01:00 PM",
      title: "E-Sports Championship: National Qualifier",
      price: "Free",
      location: "ICE BSD, Tangerang",
    },
  ];

  return (
    <section className="flex flex-col justify-center items-center gap-3">
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

      <div className="grid grid-col-1 md:grid-cols-4 gap-5 px-10 mt-10">
        {eventList.map((item) => (
          <EventCard
            key={item.id}
            image={item.image}
            categories={item.categories}
            month={item.month}
            date={item.date}
            time={item.time}
            title={item.title}
            price={item.price}
            location={item.location}
          />
        ))}
      </div>
    </section>
  );
}
