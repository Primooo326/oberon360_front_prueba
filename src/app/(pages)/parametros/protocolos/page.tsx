"use client"
import Table from '@/components/shared/Table/Table';
import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { createProtocol, deleteProtocol, getProtocol, updateProtocol } from "@/api/dashboard/parametros/protocolo.api"
import { getProtocolResponsible } from "@/api/dashboard/parametros/respProtocolo.api"
import { getActivities } from "@/api/dashboard/parametros/actividades.api"
import Modal from '@/components/shared/Modal';
import { set, useForm } from 'react-hook-form';
import { FaXmark } from 'react-icons/fa6';
import { generateDownloadExcel } from '@/utils/tools';
import { toast } from 'react-toastify';

const Page = () => {

    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm();

    const [selectedRows, setSelectedRows] = useState<any[]>([]);

    const [data, setData] = useState<any[]>([]);

    const [paginationOptions, setPaginationOptions] = useState<any>({
        currentItems: data,
        page: 1,
        take: 10,
        itemCount: data.length,
        pageCount: 1,
        hasPreviousPage: false,
        hasNextPage: false
    });


    const [loading, setLoading] = useState<boolean>(true);

    const [protocolResponsible, setProtocolResponsible] = useState<any[]>([]);

    const [activities, setActivities] = useState<any[]>([]);

    const [protocolToEdit, setProtocolToEdit] = useState<any | null>(null);

    const [protocolToDelete, setProtocolToDelete] = useState<any | null>(null);

    const [protocolCodVerificar, setProtocolCodVerificar] = useState<string>('');

    const [term, setTerm] = useState<string>('');
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);

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

    const getDataExport = async () => {
        setButtonDisabled(true);
        let data = []
        if (selectedRows.length) {
            data = selectedRows;
        } else {
            const response = await getProtocol(1, paginationOptions.itemCount);
            data = response?.data;
        }
        const dataExport: { [key: string]: any }[] = [];

        data.forEach((element: any) => {
            dataExport.push({
                "Responsable Protocolo": element.mapProtocolResponsible.TFUN_NOMBRE,
                "Actividad": element.mapActivity.PREFUN_PREGUNTA,
                "Protocolo": element.FUN_FUNCION,
                "Estado": element.FUN_STATUS === '1' ? 'Activo' : 'Inactivo',
            });
        });
        generateDownloadExcel(dataExport, "Protocolos");
        setButtonDisabled(false);
    };

    const onSubmit = async (data: any) => {
        setButtonDisabled(true);

        data.FUN_CARGOID = null
        console.log(data);
        try {
            if (protocolToEdit.FUN_ID) {
                const response = await updateProtocol(data, protocolToEdit.FUN_ID);
                if (response) {
                    fetchData();
                    setProtocolToEdit(null);
                    toast.success("Protocolo actualizado correctamente");
                }
            } else {
                const response = await createProtocol(data);
                if (response) {
                    fetchData();
                    setProtocolToEdit(null);
                    toast.success("Protocolo creado correctamente");
                }
            }
        } catch (error: any) {
            console.log(error);
        }
        setButtonDisabled(false);
    }

    const handleCreate = () => {
        setProtocolToEdit({
            FUN_FUNCION: "",
            FUN_STATUS: "1",
            protocolResponsible: {
                TFUN_ID: "",
                TFUN_NOMBRE: "",
            },
            mapActivity: {
                PREFUN_ID: "",
                PREFUN_PREGUNTA: "",
            },
        })
    }

    const fetchData = async (page: number = paginationOptions.page, take: number = paginationOptions.take, termino: string | null = null) => {

        try {
            termino = termino !== null ? termino : term;
            setLoading(true);
            const response = await getProtocol(page, take, termino || "");
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

    const onDeleteProtocol = async (id: string) => {
        setButtonDisabled(true);

        try {
            const response = await deleteProtocol(id);
            if (response) {
                fetchData();
                setProtocolToDelete(null);
                toast.success("Protocolo eliminado correctamente");
            }
        } catch (error: any) {
            console.log(error);
            toast.error("Error al eliminar el protocolo");
        }
        setButtonDisabled(false);
    }
    const onChangeBuscador = (e: any) => {
        setTerm(e.target.value);
        fetchData(1, paginationOptions.take, e.target.value);
    }

    useEffect(() => {
        fetchData()
        fetchProtocolResponsible()
        fetchActivities()
    }, [])

    useEffect(() => {
        if (protocolToEdit) {
            for (const key in protocolToEdit) {
                setValue(key, protocolToEdit[key])
            }
        } else {
            reset()
        }
    }, [protocolToEdit])

    const columnas = [
        {
            name: "Responsable Protocolo",
            cell: (row: any) => row.mapProtocolResponsible.TFUN_NOMBRE,
            sortable: true,

        },
        {
            name: "Actividad",
            cell: (row: any) => row.mapActivity.PREFUN_PREGUNTA,
            selector: (row: any) => row.mapActivity.PREFUN_PREGUNTA,
            sortable: true,
        },
        {
            name: "Protocolo",
            cell: (row: any) => row.FUN_FUNCION,
            selector: (row: any) => row.FUN_FUNCION,
        },
        {
            name: "Estado",
            cell: (row: any) => row.FUN_STATUS === '1' ? <span className='badge badge-success'>Activo</span> : <span className='badge badge-error'>Inactivo</span>,
        },
        {
            name: "Acciones",
            cell: (row: any) => <div className="flex gap-3" >
                <button className="btn btn-sm btn-warning" onClick={() => setProtocolToEdit(row)} >Editar</button>
                <button className="btn btn-sm btn-error" onClick={() => { setProtocolToDelete(row); console.log(row); }} >Eliminar</button>
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
                            <input type="text" className="grow" placeholder="Buscar protocolo" onChange={onChangeBuscador} />
                            <FaSearch className="text-gray-500" />
                        </label>
                    </div>
                    <div className="flex gap-3" >
                        <button className="btn btn-success" onClick={() => handleCreate()} >Nuevo Protocolo</button>
                        <button disabled={buttonDisabled} className="btn btn-primary" onClick={() => getDataExport()} >Exportar datos {selectedRows.length === 0 ? "(Todos)" : `(${selectedRows.length})`}</button>
                    </div>

                </div>
                <Table data={data} columns={columnas} selectableRows
                    onSelectedRowsChange={handleChange} paginationOptions={paginationOptions} onChangePage={onChangePage} onChangePerPage={onChangePerPage} progressPending={loading} />
            </div>
            <Modal id="Protocolo" className="rounded-xl " isOpen={protocolToEdit} onClose={() => { setProtocolToEdit(null) }} >
                <div className='modal-header flex justify-between items-center border-b w-full px-10' >

                    <h1 className='text-2xl font-bold' >
                        {
                            protocolToEdit ? "Editar Protocolo" : "Nuevo Protocolo"
                        }
                    </h1>
                    <button onClick={() => setProtocolToEdit(null)} >
                        <FaXmark />
                    </button>
                </div>
                <div className='p-10' >
                    <form className='grid grid-cols-1 gap-5' >
                        <div className="flex gap-5">

                            <div>
                                <label className='label' >Responsable Protocolo</label>
                                <select className='input input-bordered' defaultValue={protocolToEdit ? protocolToEdit.mapProtocolResponsible.TFUN_ID : null} {...register('FUN_TIPOFUNID', { required: true })} >
                                    <option value="" >Seleccione</option>
                                    {
                                        protocolResponsible.map((item: any) => (
                                            <option key={item.TFUN_ID} value={item.TFUN_ID} >{item.TFUN_NOMBRE}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div>
                                <label className='label' >Actividad</label>
                                <select className='input input-bordered' defaultValue={protocolToEdit ? protocolToEdit.mapActivity.PREFUN_ID : null} {...register('FUN_PREG_ID', { required: true })} >
                                    <option value="" >Seleccione</option>
                                    {
                                        activities.map((item: any) => (
                                            <option key={item.PREFUN_ID} value={item.PREFUN_ID} >{item.PREFUN_PREGUNTA}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div>
                                <label className='label' >Estado</label>
                                <select className='input input-bordered' defaultValue={protocolToEdit ? protocolToEdit.FUN_STATUS : null}  {...register('FUN_STATUS', { required: true })} >
                                    <option value="1" >Activo</option>
                                    <option value="0" >Inactivo</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className='label' >Protocolo</label>
                            <textarea className='textarea textarea-bordered w-full h-32 scroll' defaultValue={protocolToEdit ? protocolToEdit.FUN_FUNCION : null}
                                {
                                ...register('FUN_FUNCION', { required: true, minLength: 10 })
                                }
                            />
                        </div>

                        <div className='flex justify-end gap-3' >
                            <button className='btn btn-error' onClick={() => setProtocolToEdit(null)} >Cancelar</button>
                            <button className='btn btn-success' disabled={buttonDisabled} onClick={handleSubmit(onSubmit)} >Guardar</button>
                        </div>
                    </form>
                </div>
            </Modal>
            {
                protocolToDelete &&
                <Modal id='modalDeleteProtocol' className="rounded-xl " isOpen={protocolToDelete} onClose={() => setProtocolToDelete(null)} >
                    <div className='modal-header flex justify-between items-center border-b w-full px-10' >
                        <div />
                        <h1 className='text-2xl font-bold' >
                            Eliminar Protocolo
                        </h1>
                        <button onClick={() => setProtocolToDelete(null)} >
                            <FaXmark />
                        </button>
                    </div>
                    <div>
                        <div className='p-10 flex flex-col items-center gap-3' >
                            <h1 className='text-xl' >
                                ¿Está seguro de eliminar el protocolo <span className='font-bold'>{`${protocolToDelete?.FUN_FUNCION}`} </span> con Id <span className='font-bold'>{`${protocolToDelete?.FUN_ID}`}</span>?
                            </h1>
                            <div>
                                <p className='font-bold mb-5' >
                                    Para confirmar la eliminación del protocolo, por favor ingrese el Id del protocolo
                                </p>
                                <div className="form-control">

                                    <input type="text" placeholder="Código de Protocolo" className="input input-bordered" value={protocolCodVerificar} onChange={(e) => setProtocolCodVerificar(e.target.value)} onPaste={(e) => e.preventDefault()} />

                                </div>
                            </div>
                            <div className='flex justify-center gap-5 mt-5' >
                                <button className="btn btn-error" onClick={() => setProtocolToDelete(null)} >Cancelar</button>
                                <button className="btn btn-success" onClick={() => onDeleteProtocol(protocolToDelete.FUN_ID)} disabled={protocolCodVerificar !== `${protocolToDelete.FUN_ID}` || buttonDisabled} >Eliminar</button>
                            </div>
                        </div>
                    </div>
                </Modal>
            }
        </>
    );
};

export default Page;
