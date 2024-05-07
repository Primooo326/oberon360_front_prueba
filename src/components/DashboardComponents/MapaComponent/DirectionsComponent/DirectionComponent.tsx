import type { EItenaryState, IItenary, IItinerario } from "@/models/vehiculos.model"
import { useSystemStore } from "@/states/System.state"
import { useVehiculosStore } from "@/states/Vehiculos.state"
import { DirectionsRenderer, Marker } from "@react-google-maps/api"
import { useEffect, useState } from "react"
export default function DirectionComponent() {

    const { itemSidebarRight } = useSystemStore()


    const [directionsResponse, setDirectionsResponse] = useState<any[] | null>(null)
    const [markers, setMarkers] = useState<any[]>([])



    async function calculateRoute() {

        const waypoints = clasificateItinerarios(itemSidebarRight!.itinerario!)
        const markers = filterUniqueCoordinates(waypoints.reduce((acc, val) => acc.concat(val), []))
        setMarkers(markers)

        const origin = itemSidebarRight!.itinerario![0]
        const destination = itemSidebarRight!.itinerario![waypoints.length - 1]
        const directionsService = new google.maps.DirectionsService()

        const results = await Promise.all(waypoints.map(async (waypointsGroup) => {
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
            calculateRoute()
        }

    }, [itemSidebarRight])



    return (
        <>
            {
                (itemSidebarRight && directionsResponse) && (
                    <>

                        {
                            directionsResponse.map((waypointsGroup, i) => (
                                <>
                                    <DirectionsRenderer
                                        key={i}
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
        </>

    )

}
