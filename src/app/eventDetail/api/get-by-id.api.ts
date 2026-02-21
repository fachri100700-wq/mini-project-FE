import { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axios-instance";
import type { ApiResponse } from "../../../types/api-response";

export const useGetevent = (id: string | undefined) => {
    const [event, setEvent] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true)


    const getById = async () => {
      try {
        setLoading(true)
        const res = await axiosInstance.get<ApiResponse<any>>(`/events/${id}`);

        setEvent(res.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false)
      }
    };

    useEffect(() => {
      getById();
    }, [id]);

    return { event, loading };
}