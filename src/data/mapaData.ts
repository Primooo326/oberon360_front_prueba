import FincaVerde from "@assets/img/MapaIconos/FINCA-VERDE.png";
import FincaVIPVerde from "@assets/img/MapaIconos/FINCA-VIP-VERDE.png";
import FlotaPrimariaVerde from "@assets/img/MapaIconos/FLOTA-PRIMARIA-VERDE.png";
import FlotaSecundariaVerde from "@assets/img/MapaIconos/FLOTA-SECUNDARIA-VERDE.png";
import MobileVerde from "@assets/img/MapaIconos/MOBILE-VERDE.png";
import TicketRojo from "@assets/img/MapaIconos/DAVIVIENDA-ROJO.png";
import TicketVerde from "@assets/img/MapaIconos/DAVIVIENDA-VERDE.png";
import ZonaCalor from "@assets/img/MapaIconos/CIRCULO-RIESGOS.gif";
// import escudo from "@assets/img/MapaIconos/ihmze7vc.png"
import escudo from "@assets/img/MapaIconos/asistencia-verde.png"
import type { TRiesgo } from "@/models/ubicaciones.model";

export const heatmapData = [
    { latitude: 4.657, longitude: -74.047, intensity: 97 },
    { latitude: 3.44, longitude: -76.5197, intensity: 61 },
    { latitude: 6.2447, longitude: -75.5748, intensity: 35 },
    { latitude: 10.9833, longitude: -74.8019, intensity: 22 },
    { latitude: 10.4236, longitude: -75.5253, intensity: 20 },
    { latitude: 8.76, longitude: -75.8856, intensity: 20 },
    { latitude: 11.2361, longitude: -74.2017, intensity: 19 },
    { latitude: 4.1425, longitude: -73.6294, intensity: 16 },
    { latitude: 4.4378, longitude: -75.2006, intensity: 15 },
    { latitude: 4.8143, longitude: -75.6946, intensity: 15 },
    { latitude: 7.9075, longitude: -72.5047, intensity: 13 },
    { latitude: 1.21, longitude: -77.2747, intensity: 13 },
    { latitude: 10.4603, longitude: -73.2597, intensity: 13 },
    { latitude: 2.9275, longitude: -75.2875, intensity: 11 },
    { latitude: 4.5389, longitude: -75.6725, intensity: 10 },
    { latitude: 9.2994, longitude: -75.3958, intensity: 10 },
    { latitude: 7.1186, longitude: -73.1161, intensity: 9 },
    { latitude: 11.5442, longitude: -72.9069, intensity: 9 },
    { latitude: 5.0661, longitude: -75.4847, intensity: 8 },
    { latitude: 2.4542, longitude: -76.6092, intensity: 8 },
    { latitude: 1.6142, longitude: -75.6117, intensity: 7 },
    { latitude: 5.3306, longitude: -72.3906, intensity: 6 },
    { latitude: 5.5403, longitude: -73.3614, intensity: 5 },
    { latitude: 5.6923, longitude: -76.6582, intensity: 3 },
    { latitude: 12.5847, longitude: -81.7006, intensity: 2 },
    { latitude: 2.5653, longitude: -72.6386, intensity: 2 },
    { latitude: 7.0903, longitude: -70.7617, intensity: 1 },
    { latitude: 1.1492, longitude: -76.6464, intensity: 1 },
    { latitude: 6.1903, longitude: -67.4837, intensity: 1 },
    { latitude: 3.8708, longitude: -67.9211, intensity: 0 },
    { latitude: 4.9081, longitude: -73.9403, intensity: 0 },
];
export const containerStyle = {
    width: "100%",
    height: "100%",
    borderRadius: "0.75rem",
};
export const colombiaBounds = {
    north: 13.509,
    south: -4.227,
    west: -78.99,
    east: -66.869,
};

