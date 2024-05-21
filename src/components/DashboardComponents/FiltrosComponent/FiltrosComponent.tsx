"use client"
import { BiExport, BiFilter } from 'react-icons/bi'
import Select, { type StylesConfig } from 'react-select';
import { useEffect, useState } from 'react'
import { useClientesStore } from '@/states/Clientes.state';
import { TbRouteSquare } from 'react-icons/tb';
import { type FiltroMapa, useFiltrosMapa } from '@/states/FiltrosMapa.state';
import { useSystemStore } from '@/states/System.state';
export default function FiltrosComponent() {
    const { toggleFiltro } = useFiltrosMapa()
    const { mobileFiltro, oleoductosFiltro, proteccionFiltro, telemetriaFiltro } = useFiltrosMapa().filtrosMapState
    const { clientes, setClienteSelected } = useClientesStore();
    const { resetMapConfig, setShowSidebar, showSidebar } = useSystemStore()
    const [clientesOptions, setClientesOptions] = useState<{ value: string, label: string }[]>([])
    const [selectedOption, setSelectedOption] = useState<{ value: string, label: string } | null>(null)
    const stylesSelect: StylesConfig = {
        //border radius
        control: (styles) => ({ ...styles, borderRadius: '0.5rem', minHeight: 'auto', height: '2rem', maxHeight: "2rem", fontSize: '0.875rem', alignContent: 'center' }),
    }
    const handleSelectCliente: any = (selectedOption: { value: string, label: string }) => {
        if (selectedOption === null) return setClienteSelected(null)
        setClienteSelected(clientes.find(cliente => cliente.CLIE_ID_REG === selectedOption.value) || null)
        setSelectedOption(selectedOption)
    }

    const handleToogleFiltro = (filtro: FiltroMapa) => {
        toggleFiltro(filtro)
    }

    useEffect(() => {
        setClientesOptions(clientes.map(cliente => ({ value: cliente.CLIE_ID_REG, label: cliente.CLIE_COMERCIAL })))
    }, [clientes])
    return (
        <div className='flex w-full justify-between'>
            <div className='flex gap-4 w-full'>
                <Select
                    className='w-[350px]'
                    defaultValue={selectedOption}
                    onChange={handleSelectCliente}
                    options={clientesOptions}
                    styles={stylesSelect}
                    placeholder='Filtrar por cliente'
                    isClearable
                />
                <button className={`btn btn-sm ${proteccionFiltro ? 'btn-error' : ''}`}
                    onClick={() => { resetMapConfig(); handleToogleFiltro("proteccionFiltro"); }}
                >
                    Protección
                </button>
                <button className={`btn btn-sm ${telemetriaFiltro ? 'btn-error' : ''}`}
                    onClick={() => { resetMapConfig(); handleToogleFiltro("telemetriaFiltro"); }}
                >
                    Telemetria
                </button>
                <button className={`btn btn-sm ${oleoductosFiltro ? 'btn-error' : ''}`}
                    onClick={() => { resetMapConfig(); handleToogleFiltro("oleoductosFiltro"); }}
                >
                    Oleoductos
                </button>
                <button className={`btn btn-sm ${mobileFiltro ? 'btn-error' : ''}`}
                    onClick={() => { resetMapConfig(); handleToogleFiltro("mobileFiltro"); }}
                >
                    Mobile
                </button>
                <button className='btn btn-sm btn-ghost text-gray-500 border-gray-400'
                    onClick={() => setShowSidebar(!showSidebar)}>
                    Filtros avanzados
                    <BiFilter className='text-gray-500 w-5 h-auto' />
                </button>
            </div>


            <div className='flex gap-4 w-full justify-end'>
                <div>
                    <button className='btn btn-sm btn-accent ' >
                        Exportar informe
                        <BiExport className=' w-5 h-auto' />
                    </button>
                </div>
                <div>
                    <button className='btn btn-sm btn-success ' >
                        Simular rutas
                        <TbRouteSquare className=' w-5 h-auto' />
                    </button>
                </div>
            </div>

        </div>
    )
}
