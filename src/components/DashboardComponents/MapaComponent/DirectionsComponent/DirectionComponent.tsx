import { useSystemStore } from "@/states/System.state"
import { DirectionsRenderer } from "@react-google-maps/api"
import { useEffect, useState } from "react"
export default function DirectionComponent() {

    const { itemSidebarRight } = useSystemStore()


    const [directionsResponse, setDirectionsResponse] = useState<any>(null)
    const [distance, setDistance] = useState<any>('')
    const [duration, setDuration] = useState<any>('')
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
        console.log(itemSidebarRight);
        const waypoints = itemSidebarRight?.itinerario!.sort((a, b) => a.IPE_ORDEN - b.IPE_ORDEN)

        if (waypoints) {

            const directionsService = new google.maps.DirectionsService()
            const results: any = await directionsService.route(
                {
                    origin: {
                        lat: Number.parseFloat(`${waypoints[0].point.PUN_LATITUD}`),
                        lng: Number.parseFloat(`${waypoints[0].point.PUN_LONGITUD}`)
                    },
                    destination: {
                        lat: Number.parseFloat(`${waypoints[waypoints.length - 1].point.PUN_LATITUD}`),
                        lng: Number.parseFloat(`${waypoints[waypoints.length - 1].point.PUN_LONGITUD}`)
                    },
                    travelMode: google.maps.TravelMode.DRIVING,
                    waypoints: waypoints.slice(1, waypoints.length - 1).map((waypoint: any) => {
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
            console.log(results);
            setDirectionsResponse(results)
            setDistance(results.routes[0].legs[0].distance.text)
            setDuration(results.routes[0].legs[0].duration.text)
        } else {
            return
        }
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
                    <DirectionsRenderer
                        options={{
                            directions: directionsResponse,
                            draggable: true,
                            panel: document.getElementById('panel'),
                            polylineOptions: {
                                strokeColor: 'red',
                                strokeOpacity: 0.5,
                                strokeWeight: 6
                            },
                            preserveViewport: true

                        }}
                    />
                )
            }
        </>

    )

}
