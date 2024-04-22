import { fetchApiWeb } from "./instances";
export const ubicacionesClientes = async (idCliente?: string | number) => {
    return await fetchApiWeb.post("map/getUbications", {
        CLIUBIC_ID_CLIENT: idCliente || null
    });
}

export const getClients = async (page: number = 1, take: number = 104) => {
    return await fetchApiWeb.get(`map/getClients?page=${page}&take=${take}`);
}

export const getAsistencia = async (page: number = 1, take: number = 100) => {
    return await fetchApiWeb.get(`attendance/findAttendance?page=${page}&take=${take}`);
}

export const getEventsPlates = async (page: number = 1, take: number = 290) => {
    return await fetchApiWeb.get("map/getEventsPlates");
}
export const getEventsMotorcycle = async () => {
    return await fetchApiWeb.get("map/getEventsMotorcycle");
}

export const getItinerary = async (id: string) => {
    return await fetchApiWeb.get(`map/getItinerary/${id}`);
}
// pi/map/reportsIndicators
export const reportsIndicators = async () => {
    return await fetchApiWeb.get("map/reportsIndicators");
}
// /api/map/getEventsPlatesDispon

export const getEventsPlatesDispon = async () => {
    return await fetchApiWeb.get("map/getEventsPlatesDispon");
}