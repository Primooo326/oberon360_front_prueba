import type { IItenary } from "@/models/vehiculos.model"
import { useSystemStore } from "@/states/System.state"
import { DirectionsRenderer, Marker } from "@react-google-maps/api"
import { useEffect, useState } from "react"
export default function DirectionComponent() {

    const { itemSidebarRight } = useSystemStore()


    const [directionsResponse, setDirectionsResponse] = useState<any[] | null>(null)
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

        const waypoints: IItenary[] = itemSidebarRight!.itinerario!.sort((a, b) => a.IPE_ORDEN - b.IPE_ORDEN)
        const origin = waypoints[0]
        const destination = waypoints[waypoints.length - 1]

        // divide los waypoints en grupos de 23
        const waypointsGroups = [];

        for (let i = 0; i < waypoints.length; i += 23) {
            const group = waypoints.slice(i, i + 23);
            if (waypointsGroups.length > 0 && group.length > 0) {
                group[0] = waypointsGroups[waypointsGroups.length - 1][waypointsGroups[waypointsGroups.length - 1].length - 1];
            }
            waypointsGroups.push(group);
        }
        console.log(waypointsGroups);


        const directionsService = new google.maps.DirectionsService()

        const results = await Promise.all(waypointsGroups.map(async (waypointsGroup, index) => {
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
        } else {
            clearRoute()
        }
    }, [itemSidebarRight])

    return (
        <>
            {
                (itemSidebarRight && directionsResponse) && (
                    <>
                        {directionsResponse.map((directions, index) => (

                            <DirectionsRenderer
                                key={index}
                                options={{
                                    directions,
                                    draggable: true,
                                    panel: document.getElementById('panel'),
                                    polylineOptions: {
                                        strokeColor: '#461788',
                                        strokeOpacity: 0.8,
                                        strokeWeight: 6
                                    },
                                    preserveViewport: true

                                }}
                            />


                        ))}
                    </>
                )
            }
        </>

    )

}
