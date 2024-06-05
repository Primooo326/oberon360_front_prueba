import { create } from 'zustand'

interface ConductorState {
    conductorSelected: any | null;
    setConductorSelected: (conductorSelected: any | null) => void;
}

export const useConductoresStore = create<ConductorState>((set) => ({
    conductorSelected: null,
    setConductorSelected: (conductorSelected) => set({ conductorSelected })
}))

