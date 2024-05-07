import type { EItenaryState, IItenary, IItinerario } from "@/models/vehiculos.model"
import { useSystemStore } from "@/states/System.state"
import { useVehiculosStore } from "@/states/Vehiculos.state"
import { DirectionsRenderer, Marker } from "@react-google-maps/api"
import { useEffect, useState } from "react"
export default function DirectionComponent() {

    const { itemSidebarRight } = useSystemStore()


    const [directionsResponse, setDirectionsResponse] = useState<any[] | null>(null)
    const [directionTrazado, setDirectionTrazado] = useState<any>(null)
    const [distance, setDistance] = useState<any>('')
    const [duration, setDuration] = useState<any>('')
    const [waypoints, setWaypoints] = useState<any>([])
    const [markers, setMarkers] = useState<any>([])
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
        console.log(waypoints);

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

    async function calculateRoute2() {

        const waypoints = clasificateItinerarios2(itemSidebarRight!.itinerario!)
        const markers = filterUniqueCoordinates(waypoints.reduce((acc, val) => acc.concat(val), []))
        setMarkers(markers)

        const origin = itemSidebarRight!.itinerario![0]
        const destination = itemSidebarRight!.itinerario![waypoints.length - 1]
        const currentUbication = {
            lat: Number.parseFloat(`${itemSidebarRight!.content.WTLT_LAT}`),
            lng: Number.parseFloat(`${itemSidebarRight!.content.WTLT_LON}`)
        }

        const directionsService = new google.maps.DirectionsService()

        const results: any = await Promise.all(waypoints.map(async (waypointsGroup) => {
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
            return { directions: results2, waypoints: waypointsGroup, color: defineColor(waypointsGroup[1].itinerarioEvaluated.estado) }
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
    function filterUniqueCoordinates(itineraries: IItinerario[]): IItinerario[] {
        // Usamos un conjunto para rastrear coordenadas únicas
        const coordinatesSet = new Set<string>();
        const uniqueItineraries: IItinerario[] = [];

        itineraries.forEach(itinerary => {
            const coordinatesKey = `${itinerary.point.PUN_LATITUD},${itinerary.point.PUN_LONGITUD}`;

            // Solo añadimos el itinerario si las coordenadas no están en el conjunto
            if (!coordinatesSet.has(coordinatesKey)) {
                coordinatesSet.add(coordinatesKey);
                uniqueItineraries.push(itinerary);
            }
        });

        return uniqueItineraries;
    }

    function clasificateItinerarios(itineraries: IItinerario[]): IItinerario[][] {
        const states: EItenaryState[] = [
            "ANTICIPADO",
            "ATRASADO",
            "A TIEMPO",
            "NO DISPONIBLE",
            "DISPONIBLE",
            "EN OPERACION"
        ];

        // Inicializa un objeto con las categorías como arreglos vacíos
        const grouped: Record<EItenaryState, IItinerario[]> = {
            "ANTICIPADO": [],
            "ATRASADO": [],
            "A TIEMPO": [],
            "NO DISPONIBLE": [],
            "DISPONIBLE": [],
            "EN OPERACION": []
        };

        // Clasifica los itinerarios según el estado evaluado
        itineraries.forEach(itinerary => {
            const state = itinerary.itinerarioEvaluated.estado;
            if (grouped[state]) {
                grouped[state].push(itinerary);
            } else {
                console.warn(`Estado inesperado encontrado: ${state}`);
            }
        });

        // Función para dividir un arreglo en subarreglos de longitud máxima `size`
        function chunkArray<T>(array: T[], size: number): T[][] {
            const chunks: T[][] = [];
            for (let i = 0; i < array.length; i += size) {
                chunks.push(array.slice(i, i + size));
            }
            return chunks;
        }

        // Inicializa un arreglo que contendrá todos los subarreglos clasificados
        const finalGroupedArray: IItinerario[][] = [];

        // Recorre cada estado, obtiene los itinerarios clasificados y los divide en grupos de 23
        states.forEach(state => {
            const stateGroup = grouped[state];
            if (stateGroup.length > 0) {
                const chunks = chunkArray(stateGroup, 23);
                finalGroupedArray.push(...chunks);
            }
        });

        return finalGroupedArray;
    }
    function clasificateItinerarios2(itineraries: IItinerario[]): IItinerario[][] {
        // Límite de elementos por subgrupo
        const MAX_ITEMS_PER_GROUP = 23;

        // Inicializa el arreglo para contener los subgrupos finales
        const finalGroupedArray: IItinerario[][] = [];

        // Función para agregar subgrupos al arreglo final
        function addSubGroup(group: IItinerario[]) {
            if (group.length > 0) {
                finalGroupedArray.push(group);
            }
        }

        // Inicializa un grupo temporal con el estado inicial del primer elemento
        let currentGroup: IItinerario[] = [];
        let currentState: EItenaryState | null = itineraries.length > 0 ? itineraries[0].itinerarioEvaluated.estado : null;

        // Recorre cada itinerario respetando el orden original
        itineraries.forEach(itinerary => {
            const itineraryState = itinerary.itinerarioEvaluated.estado;

            // Si el estado cambia o el grupo excede el límite, almacena el grupo actual
            if (itineraryState !== currentState || currentGroup.length >= MAX_ITEMS_PER_GROUP) {
                addSubGroup(currentGroup);
                currentGroup = []; // Inicia un nuevo grupo
                currentState = itineraryState; // Actualiza el estado actual
                // last item of the previous group
                const lastItem = finalGroupedArray[finalGroupedArray.length - 1][finalGroupedArray[finalGroupedArray.length - 1].length - 1];
                currentGroup.push(lastItem);
            }

            // Añade el itinerario al grupo actual
            currentGroup.push(itinerary);
        });

        // Añade el último grupo si quedó alguno pendiente
        addSubGroup(currentGroup);
        return finalGroupedArray;
    }


    function defineColor(estado: EItenaryState) {
        switch (estado) {
            case "ANTICIPADO":
                return "#00d287";
            case "ATRASADO":
                return "#FF0000";
            case "A TIEMPO":
                return "#00d287";
            case "NO DISPONIBLE":
                return "#a6a6a6";
            case "DISPONIBLE":
                return "#a6a6a6";
            case "EN OPERACION":
                return "#a6a6a6";
            default:
                return "#a6a6a6";
        }
    }


    useEffect(() => {

        if (itemSidebarRight?.itinerario) {
            calculateRoute2()
        }

    }, [itemSidebarRight])



    return (
        <>
            {
                (itemSidebarRight && directionsResponse) && (
                    <>

                        {
                            directionsResponse.map(waypointsGroup => (
                                <>
                                    <DirectionsRenderer
                                        options={{
                                            directions: waypointsGroup.directions,
                                            draggable: false,
                                            panel: document.getElementById('panel'),
                                            polylineOptions: {
                                                strokeColor: waypointsGroup.color,
                                                strokeOpacity: 1,
                                                strokeWeight: 6,
                                                zIndex: 1
                                            },
                                            preserveViewport: true,
                                            suppressMarkers: true
                                        }}
                                    />
                                </>
                            ))
                        }


                        {/* {directionsResponse.map((directions, index) => (

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


                        ))} */}



                        {/* {
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
                        } */}

                    </>
                )
            }
            {
                markers.map((marker: any, index: number) => (

                    <Marker
                        key={index}
                        position={{
                            lat: Number.parseFloat(`${marker.point.PUN_LATITUD}`),
                            lng: Number.parseFloat(`${marker.point.PUN_LONGITUD}`)
                        }}
                        label={
                            {
                                text: `${index + 1}`,
                                color: "white",
                                fontSize: "12px",
                                fontWeight: "bold"
                            }
                        }
                    />
                ))
            }
        </>

    )

}
