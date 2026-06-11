import { useNavigate } from "react-router-dom";
import useAuthStore from "../../../stores/useAuthStore";
import axiosInstance from "../../../app/utils/axiosInstance";

export function useLogout() {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  return async () => {
    try {
      await axiosInstance.post("/auth/logout");
    } catch (error) {
      console.error("Logout failed:", error);
    }

    setAuth(null);
    localStorage.removeItem("authToken");
    navigate("/login", { replace: true });
  };
}