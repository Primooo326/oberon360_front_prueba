import { create } from 'zustand'

interface NovedadState {
    novedadSelected: any | null;
    setNovedadSelected: (novedadSelected: any | null) => void;
}

export const useNovedadesStore = create<NovedadState>((set) => ({
    novedadSelected: null,
    setNovedadSelected: (novedadSelected) => set({ novedadSelected })
}))

