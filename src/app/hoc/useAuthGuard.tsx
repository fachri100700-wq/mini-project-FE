import type { ComponentType } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../stores/useAuthStore";
import { toast } from "react-hot-toast";

export default function useAuthGuard<P extends object>(
  WrappedComponent: ComponentType<P>,
  allowedRoles: string[]
) {
  return function AuthGuardComponent(props: P) {
    const navigate = useNavigate();
    const auth = useAuthStore((state) => state?.auth);

    useEffect(() => {
      console.log("AuthGuard Check:", { auth, allowedRoles });
      // Tunggu sampai auth state terisi (tidak null awal)
      if (auth === undefined) return;

      if (!auth) {
        console.log("AuthGuard: No auth, redirecting...");
        toast.error("Please login first");
        navigate("/login", { replace: true });
        return;
      }

      if (!auth?.role || !allowedRoles.map(r => r.toLowerCase()).includes(auth.role.toLowerCase())) {
        console.log("AuthGuard: Role mismatch or missing, redirecting...", { userRole: auth?.role, allowedRoles });
        toast.error(`Unauthorized: Only ${allowedRoles.join(", ")} can access this page`);
        navigate("/login", { replace: true });
      }
    }, [auth, allowedRoles, navigate]);

    if (!auth?.role || !allowedRoles.map(r => r.toLowerCase()).includes(auth.role.toLowerCase())) {
      return null; // Return null saja, biarkan useEffect yang handle redirect biar gak error render
    }

    return <WrappedComponent {...props} />;
  };
}

// Cara gunain-nya: di halaman yang mau di protect tulis export default useAuthGuard(Function halaman, [Role yang diperbolehkan])