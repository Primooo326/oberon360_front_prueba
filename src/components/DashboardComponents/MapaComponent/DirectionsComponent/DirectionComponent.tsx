import type { IItenary, IItinerario } from "@/models/vehiculos.model"
import { useSystemStore } from "@/states/System.state"
import { useVehiculosStore } from "@/states/Vehiculos.state"
import { DirectionsRenderer, Marker } from "@react-google-maps/api"
import { useEffect, useState } from "react"
export default function DirectionComponent() {

    const { itemSidebarRight, showSidebarRight } = useSystemStore()


    const [directionsResponse, setDirectionsResponse] = useState<any[] | null>(null)
    const [directionTrazado, setDirectionTrazado] = useState<any>(null)
    const [distance, setDistance] = useState<any>('')
    const [duration, setDuration] = useState<any>('')
    const [waypoints, setWaypoints] = useState<any>([])
    const [originRef, setOriginRef] = useState<any>(
        {
            current: {
                value: {
                    lat: 0,
                    lng: 0
                }
            }
        }
    )

    const [destiantionRef, setDestinationRef] = useState<any>(
        {
            current: {
                value: {
                    lat: 0,
                    lng: 0
                }
            }
        }
    )


    async function calculateRoute() {

        if (originRef.current.value === '' || destiantionRef.current.value === '') {
            return
        }

        const waypoints: IItinerario[] = itemSidebarRight!.itinerario!
        const waypointsTrazados = itemSidebarRight!.itinerario!.filter((waypoint) => waypoint.itinerarioEvaluated.estado !== "NO DISPONIBLE")

        const origin = waypoints[0]
        const destination = waypoints[waypoints.length - 1]
        const currentUbication = {
            lat: Number.parseFloat(`${itemSidebarRight!.content.WTLT_LAT}`),
            lng: Number.parseFloat(`${itemSidebarRight!.content.WTLT_LON}`)
        }

        // divide los waypoints en grupos de 23
        const waypointsGroups = [];

        for (let i = 0; i < waypoints.length; i += 23) {
            const group = waypoints.slice(i, i + 23);
            if (waypointsGroups.length > 0 && group.length > 0) {
                group[0] = waypointsGroups[waypointsGroups.length - 1][waypointsGroups[waypointsGroups.length - 1].length - 1];
            }
            waypointsGroups.push(group);
        }

        const directionsService = new google.maps.DirectionsService()

        const results: any = await Promise.all(waypointsGroups.map(async (waypointsGroup) => {
            const results2 = await directionsService.route(
                {
                    origin: {
                        lat: Number.parseFloat(`${waypointsGroup[0].point.PUN_LATITUD}`),
                        lng: Number.parseFloat(`${waypointsGroup[0].point.PUN_LONGITUD}`)
                    },
                    destination: {
                        lat: Number.parseFloat(`${waypointsGroup[waypointsGroup.length - 1].point.PUN_LATITUD}`),
                        lng: Number.parseFloat(`${waypointsGroup[waypointsGroup.length - 1].point.PUN_LONGITUD}`)
                    },
                    travelMode: google.maps.TravelMode.DRIVING,
                    waypoints: waypointsGroup.slice(1, waypointsGroup.length - 1).map((waypoint: any) => {
                        return {
                            location: {
                                lat: Number.parseFloat(`${waypoint.point.PUN_LATITUD}`),
                                lng: Number.parseFloat(`${waypoint.point.PUN_LONGITUD}`)
                            },
                            stopover: true
                        }
                    }),
                }
            )
            return results2
        })
        )
        if (waypointsTrazados.length !== 0) {
            const restulTrazado = await directionsService.route({
                origin: {
                    lat: Number.parseFloat(
                        `${waypointsTrazados[0].point.PUN_LATITUD}`,
                    ),
                    lng: Number.parseFloat(
                        `${waypointsTrazados[0].point.PUN_LONGITUD}`,
                    ),
                },
                destination: currentUbication,
                travelMode: google.maps.TravelMode.DRIVING,
                waypoints: waypointsTrazados.map((waypoint: any) => {
                    return {
                        location: {
                            lat: Number.parseFloat(
                                `${waypoint.point.PUN_LATITUD}`,
                            ),
                            lng: Number.parseFloat(
                                `${waypoint.point.PUN_LONGITUD}`,
                            ),
                        },
                        stopover: true,
                    };
                }),
            });

            setDirectionTrazado(restulTrazado);
        }
        setDirectionsResponse(results)
        setOriginRef({
            current: {
                value: {
                    lat: Number.parseFloat(`${origin.point.PUN_LATITUD}`),
                    lng: Number.parseFloat(`${origin.point.PUN_LONGITUD}`)
                }
            }
        })

        setDestinationRef({
            current: {
                value: {
                    lat: Number.parseFloat(`${destination.point.PUN_LATITUD}`),
                    lng: Number.parseFloat(`${destination.point.PUN_LONGITUD}`)
                }
            }
        })
    }

    function clearRoute() {
        setDirectionsResponse(null)
        setDistance('')
        setDuration('')
        setOriginRef({
            current: {
                value: {
                    lat: 0,
                    lng: 0
                }
            }
        })
        setDestinationRef({
            current: {
                value: {
                    lat: 0,
                    lng: 0
                }
            }
        })
    }
    useEffect(() => {

        if (itemSidebarRight?.itinerario) {
            calculateRoute()
        }
    }, [itemSidebarRight])

    return (
        <>
            {
                (showSidebarRight && directionsResponse) && (
                    <>
                        {directionsResponse.map((directions, index) => (

                            <DirectionsRenderer
                                key={index}
                                options={{
                                    directions,
                                    draggable: false,
                                    panel: document.getElementById('panel'),
                                    polylineOptions: {
                                        strokeColor: '#a6a6a6',
                                        strokeOpacity: 1,
                                        strokeWeight: 6,
                                        zIndex: 1
                                    },
                                    preserveViewport: true

                                }}
                            />


                        ))}
                        {
                            directionTrazado && (

                                <DirectionsRenderer
                                    options={{
                                        directions: directionTrazado,
                                        draggable: false,
                                        panel: document.getElementById('panel'),
                                        polylineOptions: {
                                            strokeColor: '#6931ba',
                                            strokeOpacity: 1,
                                            strokeWeight: 6,
                                            zIndex: 2
                                        },
                                        preserveViewport: true,
                                        suppressMarkers: true
                                    }}
                                />
                            )
                        }

                    </>
                )
            }
        </>

    )

}
