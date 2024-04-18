"use client"
import React, {
    useState,
    useEffect,
    useCallback,
    useRef,
} from "react";
import {
    GoogleMap,
    useJsApiLoader,
    Marker,
    MarkerClusterer,
    InfoWindow,
    useLoadScript,
} from "@react-google-maps/api";
import EtiquetaLateralLogoCli from "@components/EtiquetaLateralCliente/EtiquetaLateralLogoCli";
import LateralFiltroMapa from "@components/LateralFiltroMapa/LateralFiltroMapa";
import "./stylesMapa.css";
import IndicadorFiltro from "@components/IndicadoresFiltro/IndicadorFiltro";
import Notificaciones from "@components/Notificaciones/Notificaciones";

import ZonaCalor from "@assets/img/MapaIconos/CIRCULO-RIESGOS.gif";

import { NEXT_PUBLIC_GOOGLE_MAPS_API_KEY } from "@/config";
import { getClients, UbicacionesClientes } from "@/api/conexiones.api";
import { useUbicaciones } from "@/states/Ubicaciones.state";
import { containerStyle, darkMapStyles, heatmapData, mapaDefecto, Primaria, } from "@/data/mapaData";
import type { TRiesgo, IClienteResponse, IUbicacionCliente } from "@/models/ubicaciones.model";
import { useSystemStore } from "@/states/System.state";
import { useClientesStore } from "@/states/Clientes.state";

