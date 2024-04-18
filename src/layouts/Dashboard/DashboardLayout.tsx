import Sidebar from "@/Componentes/DashboardComponents/Sidebar/Sidebar"
import "./DashboardLayout.css"
import SidebarRight from "@/Componentes/DashboardComponents/SidebarRight/SidebarRight"
import { useSystemStore } from '../../states/System.state';
import { getEventsPlates, getEventsMotorcycle, ubicacionesClientes, getClients, reportsIndicators } from "@/api/conexiones.api";
import IconoCargando from "@/Componentes/IconoCargando/IconoCargando";
import { useClientesStore } from "@/states/Clientes.state";
import { useLoginStore } from "@/states/Login.state";
import { useMobilesStore } from "@/states/Mobiles.state";
import { useUbicaciones } from "@/states/Ubicaciones.state";
import { useVehiculosStore } from "@/states/Vehiculos.state";
import { verifyJWT } from "@/tools";
import { useRef, useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation"
import Cookies from "js-cookie";
import { useIndicadoresStore } from "@/states/indicadores.state";
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const { setUbicaciones } = useUbicaciones()
    const { setClientes, clienteSelected } = useClientesStore()
    const { setToken, token } = useLoginStore.getState()
    const { setVehiculos } = useVehiculosStore()
    const { setMobiles } = useMobilesStore()
    const { setIndicadores } = useIndicadoresStore()
    const { theme, itemSidebarRight, setItemSidebarRight, setMapConfig, mapConfig, mapExpand } = useSystemStore()
    const itemSidebarRightRef = useRef(itemSidebarRight);
    const mapConfigRef = useRef(mapConfig);
    const [load, setLoad] = useState(false)
    const verify = async () => {
        const token = Cookies.get("token")
        console.log(token);
        if (token) {
            const tokenValid = await verifyJWT(token)
            if (tokenValid) {
                setToken(token)
                await getData()
            } else {
                Cookies.remove("token")
                setToken("")
                router.push("/auth")
            }
        } else {
            Cookies.remove("token")
            setToken("")
            router.push("/auth")
        }
    }
    const getVehiculos = async () => {
        const response = await getEventsPlates();
        setVehiculos(response);
        if (itemSidebarRightRef.current != null && itemSidebarRightRef.current.item === "vehiculos" && mapConfigRef.current.fixed) {
            const vehiculo = response.find((vehiculo: any) => vehiculo.WTLT_PLACA === itemSidebarRightRef.current!.content.WTLT_PLACA)

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
    const getIndicadores = async () => {
        try {
            const response = await reportsIndicators();
            console.log(response);
            setIndicadores(response)
        } catch (error) {
            console.log(error);
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
            getIndicadores();
        }, 5000);
        if (token) {
            if (!clienteSelected) {
                getData();
                getVehiculos();
                getIndicadores();
                return () => clearInterval(interval); // Clear interval when component unmounts
            }
        } else {
            clearInterval(interval); // Clear interval if token doesn't exist
        }
    }, [token])
    return (
        <>
            {load ?
                <main className="mainDashboard" data-theme={theme}>
                    <Sidebar />
                    <section className="w-full h-full scroll" >
                        {children}
                    </section>
                    {(itemSidebarRight && mapExpand) && (

                        <div className="animate__animated animate__faster animate__slideInRight h-full">
                            <SidebarRight item={itemSidebarRight.item} content={itemSidebarRight.content} />
                        </div>
                    )}
                </main>
                :
                <IconoCargando />}
            <ToastContainer />
        </>

    )
}
