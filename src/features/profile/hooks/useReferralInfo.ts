import { useState, useEffect } from "react";
import { getReferralInfoApi } from "../api/profile.api";
import type { ReferralInfoResponseDTO } from "../referral-response.dto";

export function useReferralInfo() {
  const [data, setData] = useState<ReferralInfoResponseDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const [nextExpiringReward, setNextExpiringReward] = useState<
    { points: number; expireDate: string } | null
  >(null);

  useEffect(() => {
    getReferralInfoApi()
      .then((res) => {
        setData(res);

        const next = res.history
          ?.filter((r) => new Date(r.expireDate) > new Date())
          .sort(
            (a, b) =>
              new Date(a.expireDate).getTime() - new Date(b.expireDate).getTime()
          )[0];

        if (next) setNextExpiringReward(next);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error, nextExpiringReward };
}