function MapaGoogle() {
    const mapRef = useRef() as any;
    const { theme } = useSystemStore()
    const { clientes } = useClientesStore()
    const [center, setCenter] = useState({
        lat: 3.3345374,
        lng: -74.2701511,
    });
    const [zoomi, setZoomi] = useState(5);
    const [map, setMap] = useState<null | any>(null);
    const { ubicaciones, setUbicaciones } = useUbicaciones()
    const [ubicacionesShow, setUbicacionesShow] = useState<IUbicacionCliente[]>([]);
    const [selectedMarker, setSelectedMarker] = useState<null | IUbicacionCliente>(null);
    const [clienteSelected, setClienteSelected] = useState<null | IClienteResponse>(null);
    const [mapaCalor, setMapaCalor] = useState([]);
    const [riesgos, setRiesgos] = useState<TRiesgo[]>([]);
    const [clusterShow, setClusterShow] = useState(false);
    const [mapsLoader, setMapsLoader] = useState(true);

    const handleClienteChange = (cliente: IClienteResponse) => {
        setClusterShow(false);
        if (clienteSelected?.CLIE_ID_REG === cliente.CLIE_ID_REG) {
            setClienteSelected(null);
            setUbicacionesShow(ubicaciones);
        } else {
            setClienteSelected(cliente);
            const ubicacionesFilter = ubicaciones.filter((ubicacion) => ubicacion.CLIUBIC_ID_CLIENTE === cliente.CLIE_ID_REG);
            setUbicacionesShow(ubicacionesFilter);
            console.log(cliente);
        }
    }

    const handleMarkerClick = (marker: any) => {
        setSelectedMarker(marker);
    };

    const onLoad = useCallback((map: any) => {
        mapRef.current = map;
        setMap(map);
    }, []);

    // const getData = async () => {
    //   const response = await UbicacionesClientes();
    //   setUbicaciones(response.data);
    //   setUbicacionesShow(response.data);
    //   const responseClient = await getClients()
    //   let clientes = []
    //   if (responseClient.data.data.find((cliente: any) => cliente.CLIE_ID_REG === "34")) {
    //     clientes = responseClient.data.data
    //   } else {
    //     clientes = [{
    //       CLIE_ID_REG: "34",
    //       CLIE_COMERCIAL: "ALPINA"
    //     }, ...responseClient.data.data]
    //   }
    //   setClientes(clientes);
    //   setTimeout(() => {
    //     setClusterShow(true);
    //   }, 300);
    // }

    const getMapaCalor = new Promise((resolve, reject) => {
        try {
            setTimeout(() => {
                resolve(heatmapData);

            }, 100);
        } catch (error) {
            reject(error)
        }
    });
    useEffect(() => {
        if (map) {
            map.setZoom(zoomi);
        }
        getMapaCalor.then((data: any) => {
            setMapaCalor(data);
        });
    }, []);

    useEffect(() => {
        setUbicacionesShow(ubicaciones);
        setTimeout(() => {
            setClusterShow(true);
        }, 300);
    }, [ubicaciones])

    useEffect(() => {
    }, [ubicacionesShow, zoomi, clusterShow, mapsLoader])

    const { isLoaded } = useLoadScript({
        id: "google-map-script",
        googleMapsApiKey: NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    });


    const onUnmount = useCallback(function callback() {
        setMap(null);
    }, []);

    const clusterStyles = [

        {
            url: Primaria.url,
            height: 80,
            width: 80,

            className: 'clusterText',
        },
        {
            url: Primaria.url,
            height: 100,
            width: 100,
            className: 'clusterText',
        }
    ]
    return isLoaded ? (
        <>
            {/* <Notificaciones /> */}
            {/* <LateralFiltroMapa
        clientes={clientes}
        cliente={clienteSelected}
        setCliente={handleClienteChange}
        setRiesgosShow={setRiesgos}
      /> */}
            {/* <EtiquetaLateralLogoCli cliente={clienteSelected} /> */}
            {mapsLoader && <GoogleMap

                onLoad={onLoad}
                mapContainerStyle={containerStyle}
                center={center}
                onUnmount={onUnmount}
                zoom={zoomi}
                clickableIcons={false}
                onZoomChanged={() => {
                    if (mapRef.current) {
                        const newZoom = mapRef.current.getZoom();
                        setZoomi(newZoom);
                    }
                }}
                options={{
                    styles: theme === "oberon" ? mapaDefecto : darkMapStyles,
                    zoomControl: true,
                    minZoom: 6,
                    zoomControlOptions: {
                        position: window.google.maps.ControlPosition.RIGHT_CENTER,
                    },
                }}
            >

                {clusterShow ? (
                    <div>
                        <MarkerClusterer
                            options={{
                                imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
                                styles: clusterStyles,
                                gridSize: 50,
                                averageCenter: true
                            }}
                        >
                            {(clusterer) => (
                                <>
                                    {ubicacionesShow.map((coordenada, index) => (
                                        <Marker
                                            key={index}
                                            position={{
                                                lat: Number.parseFloat(coordenada.CLIUBIC_LATITUD),
                                                lng: Number.parseFloat(coordenada.CLIUBIC_LONGITUD),
                                            }}
                                            onMouseOver={() => handleMarkerClick(coordenada)}
                                            onMouseOut={() => setSelectedMarker(null)}
                                            clusterer={clusterer}
                                            icon={Primaria}
                                        />
                                    ))}

                                    {riesgos.length > 0 && mapaCalor.map((coordenada: any, index) => (
                                        <Marker
                                            key={index}
                                            position={{
                                                lat: Number.parseFloat(`${coordenada.latitude}`),
                                                lng: Number.parseFloat(`${coordenada.longitude}`),
                                            }}
                                            icon={{
                                                url: ZonaCalor,
                                                scaledSize: new window.google.maps.Size(
                                                    (coordenada.intensity / 10) * zoomi,
                                                    (coordenada.intensity / 10) * zoomi
                                                ),
                                                anchor: new window.google.maps.Point(
                                                    ((coordenada.intensity / 10) * zoomi) / 2,
                                                    ((coordenada.intensity / 10) * zoomi) / 2
                                                ),
                                                labelOrigin: new window.google.maps.Point(
                                                    ((coordenada.intensity / 10) * zoomi) / 2,
                                                    ((coordenada.intensity / 10) * zoomi) / 2
                                                ),
                                            }}
                                            clusterer={clusterer}
                                        />
                                    ))}
                                </>
                            )}
                        </MarkerClusterer>
                        {selectedMarker && (
                            <InfoWindow
                                position={{
                                    lat: Number.parseFloat(selectedMarker.CLIUBIC_LATITUD),
                                    lng: Number.parseFloat(selectedMarker.CLIUBIC_LONGITUD),
                                }}
                                onCloseClick={() => setSelectedMarker(null)}
                            >
                                <div className="mapPopover" >
                                    <p>Ciente: <span>{selectedMarker.client.CLIE_COMERCIAL}</span></p>
                                    <p>Nombre: <span>{selectedMarker.CLIUBIC_NOMBRE}</span> </p>
                                    <p>Direccion: <span>{selectedMarker.CLIUBIC_DIRECCION}</span> </p>

                                    <p>Latitud: <span>{selectedMarker.CLIUBIC_LATITUD}</span> </p>
                                    <p>Longitud: <span>{selectedMarker.CLIUBIC_LONGITUD}</span> </p>
                                </div>
                            </InfoWindow>
                        )}
                    </div>
                ) : (
                    <div>
                        {
                            ubicacionesShow.map((coordenada, index) => (
                                <div className="icono">
                                    <Marker
                                        key={index}
                                        position={{
                                            lat: Number.parseFloat(coordenada.CLIUBIC_LATITUD),
                                            lng: Number.parseFloat(coordenada.CLIUBIC_LONGITUD),
                                        }}
                                        onMouseOver={() => handleMarkerClick(coordenada)}
                                        onMouseOut={() => setSelectedMarker(null)}
                                        icon={
                                            Primaria
                                        }
                                    >
                                    </Marker>
                                </div>
                            ))}

                        {riesgos.length > 0 && mapaCalor.map((coordenada: any, index) => (
                            <Marker
                                key={index}
                                position={{
                                    lat: Number.parseFloat(`${coordenada.latitude}`),
                                    lng: Number.parseFloat(`${coordenada.longitude}`),
                                }}
                                icon={{
                                    url: ZonaCalor,
                                    scaledSize: new window.google.maps.Size(
                                        (coordenada.intensity / 10) * zoomi,
                                        (coordenada.intensity / 10) * zoomi
                                    ),
                                    anchor: new window.google.maps.Point(
                                        ((coordenada.intensity / 10) * zoomi) / 2,
                                        ((coordenada.intensity / 10) * zoomi) / 2
                                    ),
                                    labelOrigin: new window.google.maps.Point(
                                        ((coordenada.intensity / 10) * zoomi) / 2,
                                        ((coordenada.intensity / 10) * zoomi) / 2
                                    ),
                                    //style: { filter: `blur(${zoomi}px)` },
                                }}
                            />
                        ))}
                        {selectedMarker && (
                            <>
                                <InfoWindow
                                    position={{
                                        lat: Number.parseFloat(selectedMarker.CLIUBIC_LATITUD),
                                        lng: Number.parseFloat(selectedMarker.CLIUBIC_LONGITUD),
                                    }}
                                    onCloseClick={() => setSelectedMarker(null)}
                                >
                                    <div className="mapPopover" >
                                        <p>Ciente: <span>{selectedMarker.client.CLIE_COMERCIAL}</span></p>
                                        <p>Nombre: <span>{selectedMarker.CLIUBIC_NOMBRE}</span> </p>
                                        <p>Direccion: <span>{selectedMarker.CLIUBIC_DIRECCION}</span> </p>

                                        <p>Latitud: <span>{selectedMarker.CLIUBIC_LATITUD}</span> </p>
                                        <p>Longitud: <span>{selectedMarker.CLIUBIC_LONGITUD}</span> </p>
                                    </div>
                                </InfoWindow>
                            </>
                        )}
                    </div>)
                }

            </GoogleMap>}

            {/* <IndicadorFiltro /> */}
        </>
    ) : (
        <></>
    );
}
const MapaGoogleComponent = React.memo(MapaGoogle);
export default MapaGoogleComponent 
