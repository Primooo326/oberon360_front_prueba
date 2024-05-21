import type { PasoProtocolo, itemContent } from '@/models/oleoductos.model';
import { useSystemStore } from '@/states/System.state';
import Image from 'next/image';
export default function OleoductosContent() {

    const { itemSidebarRight, setShowModalProtocolo, setItemProtocolo } = useSystemStore();



    const imagenes = [
        "/assets/Recursos/mapa/oleoducto/oleoductos.jpeg",
        "/assets/Recursos/mapa/oleoducto/oleoductos4.jpeg",
        "/assets/Recursos/mapa/oleoducto/oleoductos2.jpeg",
        "/assets/Recursos/mapa/oleoducto/oleoductos3.jpeg",
    ]

    const infraestructuraProtocolo: PasoProtocolo[] = [
        { orden: 1, descripcion: 'Realizar inspección inicial del área afectada', estado: 'Completado', current: false },
        { orden: 2, descripcion: 'Evaluar daños visibles en la infraestructura', estado: 'Completado', current: false },
        { orden: 3, descripcion: 'Informar al centro de control', estado: 'Pendiente', current: true },
        { orden: 4, descripcion: 'Registrar el evento en el sistema de seguimiento', estado: 'Pendiente', current: false },
        { orden: 5, descripcion: 'Coordinar con el equipo de mantenimiento para reparaciones', estado: 'Pendiente', current: false }
    ]
    const intrucionProtocolo: PasoProtocolo[] = [
        { orden: 1, descripcion: 'Verificar la alerta de intrusión mediante cámaras de seguridad', estado: 'Completado', current: false },
        { orden: 2, descripcion: 'Alertar al equipo de seguridad en sitio', estado: 'Completado', current: false },
        { orden: 3, descripcion: 'Iniciar protocolo de respuesta rápida', estado: 'Completado', current: false },
        { orden: 4, descripcion: 'Documentar el incidente y las acciones tomadas', estado: 'Completado', current: false },
        { orden: 5, descripcion: 'Revisar y ajustar medidas de seguridad si es necesario', estado: 'Completado', current: false }
    ]
    const incendioProtocolo: PasoProtocolo[] = [
        { orden: 1, descripcion: 'Activar alarma de incendio', estado: 'Completado', current: false },
        { orden: 2, descripcion: 'Evacuar el área según protocolo de emergencia', estado: 'Completado', current: false },
        { orden: 3, descripcion: 'Llamar al cuerpo de bomberos', estado: 'Pendiente', current: true },
        { orden: 4, descripcion: 'Cortar suministros de energía y combustibles', estado: 'Pendiente', current: false },
        { orden: 5, descripcion: 'Realizar revisión post-incidente para determinar causas', estado: 'Pendiente', current: false }
    ]
    const piscinasProtocolo: PasoProtocolo[] = [
        { orden: 1, descripcion: 'Verificar niveles de químicos en piscinas', estado: 'Completado', current: false },
        { orden: 2, descripcion: 'Inspeccionar sistemas de filtrado y bombas', estado: 'Completado', current: false },
        { orden: 3, descripcion: 'Realizar mantenimiento preventivo', estado: 'Completado', current: false },
        { orden: 4, descripcion: 'Registrar todas las actividades de mantenimiento', estado: 'Completado', current: false },
        { orden: 5, descripcion: 'Revisar normativas ambientales aplicables', estado: 'Completado', current: false }
    ]

    const onHandleProtocolo = () => {
        setShowModalProtocolo(false);
        setTimeout(() => {

            setShowModalProtocolo(true);
            setItemProtocolo(itemContent);
        }, 100);
    }

    const inestabilidadgeologica = "/assets/Recursos/mapa/oleoducto/oleoductos5.jpeg";
    const imgIncendio = "/assets/Recursos/mapa/oleoducto/oleoductos4.jpeg";
    const Intrucion = "/assets/Recursos/mapa/oleoducto/oleoductos3.jpeg";
    const InspeccionInfraestructura = "/assets/Recursos/mapa/oleoducto/oleoductos2.jpeg";
    const PISCINAS = "/assets/Recursos/mapa/oleoducto/oleoductos.jpeg";

    const descripcion = itemSidebarRight.content.description;

    const itemContent: itemContent = {
        content: itemSidebarRight.content,
        // imagen: itemSidebarRight.content.description === 'INCENDIO' ? imgIncendio : InspeccionInfraestructura,
        imagen: descripcion === 'PASIVO AMBIENTAL 01' ? PISCINAS :
            descripcion === 'INCENDIO' ? imgIncendio :
                descripcion === 'Inspeccion Infraestructura' ? InspeccionInfraestructura :
                    descripcion === 'INTRUCION' ? Intrucion :
                        inestabilidadgeologica,
        protocolos: descripcion === 'INCENDIO' ? incendioProtocolo :
            descripcion === 'PASIVO AMBIENTAL 01' ? piscinasProtocolo :
                descripcion === 'Inspeccion Infraestructura' ? infraestructuraProtocolo :
                    descripcion === 'INTRUCION' ? intrucionProtocolo :
                        infraestructuraProtocolo
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
                <div className="divider" />

                <h1 className='text-lg font-semibold' >Estado Protocolo: <span className='text-success' > (Completado)</span></h1>
                {
                    itemContent.protocolos.map((protocolo, index) => (
                        <div key={index} className="flex justify-between items-center p-2 mb-3">
                            <p>{protocolo.orden}. {protocolo.descripcion}</p>
                            <p className={`text-${protocolo.estado === 'Pendiente' ? 'warning' : 'success'}`}>{protocolo.estado}</p>
                        </div>
                    ))
                }
                <button className="btn btn-accent  w-full mt-3" onClick={() => onHandleProtocolo()} >
                    Revisar Protocolo
                </button>
            </div>
        </div>
    );
}

