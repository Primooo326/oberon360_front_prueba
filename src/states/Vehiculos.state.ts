import type { IVehiculo } from "@/models/vehiculos.model";
import { create } from "zustand";

interface VehiculosFilteredState {
    changeTipos: {
        primaria: boolean
        secundaria: boolean
        recoleccion: boolean
    };
    changeEstado: {
        retraso: boolean
        anticipo: boolean
        sinReportar: boolean
        enOperacion: boolean
        disponibles: boolean
    }
}

interface VehiculosState {
    vehiculos: IVehiculo[];
    setVehiculos: (vehiculos: IVehiculo[]) => void;
    vehiculoSearched: IVehiculo | null;
    setVehiculoSearched: (vehiculo: IVehiculo | null) => void;
    vehiculosFiltered: VehiculosFilteredState;
    setVehiculosFiltered: (vehiculosFiltered: VehiculosFilteredState) => void;
}

export const useVehiculosStore = create<VehiculosState>((set) => ({
    vehiculos: [],
    setVehiculos: (vehiculos) => set({ vehiculos }),
    vehiculoSearched: null,
    setVehiculoSearched: (vehiculoSelected) => set({ vehiculoSearched: vehiculoSelected }),
    vehiculosFiltered: {
        changeTipos: {
            primaria: true,
            secundaria: true,
            recoleccion: true
        },
        changeEstado: {
            retraso: true,
            anticipo: true,
            sinReportar: true,
            enOperacion: true,
            disponibles: false
        }
    },
    setVehiculosFiltered: (vehiculosFiltered) => set({ vehiculosFiltered })
}));