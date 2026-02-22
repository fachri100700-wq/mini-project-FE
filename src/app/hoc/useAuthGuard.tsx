import type { ComponentType } from "react"
import useAuthStore from "../../stores/useAuthStore"

export default function useAuthGuard<P extends object>(
    WrappedComponent: ComponentType<P>,
    allowedRoles: string[]
){
    return function AuthGuardComponent(props: P){
        const { role } = useAuthStore();
        const isAuthorized = allowedRoles.includes(role);

        if(!isAuthorized){
            return <h1>User role unauthorized</h1>
        }

        return <WrappedComponent {...props} />;
    }
}

// Cara gunain-nya: di halaman yang mau di protect tulis export default useAuthGuard(Function halaman, [Role yang diperbolehkan])