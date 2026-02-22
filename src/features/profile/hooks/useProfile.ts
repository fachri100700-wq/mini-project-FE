import { useEffect, useState } from "react";
import { getProfileApi } from "../api/profile.api";
import type { Profile } from "../type";
import toast from "react-hot-toast";

type UseProfileResult =
  | { status: "loading" }
  | { status: "error" }
  | { status: "success"; profile: Profile };

export function useProfile(): UseProfileResult {
  const [state, setState] = useState<UseProfileResult>({
    status: "loading",
  });

  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await getProfileApi();

        if (!data) {
          setState({ status: "error" });
          return;
        }

        setState({
          status: "success",
          profile: data,
        });
      } catch {
        toast.error("Failed to load profile");
        setState({ status: "error" });
      }
    }

    fetchProfile();
  }, []);

  return state;
}