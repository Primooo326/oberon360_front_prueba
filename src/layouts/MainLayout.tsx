import { useLoginStore } from "@/states/Login.state"
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { verifyJWT } from "@/tools"
import { useSystemStore } from "@/states/System.state"
import { getClients, getEventsMotorcycle, getEventsPlates, ubicacionesClientes } from "@/api/conexiones.api"
import { useUbicaciones } from "@/states/Ubicaciones.state"
import { useClientesStore } from "@/states/Clientes.state"
import IconoCargando from "@/Componentes/IconoCargando/IconoCargando"
import { toast, ToastContainer } from "react-toastify"
import { useVehiculosStore } from "@/states/Vehiculos.state"
import { useMobilesStore } from "@/states/Mobiles.state"
import Cookies from "js-cookie"
export default function MainLayout({ children }: { children: React.ReactNode }) {
    const { setUbicaciones } = useUbicaciones()
    const { setClientes, clienteSelected } = useClientesStore()
    const { setToken, token } = useLoginStore.getState()
    const { setVehiculos } = useVehiculosStore()
    const { setMobiles } = useMobilesStore()
    const { theme, itemSidebarRight, setItemSidebarRight, setMapConfig, mapConfig } = useSystemStore()
    const itemSidebarRightRef = useRef(itemSidebarRight);
    const mapConfigRef = useRef(mapConfig);
    const navigation = useNavigate()
    const [load, setLoad] = useState(false)
    const verify = async () => {
        const token = Cookies.get("token")
        if (token) {
            const tokenValid = await verifyJWT(token)
            if (tokenValid) {
                setToken(token)
                await getData()
            } else {
                Cookies.remove("token")
                setToken("")
                navigation("/")

            }
        } else {
            Cookies.remove("token")
            setToken("")
            navigation("/")
        }
    }
    const getVehiculos = async () => {
        const response = await getEventsPlates();
        setVehiculos(response);
        if (itemSidebarRightRef.current != null && itemSidebarRightRef.current.item === "vehiculos" && mapConfigRef.current.fixed) {
            const vehiculo = response.find((vehiculo: any) => vehiculo.WTLT_PLACA === itemSidebarRightRef.current.content.WTLT_PLACA)

            setItemSidebarRight({
                item: "vehiculos",
                content: vehiculo
            })

            setMapConfig({
                zoom: 15,
                fixed: true,
                center: {
                    lat: Number.parseFloat(`${vehiculo.WTLT_LAT}`),
                    lng: Number.parseFloat(`${vehiculo.WTLT_LON}`)
                }
            })

        }
    }
    const getMobiles = async () => {
        const response = await getEventsMotorcycle()
        setMobiles(response)
    }
    const getData = async () => {

        try {
            const response = await ubicacionesClientes();
            setUbicaciones(response);
            const responseClient = await getClients()
            let clientes = []
            if (responseClient.data.find((cliente: any) => cliente.CLIE_ID_REG === "34")) {
                clientes = responseClient.data
            } else {
                clientes = [{
                    CLIE_ID_REG: "34",
                    CLIE_COMERCIAL: "ALPINA"
                }, ...responseClient.data]
            }
            setClientes(clientes);
        } catch (error: any) {
            console.log(error);
            if (error.code === "ERR_NETWORK") {
                toast.error("Error de conexión con el servidor.", { autoClose: 5000 })

            } else {
                toast.error("Error al cargar los datos", { autoClose: 5000 })
            }
            throw new Error("Error al cargar los datos")
        }

    }

    useEffect(() => {
        itemSidebarRightRef.current = itemSidebarRight;
    }, [itemSidebarRight]);

    useEffect(() => {
        mapConfigRef.current = mapConfig;
    }, [mapConfig]);

    useEffect(() => {
        verify().finally(() => setLoad(true))

    }, [])

    useEffect(() => {

        const interval = setInterval(() => {
            getVehiculos();
            getMobiles();
        }, 5000);
        if (token) {
            if (!clienteSelected) {
                getData();
                getVehiculos();
                return () => clearInterval(interval); // Clear interval when component unmounts
            }
        } else {
            clearInterval(interval); // Clear interval if token doesn't exist
        }
    }, [token])

    return (
        <div >


        </div>
    )
}
