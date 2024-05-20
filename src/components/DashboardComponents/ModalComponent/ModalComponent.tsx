import { useSystemStore } from '@/states/System.state'
import React, { useEffect } from 'react'
import { toast } from 'react-toastify'

export default function ModalComponent() {

    const { itemProtocolo, showModalProtocolo, setShowModalProtocolo, setItemProtocolo } = useSystemStore()

    // protocolo::

    // {
    //     "content": {
    //         "title": "ECOPETROL",
    //         "author": "AT ORDONEZ ARLEX",
    //         "description": "INCENDIO",
    //         "event_location": {
    //             "latitude": "8.599167",
    //             "longitude": "-73.260278"
    //         },
    //         "event_start_time": "27/09/2015 8:45 P. M.",
    //         "event_end_time": "27/09/2015 8:45 P. M.",
    //         "notes": "",
    //         "attachments": {
    //             "images": [
    //                 "3"
    //             ]
    //         }
    //     },
    //     "imagen": "/assets/Recursos/mapa/oleoducto/oleoductos4.jpeg",
    //     "protocolos": {
    //         "infraestructura": [
    //             {
    //                 "orden": 1,
    //                 "descripcion": "Realizar inspección inicial del área afectada",
    //                 "estado": "Completado"
    //             },
    //             {
    //                 "orden": 2,
    //                 "descripcion": "Evaluar daños visibles en la infraestructura",
    //                 "estado": "Completado"
    //             },
    //             {
    //                 "orden": 3,
    //                 "descripcion": "Informar al centro de control",
    //                 "estado": "Completado"
    //             },
    //             {
    //                 "orden": 4,
    //                 "descripcion": "Registrar el evento en el sistema de seguimiento",
    //                 "estado": "Completado"
    //             },
    //             {
    //                 "orden": 5,
    //                 "descripcion": "Coordinar con el equipo de mantenimiento para reparaciones",
    //                 "estado": "Completado"
    //             }
    //         ],
    //         "intrucion": [
    //             {
    //                 "orden": 1,
    //                 "descripcion": "Verificar la alerta de intrusión mediante cámaras de seguridad",
    //                 "estado": "Completado"
    //             },
    //             {
    //                 "orden": 2,
    //                 "descripcion": "Alertar al equipo de seguridad en sitio",
    //                 "estado": "Completado"
    //             },
    //             {
    //                 "orden": 3,
    //                 "descripcion": "Iniciar protocolo de respuesta rápida",
    //                 "estado": "Completado"
    //             },
    //             {
    //                 "orden": 4,
    //                 "descripcion": "Documentar el incidente y las acciones tomadas",
    //                 "estado": "Completado"
    //             },
    //             {
    //                 "orden": 5,
    //                 "descripcion": "Revisar y ajustar medidas de seguridad si es necesario",
    //                 "estado": "Completado"
    //             }
    //         ],
    //         "incendio": [
    //             {
    //                 "orden": 1,
    //                 "descripcion": "Activar alarma de incendio",
    //                 "estado": "Completado"
    //             },
    //             {
    //                 "orden": 2,
    //                 "descripcion": "Evacuar el área según protocolo de emergencia",
    //                 "estado": "Completado"
    //             },
    //             {
    //                 "orden": 3,
    //                 "descripcion": "Llamar al cuerpo de bomberos",
    //                 "estado": "Completado"
    //             },
    //             {
    //                 "orden": 4,
    //                 "descripcion": "Cortar suministros de energía y combustibles",
    //                 "estado": "Completado"
    //             },
    //             {
    //                 "orden": 5,
    //                 "descripcion": "Realizar revisión post-incidente para determinar causas",
    //                 "estado": "Completado"
    //             }
    //         ],
    //         "piscinas": [
    //             {
    //                 "orden": 1,
    //                 "descripcion": "Verificar niveles de químicos en piscinas",
    //                 "estado": "Completado"
    //             },
    //             {
    //                 "orden": 2,
    //                 "descripcion": "Inspeccionar sistemas de filtrado y bombas",
    //                 "estado": "Completado"
    //             },
    //             {
    //                 "orden": 3,
    //                 "descripcion": "Realizar mantenimiento preventivo",
    //                 "estado": "Completado"
    //             },
    //             {
    //                 "orden": 4,
    //                 "descripcion": "Registrar todas las actividades de mantenimiento",
    //                 "estado": "Completado"
    //             },
    //             {
    //                 "orden": 5,
    //                 "descripcion": "Revisar normativas ambientales aplicables",
    //                 "estado": "Completado"
    //             }
    //         ]
    //     }
    // }


    const onSaveBitacora = () => {
        toast.success('Bitácora guardada correctamente');
    }

    useEffect(() => {

        const modal: any = document.getElementById("modal");
        console.log(itemProtocolo);
        if (showModalProtocolo && modal) {
            modal.showModal();
        }

    }, [showModalProtocolo])


    return (
        <>
            <dialog id="modal" className="modal">
                <div className="modal-box w-[650px]" style={{ width: "650px !important" }} >
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <div className="modal-header ">
                        <h2 className='text-center font-bold text-xl mb-5' >Protocolo de {itemProtocolo.content?.description}</h2>

                        <div className='flex flex-col gap-3' >
                            {
                                itemProtocolo.protocolos?.infraestructura.map((item: any, index: number) => (
                                    <div className="collapse bg-base-200" key={index}>
                                        <input type="checkbox" disabled={item.estado === 'Pendiente'} />
                                        <div className=" flex justify-center items-start gap-5 collapse-title text-xl font-medium">
                                            {item.descripcion}
                                            <span className={`badge ${item.estado === 'Completado' ? 'badge-success' : item.estado === 'Pendiente' ? 'badge-warning' : 'badge-error'
                                                }`}>{item.estado}</span>
                                        </div>
                                        <div className="collapse-content">
                                            <h1 className='text-xl font-semibold' >Bitácora</h1>
                                            <textarea className="w-full textarea textarea-bordered" placeholder="Bitácora" />

                                            <div className="flex justify-between items-center gap-5">
                                                <button className="btn btn-sm btn-primary" onClick={() => onSaveBitacora()}>Guardar bitácora</button>
                                                <button className="btn btn-sm btn-success">Completar protocolo</button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                    </div>

                    <div className="modal-body">
                    </div>

                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>Cerrar</button>
                </form>
            </dialog>


        </>
    )
}
