import { create } from "zustand";

type UseAuthStore = {
    username: string;
    role: string;
    setAuth: ({ username, role }: { username: string; role: string }) => void;
};

const useAuthStore = create<UseAuthStore>((set) => ({
    username: '',
    role: '',
    setAuth: ({ username, role }: Pick<UseAuthStore, 'username' | 'role'>) => {
        set({ username, role});
    },
}));

export default useAuthStore;