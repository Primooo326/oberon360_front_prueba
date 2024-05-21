import { create } from "zustand";
import { useSystemStore } from "./System.state";

interface FiltrosMapaState {
    proteccionFiltro: boolean;
    telemetriaFiltro: boolean;
    mobileFiltro: boolean;
    oleoductosFiltro: boolean;
    setProteccionFiltro: (value: boolean) => void;
    setTelemetriaFiltro: (value: boolean) => void;
    setMobileFiltro: (value: boolean) => void;
    setoleoductosFiltro: (value: boolean) => void;
}

export const useFiltrosMapa = create<FiltrosMapaState>((set) => ({
    proteccionFiltro: false,
    telemetriaFiltro: false,
    mobileFiltro: false,
    oleoductosFiltro: true,
    setProteccionFiltro: (value) => {
        useSystemStore.getState().resetMapConfig()
        useSystemStore.getState().setShowSidebarRight(false)
        set({ proteccionFiltro: value })
    },
    setTelemetriaFiltro: (value) => {
        useSystemStore.getState().resetMapConfig()
        useSystemStore.getState().setShowSidebarRight(false)
        set({ telemetriaFiltro: value })
    },
    setMobileFiltro: (value) => {
        useSystemStore.getState().resetMapConfig()
        useSystemStore.getState().setShowSidebarRight(false)
        set({ mobileFiltro: value })
    },
    setoleoductosFiltro: (value) => {
        useSystemStore.getState().resetMapConfig()
        useSystemStore.getState().setShowSidebarRight(false)
        set({ oleoductosFiltro: value })
    }
}));