import { create } from "zustand";

interface Indicadores {
    total: number;
    percentage: string;
}

interface IndicadoresState {
    indicadores: {
        delay: Indicadores;
        advance: Indicadores;
        notReported: Indicadores;
        inOperation: Indicadores;
        available: Indicadores;
        total: Indicadores;
    };
    setIndicadores: (indicadores: {
        delay: Indicadores;
        advance: Indicadores;
        notReported: Indicadores;
        inOperation: Indicadores;
        available: Indicadores;
        total: Indicadores;
    }) => void;
}

export const useIndicadoresStore = create<IndicadoresState>((set) => ({
    indicadores: {
        delay: { total: 0, percentage: "0%" },
        advance: { total: 0, percentage: "0%" },
        notReported: { total: 0, percentage: "0%" },
        inOperation: { total: 0, percentage: "0%" },
        available: { total: 0, percentage: "0%" },
        total: { total: 0, percentage: "0%" },
    },
    setIndicadores: (indicadores) => set({ indicadores }),
}));