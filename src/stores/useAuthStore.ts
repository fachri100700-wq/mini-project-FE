import { create } from "zustand";

type Auth = {
    id: string;
    username: string;
    role: string;
} | null;

type UseAuthStore = {
    auth: Auth;
    setAuth: (auth: Auth) => void;
};

const useAuthStore = create<UseAuthStore>((set) => ({
    auth: null,
    setAuth: (auth: Auth) => set({ auth }),
}));

export default useAuthStore;