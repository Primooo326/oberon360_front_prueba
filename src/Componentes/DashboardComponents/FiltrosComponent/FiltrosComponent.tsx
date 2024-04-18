"use client"
import { BiExport, BiFilter } from 'react-icons/bi'
import Select, { type StylesConfig } from 'react-select';
import { useEffect, useState } from 'react'
import { useClientesStore } from '@/states/Clientes.state';
export default function FiltrosComponent() {
    const { clientes } = useClientesStore();
    const [clientesOptions, setClientesOptions] = useState<{ value: string, label: string }[]>([])
    const [selectedOption, setSelectedOption] = useState(null);
    const stylesSelect: StylesConfig = {
        //border radius
        control: (styles) => ({ ...styles, borderRadius: '0.5rem', minHeight: 'auto', height: '2rem', maxHeight: "2rem", fontSize: '0.875rem', alignContent: 'center' }),
    }
    useEffect(() => {
        setClientesOptions(clientes.map(cliente => ({ value: cliente.CLIE_ID_REG, label: cliente.CLIE_COMERCIAL })))
    }, [clientes])
    return (
        <div className='flex gap-4 w-full ' >
            <Select
                className='w-2/12'
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={clientesOptions}
                styles={stylesSelect}
                placeholder='Filtrar por cliente'
            />
            <div>
                <button className='btn btn-sm btn-ghost text-gray-500 border-gray-400 ' >
                    Filtrar
                    <BiFilter className='text-gray-500 w-5 h-auto' />
                </button>
            </div>
            <div>
                <button className='btn btn-sm btn-accent ' >
                    Exportar informe
                    <BiExport className=' w-5 h-auto' />
                </button>
            </div>

        </div>
    )
}
