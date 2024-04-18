import type { IClienteResponse } from "@/models/ubicaciones.model";
import { create } from "zustand";

interface ClientesState {
    clientes: IClienteResponse[];
    setClientes: (clientes: IClienteResponse[]) => void;
}

export const useClientesStore = create<ClientesState>((set) => ({
    clientes: [],
    setClientes: (clientes) => set({ clientes }),
}));