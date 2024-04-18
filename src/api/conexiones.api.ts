import axios from "axios";
import { useLoginStore } from "@/states/Login.state"
import { NEXT_PUBLIC_API_URL } from "@/config";
import {useClientesStore} from "@/states/Clientes.state"
import {useAsistenciaStore} from "@/states/Asistencia.state"
import {useUbicacionesStore} from "@/states/Ubicaciones.state"

export const login = async (Login: {
  user: string;
  password: string;
}) => {
  console.log(NEXT_PUBLIC_API_URL);
  return await axios.post(`${NEXT_PUBLIC_API_URL}auth/Login`, Login);
}
export const changePassword = async (newPassword: string, confirmPassword: string) => {
  try {
    const { token } = useLoginStore.getState()
    return await axios.post(`${NEXT_PUBLIC_API_URL}users/changePassword`, {
      newPassword,
      confirmPassword
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } catch (error: any) {
    console.error(error);
    throw new Error(error.response.data.message);
  }
}
export const UbicacionesClientes = async (idCliente?: string | number) => {
  try {
    const { token } = useLoginStore.getState()
    return await axios.post(`${NEXT_PUBLIC_API_URL}map/getUbications`, {
      CLIUBIC_ID_CLIENT: idCliente || null
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener ubicaciones");
  }
}
export const getClients = async (page: number = 1, take: number = 20) => {
  try {
    const { token } = useLoginStore.getState()

    return await axios.get(`${NEXT_PUBLIC_API_URL}map/getClients?page=${page}&take=${take}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener clientes");
  }
}

export const getAsistencia = async (page: number = 1, take: number = 100) => {
  try {
    const { token } = useLoginStore.getState()
    return await axios.get(`${NEXT_PUBLIC_API_URL}attendance/findAttendance?page=${page}&take=${take}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }

    });
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener asistencia");
  }
}
export const getEventsPlates = async (page: number = 1, take: number = 100) => {
  try {
    const { token } = useLoginStore.getState()
    return await axios.get(`${NEXT_PUBLIC_API_URL}map/getEventsPlates`, {
      headers: {
        Authorization: `Bearer ${token}`
      }

    });
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener eventos");
  }
}

export const getData = async ()=>{

  try {

    const responseUbicaciones = await UbicacionesClientes();
    const responseClientes = await getClients();
    const responseAsistencia = await getAsistencia();



  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener eventos");
  }

}