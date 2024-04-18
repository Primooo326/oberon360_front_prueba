import { create } from "zustand";

interface SystemState {
    theme: string;
    setTheme: (theme: string) => void;
    showSidebar: boolean;
    setShowSidebar: (showSidebar: boolean) => void;
    loaderScreen: boolean;
    setLoaderScreen: (loaderScreen: boolean) => void;
}

export const useSystemStore = create<SystemState>((set) => ({
    theme: "oberon",
    setTheme: (theme) => set({ theme }),
    showSidebar: false,
    setShowSidebar: (showSidebar) => set({ showSidebar }),
    loaderScreen: false,
    setLoaderScreen: (loaderScreen) => set({ loaderScreen }),
}));

