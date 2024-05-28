import type { IShip } from "@/models/ships.model";
import { create } from "zustand";

interface OleoductosState {
    oleoductos: IShip[];
    setOleoductos: (oleoductos: any[]) => void;
}

export const useOleoductosStore = create<OleoductosState>((set) => ({
    oleoductos: [],
    setOleoductos: (oleoductos) => set({ oleoductos }),
}));
