"use client"
import { ZonaRoja } from '@/data/mapaData';
import { useSystemStore } from '@/states/System.state';
import { MarkerClusterer, Marker, Polyline, InfoWindow } from '@react-google-maps/api';
import { useEffect, useState } from 'react';

export default function MobileCluster({ oleoductos, oleoductosShow }: { oleoductos: IOleoductoTrazo[], oleoductosShow: boolean }) {
    const { setItemSidebarRight, setMapConfig, itemSidebarRight, showSidebarRight, setShowSidebarRight } = useSystemStore()

    const [hoveredMarker, setHoveredMarker] = useState<null | any>(null);

    const eventoDrone = [
        {
            "title": "ECOPETROL",
            "author": "AT ORDONEZ ARLEX",
            "description": "20 PISCINAS",
            "event_location": {
                "latitude": "8.605556",
                "longitude": "-73.3175"
            },
            "event_start_time": "27/09/2015 7:51 P. M.",
            "event_end_time": "27/09/2015 7:51 P. M.",
            "notes": "",
            "attachments": {
                "images": ["1", "2"]
            }
        },
        {
            "title": "ECOPETROL",
            "author": "AT ORDONEZ ARLEX",
            "description": "INCENDIO",
            "event_location": {
                "latitude": "8.599167",
                "longitude": "-73.260278"
            },
            "event_start_time": "27/09/2015 8:45 P. M.",
            "event_end_time": "27/09/2015 8:45 P. M.",
            "notes": "",
            "attachments": {
                "images": ["3"]
            }
        },
        {
            "title": "ECOPETROL",
            "author": "AT ORDONEZ ARLEX",
            "description": "Inspeccion Infraestructura",
            "event_location": {
                "latitude": "8.691944",
                "longitude": "-72.7275"
            },
            "event_start_time": "27/09/2015 10:02 P. M.",
            "event_end_time": "27/09/2015 10:02 P. M.",
            "notes": "",
            "attachments": {
                "images": ["4", "5"]
            }
        },
        {
            "title": "ECOPETROL",
            "author": "",
            "description": "INTRUCION",
            "event_location": {
                "latitude": "8.665278",
                "longitude": "-72.726667"
            },
            "event_start_time": "27/09/2015 10:19 P. M.",
            "event_end_time": "27/09/2015 10:19 P. M.",
            "notes": "Persona en moto cerca de la infraestructura de la compañia. Generar alerta de supervision sobre el punto hasta descartar amenaza.",
            "attachments": {
                "images": ["6"]
            }
        }
    ]

    const handleClickOleoducto = (oleoducto: IOleoductoTrazo) => {

        setMapConfig({
            zoom: 15,
            fixed: true,
            center: {
                lat: Number.parseFloat(`${oleoducto.LatitudInicial}`),
                lng: Number.parseFloat(`${oleoducto.LongitudFinal}`)
            },
            showLoadMap: false
        })
        setShowSidebarRight(true)
        setItemSidebarRight({ item: "oleoducto", content: oleoducto, itinerario: null })

    }

    const handleSetHoveredMarker = (marker: any) => {
        setHoveredMarker(marker);
    }

    const clusterStylesMobile = [
        {
            url: ZonaRoja.url,
            height: 60,
            width: 60,

            className: 'clusterText',
        },
    ]
    return (
        <>
            {oleoductosShow && oleoductos.map((oleoducto, index) => (
                <>
                    <Marker
                        key={`oleoudctoMarker${index}`}
                        position={{
                            lat: Number.parseFloat(
                                `${oleoducto.LatitudInicial}`,
                            ),
                            lng: Number.parseFloat(
                                `${oleoducto.LongitudInicial}`,
                            ),
                        }}
                        // onClick={() =>
                        //     handleClickOleoducto(oleoducto)
                        // }
                        onMouseOut={() => {
                            setHoveredMarker(null)
                        }}
                        onMouseOver={() => {
                            const itemHover = {
                                lon: oleoducto.LongitudInicial,
                                lat: oleoducto.LatitudInicial,
                                EstaciónInicial: oleoducto.EstaciónInicial,
                                EstaciónFinal: oleoducto.EstaciónFinal
                            }
                            setHoveredMarker(itemHover)
                        }}
                    />
                    <Marker
                        key={index}
                        position={{
                            lat: Number.parseFloat(
                                `${oleoducto.LatitudFinal}`,
                            ),
                            lng: Number.parseFloat(
                                `${oleoducto.LongitudFinal}`,
                            ),
                        }}
                        // onClick={() =>
                        //     handleClickOleoducto(oleoducto)
                        // }
                        onMouseOut={() => {
                            setHoveredMarker(null)
                        }}
                        onMouseOver={() => {
                            const itemHover = {
                                lon: oleoducto.LongitudFinal,
                                lat: oleoducto.LatitudFinal,
                                EstaciónInicial: oleoducto.EstaciónInicial,
                                EstaciónFinal: oleoducto.EstaciónFinal
                            }
                            setHoveredMarker(itemHover)
                        }}
                    />
                    < Polyline path={[
                        {
                            lat: Number.parseFloat(`${oleoducto.LatitudInicial}`),
                            lng: Number.parseFloat(`${oleoducto.LongitudInicial}`)
                        },
                        {
                            lat: Number.parseFloat(`${oleoducto.LatitudFinal}`),
                            lng: Number.parseFloat(`${oleoducto.LongitudFinal}`)
                        }

                    ]
                    } options={
                        {
                            strokeColor: "#FF0000",
                            strokeOpacity: 1,
                            strokeWeight: 2,
                            zIndex: 1
                        }

                    } />
                </>
            ))}
            {hoveredMarker && (
                <InfoWindow
                    position={{
                        lat: Number.parseFloat(`${hoveredMarker.lat}`),
                        lng: Number.parseFloat(`${hoveredMarker.lon}`),
                    }}
                    onCloseClick={() => setHoveredMarker(null)}
                >
                    <div className="mapPopover" >
                        <div className="flex justify-between items-center p-2 mt-3">
                            <p className='' >Estación: <span>{hoveredMarker.EstaciónInicial} - {hoveredMarker.EstaciónFinal}</span></p>

                        </div>
                    </div>
                </InfoWindow>
            )}
            {
                oleoductosShow && eventoDrone.map((evento, index) => (
                    <Marker
                        key={index}
                        position={{
                            lat: Number.parseFloat(
                                `${evento.event_location.latitude}`,
                            ),
                            lng: Number.parseFloat(
                                `${evento.event_location.longitude}`,
                            ),
                        }}
                        icon={{
                            url: ZonaRoja.url,
                            scaledSize: new google.maps.Size(60, 60),
                        }}
                        onClick={() => {
                            setItemSidebarRight({ item: "oleoducto", content: evento, itinerario: null })
                            setShowSidebarRight(true)
                        }}
                    />
                ))
            }

        </>
    )
}
