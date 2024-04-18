import type { IVehiculo } from "@/models/vehiculos.model";
import { create } from "zustand";

interface VehiculosState {
    vehiculos: IVehiculo[];
    setVehiculos: (vehiculos: IVehiculo[]) => void;
    vehiculoSelected: IVehiculo | null;
    setVehiculoSelected: (vehiculo: IVehiculo | null) => void;
}

export const useVehiculosStore = create<VehiculosState>((set) => ({
    vehiculos: [],
    setVehiculos: (vehiculos) => set({ vehiculos }),
    vehiculoSelected: null,
    setVehiculoSelected: (vehiculoSelected) => set({ vehiculoSelected }),
}));