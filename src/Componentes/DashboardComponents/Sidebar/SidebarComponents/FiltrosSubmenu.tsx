"use client"
import { getEventsPlatesDispon } from '@/api/mapa.api';
import type { IVehiculo } from '@/models/vehiculos.model'
import { useSystemStore } from '@/states/System.state';
import { useVehiculosStore } from '@/states/Vehiculos.state'
import type React from 'react'
import { useEffect, useState } from 'react'
import Select, { type StylesConfig } from 'react-select';

export default function FiltrosSubmenu() {

    const { vehiculos, setVehiculos, setVehiculosFiltered, setVehiculoSearched } = useVehiculosStore()
    const { setItemSidebarRight } = useSystemStore()
    const [placasVehiculosOptions, setPlacasVehiculosOptions] = useState<{ value: IVehiculo, label: string }[]>([])
    const [placasVehiculosSelected, setPlacasVehiculosSelected] = useState<{ value: IVehiculo, label: string } | null>(null)

    const [conductoresOptions, setConductoresOptions] = useState<{ value: IVehiculo, label: string }[]>([])
    const [conductoresSelected, setConductoresSelected] = useState<{ value: IVehiculo, label: string } | null>(null)

    const [showDropTipo, setShowDropTipo] = useState(true)
    const [showDropEstado, setShowDropEstado] = useState(true)

    const [changeTipos, setChangeTipos] = useState(
        {
            primaria: true,
            secundaria: true,
            recoleccion: true
        }
    )

    const [changeEstado, setChangeEstado] = useState(
        {
            retraso: true,
            anticipo: true,
            sinReportar: true,
            enOperacion: true,
            disponibles: false
        }
    )

    const handleSelectVehiculo = (selectedOption: { value: IVehiculo, label: string }) => {
        if (selectedOption) {

            setPlacasVehiculosSelected(selectedOption)
            setVehiculoSearched(selectedOption.value)
            setItemSidebarRight({
                item: "vehiculos",
                content: selectedOption.value
            })
        } else {
            setItemSidebarRight(null)
        }
    }

    const handleSelectConductor = (selectedOption: { value: IVehiculo, label: string }) => {
        if (selectedOption) {

            setConductoresSelected(selectedOption)
            setVehiculoSearched(selectedOption.value)
            setItemSidebarRight({
                item: "vehiculos",
                content: selectedOption.value
            })
        } else {
            setItemSidebarRight(null)
        }
    }

    const getDispon = async () => {
        const response = await getEventsPlatesDispon();
        console.log("response", response);
        setVehiculos([...vehiculos, ...response])
    }

    const changeTipoPrimaria = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChangeTipos({
            ...changeTipos,
            primaria: e.target.checked
        })
    }

    const changeTipoSecundaria = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChangeTipos({
            ...changeTipos,
            secundaria: e.target.checked
        })
    }

    const changeTipoRecoleccion = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChangeTipos({
            ...changeTipos,
            recoleccion: e.target.checked
        })
    }

    const changeEstadoRetraso = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChangeEstado({
            ...changeEstado,
            retraso: e.target.checked
        })
    }

    const changeEstadoAnticipo = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChangeEstado({
            ...changeEstado,
            anticipo: e.target.checked
        })
    }

    const changeEstadoSinReportar = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChangeEstado({
            ...changeEstado,
            sinReportar: e.target.checked
        })
    }

    const changeEstadoEnOperacion = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChangeEstado({
            ...changeEstado,
            enOperacion: e.target.checked
        })
    }

    const changeEstadoDisponibles = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChangeEstado({
            ...changeEstado,
            disponibles: e.target.checked
        })
        if (e.target.checked) {
            getDispon()
        }
    }



    useEffect(() => {
        const vehiculosFiltered = vehiculos.filter(vehiculo => {
            // Evaluación de tipos de servicio
            const tipoValido =
                (changeTipos.primaria && vehiculo.TIPOSERVICIO_DESCRIPCION === "PRIMARIA") ||
                (changeTipos.secundaria && vehiculo.TIPOSERVICIO_DESCRIPCION === "SECUNDARIA") ||
                (changeTipos.recoleccion && vehiculo.TIPOSERVICIO_DESCRIPCION === "RECOLECCION DE LECHES");

            // Evaluación de estados
            const estadoValido =
                (changeEstado.retraso && vehiculo.statusItinerary === "ATRASADO") ||
                (changeEstado.anticipo && vehiculo.statusItinerary === "ANTICIPADO") ||
                (changeEstado.sinReportar && vehiculo.statusItinerary === "NO DISPONIBLE") ||
                (changeEstado.enOperacion && vehiculo.statusItinerary === "EN OPERACION") ||
                (changeEstado.disponibles && vehiculo.statusItinerary === "DISPONIBLE");

            // Solo incluye vehículos que cumplan ambos criterios
            return tipoValido && estadoValido;
        });
        console.log(vehiculosFiltered);
        setVehiculosFiltered(vehiculosFiltered);
    }, [changeTipos, changeEstado]);



    useEffect(() => {
        setPlacasVehiculosOptions(vehiculos.map(vehiculo => ({ value: vehiculo, label: vehiculo.WTLT_PLACA })))
        setConductoresOptions(vehiculos.map(vehiculo => ({ value: vehiculo, label: vehiculo.CONDUCTOR_NOM })))
    }, [vehiculos])
    const stylesSelect: StylesConfig = {
        control: (styles) => ({ ...styles, borderRadius: '0.5rem', minHeight: 'auto', height: '2rem', fontSize: '0.875rem', alignContent: 'center' }),
    }

    return (
        <div className="mt-8 space-y-4">
            <div className="divider" />
            <div className='px-5'>
                <h1 className='text-xl font-semibold mb-5'>Telemetria</h1>
                <div className='mb-5'>
                    <h2 className='mb-2 font-semibold'>
                        Buscar vehiculo por
                    </h2>
                    <div className='space-y-2 ps-3'>

                        <div>
                            <label className='text-sm'>Placa vehiculo</label>
                            <Select
                                className='w-[350px]'
                                defaultValue={placasVehiculosSelected}
                                onChange={handleSelectVehiculo}
                                options={placasVehiculosOptions}
                                styles={stylesSelect}
                                placeholder='Filtrar por placas'
                                isClearable
                            />
                        </div>
                        <div>
                            <label className='text-sm'>Conductor</label>
                            <Select
                                className='w-[350px]'
                                defaultValue={conductoresSelected}
                                onChange={handleSelectConductor}
                                options={conductoresOptions}
                                styles={stylesSelect}
                                placeholder='Filtrar por conductor'
                                isClearable
                            />
                        </div>

                    </div>
                </div>
                <div>
                    <h2 className='mb-2 font-semibold'>
                        Filtrar vehiculos por
                    </h2>
                    <div className="space-y-2 ps-3">
                        <ul className="menu  rounded-box">
                            <li>
                                <span className={`menu-dropdown-toggle ${showDropTipo && 'menu-dropdown-show'}`} onClick={() => setShowDropTipo(!showDropTipo)}>Tipo</span>
                                <ul className={`menu-dropdown ${showDropTipo && 'menu-dropdown-show'}`}>
                                    <li>
                                        <label className="label cursor-pointer">
                                            <span className="label-text">Primaria</span>
                                            <input type="checkbox" defaultChecked={changeTipos.primaria} onChange={changeTipoPrimaria} className="checkbox checkbox-primary" />
                                        </label>
                                    </li>
                                    <li>
                                        <label className="label cursor-pointer">
                                            <span className="label-text">Secundaria</span>
                                            <input type="checkbox" defaultChecked={changeTipos.secundaria} onChange={changeTipoSecundaria} className="checkbox checkbox-primary" />
                                        </label>
                                    </li>
                                    <li>
                                        <label className="label cursor-pointer">
                                            <span className="label-text">Recolección de leches</span>
                                            <input type="checkbox" defaultChecked={changeTipos.recoleccion} onChange={changeTipoRecoleccion} className="checkbox checkbox-primary" />
                                        </label>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <span className={`menu-dropdown-toggle ${showDropEstado && 'menu-dropdown-show'}`} onClick={() => setShowDropEstado(!showDropEstado)}>Estado</span>
                                <ul className={`menu-dropdown ${showDropEstado && 'menu-dropdown-show'}`}>
                                    <li>
                                        <label className="label cursor-pointer">
                                            <span className="label-text">Con Retraso</span>
                                            <input type="checkbox" defaultChecked={changeEstado.retraso} onChange={changeEstadoRetraso} className="checkbox checkbox-primary" />
                                        </label>
                                    </li>
                                    <li>
                                        <label className="label cursor-pointer">
                                            <span className="label-text">Con Anticipo</span>
                                            <input type="checkbox" defaultChecked={changeEstado.anticipo} onChange={changeEstadoAnticipo} className="checkbox checkbox-primary" />
                                        </label>
                                    </li>
                                    <li>
                                        <label className="label cursor-pointer">
                                            <span className="label-text">Sin Reportar</span>
                                            <input type="checkbox" defaultChecked={changeEstado.sinReportar} onChange={changeEstadoSinReportar} className="checkbox checkbox-primary" />
                                        </label>
                                    </li>
                                    <li>
                                        <label className="label cursor-pointer">
                                            <span className="label-text">En Operación</span>
                                            <input type="checkbox" defaultChecked={changeEstado.enOperacion} onChange={changeEstadoEnOperacion} className="checkbox checkbox-primary" />
                                        </label>
                                    </li>
                                    <li>
                                        <label className="label cursor-pointer">
                                            <span className="label-text">Disponibles</span>
                                            <input type="checkbox" defaultChecked={changeEstado.disponibles} onChange={changeEstadoDisponibles} className="checkbox checkbox-primary" />
                                        </label>
                                    </li>
                                </ul>
                            </li>
                        </ul>

                    </div>
                </div>
            </div>

        </div>
    )
}