export const OberonStaly = [
    { elementType: "geometry", stylers: [{ color: "#ebe3cd" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#523735" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#f5f1e6" }] },
    {
        featureType: "administrative",
        elementType: "geometry.stroke",
        stylers: [{ color: "#071328" }],
    },
    {
        featureType: "administrative.land_parcel",
        elementType: "geometry.stroke",
        stylers: [{ color: "#dcd2be" }],
    },
    {
        featureType: "administrative.land_parcel",
        elementType: "labels.text.fill",
        stylers: [{ color: "#ae9e90" }],
    },
    {
        featureType: "landscape.natural",
        elementType: "geometry",
        stylers: [{ color: "#E6E6E6" }], //1a617a
    },
    {
        featureType: "poi",
        elementType: "geometry",
        stylers: [{ color: "#dfd2ae" }],
    },
    {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [{ color: "#93817c" }],
    },
    {
        featureType: "poi.park",
        elementType: "geometry.fill",
        stylers: [{ color: "#a5b076" }],
    },
    {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [{ color: "#447530" }],
    },
    {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#f5f1e6" }],
    },
    {
        featureType: "road.arterial",
        elementType: "geometry",
        stylers: [{ color: "#fdfcf8" }],
    },
    {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ color: "#f8c967" }],
    },
    {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{ color: "#e9bc62" }],
    },
    {
        featureType: "road.highway.controlled_access",
        elementType: "geometry",
        stylers: [{ color: "#e98d58" }],
    },
    {
        featureType: "road.highway.controlled_access",
        elementType: "geometry.stroke",
        stylers: [{ color: "#db8555" }],
    },
    {
        featureType: "road.local",
        elementType: "labels.text.fill",
        stylers: [{ color: "#806b63" }],
    },
    {
        featureType: "transit.line",
        elementType: "geometry",
        stylers: [{ color: "#dfd2ae" }],
    },
    {
        featureType: "transit.line",
        elementType: "labels.text.fill",
        stylers: [{ color: "#8f7d77" }],
    },
    {
        featureType: "transit.line",
        elementType: "labels.text.stroke",
        stylers: [{ color: "#ebe3cd" }],
    },
    {
        featureType: "transit.station",
        elementType: "geometry",
        stylers: [{ color: "#dfd2ae" }],
    },
    {
        featureType: "water",
        elementType: "geometry.fill",
        stylers: [{ color: "#071328" }],
    },
    {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{ color: "#92998d" }],
    },
    {
        featureType: "water",
        elementType: "labels.text.stroke",
        stylers: [{ color: "#17263c" }],
    },
];
export const blueGreenMapStyles = [
    { elementType: "geometry", stylers: [{ color: "#1a1a1a" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#ffffff" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#000000" }] },
    {
        featureType: "administrative",
        elementType: "geometry.stroke",
        stylers: [{ color: "#005a71" }],
    },
    {
        featureType: "administrative.land_parcel",
        elementType: "geometry.stroke",
        stylers: [{ color: "#1a1a1a" }],
    },
    {
        featureType: "administrative.land_parcel",
        elementType: "labels.text.fill",
        stylers: [{ color: "#ffffff" }],
    },
    {
        featureType: "landscape.natural",
        elementType: "geometry",
        stylers: [{ color: "#1a1a1a" }],
    },
    {
        featureType: "poi",
        elementType: "geometry",
        stylers: [{ color: "#1a1a1a" }],
    },
    {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [{ color: "#ffffff" }],
    },
    {
        featureType: "poi.park",
        elementType: "geometry.fill",
        stylers: [{ color: "#1a1a1a" }],
    },
    {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [{ color: "#ffffff" }],
    },
    {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#1a1a1a" }],
    },
    {
        featureType: "road.arterial",
        elementType: "geometry",
        stylers: [{ color: "#1a1a1a" }],
    },
    {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ color: "#1a1a1a" }],
    },
    {
        featureType: "road.highway.controlled_access",
        elementType: "geometry",
        stylers: [{ color: "#1a1a1a" }],
    },
    {
        featureType: "road.local",
        elementType: "geometry.fill",
        stylers: [{ color: "#1a1a1a" }],
    },
    {
        featureType: "transit.line",
        elementType: "geometry",
        stylers: [{ color: "#1a1a1a" }],
    },
    {
        featureType: "transit.station",
        elementType: "geometry",
        stylers: [{ color: "#1a1a1a" }],
    },
    {
        featureType: "water",
        elementType: "geometry.fill",
        stylers: [{ color: "#005a71" }],
    },
    {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{ color: "#ffffff" }],
    },
];
export const mapaDefecto = [
    {
        featureType: "poi",
        elementType: "labels",
        stylers: [{ visibility: "off" }]
    }
]
export const darkMapStyles = [
    { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
    {
        featureType: "administrative",
        elementType: "geometry.stroke",
        stylers: [{ color: "#e6e6e6" }], // lineas de pais
    },
    {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [{ color: "#ffffff" }],
    },
    {
        featureType: "poi",
        elementType: "labels",
        stylers: [{ visibility: "off" }]
    },
    {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#38414e" }], // calles
    },
    {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [{ color: "#212a37" }], // contorno calle
    },
    {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [{ color: "#9ca5b3" }], //texto de las calles
    },
    {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ color: "#00e7ff" }], // vias principales
    },
    {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{ color: "#1f2835" }],
    },
    {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [{ color: "#f3d19c" }],
    },
    {
        featureType: "transit",
        elementType: "geometry",
        stylers: [{ color: "#2f3948" }],
    },
    {
        featureType: "transit.station",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
    },
    {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#071328" }], // agua mar
    },
    {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{ color: "#515c6d" }],
    },
    {
        featureType: "water",
        elementType: "labels.text.stroke",
        stylers: [{ color: "#17263c" }],
    },
];
export const Primaria = {
    url: escudo,
};
export const Secundaria = {
    url: FlotaSecundariaVerde,
};
export const Mobile = {
    url: MobileVerde,
};
export const Finca = {
    url: FincaVerde,
};
export const FincaVIP = {
    url: FincaVIPVerde,
};
export const Ticket = [
    {
        url: TicketVerde,
    },
    {
        url: TicketRojo,
    },
];
export const ZonaRoja = {
    url: ZonaCalor,
};
export const riesgosData: TRiesgo[] = ["vial"]
export const clusterStyles = [

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