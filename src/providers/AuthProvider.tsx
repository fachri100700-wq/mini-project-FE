import { useEffect } from "react";
import useAuthStore from "../stores/useAuthStore";
import { sessionApi } from "../features/login/api/session.api";

export default function AuthProvider({ children }: any) {
  const { setAuth } = useAuthStore();

  const onSessionAuth = async () => {
    try {
      const user = await sessionApi();
      console.log("AuthProvider Session User:", user);

      if (user) {
        setAuth({
          id: user.id,
          username: user.username,
          role: user.role,
        });
      } else {
        setAuth(null);
      }
    } catch (error) {
      console.error("Session auth failed:", error);
      setAuth(null);
    }
  };

  useEffect(() => {
    onSessionAuth();
  }, []);

  return <>{children}</>;
}
