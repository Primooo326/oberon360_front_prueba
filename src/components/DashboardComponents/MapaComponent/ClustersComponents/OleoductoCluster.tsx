"use client"
import { ZonaRoja } from '@/data/mapaData';
import type { IShip } from '@/models/ships.model';
import { useSystemStore } from '@/states/System.state';
import { MarkerClusterer, Marker, Polyline, InfoWindow } from '@react-google-maps/api';
import { useEffect, useState } from 'react';

export default function MobileCluster({ oleoductos, oleoductosShow }: { oleoductos: IShip[], oleoductosShow: boolean }) {
    const { setItemSidebarRight, setMapConfig, itemSidebarRight, showSidebarRight, setShowSidebarRight } = useSystemStore()

    const [hoveredMarker, setHoveredMarker] = useState<null | any>(null);

    const handleClickOleoducto = (oleoducto: IShip) => {

        setMapConfig({
            zoom: 15,
            fixed: true,
            center: {
                lat: Number.parseFloat(`${oleoducto.CLIPMARK_LATITUD}`),
                lng: Number.parseFloat(`${oleoducto.CLIPMARK_LONGITUD}`)
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
                <Marker
                    key={index}
                    position={{ lat: Number.parseFloat(`${oleoducto.CLIPMARK_LATITUD}`), lng: Number.parseFloat(`${oleoducto.CLIPMARK_LONGITUD}`) }}
                    icon={{
                        url: ZonaRoja.url,
                        scaledSize: new window.google.maps.Size(40, 40)
                    }}

                    onClick={() => handleClickOleoducto(oleoducto)}
                >
                </Marker>
            ))}

        </>
    )
}
