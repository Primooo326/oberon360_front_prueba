"use client"
import { clusterStyles, containerStyle, darkMapStyles, heatmapData, mapaDefecto, Primaria } from '@/data/mapaData'
import type { IUbicacionCliente, TRiesgo } from '@/models/ubicaciones.model'
import { useSystemStore } from '@/states/System.state'
import { useUbicaciones } from '@/states/Ubicaciones.state'
import { GoogleMap, InfoWindow, Marker, MarkerClusterer } from '@react-google-maps/api'
import { useCallback, useEffect, useRef, useState } from 'react'
import ZonaCalor from "@assets/img/MapaIconos/CIRCULO-RIESGOS.gif";

export default function MapaComponent2() {

    const { ubicaciones } = useUbicaciones()
    const { theme } = useSystemStore()

    const [clusterShow, setClusterShow] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false)
    const [map, setMap] = useState<any>(null)
    const [selectedMarker, setSelectedMarker] = useState<null | IUbicacionCliente>(null);
    const [riesgos, setRiesgos] = useState<TRiesgo[]>([]);
    const [mapaCalor, setMapaCalor] = useState<any>([])
    const [zoomi, setZoomi] = useState(6)
    const [center, setCenter] = useState({
        lat: 3.3345374,
        lng: -74.2701511,
    });

    const [ubicacionesShow, setUbicacionesShow] = useState<IUbicacionCliente[]>([]);


    const mapRef = useRef() as any;

    const getMapaCalor = new Promise((resolve, reject) => {
        try {
            setTimeout(() => {
                resolve(heatmapData);

            }, 100);
        } catch (error) {
            reject(error)
        }
    });
    const onLoad = useCallback((map: any) => {
        mapRef.current = map;
        setMap(map);
    }, []);
    const onUnmount = useCallback(function callback() {
        setMap(null);
    }, []);

    const handleMarkerClick = (marker: any) => {
        setSelectedMarker(marker);
    };

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

    return (
        isLoaded ? (
            <GoogleMap
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
                    {/* {selectedMarker && (
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
                  )} */}
                </div>
            </GoogleMap>) : (<></>)
    )
}
