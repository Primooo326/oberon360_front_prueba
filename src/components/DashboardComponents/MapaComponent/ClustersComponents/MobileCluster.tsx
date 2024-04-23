import { Mobile } from '@/data/mapaData';
import { IMobile } from '@/models/mobile.model';
import { MarkerClusterer, Marker } from '@react-google-maps/api';

export default function MobileCluster({ mobiles, mobileShow }: { mobiles: IMobile[], mobileShow: boolean }) {

    const clusterStylesMobile = [


        {
            url: Mobile.url,
            height: 40,
            width: 40,

            className: 'clusterText',
        },
        {
            url: Mobile.url,
            height: 60,
            width: 60,

            className: 'clusterText',
        },
    ]
    return (
        <>
            {mobileShow && (
                <MarkerClusterer
                    options={{
                        imagePath:
                            "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
                        styles: clusterStylesMobile,
                        gridSize: 15,
                        averageCenter: true,
                    }}
                >
                    {(clusterer) => (
                        <>
                            {mobiles.map((mobile, index) => (
                                <Marker
                                    key={index}
                                    position={{
                                        lat: Number.parseFloat(
                                            `${mobile.GPS_LAT}`,
                                        ),
                                        lng: Number.parseFloat(
                                            `${mobile.GPS_LON}`,
                                        ),
                                    }}
                                    clusterer={clusterer}
                                    icon={Mobile}
                                />
                            ))}
                        </>
                    )}
                </MarkerClusterer>
            )}

        </>
    )
}
