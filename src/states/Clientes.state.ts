import type { IClienteResponse } from "@/models/ubicaciones.model";
import { create } from "zustand";
import { useSystemStore } from "./System.state";

interface ClientesState {
    clientes: IClienteResponse[];
    setClientes: (clientes: IClienteResponse[]) => void;
    clienteSelected: IClienteResponse | null;
    setClienteSelected: (cliente: IClienteResponse | null) => void;
}

export const useClientesStore = create<ClientesState>((set) => ({
    clientes: [],
    setClientes: (clientes) => set({ clientes }),
    clienteSelected: null,
    setClienteSelected: (clienteSelected) => {
        useSystemStore.getState().resetMapConfig()
        set({ clienteSelected })
    },
}));