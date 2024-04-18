import { IMobile } from "@/models/mobile.model";
import { create } from "zustand"

interface MobilesState {
    mobiles: IMobile[];
    setMobiles: (mobiles: IMobile[]) => void;
}

export const useMobilesStore = create<MobilesState>((set) => ({
    mobiles: [],
    setMobiles: (mobiles) => set({ mobiles }),
}));