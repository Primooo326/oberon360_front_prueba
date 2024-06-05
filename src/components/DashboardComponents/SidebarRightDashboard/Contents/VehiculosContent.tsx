"use client"
import { LineChart } from "@mui/x-charts/LineChart"
import { BarChart } from "@mui/x-charts/BarChart"
import { FaTemperatureHigh } from "react-icons/fa6"
import { IoIosSpeedometer } from "react-icons/io";
import { FaCheckCircle, FaInfoCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import type { IConductor, IItenaryEvaluated, IItinerario } from "@/models/vehiculos.model";
import { defineSiglTipDoc, formatFecha } from "@/utils/tools";
import { IoWarning } from "react-icons/io5";
import { getInfoDriver } from "@/api/dashboard/mapa.api";
import Image from "next/image";
import { useSystemStore } from "@/states/System.state";
export default function VehiculosContent() {

    const { itemSidebarRight, showSidebarRight } = useSystemStore()

    const [chart, setChart] = useState("temp")
    const [itinerary, setItinerary] = useState<IItinerario[]>([])
    const [conductor, setConductor] = useState<IConductor>({} as IConductor)
    const handleSetChart = (chart: string) => {
        setChart(chart)
    }

    const getData = async () => {
        setItinerary(itemSidebarRight?.itinerario!)
        if (!conductor.CONDUCTOR_ID) {

            const responseConductor = await getInfoDriver(itemSidebarRight!.content.CONDUCTOR_ID)
            setConductor(
                {
                    ...responseConductor,
                    CONDUCTOR_NOMBRE_COMPLETO: `${responseConductor.CONDUCTOR_PRIMERNOMBRE || ''} ${responseConductor.CONDUCTOR_SEGUNDONOMBRE || ''} ${responseConductor.CONDUCTOR_PRIMERAPELLIDO || ''} ${responseConductor.CONDUCTOR_SEGUNDOAPELLIDO || ''}`,
                    typeIdentification: {
                        ...responseConductor.typeIdentification,
                        TIP_IDEN_SIGLAS: defineSiglTipDoc(responseConductor.typeIdentification.TIP_IDEN_DESCRIPCION)
                    },

                }
            )
        }

    }

    useEffect(() => {
        if (showSidebarRight) {

            if (itemSidebarRight!.content.statusItinerary !== "DISPONIBLE" && itemSidebarRight?.itinerario) {
                getData()
            }
        }
    }, [itemSidebarRight, showSidebarRight])

    const defineBgCheck = (itinerario: IItenaryEvaluated) => {
        let bg = "text-secondary"
        if (itinerario.estado === "ANTICIPADO" || itinerario.estado === "A TIEMPO") {
            bg = "text-success"
        } else if (itinerario.estado === "ATRASADO") {
            bg = "text-error"
        }
        return `${bg} w-5 h-5`
    }

    const defineBgLine = (itinerario: IItenaryEvaluated) => {
        let bg = "bg-secondary"
        if (itinerario.estado === "ANTICIPADO" || itinerario.estado === "A TIEMPO") {
            bg = "bg-success"
        } else if (itinerario.estado === "ATRASADO") {
            bg = "bg-error"
        }
        return bg
    }


    return (
        <>
            {
                showSidebarRight && itemSidebarRight.item === "vehiculos" ? (
                    <div className="w-full">
                        <div className="flex justify-center items-center" >
                            {itemSidebarRight!.content.TIPOSERVICIO_DESCRIPCION === "PRIMARIA" ? (
                                <Image src="/assets/Recursos/mapa/utilities/FLOTA-PRIMARIA.png" width={300} height={300} alt="PRIMARIA" className="w-[250px]" />
                            ) : (
                                <Image src="/assets/Recursos/mapa/utilities/FLOTA-SECUNDARI.png" width={300} height={300} alt="SECUNDARIA" className="w-[250px]" />
                            )}
                        </div>
                        <div className="w-full">
                            <div className="flex justify-between mb-3" >
                                <span>
                                    <p className="text-gray-400">Placas</p>
                                    <h1 className="font-bold text-3xl">{itemSidebarRight!.content.WTLT_PLACA}</h1>
                                </span>
                                <span>
                                    <p className="text-gray-400">Estado</p>
                                    {
                                        itemSidebarRight!.content.ESTADOVH !== "ENCENDIDO" ? (
                                            <span className="text-red-500 font-bold text-lg">{itemSidebarRight!.content.ESTADOVH}</span>
                                        ) : (
                                            <span className="text-green-500 font-bold text-lg">{itemSidebarRight!.content.ESTADOVH}</span>
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
                                            <Image src="/assets/Recursos/login/ICONO-USUARIO-GRANDE.png" width={126} height={128} alt="conductor" />
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
                                    <h1 className="font-semibold ">{itemSidebarRight!.content.TIPOSERVICIO_DESCRIPCION}</h1>
                                </span>

                                <span>
                                    <p className="text-gray-400">Fecha</p>
                                    <h1 className="font-semibold ">{formatFecha(itemSidebarRight!.content.WTLT_DATE_GPS)}</h1>
                                </span>
                                <span>
                                    <p className="text-gray-400">ubicación</p>
                                    <h1 className="font-semibold ">{itemSidebarRight!.content.WTLT_LOCATION} km/h</h1>
                                </span>
                                <span>
                                    <p className="text-gray-400">Evento</p>
                                    <h1 className="font-semibold ">{itemSidebarRight!.content.WTLT_EVENTO}</h1>
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
                                        series={[{ data: [itemSidebarRight!.content.VELOCIDAD_MAXIMA || 0, itemSidebarRight!.content.VELOCIDAD_MINIMA || 0, itemSidebarRight!.content.VELOCIDAD_PROMEDIO | 0] }]}
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
                        <div className="divider" />
                        <h1 className="font-bold text-lg " >Ruta <span className="text-gray-400 mb-5 text-sm">( {itemSidebarRight!.content.ITINE_NOMBRE} )</span> </h1>


                        <div className="flex gap-3 text-sm justify-around my-5" >
                            <div className="flex items-center" >
                                <div className="rounded-full w-4 h-4 bg-success me-3" />
                                ANTICIPO / A TIEMPO
                            </div>
                            <div className="flex items-center" >
                                <div className="rounded-full w-4 h-4 bg-secondary me-3" />
                                NO REPORTADO
                            </div>
                            <div className="flex items-center" >
                                <div className="rounded-full w-4 h-4 bg-error me-3" />
                                ATRASO
                            </div>

                        </div>

                        <ul className="timeline timeline-vertical">
                            {itinerary.map((itinerario, index) => (

                                <li key={index}>
                                    {index % 2 === 0 ? (
                                        <>
                                            {index !== 0 && <hr className={defineBgLine(itinerario.itinerarioEvaluated)} />}
                                            <div className="timeline-start timeline-box text-sm w-full flex flex-col">
                                                {itinerario.point.PUN_NOMBRE.replace(/_/g, " ")}
                                                {itinerario.itinerarioEvaluated.estado === "ANTICIPADO" && (
                                                    <span className="text-success"> {itinerario.itinerarioEvaluated.tiempoDiferenciaStr} antes</span>
                                                )}
                                                {itinerario.itinerarioEvaluated.estado === "ATRASADO" && (
                                                    <span className="text-error"> {itinerario.itinerarioEvaluated.tiempoDiferenciaStr} después</span>
                                                )}
                                                {itinerario.itinerarioEvaluated.estado === "NO DISPONIBLE" && (
                                                    <span className="text-tertiary"> No reportado</span>
                                                )}
                                                {itinerario.itinerarioEvaluated.estado === "A TIEMPO" && (
                                                    <span className="text-success"> A tiempo</span>
                                                )}
                                            </div>
                                            <div className="timeline-middle">
                                                <FaCheckCircle className={defineBgCheck(itinerario.itinerarioEvaluated)} />
                                            </div>
                                            {index !== itinerary.length - 1 && <hr className={defineBgLine(itinerario.itinerarioEvaluated)} />}
                                        </>
                                    ) : (
                                        <>
                                            <hr className={defineBgLine(itinerario.itinerarioEvaluated)} />
                                            <div className="timeline-middle">
                                                <FaCheckCircle className={defineBgCheck(itinerario.itinerarioEvaluated)} />
                                            </div>
                                            <div className="timeline-end timeline-box text-sm w-full flex flex-col">
                                                {itinerario.point.PUN_NOMBRE.replace(/_/g, " ")}
                                                {itinerario.itinerarioEvaluated.estado === "ANTICIPADO" && (
                                                    <span className="text-success"> {itinerario.itinerarioEvaluated.tiempoDiferenciaStr} antes</span>
                                                )}
                                                {itinerario.itinerarioEvaluated.estado === "ATRASADO" && (
                                                    <span className="text-error"> {itinerario.itinerarioEvaluated.tiempoDiferenciaStr} después</span>
                                                )}
                                                {itinerario.itinerarioEvaluated.estado === "NO DISPONIBLE" && (
                                                    <span className="text-tertiary"> No reportado</span>
                                                )}
                                                {itinerario.itinerarioEvaluated.estado === "A TIEMPO" && (
                                                    <span className="text-success"> A tiempo</span>
                                                )}
                                            </div>
                                            {index !== itinerary.length - 1 && <hr className={defineBgLine(itinerario.itinerarioEvaluated)} />}
                                        </>
                                    )}
                                </li>

                            ))}
                        </ul>
                    </div>
                ) : <></>
            }
        </>

    )
}
