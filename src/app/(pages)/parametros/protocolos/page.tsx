"use client"
import Table from '@/components/shared/Table/Table';
import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { createProtocol, deleteProtocol, getProtocol, updateProtocol } from "@/api/dashboard/parametros/protocolo.api"
import { getProtocolResponsible } from "@/api/dashboard/parametros/respProtocolo.api"
import { getActivities } from "@/api/dashboard/parametros/actividades.api"
import { downloadExcel } from '@/api/dashboard/parametros/conductor.api';
import Modal from '@/components/shared/Modal';
import { useForm } from 'react-hook-form';

const Page = () => {

    // {
    //         "FUN_ID": 57,
    //         "FUN_CARGOID": null,
    //         "FUN_TIPOFUNID": "TIPO1",
    //         "FUN_PREG_ID": "HARE",
    //         "FUN_FUNCION": "Asegurar una correcta medición de volumen de recolección ",
    //         "FUN_STATUS": "1",
    //         "protocolResponsible": {
    //             "TFUN_ID": "TIPO1",
    //             "TFUN_NOMBRE": "RECOLECCION DE LECHES",
    //             "TFUN_ORDEN": "1",
    //             "TFUN_STATUS": "1"
    //         },
    //         "questionFunction": {
    //             "PREFUN_ID": "HARE",
    //             "PREFUN_PREGUNTA": "HABITOS DE RECOLECCIÓN"
    //         }
    //     }
    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm();

    const [selectedRows, setSelectedRows] = useState<any[]>([]);

    const [data, setData] = useState<any[]>([]);

    const [paginationOptions, setPaginationOptions] = useState<any>({
        currentItems: data,
        page: 1,
        take: 20,
        itemCount: data.length,
        pageCount: 1,
        hasPreviousPage: false,
        hasNextPage: false
    });

    const [term, setTerm] = useState<string>('');

    const [loading, setLoading] = useState<boolean>(true);

    const [protocolResponsible, setProtocolResponsible] = useState<any[]>([]);

    const [activities, setActivities] = useState<any[]>([]);

    const [protocolToEdit, setProtocolToEdit] = useState<any | null>(null);

    const [protocolToDelete, setProtocolToDelete] = useState<any | null>(null);

    const handleChange = ({ selectedRows }: any) => {
        setSelectedRows(selectedRows);
    };

    const onChangePage = (page: number) => {
        console.log('page', page);
        setPaginationOptions({ ...paginationOptions, page });
        fetchData(page);
    }

    const onChangePerPage = (newPerPage: number, page: number) => {

        if (newPerPage === -1) {
            fetchData(1, paginationOptions.itemCount);
        } else {
            if (newPerPage > paginationOptions.take) {
                fetchData(page, newPerPage);
            } else {
                fetchData(1, newPerPage);
            }
        }
    }

    const generateDownloadExcel = async () => {
        let data = [];
        if (selectedRows.length) {
            data = selectedRows;
        } else {
            const response = await getProtocol(1, paginationOptions.itemCount);
            data = response?.data;
        }

        const dataExport = await getDataExport(data);

        const responseExcel = await downloadExcel(dataExport);

        if (responseExcel) {
            const url = window.URL.createObjectURL(new Blob([responseExcel], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'Protocolos.xlsx');
            document.body.appendChild(link);
            link.click();
            link.remove();
        }
    };

    const getDataExport = async (data: any[]): Promise<any[]> => {
        const dataExport: { [key: string]: any }[] = [];

        data.forEach((element: any) => {
            dataExport.push({
                "Responsable Protocolo": element.protocolResponsible.TFUN_NOMBRE,
                "Actividad": element.questionFunction.PREFUN_PREGUNTA,
                "Protocolo": element.FUN_FUNCION,
                "Estado": element.FUN_STATUS === '1' ? 'Activo' : 'Inactivo',
            });
        });

        return dataExport;
    };

    const fetchData = async (page: number = paginationOptions.page, take: number = paginationOptions.take) => {

        try {
            setLoading(true);
            const response = await getProtocol(page, take, term);
            setData(response.data);
            setPaginationOptions({
                currentItems: response.data,
                page: response.meta.page,
                take: response.meta.take,
                itemCount: response.meta.itemCount,
                pageCount: response.meta.pageCount,
                hasPreviousPage: response.meta.hasPreviousPage,
                hasNextPage: response.meta.hasNextPage
            });
            setLoading(false);
        }
        catch (error: any) {
            console.log(error);
            setLoading(false);
        }
    }

    const fetchProtocolResponsible = async () => {
        try {
            const response = await getProtocolResponsible();
            setProtocolResponsible(response.data);
        } catch (error: any) {
            console.log(error);
        }
    }

    const fetchActivities = async () => {
        try {
            const response = await getActivities();
            setActivities(response.data);
        } catch (error: any) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData()
        fetchProtocolResponsible()
        fetchActivities()
    }, [])
    const columnas = [
        {
            name: "Responsable Protocolo",
            cell: (row: any) => row.protocolResponsible.TFUN_NOMBRE,
            sortable: true,

        },
        {
            name: "Actividad",
            cell: (row: any) => row.questionFunction.PREFUN_PREGUNTA,
            selector: (row: any) => row.questionFunction.PREFUN_PREGUNTA,
            sortable: true,
        },
        {
            name: "Protocolo",
            cell: (row: any) => row.FUN_FUNCION,
            selector: (row: any) => row.FUN_FUNCION,
        },
        {
            name: "Estado",
            cell: (row: any) => row.FUN_STATUS === '1' ? <span className='badge badge-success'>Activo</span> : <span className='badge badge-danger'>Inactivo</span>,
        },
        {
            name: "Acciones",
            cell: (row: any) => <div className="flex gap-3" >
                <button className="btn btn-warning" >Editar</button>
                <button className="btn btn-error" >Eliminar</button>
            </div>
        }
    ]
    return (
        <>
            <div className='w-full h-full overflow-auto scroll p-8' >
                <div className="flex gap-5 mb-8 items-center">
                    <h1 className='font-bold text-3xl' >
                        Listado de protocolos
                    </h1>
                </div>
                <div className="w-full mb-3 flex justify-between items-center" >
                    <div>
                        <label className="input input-bordered flex items-center gap-2">
                            <input type="text" className="grow" placeholder="Buscar protocolo" />
                            <FaSearch className="text-gray-500" />
                        </label>
                    </div>
                    <div className="flex gap-3" >
                        <button className="btn btn-success">Nuevo Protocolo</button>
                        <button className="btn btn-primary" onClick={() => generateDownloadExcel()} >Exportar datos {selectedRows.length === 0 ? "(Todos)" : `(${selectedRows.length})`}</button>
                    </div>

                </div>
                <Table data={data} columns={columnas} selectableRows
                    onSelectedRowsChange={handleChange} paginationOptions={paginationOptions} onChangePage={onChangePage} onChangePerPage={onChangePerPage} progressPending={loading} />
            </div>
            <Modal id="Protocolo" isOpen={protocolToEdit} onClose={() => { setProtocolToEdit(null) }} >
                <form className="grid grid-cols-1 gap-3" >
                    <div>
                        <label className="label" >Responsable Protocolo</label>
                        <select className="input input-bordered" >
                            <option value="" >Seleccione</option>
                            {
                                protocolResponsible.map((item) => (
                                    <option key={item.TFUN_ID} value={item.TFUN_ID} >{item.TFUN_NOMBRE}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div>
                        <label className="label" >Actividad</label>
                        <select className="input input-bordered" >
                            <option value="" >Seleccione</option>
                            {
                                activities.map((item) => (
                                    <option key={item.PREFUN_ID} value={item.PREFUN_ID} >{item.PREFUN_PREGUNTA}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div>
                        <label className="label" >Protocolo</label>
                        <textarea className="textarea textarea-bordered" />
                    </div>
                    <div>
                        <button className="btn btn-primary" >Guardar</button>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default Page;