import { useLoginStore } from "@/states/Login.state"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { verifyJWT } from "@/tools"
import { useSystemStore } from "@/states/System.state"
import { getClients, UbicacionesClientes } from "@/api/conexiones.api"
import { useUbicaciones } from "@/states/Ubicaciones.state"
import { useClientesStore } from "@/states/Clientes.state"
export default function MainLayout({ children }: { children: React.ReactNode }) {
    const { setUbicaciones } = useUbicaciones()
    const { setClientes } = useClientesStore()
    const { setToken } = useLoginStore.getState()
    const { theme } = useSystemStore()
    const navigation = useNavigate()
    const [load, setLoad] = useState(false)

    const verify = async () => {
        const token = localStorage.getItem("token")
        console.log(token);
        if (token) {
            const tokenValid = await verifyJWT(token)
            if (tokenValid) {
                setToken(token)
                await getData()
            } else {
                navigation("/")
            }
        } else {
            navigation("/")
        }
    }

    const getData = async () => {
        const response = await UbicacionesClientes();
        setUbicaciones(response.data);
        const responseClient = await getClients()
        let clientes = []
        if (responseClient.data.data.find((cliente: any) => cliente.CLIE_ID_REG === "34")) {
            clientes = responseClient.data.data
        } else {
            clientes = [{
                CLIE_ID_REG: "34",
                CLIE_COMERCIAL: "ALPINA"
            }, ...responseClient.data.data]
        }
        setClientes(clientes);
    }

    useEffect(() => {
        verify().finally(() => {
            setLoad(true)
        })
    }, [])

    return (
        <div data-theme={theme}>
            {load ? (children) : <></>}
        </div>
    )
}
