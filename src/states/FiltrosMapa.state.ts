import { create } from "zustand";

interface FiltrosMapaState {
    proteccionFiltro: boolean;
    telemetriaFiltro: boolean;
    mobileFiltro: boolean;
    setProteccionFiltro: (value: boolean) => void;
    setTelemetriaFiltro: (value: boolean) => void;
    setMobileFiltro: (value: boolean) => void;
}

export const useFiltrosMapa = create<FiltrosMapaState>((set) => ({
    proteccionFiltro: true,
    telemetriaFiltro: true,
    mobileFiltro: false,
    setProteccionFiltro: (value) => set({ proteccionFiltro: value }),
    setTelemetriaFiltro: (value) => set({ telemetriaFiltro: value }),
    setMobileFiltro: (value) => set({ mobileFiltro: value }),
}));