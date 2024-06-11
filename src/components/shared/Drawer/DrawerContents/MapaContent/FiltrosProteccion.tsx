import { useClientesStore } from '@/states/Clientes.state';
import { useFiltrosMapa } from '@/states/FiltrosMapa.state';
import { useSystemStore } from '@/states/System.state';
import React, { useEffect, useState } from 'react'
import Select, { type StylesConfig } from 'react-select';


export default function FiltrosProteccion() {
    const { clientes, setClienteSelected } = useClientesStore();
    const { toggleFiltro } = useFiltrosMapa()
    const { proteccionFiltro } = useFiltrosMapa().filtrosMapState
    const { resetMapConfig } = useSystemStore()
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
    useEffect(() => {
        setClientesOptions(clientes.map(cliente => ({ value: cliente.CLIE_ID_REG, label: cliente.CLIE_COMERCIAL })))
    }, [clientes])
    return (
        <div>
            <div className="space-y-4">
                <div className=''>
                    <div className='mb-5 flex justify-between items-center'>
                        <h2 className='mb-2 font-semibold'>
                            Visualizar en el mapa
                        </h2>
                        <input type="checkbox" className="toggle toggle-success" onChange={(e) => {
                            e.preventDefault()
                            resetMapConfig()
                            toggleFiltro("proteccionFiltro")
                        }} checked={proteccionFiltro} />
                    </div>
                    <div className='mb-5'>
                        <h2 className='mb-2 '>
                            Filtrar por cliente
                        </h2>
                    </div>
                    <Select
                        className='w-[350px]'
                        defaultValue={selectedOption}
                        onChange={handleSelectCliente}
                        options={clientesOptions}
                        styles={stylesSelect}
                        placeholder='Filtrar por cliente'
                        isClearable
                    />
                </div>
            </div>
        </div>
    )
}
