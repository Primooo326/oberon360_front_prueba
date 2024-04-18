import fetch from "./instance";

export const login = async (Login: {
  user: string;
  password: string;
}) => {
  return await fetch.post("auth/login/", Login);
}

export const changePassword = async (newPassword: string, confirmPassword: string) => {
  return await fetch.post("users/changePassword", {
    newPassword,
    confirmPassword
  })
}

export const ubicacionesClientes = async (idCliente?: string | number) => {
  return await fetch.post("map/getUbications", {
    CLIUBIC_ID_CLIENT: idCliente || null
  });
}

export const getClients = async (page: number = 1, take: number = 104) => {
  return await fetch.get(`map/getClients?page=${page}&take=${take}`);
}

export const getAsistencia = async (page: number = 1, take: number = 100) => {
  return await fetch.get(`attendance/findAttendance?page=${page}&take=${take}`);
}

export const getEventsPlates = async (page: number = 1, take: number = 290) => {
  return await fetch.get("map/getEventsPlates");
}
export const getEventsMotorcycle = async () => {
  return await fetch.get("map/getEventsMotorcycle");
}

export const getItinerary = async (id: string) => {
  return await fetch.get(`map/getItinerary/${id}`);
}
// pi/map/reportsIndicators
export const reportsIndicators = async () => {
  return await fetch.get("map/reportsIndicators");
}