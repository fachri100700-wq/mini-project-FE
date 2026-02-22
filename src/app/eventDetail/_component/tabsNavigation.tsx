import { useState } from "react";
import { IoStar } from "react-icons/io5";
import { useParams } from "react-router-dom";
import Loading from "../../../component/loading";
import { useGetevent } from "../api/get-by-id.api";
import ReviewForm from "./reviewForm";
import { useGetReviews } from "../api/get-review-api"; // Pastikan lu buat hook ini sesuai saran gw tadi

export default function TabsNavigation() {
  const [show, setShow] = useState("about");
  const { id } = useParams();

  // 1. Ambil data Event & Reviews dari BE
  const { event, loading: eventLoading } = useGetevent(id);
  const {
    data: reviewData,
    loading: reviewLoading,
    refetch,
  } = useGetReviews(id);

  if (eventLoading || reviewLoading) return <Loading />;
  if (!event) return null;

  return (
    <>
      {/* Tabs - UI Lu Tetap Mulus */}
      <div className="flex gap-5 border-b border-gray-300 ">
        <button
          onClick={() => setShow("about")}
          className={`pb-4 font-semibold duration-300 cursor-pointer ${
            show === "about"
              ? "text-[#2563eb] border-b-4 border-[#2563eb]"
              : "text-gray-600 hover:text-[#2563eb]"
          }`}
        >
          About
        </button>
        <button
          onClick={() => setShow("reviews")}
          className={`pb-4 font-semibold duration-300 cursor-pointer ${
            show === "reviews"
              ? "text-[#2563eb] border-b-4 border-[#2563eb]"
              : "text-gray-600 hover:text-[#2563eb]"
          }`}
        >
          Reviews
        </button>
      </div>

      {/* About Section */}
      {show === "about" && (
        <section className="w-full flex flex-col gap-2 mt-6">
          <h2 className="text-2xl font-bold text-gray-900">About this Event</h2>
          <p className="text-gray-600 text-base leading-relaxed">
            {event.description}
          </p>
        </section>
      )}

      {/* Reviews & Rating Section */}
      {show === "reviews" && (
        <div className="flex flex-col gap-8 mt-6">
          {/* Header Section - Data Dinamis dari BE */}
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              Reviews & Ratings
            </h2>
            <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100">
              <div className="flex text-yellow-400">
                {/* Visualisasi Bintang Rata-rata */}
                {[...Array(5)].map((_, i) => (
                  <IoStar
                    key={i}
                    className={
                      i < Math.round(reviewData?.averageRating || 0)
                        ? "text-yellow-400"
                        : "text-gray-200"
                    }
                  />
                ))}
              </div>
              <span className="font-bold text-gray-900">
                {reviewData?.averageRating || "0.0"}
              </span>
              <span className="text-gray-400 text-xs">
                ({reviewData?.totalReviews || 0} reviews)
              </span>
            </div>
          </div>

          <div className="space-y-6">
            {/* Form Review - Pake Formik & Yup */}
            <ReviewForm
              eventId={id!}
              userId={event.userId} // Ganti pake ID User dari Auth Lu Ri!
              onSuccess={refetch}
            />

            {/* Reviews List - Mapping Data Asli */}
            {reviewData?.data && reviewData.data.length > 0 ? (
              reviewData.data.map((rev: any) => (
                <div
                  key={rev.id}
                  className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          rev.user?.avatarUrl ||
                          `https://i.pravatar.cc/150?u=${rev.user?.username}`
                        }
                        alt={rev.user?.username}
                        className="w-10 h-10 rounded-full object-cover border border-gray-100"
                      />
                      <div>
                        <h4 className="font-bold text-sm text-gray-900">
                          {rev.user?.username}
                        </h4>
                        <p className="text-[10px] text-gray-400">
                          {new Date(rev.createdAt).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex text-yellow-400 text-xs">
                      {/* Bintang sesuai rating tiap user */}
                      {[...Array(5)].map((_, i) => (
                        <IoStar
                          key={i}
                          className={
                            i < rev.rating ? "text-yellow-400" : "text-gray-200"
                          }
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm italic leading-relaxed">
                    "{rev.feedback}"
                  </p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-400 py-10">
                There are no reviews yet.
              </p>
            )}
          </div>

          {/* Footer Action */}
        </div>
      )}
    </>
  );
}
