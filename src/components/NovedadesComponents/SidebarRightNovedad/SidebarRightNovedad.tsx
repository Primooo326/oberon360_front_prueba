import SidebarRight from "@/components/shared/SidebarRight";
import { useNovedadesStore } from "@/states/novedades.state"
import Image from "next/image";
interface NovedadConductor {
    id: string;
    fecha: string;
    tipoAlerta: "Fuera de Ruta" | "Exceso de Velocidad" | "Frenado Brusco" | "Aceleración Brusca" | "Retraso en Ruta";
    observaciones: {
        observacion: string;
        fecha: string;
    }[];
    estado: "Pendiente" | "En Proceso" | "Finalizado";
    pasosProtocolo: PasoProtocolo[];
    conductor: {
        id: string;
        nombre: string;
        apellido: string;
        dni: string;
        telefono: string;
        email: string;
        foto: string;
    };
}

interface PasoProtocolo {
    orden: number;
    descripcion: string;
    estado: 'Pendiente' | 'Completado';
}

const listaPasoProtocolo: PasoProtocolo[] = [
    { orden: 1, descripcion: 'Intentar contactar al conductor', estado: 'Pendiente' },
    { orden: 2, descripcion: 'Verificar estado del vehículo', estado: 'Pendiente' },
    { orden: 3, descripcion: 'Solicitar ubicación actual', estado: 'Pendiente' },
    { orden: 4, descripcion: 'Informar al supervisor de flota', estado: 'Pendiente' },
    { orden: 5, descripcion: 'Evaluar necesidad de asistencia en carretera', estado: 'Pendiente' },
    { orden: 6, descripcion: 'Revisar cámaras de seguridad', estado: 'Pendiente' },
    { orden: 7, descripcion: 'Actualizar la ruta en el sistema', estado: 'Pendiente' },
    { orden: 8, descripcion: 'Revisión de políticas de conducción con el conductor', estado: 'Pendiente' },
    { orden: 9, descripcion: 'Documentar el incidente', estado: 'Pendiente' },
    { orden: 10, descripcion: 'Realizar un seguimiento post-incidente', estado: 'Pendiente' }
];
export default function SidebarRightNovedades() {

    const { novedadSelected, setNovedadSelected } = useNovedadesStore()

    return (
        <section className="h-screen bg-transparent absolute top-0 right-0 shadow-2xl">

            <SidebarRight sidebarExpand={novedadSelected === null} className="flex flex-col justify-between h-full w-[750px]" >
                {
                    novedadSelected && <>
                        <div className=" flex justify-between p-6">
                            <h1 className="font-bold text-lg" >Novedad</h1>

                            <button className="btn btn-outline btn-accent btn-sm" onClick={() => setNovedadSelected(null)} >Cerrar</button>
                        </div>

                        <div className="overflow-y-auto scroll overflow-x-hidden mt-3 p-6" >

                            <div className="w-full">
                                <div className="flex justify-center items-center" >

                                    <Image src="/assets/Recursos/mapa/utilities/FLOTA-SECUNDARI.png" width={300} height={300} alt="SECUNDARIA" className="w-[250px]" />
                                </div>
                                <div className="flex justify-between mb-3" >
                                    <span>
                                        <p className="text-gray-400">Tipo Novedad</p>
                                        <h1 className="font-bold text-3xl">{novedadSelected.tipoAlerta}</h1>
                                    </span>
                                    <span>
                                        <p className="text-gray-400">Estado</p>
                                        {
                                            novedadSelected?.estado === "Pendiente" && (
                                                <span className="text-red-500 font-bold text-lg">{novedadSelected.estado}</span>
                                            )
                                        }
                                        {
                                            novedadSelected?.estado === "En Proceso" && (
                                                <span className="text-yellow-500 font-bold text-lg">{novedadSelected.estado}</span>
                                            )
                                        }
                                        {
                                            novedadSelected?.estado === "Finalizado" && (
                                                <span className="text-green-500 font-bold text-lg">{novedadSelected.estado}</span>
                                            )
                                        }
                                    </span>
                                </div>

                                <div className="divider" />
                                <div className="flex flex-col justify-between gap-3 mb-3">
                                    <span>
                                        <p className="text-gray-400">Observaciones</p>
                                        <h1 className="font-semibold ">{novedadSelected.observaciones[0]?.observacion}</h1>
                                    </span>

                                </div>
                                <div className="divider" />
                                <h1 className="font-bold text-lg mb-1" >Protocolo</h1>
                                <div className="mb-5" >
                                    <div className="grid grid-cols-1 gap-2" >
                                        {listaPasoProtocolo.map((paso, index) => (
                                            <div className="border-b" key={index} >
                                                <div className="flex justify-between items-center px-3 py-2 bg-base-100 text-center">
                                                    <span className="text-gray-400 w-1/6" >{paso.orden}</span>
                                                    <span className="font-semibold w-4/6" >{paso.descripcion}</span>

                                                    <span className="w-1/6" >
                                                        {
                                                            paso.estado === "Pendiente" && (
                                                                <span className="text-red-500 font-bold text-lg">{paso.estado}</span>
                                                            )

                                                        }
                                                        {
                                                            paso.estado === "Completado" && (
                                                                <span className="text-green-500 font-bold text-lg">{paso.estado}</span>
                                                            )

                                                        }
                                                    </span>
                                                </div>

                                            </div>
                                        ))}
                                    </div>

                                </div>

                            </div>
                        </div>
                    </>
                }
            </SidebarRight>
        </section>



    )
}
