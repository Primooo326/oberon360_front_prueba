import { Asistencia } from "@/data/mapaData";
import type { IUbicacionCliente } from "@/models/ubicaciones.model";
import { InfoWindow, Marker, MarkerClusterer } from "@react-google-maps/api";
import { useState } from "react";

export default function UbicacionCluster({ ubicaciones, showUbicaciones }: { ubicaciones: IUbicacionCliente[], showUbicaciones: boolean }) {
    const [selectedMarker, setSelectedMarker] = useState<null | IUbicacionCliente>(null);
    const handleMarkerClick = (marker: any) => {
        setSelectedMarker(marker);
    };
    const clusterStylesUbicacion = [


        {
            url: Asistencia.url,
            height: 40,
            width: 40,

            className: 'clusterText',
        },
        {
            url: Asistencia.url,
            height: 60,
            width: 60,

            className: 'clusterText',
        },
    ]
    return (
        <>
            {showUbicaciones && (
                <>
                    <MarkerClusterer
                        options={{
                            imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
                            styles: clusterStylesUbicacion,
                            gridSize: 25,
                            averageCenter: true,
                        }}
                    >
                        {(clusterer) => (
                            <>
                                {ubicaciones.map((coordenada, index) => (
                                    <Marker
                                        key={index}
                                        position={{
                                            lat: Number.parseFloat(coordenada.CLIUBIC_LATITUD),
                                            lng: Number.parseFloat(coordenada.CLIUBIC_LONGITUD),
                                        }}
                                        onMouseOver={() => handleMarkerClick(coordenada)}
                                        onMouseOut={() => setSelectedMarker(null)}
                                        clusterer={clusterer}
                                        icon={{
                                            url: Asistencia.url,
                                            scaledSize: new google.maps.Size(Asistencia.scaledSize.width, Asistencia.scaledSize.height)
                                        }}

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
                                <p>Cliente: <span>{selectedMarker.client.CLIE_COMERCIAL}</span></p>
                                <p>Nombre: <span>{selectedMarker.CLIUBIC_NOMBRE}</span> </p>
                                <p>Direccion: <span>{selectedMarker.CLIUBIC_DIRECCION}</span> </p>

                                <p>Latitud: <span>{selectedMarker.CLIUBIC_LATITUD}</span> </p>
                                <p>Longitud: <span>{selectedMarker.CLIUBIC_LONGITUD}</span> </p>
                            </div>
                        </InfoWindow>
                    )}
                </>
            )}
        </>
    )
}
