import { useState, useEffect } from "react";
import { getCouponsApi } from "../api/profile.api";
import type { CouponResponseDTO } from "../coupon-response.dto";

export function useCoupons() {
  const [data, setData] = useState<CouponResponseDTO[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    getCouponsApi()
      .then((res) => setData(res))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}