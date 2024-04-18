import type { IUbicacionCliente } from "@/models/ubicaciones.model";
import { create } from "zustand";

interface UbicacionesState {
    ubicaciones: IUbicacionCliente[];
    setUbicaciones: (ubicaciones: IUbicacionCliente[]) => void;
}

export const useUbicaciones = create<UbicacionesState>((set) => ({
    ubicaciones: [],
    setUbicaciones: (ubicaciones) => set({ ubicaciones }),
}));