import React, { useEffect, useState } from 'react'
import puntosInteres from "@/utils/puntosInteres1.json"
import puntosInteresCat from "@/utils/puntosInteres2.json"
import Select, { type StylesConfig } from 'react-select';

export default function PuntosInteres() {


    const getPuntosInteres = new Promise((resolve, reject) => {
        const puntosInteresConst = puntosInteres.map((p) => ({ value: p.value, label: p.text }))
        const puntosInteresCatConst = puntosInteresCat.map((p) => ({ value: p.value, label: p.text }))
        resolve({ puntosInteres: puntosInteresConst, puntosInteresCat: puntosInteresCatConst })
    })
    const [puntosInteresCatOptions, setPuntosInteresCatOptions] = useState<{ value: string, label: string }[]>([])
    const [puntosInteresOptions, setPuntosInteresOptions] = useState<{ value: string, label: string }[]>([])
    const [selectedOption, setSelectedOption] = useState<{ value: string, label: string } | null>(null)
    const stylesSelect: StylesConfig = {
        //border radius
        control: (styles) => ({ ...styles, borderRadius: '0.5rem', minHeight: '2rem', fontSize: '0.875rem', alignContent: 'center' }),
    }
    const handleSelectCliente: any = (selectedOption: { value: string, label: string }) => {
        setSelectedOption(selectedOption)
        console.log(selectedOption);
    }
    useEffect(() => {
        getPuntosInteres.then((data: any) => {
            setPuntosInteresOptions(data.puntosInteres)
            setPuntosInteresCatOptions(data.puntosInteresCat)
        })
    }, [])
    return (
        <div>
            <div className="space-y-4">
                <div className=''>
                    <div className='mb-5'>

                        <h2 className='mb-2 '>
                            Filtrar puntos de interés
                        </h2>
                        <Select
                            className='w-[350px]'
                            defaultValue={selectedOption}
                            onChange={handleSelectCliente}
                            options={puntosInteresOptions}
                            styles={stylesSelect}
                            placeholder='Filtrar por cliente'
                            isClearable
                            isMulti
                        />
                    </div>
                    <div className='mb-5'>
                        <h2 className='mb-2 '>
                            Filtrar por categoría
                        </h2>
                        <div className="menu">
                            <ul>
                                {puntosInteresCatOptions.map((punto, index) => (
                                    <li key={index}>
                                        <a className="text-gray-500 flex justify-between" >{punto.label} <input type="checkbox" className="toggle toggle-success toggle-sm" /></a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <button className="btn btn-primary btn-block">Aplicar</button>
                </div>
            </div>
        </div>
    )
}
