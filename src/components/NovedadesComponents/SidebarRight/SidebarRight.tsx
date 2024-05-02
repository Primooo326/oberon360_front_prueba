import { useNovedadesStore } from "@/states/novedades.state"
import PRIMARIA from "@assets/img/MapaIconos/utilities/FLOTA-PRIMARIA.png";
import SECUNDARIA from "@assets/img/MapaIconos/utilities/FLOTA-SECUNDARI.png";
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
export default function SidebarRight() {

    const { novedadSelected, setNovedadSelected } = useNovedadesStore()

    return (

        <>
            {
                novedadSelected ? <section className="flex h-screen bg-transparent absolute top-0 right-0" data-theme="oberon">
                    <div className="flex flex-col justify-between w-[550px] h-full bg-base-100 border-l">
                        <div className=" flex justify-between p-6">
                            <h1 className="font-bold text-lg" >Novedad</h1>

                            <button className="btn btn-outline btn-accent btn-sm" onClick={() => setNovedadSelected(null)} >Cerrar</button>
                        </div>

                        <div className="overflow-y-auto scroll overflow-x-hidden mt-3 p-6" >
                            {/* 
                    <div className="w-full">
                        <div className="flex justify-center items-center" >
                            {content.TIPOSERVICIO_DESCRIPCION === "PRIMARIA" ? (
                                <Image src={PRIMARIA} alt="PRIMARIA" className="w-[250px]" />
                            ) : (
                                <Image src={SECUNDARIA} alt="SECUNDARIA" className="w-[250px]" />
                            )}
                        </div>
                        <div className="w-full">
                            <div className="flex justify-between mb-3" >
                                <span>
                                    <p className="text-gray-400">Placas</p>
                                    <h1 className="font-bold text-3xl">{content.WTLT_PLACA}</h1>
                                </span>
                                <span>
                                    <p className="text-gray-400">Estado</p>
                                    {
                                        content.ESTADOVH !== "ENCENDIDO" ? (
                                            <span className="text-red-500 font-bold text-lg">{content.ESTADOVH}</span>
                                        ) : (
                                            <span className="text-green-500 font-bold text-lg">{content.ESTADOVH}</span>
                                        )
                                    }
                                </span>
                            </div>
                            <div className="flex items-center gap-2 my-6" >

                                <div className="avatar">
                                    <div className="w-20 rounded-full">
                                        {conductor?.CONDUCTOR_FOTO ? (

                                            <img src={`data:image/jpeg;base64,${conductor.CONDUCTOR_FOTO}`} alt="conductor" />
                                        ) : (
                                            <Image src={iconUser} alt="conductor" />
                                        )}
                                    </div>
                                </div>
                                <span>
                                    {
                                        conductor?.CONDUCTOR_NOMBRE_COMPLETO ? (
                                            <>
                                                <h1 className="font-bold ">{conductor.CONDUCTOR_NOMBRE_COMPLETO || "N/A"} - {conductor.CONDUCTOR_IDENTIFICACION || "N/A"}</h1>
                                                <p className="font-semibold">{conductor.CONDUCTOR_TELCORPORATIVO || "N/A"} / {conductor.CONDUCTOR_TELPERSONAL || "N/A"}</p>
                                                <a href={`mailto:${conductor.CONDUCTOR_CORREO}`} className="underline">{conductor.CONDUCTOR_CORREO || "N/A"}</a>
                                            </>
                                        ) : (
                                            <>
                                                <h1 className="font-bold">(Sin conductor asignado).</h1>
                                            </>
                                        )
                                    }
                                </span>
                            </div>
                            <div className="divider" />
                            <div className="flex flex-col justify-between gap-3 mb-3">
                                <span>
                                    <p className="text-gray-400">Tipo vehiculo</p>
                                    <h1 className="font-semibold ">{content.TIPOSERVICIO_DESCRIPCION}</h1>
                                </span>

                                <span>
                                    <p className="text-gray-400">Fecha</p>
                                    <h1 className="font-semibold ">{formatFecha(content.WTLT_DATE_GPS)}</h1>
                                </span>
                                <span>
                                    <p className="text-gray-400">ubicación</p>
                                    <h1 className="font-semibold ">{content.WTLT_LOCATION} km/h</h1>
                                </span>
                                <span>
                                    <p className="text-gray-400">Evento</p>
                                    <h1 className="font-semibold ">{content.WTLT_EVENTO}</h1>
                                </span>
                            </div>

                        </div>
                        <div className="divider" />
                        <h1 className="font-bold text-lg mb-1" >Monitoreo</h1>
                        <div className="mb-5" >
                            <button className={`btn btn-outline btn-error btn-sm ${chart === "temp" ? "btn-active" : ""}`} onClick={() => handleSetChart("temp")} >
                                Temperatura <FaTemperatureHigh />
                            </button>
                            <button className={`btn btn-outline btn-warning btn-sm ms-3 ${chart === "vel" ? "btn-active" : ""}`} onClick={() => handleSetChart("vel")} >
                                Velocidad <IoIosSpeedometer />
                            </button>
                            <button className={`btn btn-outline btn-success btn-sm ms-3 ${chart === "combustible" ? "btn-active" : ""}`} onClick={() => handleSetChart("combustible")} >
                                Combustible
                            </button>
                        </div>
                        {chart === "temp" && (
                            <div className="" >
                                <h1 className="font-semibold text-lg text-center" >Temperatura</h1>
                                <p> <FaInfoCircle className="inline text-info text-2xl " /> Estable dentro del rango óptimo. No se anticipan riesgos para la carga.</p>
                                <LineChart
                                    yAxis={[{ data: [0, 10, 20, 30, 40, 50, 60, 80, 90] }]}
                                    series={[{ data: [0, 12, 15, 18, 16, 16.5, 17, 17.5, 18, 16] }]}
                                    colors={['#ef4c53']}
                                    height={300}
                                    margin={{
                                        left: 30,
                                        right: 20,
                                        top: 30,
                                        bottom: 20
                                    }}
                                />
                            </div>
                        )}
                        {
                            chart === "vel" && (
                                <div>
                                    <h1 className="font-semibold text-lg text-center" >Velocidad</h1>

                                    <p className="text-error font-bold"> <IoWarning className="inline text-2xl " /> Velocidad 15% por encima del promedio – Riesgo elevado de consumo excesivo.</p>
                                    <BarChart
                                        xAxis={[{ scaleType: 'band', data: ['Vel. Max', 'Vel. Min', 'Vel. Promedio'] }]}
                                        series={[{ data: [content.VELOCIDAD_MAXIMA || 0, content.VELOCIDAD_MINIMA || 0, content.VELOCIDAD_PROMEDIO | 0] }]}
                                        colors={['#facc15']}
                                        height={300}
                                        margin={{
                                            left: 20,
                                            right: 20,
                                            top: 20,
                                            bottom: 20
                                        }}
                                    />
                                </div>
                            )
                        }
                        {
                            chart === "combustible" && (
                                <div>
                                    <h1 className="font-semibold text-lg text-center" >Combustible</h1>
                                    <p> <FaCheckCircle className="inline text-success text-2xl " /> Proyección del 9.8% de ahorro en combustible con patrones actuales.</p>
                                    <LineChart
                                        xAxis={[{ data: [0, 1, 2, 3, 5, 8, 10] }]}
                                        series={[
                                            { curve: "natural", data: [0, 5, 3, 7, 2, 9.3] },
                                            { curve: "natural", data: [0, 6, 2, 7, 2.5, 11] },
                                        ]}
                                        colors={['#facc15', '#00d287']}
                                        height={300}
                                        margin={{
                                            left: 20,
                                            right: 20,
                                            top: 20,
                                            bottom: 20
                                        }}

                                    />
                                </div>
                            )
                        }
                    </div> */}

                            <div className="w-full">
                                <div className="flex justify-center items-center" >

                                    <Image src={SECUNDARIA} alt="SECUNDARIA" className="w-[250px]" />
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
                                <div className="flex items-center gap-2 my-6" >

                                    <div className="avatar">
                                        <div className="w-20 rounded-full">
                                            {novedadSelected?.conductor.foto ? (

                                                <img src={novedadSelected.conductor.foto} alt="conductor" />
                                            ) : (
                                                <img src={novedadSelected?.conductor.foto} alt="conductor" />
                                            )}
                                        </div>
                                    </div>
                                    <span>
                                        {
                                            novedadSelected?.conductor.nombre ? (
                                                <>
                                                    <h1 className="font-bold ">{novedadSelected.conductor.nombre || "N/A"} - {novedadSelected.conductor.dni || "N/A"}</h1>
                                                    <p className="font-semibold">{novedadSelected.conductor.telefono || "N/A"}</p>
                                                    <a href={`mailto:${novedadSelected.conductor.email}`} className="underline">{novedadSelected.conductor.email || "N/A"}</a>
                                                </>
                                            ) : (
                                                <>
                                                    <h1 className="font-bold">(Sin conductor asignado).</h1>
                                                </>
                                            )
                                        }
                                    </span>
                                </div>
                                <div className="divider" />
                                <div className="flex flex-col justify-between gap-3 mb-3">
                                    <span>
                                        <p className="text-gray-400">Tipo vehiculo</p>
                                        <h1 className="font-semibold ">{novedadSelected.tipoAlerta}</h1>
                                    </span>

                                    <span>
                                        <p className="text-gray-400">Fecha</p>
                                        <h1 className="font-semibold ">{novedadSelected.fecha}</h1>
                                    </span>
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
                                            <div className="flex justify-between items-center px-3 py-2 bg-base-100 text-center" key={index} >
                                                <span className="text-gray-400 w-1/6" >{paso.orden}</span>
                                                <span className="font-semibold w-4/6" >{paso.descripcion}</span>
                                                <span className="text-gray-400 w-1/6" >{paso.estado}</span>
                                            </div>
                                        ))}
                                    </div>

                                </div>
                            </div>


                        </div>

                    </div>
                </section> : <></>
            }
        </>
    )
}
