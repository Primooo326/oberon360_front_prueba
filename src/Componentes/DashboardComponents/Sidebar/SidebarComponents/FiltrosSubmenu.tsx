"use client"
import type { IVehiculo } from '@/models/vehiculos.model'
import { useVehiculosStore } from '@/states/Vehiculos.state'
import React, { useEffect, useState } from 'react'
import Select, { type StylesConfig } from 'react-select';

export default function FiltrosSubmenu() {

    const { vehiculos } = useVehiculosStore()

    //select placas
    const [placasVehiculosOptions, setPlacasVehiculosOptions] = useState<{ value: IVehiculo, label: string }[]>([])
    const [placasVehiculosSelected, setPlacasVehiculosSelected] = useState<{ value: IVehiculo, label: string } | null>(null)
    //select conductores

    const [conductoresOptions, setConductoresOptions] = useState<{ value: IVehiculo, label: string }[]>([])
    const [conductoresSelected, setConductoresSelected] = useState<{ value: IVehiculo, label: string } | null>(null)


    const handleSelectVehiculo = (selectedOption: { value: IVehiculo, label: string }) => {
        setPlacasVehiculosSelected(selectedOption)
    }

    const handleSelectConductor = (selectedOption: { value: IVehiculo, label: string }) => {
        setConductoresSelected(selectedOption)
    }

    useEffect(() => {
        setPlacasVehiculosOptions(vehiculos.map(vehiculo => ({ value: vehiculo, label: vehiculo.WTLT_PLACA })))
        setConductoresOptions(vehiculos.map(vehiculo => ({ value: vehiculo, label: vehiculo.CONDUCTOR_NOM })))
    }, [vehiculos])
    const stylesSelect: StylesConfig = {
        //border radius
        control: (styles) => ({ ...styles, borderRadius: '0.5rem', minHeight: 'auto', height: '2rem', fontSize: '0.875rem', alignContent: 'center' }),
    }

    return (
        <div className="mt-8 space-y-4" >
            <div className="divider" />
            <div className='px-5' >
                <h1 className='text-lg font-semibold mb-5'>Telemetria</h1>
                <div className='' >
                    <h2 className='mb-3 font-semibold' >
                        Buscar vehiculo por
                    </h2>
                    <div className='space-y-2' >

                        <div>
                            <label className='text-sm' >Placa vehiculo</label>
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
                            <label className='text-sm' >Conductor</label>
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
            </div>

        </div>
    )
}
