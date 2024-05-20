"use client"

import Sidebar from "@components/Sidebar/Sidebar"
import { useSystemStore } from '@/states/System.state';
import { getEventsPlates, getEventsMotorcycle, ubicacionesClientes, getClients, reportsIndicators, getEventsPlatesDispon, getItinerary, getEventsShips } from "@/api/mapa.api";
import IconoCargando from "@components/IconoCargando/IconoCargando";
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const router = useRouter()
  const { setUbicaciones } = useUbicaciones()
  const { setClientes, clienteSelected } = useClientesStore()
  const { setToken, token } = useLoginStore.getState()
  const { setVehiculos, vehiculosFiltered } = useVehiculosStore()
  const { setMobiles } = useMobilesStore()
  const { setOleoductos } = useOleoductosStore()
  const { setIndicadores } = useIndicadoresStore()
  const { mapExpand, itemSidebarRight, showSidebarRight, setItemSidebarRight } = useSystemStore()
  const showSidebarRightRef = useRef(showSidebarRight)
  const itemSidebarRightRef = useRef(itemSidebarRight)
  const mapExpandRef = useRef(mapExpand)
  const filtrosMapa = useFiltrosMapa()
  const filtrosMapaRef = useRef(filtrosMapa)
  const vehiculosFRef = useRef(vehiculosFiltered);
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
        router.push("/auth")
      }
    } else {
      Cookies.remove("token")
      setToken("")
      router.push("/auth")
    }
  }

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

    const oleoductos: IOleoductoTrazo[] = [
      {
        "EstaciónInicial": "Caño Limon",
        "LatitudInicial": 6.932876053,
        "LongitudInicial": -71.16668089,
        "EstaciónFinal": "Banadia",
        "LatitudFinal": 6.908421866,
        "LongitudFinal": -71.84867717
      },
      {
        "EstaciónInicial": "Banadia",
        "LatitudInicial": 6.908421866,
        "LongitudInicial": -71.84867717,
        "EstaciónFinal": "Ayacucho",
        "LatitudFinal": 8.601829533,
        "LongitudFinal": -73.5798356
      },
      {
        "EstaciónInicial": "Ayacucho",
        "LatitudInicial": 8.601935615,
        "LongitudInicial": -73.5798,
        "EstaciónFinal": "Coveñas",
        "LatitudFinal": 9.406178147,
        "LongitudFinal": -75.68545909
      },
      {
        "EstaciónInicial": "Ayacucho",
        "LatitudInicial": 8.601935615,
        "LongitudInicial": -73.5798,
        "EstaciónFinal": "Coveñas L16",
        "LatitudFinal": 9.406178147,
        "LongitudFinal": -75.68545909
      },
      {
        "EstaciónInicial": "Coveñas",
        "LatitudInicial": 9.406178147,
        "LongitudInicial": -75.68545909,
        "EstaciónFinal": "Cartagena L18",
        "LatitudFinal": 10.40585457,
        "LongitudFinal": -75.52874672
      },
      {
        "EstaciónInicial": "Galán",
        "LatitudInicial": 7.068316793,
        "LongitudInicial": -73.86734859,
        "EstaciónFinal": "Ayacucho L18",
        "LatitudFinal": 8.601935615,
        "LongitudFinal": -73.5798
      },
      {
        "EstaciónInicial": "Galán",
        "LatitudInicial": 7.068316793,
        "LongitudInicial": -73.86734859,
        "EstaciónFinal": "Ayacucho L14",
        "LatitudFinal": 8.601935615,
        "LongitudFinal": -73.5798
      },
      {
        "EstaciónInicial": "Vasconia",
        "LatitudInicial": 6.06651715,
        "LongitudInicial": -74.55795481,
        "EstaciónFinal": "Casabombas CIB",
        "LatitudFinal": 7.064910368,
        "LongitudFinal": -73.84819938
      },
      {
        "EstaciónInicial": "Ayacucho",
        "LatitudInicial": 8.601935615,
        "LongitudInicial": -73.5798,
        "EstaciónFinal": "Casabombas Galan 8",
        "LatitudFinal": 7.066880099,
        "LongitudFinal": -73.85891733
      },
      {
        "EstaciónInicial": "Orito",
        "LatitudInicial": 0.671136623,
        "LongitudInicial": -76.87442201,
        "EstaciónFinal": "Tumaco",
        "LatitudFinal": 1.800497453,
        "LongitudFinal": -78.78429707
      },
      {
        "EstaciónInicial": "San Miguel",
        "LatitudInicial": 0.330921202,
        "LongitudInicial": -76.87601676,
        "EstaciónFinal": "Orito ( OSO )",
        "LatitudFinal": 0.671136623,
        "LongitudFinal": -76.87442201
      },
      {
        "EstaciónInicial": "Mansoya",
        "LatitudInicial": 0.451980647,
        "LongitudInicial": -76.26684362,
        "EstaciónFinal": "Orito (OMO)",
        "LatitudFinal": 0.671136623,
        "LongitudFinal": -76.87442201
      },
      {
        "EstaciónInicial": "Churuyaco",
        "LatitudInicial": 0.60647564,
        "LongitudInicial": -77.2242824,
        "EstaciónFinal": "Punto Guamuez",
        "LatitudFinal": 0.67326966,
        "LongitudFinal": -76.87856887
      },
      {
        "EstaciónInicial": "Araguaney",
        "LatitudInicial": 5.351534019,
        "LongitudInicial": -72.40044174,
        "EstaciónFinal": "Monterrey",
        "LatitudFinal": 4.87592663,
        "LongitudFinal": -72.89254697
      },
      {
        "EstaciónInicial": "Santiago",
        "LatitudInicial": 3.451593774,
        "LongitudInicial": -76.54086123,
        "EstaciónFinal": "Porvenir",
        "LatitudFinal": 4.923860405,
        "LongitudFinal": -72.92290089
      },
      {
        "EstaciónInicial": "Apiay",
        "LatitudInicial": 4.085407592,
        "LongitudInicial": -73.56509971,
        "EstaciónFinal": "Monterrey",
        "LatitudFinal": 4.87592663,
        "LongitudFinal": -72.89254697
      },
      {
        "EstaciónInicial": "Monterrey",
        "LatitudInicial": 4.87592663,
        "LongitudInicial": -72.89254697,
        "EstaciónFinal": "Altos de porvenir",
        "LatitudFinal": 4.919391392,
        "LongitudFinal": -72.93672373
      },
      {
        "EstaciónInicial": "Monterrey",
        "LatitudInicial": 4.87592663,
        "LongitudInicial": -72.89254697,
        "EstaciónFinal": "Porvenir L12",
        "LatitudFinal": 4.923860405,
        "LongitudFinal": -72.92290089
      },
      {
        "EstaciónInicial": "Yanguara",
        "LatitudInicial": 4.87592663,
        "LongitudInicial": -72.89254697,
        "EstaciónFinal": "Tenay",
        "LatitudFinal": 6.068982128,
        "LongitudFinal": -74.55827337
      },
      {
        "EstaciónInicial": "San Fernando",
        "LatitudInicial": 3.428941885,
        "LongitudInicial": -76.54386169,
        "EstaciónFinal": "Sabanalarga",
        "LatitudFinal": 4.853533757,
        "LongitudFinal": -73.04076233
      },
      {
        "EstaciónInicial": "Toldado",
        "LatitudInicial": 3.871667705,
        "LongitudInicial": -75.2811861,
        "EstaciónFinal": "Gualanday",
        "LatitudFinal": 4.292863723,
        "LongitudFinal": -75.04320391
      },
      {
        "EstaciónInicial": "Vasconia",
        "LatitudInicial": 6.066549157,
        "LongitudInicial": -74.55824449,
        "EstaciónFinal": "Velasquez",
        "LatitudFinal": 5.9684473,
        "LongitudFinal": -74.51456261
      }
    ]
    await getEventsShips().then((resp) => {
      console.log(resp);
      const ships = resp.map((ship: any) => {

      })
    })
    // setTimeout(() => {

    //   setOleoductos(oleoductos)
    // }, 1000);
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
    verify().finally(() => setLoad(true))
  }, [])

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

    fetchData()
    const interval = setInterval(fetchData, 5000);


    if (!token) {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };

  }, [token])

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
              <Sidebar />
              {children}
            </section>
            :
            <IconoCargando />
          }
        </MainLayout></body>
    </html>


  )
}
