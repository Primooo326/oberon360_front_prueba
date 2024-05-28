import type { IVehiculo } from "@/models/vehiculos.model";
import { create } from "zustand";
import { useSystemStore } from "./System.state";

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
    setVehiculos: (vehiculos) => {
        set({ vehiculos })
        if (useSystemStore.getState().showSidebarRight && useSystemStore.getState().itemSidebarRight!.item === "vehiculos") {
            const vehiculo = vehiculos.find((vehiculo) => vehiculo.WTLT_PLACA === useSystemStore.getState().itemSidebarRight!.content.WTLT_PLACA)
            useSystemStore.setState((state) => {
                return {
                    ...state,
                    itemSidebarRight: {
                        item: "vehiculos",
                        content: vehiculo,
                        itinerario: null
                    }
                }
            })
        }
    },
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
    setVehiculosFiltered: (vehiculosFiltered) => {
        useSystemStore.setState((state) => {
            return {
                ...state,
                mapConfig: {
                    ...state.mapConfig,
                    zoom: 5,
                    fixed: true,
                    center: { lat: 3.3345374, lng: -74.2701511, },
                    showLoadMap: false
                }
            }
        })
        set({ vehiculosFiltered })
    }
}));