import { create } from "zustand";

type Auth = {
    id: string;
    username: string;
    role: string;
} | null | undefined;

type UseAuthStore = {
    auth: Auth;
    setAuth: (auth: Auth) => void;
};

const useAuthStore = create<UseAuthStore>((set) => ({
    auth: undefined,
    setAuth: (auth: Auth) => set({ auth }),
}));

export default useAuthStore;