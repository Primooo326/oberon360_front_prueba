"use client"

import { useSystemStore } from '@/states/System.state';
import { getEventsPlates, getEventsMotorcycle, ubicacionesClientes, getClients, reportsIndicators, getEventsPlatesDispon, getItinerary, getEventsShips } from "@/api/mapa.api";
import IconoCargando from "@components/Shared/IconoCargando/IconoCargando";
import { useClientesStore } from "@/states/Clientes.state";
import { useLoginStore } from "@/states/Login.state";
import { useMobilesStore } from "@/states/Mobiles.state";
import { useUbicaciones } from "@/states/Ubicaciones.state";
import { useVehiculosStore } from "@/states/Vehiculos.state";
import { evaluarItinerario, verifyJWT } from "@/utils/tools";
import { useRef, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation"
import Cookies from "js-cookie";
import { useIndicadoresStore } from "@/states/Indicadores.state";
import type { EItenaryState, IItenary, IItinerario } from "@/models/vehiculos.model";
import "@/app/globals.css"
import MainLayout from "@/layouts/MainLayout"
import "./Dashboard.css"
import { useFiltrosMapa } from "@/states/FiltrosMapa.state";
import { useOleoductosStore } from "@/states/Oleoductos.state";
import Drawer from '@/components/Shared/Drawer/Drawer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const { setUbicaciones } = useUbicaciones()
  const { setClientes } = useClientesStore()
  const { setVehiculos, vehiculosFiltered } = useVehiculosStore()
  const { setMobiles } = useMobilesStore()
  const { setOleoductos } = useOleoductosStore()
  const { setIndicadores } = useIndicadoresStore()
  const { mapExpand, itemSidebarRight, showSidebarRight, setItemSidebarRight } = useSystemStore()
  const showSidebarRightRef = useRef(showSidebarRight)
  const itemSidebarRightRef = useRef(itemSidebarRight)
  const mapExpandRef = useRef(mapExpand)
  const filtrosMapa = useFiltrosMapa().filtrosMapState
  const { initFiltrosMapa } = useFiltrosMapa()
  const filtrosMapaRef = useRef(filtrosMapa)
  const vehiculosFRef = useRef(vehiculosFiltered);
  const [load, setLoad] = useState(true)

  const getVehiculos = async () => {
    let response: any[] = await getEventsPlates();
    if (vehiculosFRef.current.changeEstado.disponibles) {
      const responseDispon = await getEventsPlatesDispon();
      const newdispon = responseDispon.map((v: any) => {
        v.statusItinerary = "DISPONIBLE"
        return v
      });
      response = [...response, ...newdispon]
    }

    const newVehiculos = response.map((vehiculo: any) => {
      let statusItinerary: EItenaryState = "NO DISPONIBLE"
      if (vehiculo.statusItinerary === "delay") statusItinerary = "ATRASADO"
      if (vehiculo.statusItinerary === "advance") statusItinerary = "ANTICIPADO"
      if (vehiculo.statusItinerary === "ontime") statusItinerary = "A TIEMPO"
      if (vehiculo.statusItinerary === "inOperation") statusItinerary = "EN OPERACION"
      if (vehiculo.statusItinerary === "available") statusItinerary = "DISPONIBLE"
      if (vehiculo.statusItinerary === "DISPONIBLE") statusItinerary = "DISPONIBLE"
      return {
        ...vehiculo,
        statusItinerary
      }
    })
    setVehiculos(newVehiculos)

    if (showSidebarRightRef.current && itemSidebarRightRef.current?.item === "vehiculos") {
      const vehiculo = newVehiculos.find((v) => v.VEHICULO_ID === itemSidebarRightRef.current!.content.VEHICULO_ID)
      const response: IItenary[] = await getItinerary(vehiculo.ITNE_ID)
      const itinerarioEvaluatedGroup: IItinerario[] = response.map(itinerario => {
        return {
          ...itinerario,
          itinerarioEvaluated: evaluarItinerario(itinerario)
        }
      }).sort((a, b) => a.IPE_ORDEN - b.IPE_ORDEN)
      console.log("vehiculos");
      if (response) {

        setItemSidebarRight(
          {
            item: "vehiculos",
            content: vehiculo,
            itinerario: itinerarioEvaluatedGroup
          }
        )

      }
    }

  }
  const getMobiles = async () => {
    const response = await getEventsMotorcycle()
    setMobiles(response)
  }

  const getOleoductos = async () => {
    await getEventsShips().then((resp) => {
      // console.log(resp);
      setOleoductos(resp)
    })
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

      clientes = clientes.sort((a: any, b: any) => {
        if (a.CLIE_COMERCIAL < b.CLIE_COMERCIAL) {
          return -1;
        }
        if (a.CLIE_COMERCIAL > b.CLIE_COMERCIAL) {
          return 1;
        }
        return 0;
      })

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
      setIndicadores(response)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    showSidebarRightRef.current = showSidebarRight;
  }, [showSidebarRight])

  useEffect(() => {
    itemSidebarRightRef.current = itemSidebarRight;
  }, [itemSidebarRight])

  useEffect(() => {
    vehiculosFRef.current = vehiculosFiltered;

  }, [vehiculosFiltered]);

  useEffect(() => {
    filtrosMapaRef.current = filtrosMapa;
  }, [filtrosMapa]);


  useEffect(() => {
    mapExpandRef.current = mapExpand;
  }, [mapExpand])

  const fetchData = () => {

    if (!mapExpandRef.current) {
      getIndicadores();
    }
    if (filtrosMapaRef.current.mobileFiltro) {
      getMobiles();
    }
    if (filtrosMapaRef.current.telemetriaFiltro) {
      getVehiculos();
    }
    if (filtrosMapaRef.current.proteccionFiltro) {
      getData();
    }
    if (filtrosMapaRef.current.oleoductosFiltro) {
      getOleoductos();
    }

  }
  useEffect(() => {
    const filtros = JSON.parse(localStorage.getItem("filtrosMapa") || "{}")

    if (filtros) {
      initFiltrosMapa(filtros)

      if (filtros.mobileFiltro) {
        getMobiles();
      }
      if (filtros.telemetriaFiltro) {
        getVehiculos();
      }
      if (filtros.proteccionFiltro) {
        getData();
      }
      if (filtros.oleoductosFiltro) {
        getOleoductos();
      }

    }
    getIndicadores();

    fetchData()
    const interval = setInterval(fetchData, 5000);

    return () => {
      clearInterval(interval);
    };


  }, [])

  return (
    <html lang="en">

      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Oberon 360 - Dashboard</title>
        <link rel="icon" href="/OBERON-NEGRO.png" />
      </head>

      <body >
        <MainLayout>
          {load ?
            <section className="mainLayout relative">
              <Drawer />
              {children}
            </section>
            :
            <IconoCargando />
          }
        </MainLayout></body>
    </html>


  )
}
