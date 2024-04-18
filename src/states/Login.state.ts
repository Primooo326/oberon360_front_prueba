import { create } from "zustand";

interface LoginState {
    user: {
        user: string;

    };
    token: string;
    setUser: (user: any) => void;
    setToken: (token: string) => void;
}

export const useLoginStore = create<LoginState>((set) => ({
    user: {
        user: ""
    },
    token: "",
    setUser: (user) => set({ user }),
    setToken: (token) => set({ token }),
}));