"use client"
import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import {
  GoogleMap,
  useJsApiLoader,
} from "@react-google-maps/api";
import "./stylesMapa.css";
import { GOOGLE_MAPS_API_KEY } from "@/config";
import { useUbicaciones } from "@/states/Ubicaciones.state";
import { darkMapStyles, mapaDefecto } from "@/data/mapaData";
import type { IUbicacionCliente } from "@/models/ubicaciones.model";
import { useSystemStore } from "@/states/System.state";
import { useClientesStore } from "@/states/Clientes.state";
import { useVehiculosStore } from "@/states/Vehiculos.state";
import UbicacionCluster from "./ClustersComponents/UbicacionCluster";
import VehiculosAlpCluster from "./ClustersComponents/VehiculosAlpCluster";
import { FaExpand, FaCompress } from "react-icons/fa6";
import MobileCluster from "./ClustersComponents/MobileCluster";
import { useMobilesStore } from "@/states/Mobiles.state";
import { useFiltrosMapa } from "@/states/FiltrosMapa.state";
import DirectionComponent from "./DirectionsComponent/DirectionComponent";
import OleoductoCluster from "./ClustersComponents/OleoductoCluster";
import { useOleoductosStore } from "@/states/Oleoductos.state";

function MapaGoogle() {
  const { mobileFiltro, proteccionFiltro, telemetriaFiltro } = useFiltrosMapa()
  const { theme, setMapExpand, mapExpand, mapConfig, setMapConfig } = useSystemStore()
  const { clienteSelected } = useClientesStore()
  const { vehiculos } = useVehiculosStore()
  const { oleoductos } = useOleoductosStore()
  const { mobiles } = useMobilesStore()
  const [map, setMap] = useState<null | any>(null);
  const { ubicaciones } = useUbicaciones()
  const [ubicacionesShow, setUbicacionesShow] = useState<IUbicacionCliente[]>([]);
  const [showVehiculos, setShowVehiculos] = useState(false);
  const mapRef = useRef() as any;
  const onLoad = useCallback((map: any) => {
    mapRef.current = map;
    setMap(map);
  }, []);

  useEffect(() => {
    if (!clienteSelected || clienteSelected!.CLIE_ID_REG === "34") {
      setShowVehiculos(true);
    }
    if (map) {
      map.setZoom(mapConfig.zoom);
    }
  }, []);

  useEffect(() => {
    setUbicacionesShow(ubicaciones);
  }, [ubicaciones])

  useEffect(() => {
    if (clienteSelected) {
      const ubicacionesFilter = ubicaciones.filter((ubicacion) => ubicacion.CLIUBIC_ID_CLIENTE === clienteSelected!.CLIE_ID_REG);
      setUbicacionesShow(ubicacionesFilter);
    } else {
      setShowVehiculos(true);
      setUbicacionesShow(ubicaciones);
    }
  }, [clienteSelected])

  useEffect(() => {
    if (map && mapConfig.fixed) {
      map.setZoom(mapConfig.zoom);
      map.setCenter(mapConfig.center);
    }
  }, [mapConfig])

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GOOGLE_MAPS_API_KEY || "",
  });
  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

  const containerStyle = {
    width: "100%",
    height: "100%",
    borderRadius: mapExpand ? "0" : "0.75rem",
    border: "1px"

  };



  return isLoaded ? (
    <>
      <GoogleMap
        onLoad={onLoad}
        mapContainerStyle={containerStyle}
        center={mapConfig.center}
        onUnmount={onUnmount}
        zoom={mapConfig.zoom}
        clickableIcons={false}
        onZoomChanged={() => {
          if (map) {
            setMapConfig({ ...mapConfig, zoom: map.getZoom(), fixed: false })
          }
        }}
        onDragStart={() => { setMapConfig({ ...mapConfig, fixed: false }) }}
        options={{
          styles: theme === "oberon" ? mapaDefecto : darkMapStyles,
          zoomControl: true,
          minZoom: 6,
          zoomControlOptions: {
            position: window.google.maps.ControlPosition.RIGHT_CENTER,
          },
          streetViewControl: false,
          fullscreenControl: false
        }}
      >
        <DirectionComponent />
        <UbicacionCluster ubicaciones={ubicacionesShow} showUbicaciones={proteccionFiltro} />
        <VehiculosAlpCluster vehiculos={vehiculos} showVehiculos={showVehiculos && telemetriaFiltro} />
        <MobileCluster mobiles={mobiles} mobileShow={mobileFiltro} />
        <OleoductoCluster oleoductos={oleoductos} oleoductosShow={true} />
      </GoogleMap>
      <button className="btn bg-white botonExpandable" onClick={() => setMapExpand(!mapExpand)} >
        {mapExpand ? (<FaCompress />) : (<FaExpand />)}
      </button>
    </>
  ) : (
    <></>
  );
}
const MapaGoogleComponent = React.memo(MapaGoogle);
export default MapaGoogleComponent 
