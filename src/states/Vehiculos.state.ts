import type { IVehiculo } from "@/models/vehiculos.model";
import { create } from "zustand";

interface VehiculosState {
    vehiculos: IVehiculo[];
    setVehiculos: (vehiculos: IVehiculo[]) => void;
    vehiculoSearched: IVehiculo | null;
    setVehiculoSearched: (vehiculo: IVehiculo | null) => void;
    vehiculosFiltered: IVehiculo[];
    setVehiculosFiltered: (vehiculos: IVehiculo[]) => void;
}

export const useVehiculosStore = create<VehiculosState>((set) => ({
    vehiculos: [],
    setVehiculos: (vehiculos) => set({ vehiculos }),
    vehiculoSearched: null,
    setVehiculoSearched: (vehiculoSelected) => set({ vehiculoSearched: vehiculoSelected }),
    vehiculosFiltered: [],
    setVehiculosFiltered: (vehiculos) => set({ vehiculosFiltered: vehiculos })
}));