import { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axios-instance"; // Sesuaikan path-nya

export const useGetReviews = (eventId: string | undefined) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    if (!eventId) return;
    try {
      const res = await axiosInstance.get(`/reviews/${eventId}`);
      setData(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [eventId]);

  return { data, loading, refetch: fetchReviews };
};
