import type { IVehiculo } from "@/models/vehiculos.model";
import { create } from "zustand";
interface ItemsSidebarRight {
    item: "vehiculos" | "ubicaciones";
    content: IVehiculo | any;
}
interface SystemState {
    theme: string;
    setTheme: (theme: string) => void;
    showSidebar: boolean;
    setShowSidebar: (showSidebar: boolean) => void;
    itemSidebarRight: {
        item: "vehiculos" | "ubicaciones";
        content: IVehiculo | any;

    } | null,
    setItemSidebarRight: (itemSidebarRight: ItemsSidebarRight | null) => void;

    mapExpand: boolean;
    setMapExpand: (mapExpand: boolean) => void;
    mapConfig: {
        zoom: number;
        fixed: boolean;
        center: { lat: number; lng: number; };
        showLoadMap: boolean;
    }
    setMapConfig: (mapConfig: {
        zoom: number;
        fixed: boolean;
        center: { lat: number; lng: number; };
        showLoadMap: boolean;
    }) => void;
    resetMapConfig: () => void;
}

export const useSystemStore = create<SystemState>((set) => ({
    theme: "oberon",
    setTheme: (theme) => set({ theme }),
    showSidebar: false,
    setShowSidebar: (showSidebar) => set({ showSidebar }),
    mapExpand: false,
    setMapExpand: (mapExpand) => set({ mapExpand }),
    mapConfig: {
        zoom: 5,
        fixed: true,
        center: { lat: 3.3345374, lng: -74.2701511, },
        showLoadMap: false
    },
    setMapConfig: (mapConfig) => set({ mapConfig }),
    itemSidebarRight: null,
    setItemSidebarRight: (itemSidebarRight) => {
        return set({ itemSidebarRight })
    },
    resetMapConfig: () => {
        set({
            mapConfig: {
                zoom: 5,
                fixed: true,
                center: { lat: 3.3345374, lng: -74.2701511, },
                showLoadMap: true
            }
        })
        setTimeout(() => {
            set({
                mapConfig: {
                    zoom: 5,
                    fixed: true,
                    center: { lat: 3.3345374, lng: -74.2701511, },
                    showLoadMap: false
                }
            })
        }, 1500);
        useSystemStore.setState({
            itemSidebarRight: null
        });
    }
}));

