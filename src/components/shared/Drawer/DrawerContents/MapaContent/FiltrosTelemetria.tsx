"use client"
import type { IVehiculo } from '@/models/vehiculos.model'
import { useFiltrosMapa } from '@/states/FiltrosMapa.state';
import { useSystemStore } from '@/states/System.state';
import { useVehiculosStore } from '@/states/Vehiculos.state'
import type React from 'react'
import { useEffect, useState } from 'react'
import Select, { type StylesConfig } from 'react-select';

export default function FiltrosTelemetria() {
    const { toggleFiltro } = useFiltrosMapa()
    const { telemetriaFiltro } = useFiltrosMapa().filtrosMapState
    const { vehiculos, setVehiculosFiltered, vehiculosFiltered } = useVehiculosStore()
    const { setItemSidebarRight, setShowSidebarRight, resetMapConfig } = useSystemStore()
    const [placasVehiculosOptions, setPlacasVehiculosOptions] = useState<{ value: IVehiculo, label: string }[]>([])
    const [placasVehiculosSelected, setPlacasVehiculosSelected] = useState<{ value: IVehiculo, label: string } | null>(null)
    const [conductoresOptions, setConductoresOptions] = useState<{ value: IVehiculo, label: string }[]>([])
    const [conductoresSelected, setConductoresSelected] = useState<{ value: IVehiculo, label: string } | null>(null)

    const [showDropTipo, setShowDropTipo] = useState(true)
    const [showDropEstado, setShowDropEstado] = useState(true)

    const handleSelectVehiculo: any = (selectedOption: { value: IVehiculo, label: string }) => {
        if (selectedOption) {

            setPlacasVehiculosSelected(selectedOption)
            setItemSidebarRight({
                item: "vehiculos",
                content: selectedOption.value,
                itinerario: null
            })
            setShowSidebarRight(true)
        } else {
            setShowSidebarRight(false)
        }
    }

    const handleSelectConductor: any = (selectedOption: { value: IVehiculo, label: string }) => {
        if (selectedOption) {

            setConductoresSelected(selectedOption)
            setItemSidebarRight({
                item: "vehiculos",
                content: selectedOption.value,
                itinerario: null
            })
            setShowSidebarRight(true)
        } else {
            setShowSidebarRight(false)
        }
    }



    const changeTipoPrimaria = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVehiculosFiltered({
            ...vehiculosFiltered,
            changeTipos: {
                ...vehiculosFiltered.changeTipos,
                primaria: e.target.checked
            }
        })
    }

    const changeTipoSecundaria = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVehiculosFiltered({
            ...vehiculosFiltered,
            changeTipos: {
                ...vehiculosFiltered.changeTipos,
                secundaria: e.target.checked
            }
        })
    }

    const changeTipoRecoleccion = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVehiculosFiltered({
            ...vehiculosFiltered,
            changeTipos: {
                ...vehiculosFiltered.changeTipos,
                recoleccion: e.target.checked
            }
        })
    }

    const changeEstadoRetraso = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVehiculosFiltered({
            ...vehiculosFiltered,
            changeEstado: {
                ...vehiculosFiltered.changeEstado,
                retraso: e.target.checked
            }
        })
    }

    const changeEstadoAnticipo = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVehiculosFiltered({
            ...vehiculosFiltered,
            changeEstado: {
                ...vehiculosFiltered.changeEstado,
                anticipo: e.target.checked
            }
        })
    }

    const changeEstadoSinReportar = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVehiculosFiltered({
            ...vehiculosFiltered,
            changeEstado: {
                ...vehiculosFiltered.changeEstado,
                sinReportar: e.target.checked
            }
        })
    }

    const changeEstadoDisponibles = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVehiculosFiltered({
            ...vehiculosFiltered,
            changeEstado: {
                ...vehiculosFiltered.changeEstado,
                disponibles: e.target.checked
            }
        })
    }

    useEffect(() => {
        setPlacasVehiculosOptions(vehiculos.map(vehiculo => ({ value: vehiculo, label: vehiculo.WTLT_PLACA })))
        setConductoresOptions(vehiculos.map(vehiculo => ({ value: vehiculo, label: vehiculo.CONDUCTOR_NOM })))
    }, [vehiculos])
    useEffect(() => { }, [vehiculosFiltered])
    const stylesSelect: StylesConfig = {
        control: (styles) => ({ ...styles, borderRadius: '0.5rem', minHeight: 'auto', height: '2rem', fontSize: '0.875rem', alignContent: 'center' }),
    }

    return (
        <div className="space-y-4">
            <div className=''>
                <div className='mb-5 flex justify-between items-center'>
                    <h2 className='mb-2 font-semibold'>
                        Visualizar en el mapa
                    </h2>
                    <input type="checkbox" className="toggle toggle-success" onChange={(e) => {
                        e.preventDefault()
                        resetMapConfig()
                        toggleFiltro("telemetriaFiltro")
                    }} checked={telemetriaFiltro} />
                </div>

                <div className='mb-5'>
                    <h2 className='mb-2 '>
                        Buscar vehiculo por
                    </h2>
                    <div className='space-y-2 '>

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
                    <h2 className='mb-2 '>
                        Filtrar vehiculos por
                    </h2>
                    <div className="space-y-2">
                        <ul className="menu rounded-box">
                            <li>
                                <span className={`menu-dropdown-toggle ${showDropTipo && 'menu-dropdown-show'}`} onClick={() => setShowDropTipo(!showDropTipo)}>Tipo</span>
                                <ul className={`menu-dropdown ${showDropTipo && 'menu-dropdown-show'}`}>
                                    <li>
                                        <label className="label cursor-pointer">
                                            <span className="label-text">Primaria</span>
                                            <input type="checkbox" defaultChecked={vehiculosFiltered.changeTipos.primaria} onChange={changeTipoPrimaria} className="checkbox checkbox-primary" />
                                        </label>
                                    </li>
                                    <li>
                                        <label className="label cursor-pointer">
                                            <span className="label-text">Secundaria</span>
                                            <input type="checkbox" defaultChecked={vehiculosFiltered.changeTipos.secundaria} onChange={changeTipoSecundaria} className="checkbox checkbox-primary" />
                                        </label>
                                    </li>
                                    <li>
                                        <label className="label cursor-pointer">
                                            <span className="label-text">Recolección de leches</span>
                                            <input type="checkbox" defaultChecked={vehiculosFiltered.changeTipos.recoleccion} onChange={changeTipoRecoleccion} className="checkbox checkbox-primary" />
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
                                            <input type="checkbox" defaultChecked={vehiculosFiltered.changeEstado.retraso} onChange={changeEstadoRetraso} className="checkbox checkbox-primary" />
                                        </label>
                                    </li>
                                    <li>
                                        <label className="label cursor-pointer">
                                            <span className="label-text">Con Anticipo</span>
                                            <input type="checkbox" defaultChecked={vehiculosFiltered.changeEstado.anticipo} onChange={changeEstadoAnticipo} className="checkbox checkbox-primary" />
                                        </label>
                                    </li>
                                    <li>
                                        <label className="label cursor-pointer">
                                            <span className="label-text">Sin Reportar</span>
                                            <input type="checkbox" defaultChecked={vehiculosFiltered.changeEstado.sinReportar} onChange={changeEstadoSinReportar} className="checkbox checkbox-primary" />
                                        </label>
                                    </li>
                                    <li>
                                        <label className="label cursor-pointer">
                                            <span className="label-text">Disponibles</span>
                                            <input type="checkbox" defaultChecked={vehiculosFiltered.changeEstado.disponibles} onChange={changeEstadoDisponibles} className="checkbox checkbox-primary" />
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
