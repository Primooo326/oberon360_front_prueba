import React from 'react'

export default function ParametrosContent() {
    return (
        <div className="mt-8 space-y-4">
            <h2 className="text-xl font-bold">Parámetros</h2>
            <div className="flex space-x-4">
                <div className="flex flex-col space-y-2">
                    <label htmlFor="parametro1" className="text-sm">Parámetro 1</label>
                    <input type="text" id="parametro1" className="input input-primary" />
                </div>
                <div className="flex flex-col space-y-2">
                    <label htmlFor="parametro2" className="text-sm">Parámetro 2</label>
                    <input type="text" id="parametro2" className="input input-primary" />
                </div>
            </div>
            <div className="flex space-x-4">
                <div className="flex flex-col space-y-2">
                    <label htmlFor="parametro3" className="text-sm">Parámetro 3</label>
                    <input type="text" id="parametro3" className="input input-primary" />
                </div>
                <div className="flex flex-col space-y-2">
                    <label htmlFor="parametro4" className="text-sm">Parámetro 4</label>
                    <input type="text" id="parametro4" className="input input-primary" />
                </div>
            </div>
            <div className="flex space-x-4">
                <div className="flex flex-col space-y-2">
                    <label htmlFor="parametro5" className="text-sm">Parámetro 5</label>
                    <input type="text" id="parametro5" className="input input-primary" />
                </div>
                <div className="flex flex-col space-y-2">
                    <label htmlFor="parametro6" className="text-sm">Parámetro 6</label>
                    <input type="text" id="parametro6" className="input input-primary" />
                </div>
            </div>
        </div>
    )
}
