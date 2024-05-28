import { create } from "zustand";

export type FiltroMapa = "proteccionFiltro" | "telemetriaFiltro" | "mobileFiltro" | "oleoductosFiltro";
interface FiltrosMapaState {
    filtrosMapState: {
        proteccionFiltro: boolean;
        telemetriaFiltro: boolean;
        mobileFiltro: boolean;
        oleoductosFiltro: boolean;
    };
    toggleFiltro: (filtro: FiltroMapa) => void;
    initFiltrosMapa: (filtros: { proteccionFiltro: boolean, telemetriaFiltro: boolean, mobileFiltro: boolean, oleoductosFiltro: boolean }) => void;
}

export const useFiltrosMapa = create<FiltrosMapaState>((set) => ({
    filtrosMapState: {
        proteccionFiltro: false,
        telemetriaFiltro: false,
        mobileFiltro: false,
        oleoductosFiltro: false,
    },
    toggleFiltro: (filtro) => {

        set((state) => ({
            filtrosMapState: {
                ...state.filtrosMapState,
                [filtro]: !state.filtrosMapState[filtro],
            },
        }))
        localStorage.setItem("filtrosMapa", JSON.stringify(useFiltrosMapa.getState().filtrosMapState));
    },
    initFiltrosMapa: (filtros) => set({ filtrosMapState: filtros }),
}));
