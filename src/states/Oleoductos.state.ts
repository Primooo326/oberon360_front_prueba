import { create } from "zustand";

interface OleoductosState {
    oleoductos: IOleoductoTrazo[];
    setOleoductos: (oleoductos: any[]) => void;
}

export const useOleoductosStore = create<OleoductosState>((set) => ({
    oleoductos: [],
    setOleoductos: (oleoductos) => set({ oleoductos }),
}));
