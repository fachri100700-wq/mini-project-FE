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
    const role = useAuthStore((state) => state.auth?.role);

    useEffect(() => {
      if (!role || !allowedRoles.includes(role)) {
        navigate("/login", { replace: true });
      }
    }, [role, allowedRoles, navigate]);

    if (!role || !allowedRoles.includes(role)) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}

// Cara gunain-nya: di halaman yang mau di protect tulis export default useAuthGuard(Function halaman, [Role yang diperbolehkan])