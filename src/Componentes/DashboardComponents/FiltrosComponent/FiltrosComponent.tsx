import { BiExport, BiFilter } from 'react-icons/bi'
import Select, { type StylesConfig } from 'react-select';
import { useEffect, useState } from 'react'
import { useClientesStore } from '@/states/Clientes.state';
import { TbRouteSquare } from 'react-icons/tb';
import { useFiltrosMapa } from '@/states/FiltrosMapa.state';
import { useSystemStore } from '@/states/System.state';
export default function FiltrosComponent() {
    const { setMobileFiltro: setMobile, setProteccionFiltro: setProteccion, setTelemetriaFiltro: setTelemetria, mobileFiltro: mobile, proteccionFiltro: proteccion, telemetriaFiltro: telemetria } = useFiltrosMapa()
    const { clientes, setClienteSelected } = useClientesStore();
    const { resetMapConfig, setShowSidebar, showSidebar } = useSystemStore()
    const [clientesOptions, setClientesOptions] = useState<{ value: string, label: string }[]>([])
    const [selectedOption, setSelectedOption] = useState<{ value: string, label: string } | null>(null)
    const stylesSelect: StylesConfig = {
        //border radius
        control: (styles) => ({ ...styles, borderRadius: '0.5rem', minHeight: 'auto', height: '2rem', maxHeight: "2rem", fontSize: '0.875rem', alignContent: 'center' }),
    }
    const handleSelectCliente = (selectedOption: { value: string, label: string }) => {
        if (selectedOption === null) return setClienteSelected(null)
        setClienteSelected(clientes.find(cliente => cliente.CLIE_ID_REG === selectedOption.value) || null)
        setSelectedOption(selectedOption)
    }
    useEffect(() => {
        setClientesOptions(clientes.map(cliente => ({ value: cliente.CLIE_ID_REG, label: cliente.CLIE_COMERCIAL })))
    }, [clientes])
    return (
        <div className='flex w-full justify-between' >
            <div className='flex gap-4 w-full' >
                <Select
                    className='w-[350px]'
                    defaultValue={selectedOption}
                    onChange={handleSelectCliente}
                    options={clientesOptions}
                    styles={stylesSelect}
                    placeholder='Filtrar por cliente'
                    isClearable
                />
                {/* <button className={`btn btn-sm ${proteccion ? 'btn-error' : ''}`}
                    onClick={() => { resetMapConfig(); setProteccion(!proteccion); }}
                >
                    Protección
                </button>
                <button className={`btn btn-sm ${telemetria ? 'btn-error' : ''}`}
                    onClick={() => { resetMapConfig(); setTelemetria(!telemetria); }}
                >
                    Telemetria
                </button>
                <button className={`btn btn-sm ${mobile ? 'btn-error' : ''}`}
                    onClick={() => { resetMapConfig(); setMobile(!mobile); }}
                >
                    Mobile
                </button> */}
                <div>
                    <button className='btn btn-sm btn-ghost text-gray-500 border-gray-400'
                        onClick={() => setShowSidebar(!showSidebar)}>
                        Filtros avanzados
                        <BiFilter className='text-gray-500 w-5 h-auto' />
                    </button>
                </div>
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
