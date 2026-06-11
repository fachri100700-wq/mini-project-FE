import { useFormik } from "formik";
import * as Yup from "yup";
import { IoStar } from "react-icons/io5";
import axiosInstance from "../../../app/utils/axiosInstance";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { useGetReviews } from "../api/get-review-api";
import { useParams } from "react-router-dom";

interface ReviewFormProps {
  eventId: string;
  userId: string;
  onSuccess: () => void;
}

export default function ReviewForm({
  eventId,
  userId,
  onSuccess,
}: ReviewFormProps) {
  const { id } = useParams()

  const [hover, setHover] = useState(0);

  const { transactionDone, loading } = useGetReviews(id)
 
  const formik = useFormik({
    initialValues: {
      rating: 0,
      feedback: "",
    },
    validationSchema: Yup.object({
      rating: Yup.number()
        .min(1, "Rating must be requird")
        .max(5)
        .required(),
      feedback: Yup.string()
        .min(10, "Feedback are too short")
        .required(),
    }),
    onSubmit: async (values) => {
      try {
        await axiosInstance.post("/reviews", {
          ...values,
          eventId,
          userId,
        });
        toast.success("Review success");
        formik.resetForm();
        onSuccess();
      } catch (err: any) {
        toast.error(err.response?.data?.message || "Gagal kirim review");
      }
    },
  });

  if (loading) {
    return (
      <div className="w-full bg-white rounded-3xl shadow-sm border border-gray-100 p-12 flex flex-col items-center justify-center">
        <span className="loading loading-spinner loading-lg text-blue-500 mb-4" />
        <p className="text-gray-400 font-medium animate-pulse">Checking your ticket status...</p>
      </div>
    );
  }

  if (!transactionDone) {
    return (
      <div className="w-full bg-gray-50/50 rounded-3xl border border-dashed border-gray-200 p-12 text-center">
        <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
          <IoStar className="text-gray-200" size={32} />
        </div>
        <p className="text-gray-500 font-bold text-lg">Wanna share your experience?</p>
        <p className="text-gray-400 text-sm mt-1 max-w-xs mx-auto">You haven't bought a ticket for this event yet. Buy one to unlock the review form!</p>
      </div>
    );
  }


  return (
    <div className="w-full bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Write a Review</h2>

      <form onSubmit={formik.handleSubmit}>
        {/* Section Rating */}
        <div className="mb-6">
          <p className="text-xs font-bold text-slate-500 uppercase mb-3">
            Your Rating
          </p>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => formik.setFieldValue("rating", star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
              >
                <IoStar
                  size={28}
                  className={`${star <= (hover || formik.values.rating) ? "text-yellow-400" : "text-gray-200"}`}
                />
              </button>
            ))}
          </div>
          {formik.errors.rating && formik.touched.rating && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.rating}</p>
          )}
        </div>

        {/* Section Comment */}
        <div className="mb-8">
          <label className="block text-xs font-bold text-slate-500 uppercase mb-3">
            Your Comment
          </label>
          <textarea
            className="w-full p-4 bg-slate-50 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200 resize-none"
            placeholder="Share your experience at this event..."
            rows={4}
            // name="feedback" <-- INI DIHAPUS AJA, RI!
            {...formik.getFieldProps("feedback")}
          />
          {formik.errors.feedback && formik.touched.feedback && (
            <p className="text-red-500 text-xs mt-1">
              {formik.errors.feedback}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="bg-[#1D85F0] hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg active:scale-95 disabled:bg-gray-400"
        >
          {formik.isSubmitting ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
}
