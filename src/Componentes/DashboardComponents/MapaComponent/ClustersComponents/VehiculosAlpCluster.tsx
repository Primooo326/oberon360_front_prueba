import { Primaria, Secundaria } from "@/data/mapaData";
import type { IVehiculo } from "@/models/vehiculos.model";
import { useSystemStore } from "@/states/System.state";
import { InfoWindow, Marker, MarkerClusterer } from "@react-google-maps/api";
import { useEffect, useState } from "react";

export default function VehiculosAlpCluster({ vehiculos, showVehiculos }: { vehiculos: IVehiculo[]; showVehiculos: boolean }) {
    const [hoveredMarker, setHoveredMarker] = useState<null | IVehiculo>(null);
    const { setItemSidebarRight, setMapConfig } = useSystemStore()
    const handleMarkerHoverVehiculo = (marker: any) => {
        setHoveredMarker(marker);
    }
    const handleMarkerClickVehiculo = (marker: any) => {
        setMapConfig({
            zoom: 15,
            fixed: true,
            center: {
                lat: Number.parseFloat(`${marker.WTLT_LAT}`),
                lng: Number.parseFloat(`${marker.WTLT_LON}`)
            }
        })
        setItemSidebarRight({ item: "vehiculos", content: marker })
    }

    const clusterStylesVehiculos: any = [

        {
            url: Primaria.url,
            height: 40,
            width: 40,

            className: 'clusterText',
        },
        {
            url: Primaria.url,
            height: 60,
            width: 60,
            className: 'clusterText',
        }
    ]
    useEffect(() => {

    }, [vehiculos])
    return (
        <>
            {showVehiculos && (
                <MarkerClusterer
                    options={{
                        imagePath:
                            "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
                        styles: clusterStylesVehiculos,
                        gridSize: 15,
                        averageCenter: true,
                    }}
                >
                    {(clusterer) => (
                        <>
                            {vehiculos.map((vehiculo, index) => (
                                <Marker
                                    key={index}
                                    position={{
                                        lat: Number.parseFloat(
                                            `${vehiculo.WTLT_LAT}`,
                                        ),
                                        lng: Number.parseFloat(
                                            `${vehiculo.WTLT_LON}`,
                                        ),
                                    }}
                                    onMouseOver={() =>
                                        handleMarkerHoverVehiculo(vehiculo)
                                    }
                                    onMouseOut={() =>
                                        setHoveredMarker(null)
                                    }
                                    onClick={() =>
                                        handleMarkerClickVehiculo(vehiculo)
                                    }
                                    clusterer={clusterer}
                                    icon={vehiculo.TIPOSERVICIO_DESCRIPCION === "PRIMARIA" ? Primaria : Secundaria}
                                />
                            ))}
                        </>
                    )}
                </MarkerClusterer>
            )}
            {hoveredMarker && (
                <InfoWindow
                    position={{
                        lat: Number.parseFloat(`${hoveredMarker.WTLT_LAT}`),
                        lng: Number.parseFloat(`${hoveredMarker.WTLT_LON}`),
                    }}
                    onCloseClick={() => setHoveredMarker(null)}
                >
                    <div className="mapPopover" >
                        <p>Placa: <span>{hoveredMarker.WTLT_PLACA}</span> </p>
                        <p>Cliente: <span>ALPINA</span></p>
                        <p>Estado vehículo: <span>{hoveredMarker.ESTADOVH}</span> </p>
                        <p>Direccion: <span>{hoveredMarker.WTLT_LOCATION}</span> </p>

                        <p>Evento: <span>{hoveredMarker.WTLT_EVENTO}</span> </p>
                        <p>Velocidad maxima: <span>{hoveredMarker.VELOCIDAD_MAXIMA}</span> </p>
                        <p>Velocidad promedio: <span>{hoveredMarker.VELOCIDAD_PROMEDIO}</span> </p>

                    </div>
                </InfoWindow>
            )}
        </>
    )
}
