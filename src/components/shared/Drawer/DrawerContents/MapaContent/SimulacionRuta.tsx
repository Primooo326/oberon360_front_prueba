import { getPoints } from '@/api/dashboard/parametros/points.api'
import type { IVehiculo } from '@/models/vehiculos.model';
import { useSystemStore } from '@/states/System.state';
import { useVehiculosStore } from '@/states/Vehiculos.state';
import React, { useEffect, useState } from 'react'
import Select, { type StylesConfig } from 'react-select';

export default function SimulacionRuta() {

    const [data, setData] = useState([])
    const [selectedOption, setSelectedOption] = useState<any>()
    const [options, setOptions] = useState<{ value: string, label: string }[]>([])
    const [metadata, setMetadata] = useState({})
    const { vehiculos } = useVehiculosStore()
    const [placasVehiculosOptions, setPlacasVehiculosOptions] = useState<{ value: IVehiculo, label: string }[]>([])
    const [placasVehiculosSelected, setPlacasVehiculosSelected] = useState<{ value: IVehiculo, label: string } | null>(null)
    const { setItemSidebarRight, setShowSidebarRight, resetMapConfig } = useSystemStore()

    const fetchData = async () => {
        try {
            const response = await getPoints();
            setOptions(response.data.map((p: any) => ({ value: p.PUN_ID, label: p.PUN_NOMBRE })).sort((a: any, b: any) => a.label.localeCompare(b.label)))
            setData(response.data)
            setMetadata(response.meta)
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    const handleSelectOption: any = (selectedOption: { value: string, label: string }) => {
        const itinerario = data.find((p: any) => p.PUN_ID === selectedOption.value)
        setSelectedOption(itinerario)
        console.log(itinerario);
    }
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

    const stylesSelect: StylesConfig = {
        control: (styles) => ({ ...styles, borderRadius: '0.5rem', minHeight: '2rem', fontSize: '0.875rem', alignContent: 'center' }),
    }

    useEffect(() => {
        fetchData()
    }, [])
    useEffect(() => {
        setPlacasVehiculosOptions(vehiculos.map(vehiculo => ({ value: vehiculo, label: vehiculo.WTLT_PLACA })))

    }, [vehiculos])
    return (
        <div className='space-y-4'>
            <div>
                <h1>Placa vehiculo</h1>
                <Select
                    className='w-[350px]'
                    defaultValue={placasVehiculosSelected}
                    onChange={handleSelectVehiculo}
                    options={placasVehiculosOptions}
                    styles={stylesSelect}
                    placeholder='Seleccionar placa vehiculo'
                    isClearable
                />
            </div>
            <div>
                <h1>Itinerario</h1>
                <Select
                    className='w-[350px]'
                    onChange={handleSelectOption}
                    options={options}
                    styles={stylesSelect}
                    placeholder='Seleccionar itinerario'
                    isClearable
                />
            </div>
        </div>
    )
}
