import type { ComponentType } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../stores/useAuthStore";

export default function useAuthGuard<P extends object>(
  WrappedComponent: ComponentType<P>,
  allowedRoles: string[]
) {
  return function AuthGuardComponent(props: P) {
    const navigate = useNavigate();
    const auth = useAuthStore((state) => state?.auth);

    useEffect(() => {
      if (auth === null) return;

      if (!allowedRoles.includes(auth.role)) {
        navigate("/", { replace: true });
      }
    }, [auth, allowedRoles, navigate]);

    if (auth === null) {
      return null;
    }

    if (!allowedRoles.includes(auth.role)) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}

// Cara gunain-nya: di halaman yang mau di protect tulis export default useAuthGuard(Function halaman, [Role yang diperbolehkan])