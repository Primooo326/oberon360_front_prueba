import { useSystemStore } from '@/states/System.state';
import Image from 'next/image';
export default function OleoductosContent() {

    const { itemSidebarRight } = useSystemStore();
    console.log(itemSidebarRight.content);

    interface PasoProtocolo {
        orden: number;
        descripcion: string;
        estado: 'Pendiente' | 'Completado';

    }

    interface itemContent {
        content: any
        imagen: string
        protocolos: Record<string, PasoProtocolo[]>
    }

    const imagenes = [
        "/assets/Recursos/mapa/oleoducto/oleoductos.jpeg",
        "/assets/Recursos/mapa/oleoducto/oleoductos4.jpeg",
        "/assets/Recursos/mapa/oleoducto/oleoductos2.jpeg",
        "/assets/Recursos/mapa/oleoducto/oleoductos3.jpeg",
    ]

    const protocolosIncidentes: Record<string, PasoProtocolo[]> = {
        infraestructura: [
            { orden: 1, descripcion: 'Realizar inspección inicial del área afectada', estado: 'Completado' },
            { orden: 2, descripcion: 'Evaluar daños visibles en la infraestructura', estado: 'Completado' },
            { orden: 3, descripcion: 'Informar al centro de control', estado: 'Completado' },
            { orden: 4, descripcion: 'Registrar el evento en el sistema de seguimiento', estado: 'Completado' },
            { orden: 5, descripcion: 'Coordinar con el equipo de mantenimiento para reparaciones', estado: 'Completado' }
        ],
        intrucion: [
            { orden: 1, descripcion: 'Verificar la alerta de intrusión mediante cámaras de seguridad', estado: 'Completado' },
            { orden: 2, descripcion: 'Alertar al equipo de seguridad en sitio', estado: 'Completado' },
            { orden: 3, descripcion: 'Iniciar protocolo de respuesta rápida', estado: 'Completado' },
            { orden: 4, descripcion: 'Documentar el incidente y las acciones tomadas', estado: 'Completado' },
            { orden: 5, descripcion: 'Revisar y ajustar medidas de seguridad si es necesario', estado: 'Completado' }
        ],
        incendio: [
            { orden: 1, descripcion: 'Activar alarma de incendio', estado: 'Completado' },
            { orden: 2, descripcion: 'Evacuar el área según protocolo de emergencia', estado: 'Completado' },
            { orden: 3, descripcion: 'Llamar al cuerpo de bomberos', estado: 'Completado' },
            { orden: 4, descripcion: 'Cortar suministros de energía y combustibles', estado: 'Completado' },
            { orden: 5, descripcion: 'Realizar revisión post-incidente para determinar causas', estado: 'Completado' }
        ],
        piscinas: [
            { orden: 1, descripcion: 'Verificar niveles de químicos en piscinas', estado: 'Completado' },
            { orden: 2, descripcion: 'Inspeccionar sistemas de filtrado y bombas', estado: 'Completado' },
            { orden: 3, descripcion: 'Realizar mantenimiento preventivo', estado: 'Completado' },
            { orden: 4, descripcion: 'Registrar todas las actividades de mantenimiento', estado: 'Completado' },
            { orden: 5, descripcion: 'Revisar normativas ambientales aplicables', estado: 'Completado' }
        ]
    };



    const imgIncendio = "/assets/Recursos/mapa/oleoducto/oleoductos4.jpeg";
    const InspeccionInfraestructura = "/assets/Recursos/mapa/oleoducto/oleoductos3.jpeg";
    const PISCINAS = "/assets/Recursos/mapa/oleoducto/oleoductos.jpeg";
    const itemContent: itemContent = {
        content: itemSidebarRight.content,
        // imagen: itemSidebarRight.content.description === 'INCENDIO' ? imgIncendio : InspeccionInfraestructura,
        imagen: itemSidebarRight.content.description === '20 PISCINAS' ? PISCINAS : itemSidebarRight.content.description === 'INCENDIO' ? imgIncendio : InspeccionInfraestructura,
        protocolos: protocolosIncidentes
    }


    return (
        <div className="w-full">
            <div className="flex justify-center items-center" >
                <Image src={itemContent.imagen} width={300} height={300} alt="SECUNDARIA" className="w-[250px] h-[300px]" />
            </div>



            <div className="w-full">

                {
                    itemContent.content && (
                        <div>

                            <div className="flex justify-between items-center p-2 mt-3">
                                <h1 className='text-xl font-semibold' >Titulo:</h1>
                                <p>{itemContent.content.title}</p>
                            </div>
                            <div className="flex justify-between items-center p-2">
                                <h1 className='text-xl font-semibold' >author:</h1>
                                <p>{itemContent.content.author}</p>


                            </div>

                            <div className="flex justify-between items-center p-2">
                                <h1 className='text-xl font-semibold' >Descripcion:</h1>
                                <p>{itemContent.content.description}</p>
                            </div>

                        </div>

                    )
                }
                {/* 
                {
                    itemContent.content && (
                        <div>

                            <div className="flex justify-between items-center p-2 mt-3">
                                <h1 className='text-xl font-semibold' >Estaciónes:</h1>
                                <p>{itemContent.content.EstaciónInicial} - {itemContent.content.EstaciónFinal}</p>
                            </div>
                            <div className="flex justify-between items-center p-2">
                                <h1 className='text-xl font-semibold' >Ubicación Inicial:</h1>
                                <p>{itemContent.content.LatitudInicial}, {itemContent.content.LongitudInicial}</p>

                            </div>

                            <div className="flex justify-between items-center p-2">
                                <h1 className='text-xl font-semibold' >Ubicación Final:</h1>
                                <p>{itemContent.content.LatitudFinal}, {itemContent.content.LongitudFinal}</p>
                            </div>

                        </div>

                    )
                } */}

                <div className="divider" />

                <h1 className='text-lg font-semibold' >Estado Protocolo: <span className='text-success' > (Completado)</span></h1>
                {
                    itemContent.protocolos.infraestructura.map((protocolo, index) => (
                        <div key={index} className="flex justify-between items-center p-2 mb-3">
                            <p>{protocolo.orden}. {protocolo.descripcion}</p>
                            <p className={`text-${protocolo.estado === 'Pendiente' ? 'warning' : 'success'}`}>{protocolo.estado}</p>
                        </div>
                    ))
                }
                <button className="btn btn-accent  w-full mt-3">
                    Revisar Protocolo
                </button>
            </div>
        </div>
    );
}