"use client"
import React from 'react'
import { getDrivers } from '@/api/conductor.api';
import Table from '@/components/Shared/Table/Table';
import { responseTableDriverExample } from '@/utils/dataTemCond';
import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
export default function page() {

    const [data, setData] = useState<any[]>([]);
    const [columns, setColumns] = useState<any[]>([]);
    const [selectedRows, setSelectedRows] = useState<any[]>([]);
    const columnas: any = [
        {
            name: 'Conductor',
            cell: (row: any) => <div className=' w-full flex items-center justify-center py-2' >
                <img src={`data:image/jpeg;base64,${row.CONDUCTOR_FOTO}`} alt="conductor foto" className="rounded-full size-14" />
            </div>,
        },
        {
            name: 'Tipo de Documento',
            cell: (row: any) => row.typeIdentification.TIP_IDEN_DESCRIPCION,
            sortable: true,
        },
        {
            name: 'Numero de Documento',
            cell: (row: any) => row.CONDUCTOR_IDENTIFICACION,
            selector: (row: any) => row.CONDUCTOR_IDENTIFICACION,
            sortable: true,
        },
        {

            name: 'Código',
            cell: (row: any) => row.CONDUCTOR_CODCONDUCTOR,
            selector: (row: any) => row.CONDUCTOR_CODCONDUCTOR,
            sortable: true,
        },

        {
            name: 'Nombre',
            cell: (row: any) => <span>{row.CONDUCTOR_PRIMERNOMBRE}</span>,
            selector: (row: any) => row.CONDUCTOR_PRIMERNOMBRE,
        },
        {
            name: "RH",
            cell: (row: any) => row.factorRh.FACTOR_RH_DESCRIPCION,
            selector: (row: any) => row.factorRh.FACTOR_RH_DESCRIPCION,

        },
        {
            name: "Teléfono Personal",
            cell: (row: any) => row.CONDUCTOR_TELPERSONAL,
            selector: (row: any) => row.CONDUCTOR_TELPERSONAL,
        },
        {
            name: "Teléfono Corporativo",
            cell: (row: any) => row.CONDUCTOR_TELCORPORATIVO,
            selector: (row: any) => row.CONDUCTOR_TELCORPORATIVO,
        }
    ];
    const handleChange = ({ selectedRows }: any) => {
        // You can set state or dispatch with something like Redux so we can use the retrieved data
        console.log('Selected Rows: ', selectedRows);
        setSelectedRows(selectedRows);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await responseTableDriverExample("api/conductores");
                const response2 = await getDrivers();
                console.log('responseFront =>', response);
                console.log('responseBack =>', response2);

                setColumns(columnas);
                setData(response2.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    return (
        <div className='w-full h-full scroll p-8' >
            <div className="flex gap-5 mb-8 items-center">
                <h1 className='font-bold text-3xl' >
                    Listado de Conductores
                </h1>
            </div>
            <div className="w-full mb-3 flex justify-between items-center" >
                <div>
                    <label className="input input-bordered flex items-center gap-2">
                        <input type="text" className="grow" placeholder="Buscar conductor" />
                        <FaSearch className="text-gray-500" />
                    </label>
                </div>
                <div className="flex gap-3" >
                    <button disabled={selectedRows.length !== 1} className="btn btn-warning" >Editar</button>
                    <button disabled={selectedRows.length === 0} className="btn btn-error" >Eliminar</button>
                    <button className="btn btn-success" >Nuevo Conductor</button>
                    <button className="btn btn-primary" >Exportar datos {selectedRows.length === 0 ? "(Todos)" : `(${selectedRows.length})`}</button>
                </div>

            </div>
            <Table data={data} columns={columns} selectableRows
                onSelectedRowsChange={handleChange} />
        </div>
    )
}