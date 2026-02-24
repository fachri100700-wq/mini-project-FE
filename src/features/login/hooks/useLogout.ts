import { useNavigate } from "react-router-dom";
import useAuthStore from "../../../stores/useAuthStore";

export function useLogout() {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  return () => {
    setAuth(null);

    localStorage.removeItem("authToken");

    navigate("/login", { replace: true });
  };
}