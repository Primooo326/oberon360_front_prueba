import { heatmapData } from "@/data/mapaData";
import ZonaCalor from "@assets/img/MapaIconos/CIRCULO-RIESGOS.gif";

export default function RiesgosCluster() {
    const getMapaCalor = new Promise<any>((resolve, reject) => {
        try {
            setTimeout(() => {
                resolve(heatmapData);

            }, 100);
        } catch (error) {
            reject(error)
        }
    });

    return (
        <>
            {/* {riesgos.length > 0 && mapaCalor.map((coordenada: any, index) => (
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
            ))} */}
        </>
    )
}
