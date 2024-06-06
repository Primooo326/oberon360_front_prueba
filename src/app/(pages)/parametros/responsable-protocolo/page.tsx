"use client"
import Table from '@/components/shared/Table/Table';
import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { createProtocolResponsible, deleteProtocolResponsible, getProtocolResponsible, updateProtocolResponsible } from "@/api/dashboard/parametros/respProtocolo.api"
import Modal from '@/components/shared/Modal';
import { useForm } from 'react-hook-form';
import { FaXmark } from 'react-icons/fa6';
import { generateDownloadExcel } from '@/utils/tools';
import { toast } from 'react-toastify';

const Page = () => {

    // {
    //             "TFUN_ID": "TIPO1",
    //             "TFUN_NOMBRE": "RECOLECCION DE LECHES",
    //             "TFUN_ORDEN": "1",
    //             "TFUN_STATUS": "1"
    //         }
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

    const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);

    const [loading, setLoading] = useState<boolean>(true);


    const [respProtocoloToEdit, setRespProtocoloToEdit] = useState<any | null>(null);

    const [respProtocoloToDelete, setRespProtocoloToDelete] = useState<any | null>(null);

    const [respProtocoloCodVerificar, setRespProtocoloCodVerificar] = useState<string>('');

    const [term, setTerm] = useState<string>('');

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
            const response = await getProtocolResponsible(1, paginationOptions.itemCount);
            data = response?.data;
        }
        const dataExport: { [key: string]: any }[] = [];

        data.forEach((element: any) => {
            dataExport.push({
                "Código": element.TFUN_ID,
                "Responsable Protocolo": element.TFUN_NOMBRE,
                "Numero de orden": element.TFUN_ORDEN,
                "Estado": element.TFUN_STATUS === '1' ? 'Activo' : 'Inactivo',
            });
        });
        generateDownloadExcel(dataExport, "Responsable Protocolo");
        setButtonDisabled(false);

    };

    const onSubmit = async (data: any) => {
        console.log(data);
        setButtonDisabled(true);

        try {
            if (respProtocoloToEdit.PREFUN_ID) {
                const response = await updateProtocolResponsible(data, respProtocoloToEdit.TFUN_ID);
                if (response) {
                    fetchData();
                    setRespProtocoloToEdit(null);
                    toast.success("Responsable protocolo actualizado correctamente");
                }
            } else {
                const response = await createProtocolResponsible(data);
                if (response) {
                    fetchData();
                    setRespProtocoloToEdit(null);
                    toast.success("Responsable protocolo creado correctamente");
                }
            }
        } catch (error: any) {
            console.log(error);
        }
        setButtonDisabled(false);
    }

    const handleCreate = () => {
        setRespProtocoloToEdit({
            TFUN_ID: '',
            TFUN_NOMBRE: '',
            TFUN_ORDEN: '',
            TFUN_STATUS: '1'
        });
    }

    const fetchData = async (page: number = paginationOptions.page, take: number = paginationOptions.take, termino: string | null = null) => {

        try {
            termino = termino !== null ? termino : term;
            setLoading(true);
            const response = await getProtocolResponsible(page, take, termino || "");
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

    const onDeleteActivity = async (id: string) => {
        setButtonDisabled(true);

        try {
            const response = await deleteProtocolResponsible(id);
            if (response) {
                fetchData();
                setRespProtocoloToDelete(null);
                toast.success("Responsable Protocolo eliminado correctamente");
            }
        } catch (error: any) {
            console.log(error);
            toast.error("Error al eliminar el Responsable Protocolo");
        }
        setButtonDisabled(false);
    }
    const onChangeBuscador = (e: any) => {
        setTerm(e.target.value);
        fetchData(1, paginationOptions.take, e.target.value);
    }

    useEffect(() => {
        fetchData()

    }, [])

    useEffect(() => {
        if (respProtocoloToEdit) {
            for (const key in respProtocoloToEdit) {
                setValue(key, respProtocoloToEdit[key])
            }
        } else {
            reset()
        }
    }, [respProtocoloToEdit])

    const columnas = [
        {
            name: "Código",
            cell: (row: any) => row.TFUN_ID,
            sortable: true,

        },
        {
            name: "Responsable Protocolo",
            cell: (row: any) => row.TFUN_NOMBRE,
            selector: (row: any) => row.TFUN_NOMBRE,
            sortable: true,
        },
        {
            name: "Numero de orden",
            cell: (row: any) => row.TFUN_ORDEN,
            sortable: true,
        },
        {
            name: "Estado",
            cell: (row: any) => row.TFUN_STATUS === '1' ? <span className='badge badge-success'>Activo</span> : <span className='badge badge-error'>Inactivo</span>,
        },
        {
            name: "Acciones",
            cell: (row: any) => <div className="flex gap-3" >
                <button className="btn btn-sm btn-warning" onClick={() => setRespProtocoloToEdit(row)} >Editar</button>
                <button className="btn btn-sm btn-error" onClick={() => { setRespProtocoloToDelete(row); console.log(row); }} >Eliminar</button>
            </div>
        }
    ]
    return (
        <>
            <div className='w-full h-full overflow-auto scroll p-8' >
                <div className="flex gap-5 mb-8 items-center">
                    <h1 className='font-bold text-3xl' >
                        Listado de Responsable Protocolo
                    </h1>
                </div>
                <div className="w-full mb-3 flex justify-between items-center" >
                    <div>
                        <label className="input input-bordered flex items-center gap-2">
                            <input type="text" className="grow" placeholder="Buscar responsable Protocolo" onChange={onChangeBuscador} />
                            <FaSearch className="text-gray-500" />
                        </label>
                    </div>
                    <div className="flex gap-3" >
                        <button className="btn btn-success" onClick={() => handleCreate()} >Nuevo Responsable Protocolo</button>
                        <button className="btn btn-primary" onClick={() => getDataExport()} disabled={buttonDisabled} >Exportar datos {selectedRows.length === 0 ? "(Todos)" : `(${selectedRows.length})`}</button>
                    </div>

                </div>
                <Table data={data} columns={columnas} selectableRows
                    onSelectedRowsChange={handleChange} paginationOptions={paginationOptions} onChangePage={onChangePage} onChangePerPage={onChangePerPage} progressPending={loading} />
            </div>
            <Modal id="Actividad" className="rounded-xl " isOpen={respProtocoloToEdit} onClose={() => { setRespProtocoloToEdit(null) }} >
                <div className='modal-header flex justify-between items-center border-b w-full px-10' >

                    <h1 className='text-2xl font-bold' >
                        {
                            respProtocoloToEdit ? "Editar Responsable Protocolo" : "Nuevo Responsable Protocolo"
                        }
                    </h1>
                    <button onClick={() => setRespProtocoloToEdit(null)} >
                        <FaXmark />
                    </button>
                </div>
                <div className='p-10' >
                    <form className='grid grid-cols-1 gap-5' >
                        <div className="flex gap-5">

                            <div>
                                <label className='label' >Código</label>
                                <input className='input input-bordered' defaultValue={respProtocoloToEdit ? respProtocoloToEdit.TFUN_ID : null} {...register('TFUN_ID', { required: true, minLength: 3 })} />
                            </div>
                            <div>
                                <label className='label' >Responsable Protocolo</label>
                                <input className='input input-bordered' defaultValue={respProtocoloToEdit ? respProtocoloToEdit.TFUN_NOMBRE : null} {...register('TFUN_NOMBRE', { required: true, minLength: 3 })} />
                            </div>
                            <div>
                                <label className='label' >Numero de orden</label>
                                <input type='number' min={1} className='input input-bordered' defaultValue={respProtocoloToEdit ? respProtocoloToEdit.TFUN_ORDEN : null} {...register('TFUN_ORDEN', { required: true })} />
                            </div>
                            <div>
                                <label className='label' >Estado</label>
                                <select className='input input-bordered' defaultValue={respProtocoloToEdit ? respProtocoloToEdit.TFUN_STATUS : null}  {...register('TFUN_STATUS', { required: true })} >
                                    <option value="1" >Activo</option>
                                    <option value="0" >Inactivo</option>
                                </select>
                            </div>
                        </div>

                        <div className='flex justify-end gap-3' >
                            <button className='btn btn-error' onClick={() => setRespProtocoloToEdit(null)} >Cancelar</button>
                            <button className='btn btn-success' onClick={handleSubmit(onSubmit)} disabled={buttonDisabled} >Guardar</button>
                        </div>
                    </form>
                </div>
            </Modal>
            {
                respProtocoloToDelete &&
                <Modal id='modalDeleteActividad' className="rounded-xl " isOpen={respProtocoloToDelete} onClose={() => setRespProtocoloToDelete(null)} >
                    <div className='modal-header flex justify-between items-center border-b w-full px-10' >
                        <div />
                        <h1 className='text-2xl font-bold' >
                            Eliminar Actividad
                        </h1>
                        <button onClick={() => setRespProtocoloToDelete(null)} >
                            <FaXmark />
                        </button>
                    </div>
                    <div>
                        <div className='p-10 flex flex-col items-center gap-3' >
                            <h1 className='text-xl' >
                                ¿Está seguro de eliminar el responsable Protocolo <span className='font-bold' >{respProtocoloToDelete.TFUN_NOMBRE}</span> con código <span className='font-bold' >{respProtocoloToDelete.TFUN_ID}</span>?
                            </h1>
                            <div>
                                <p className='font-bold mb-5' >
                                    Para confirmar la eliminación del responsable protocolo, por favor ingrese el código del responsable protocolo a eliminar.
                                </p>
                                <div className="form-control">

                                    <input type="text" placeholder="Código del responsable protocolo" className="input input-bordered" value={respProtocoloCodVerificar} onChange={(e) => setRespProtocoloCodVerificar(e.target.value)} onPaste={(e) => e.preventDefault()} />

                                </div>
                            </div>
                            <div className='flex justify-center gap-5 mt-5' >
                                <button className="btn btn-error" onClick={() => setRespProtocoloToDelete(null)} >Cancelar</button>
                                <button className="btn btn-success" onClick={() => onDeleteActivity(respProtocoloToDelete.TFUN_ID)} disabled={respProtocoloCodVerificar !== `${respProtocoloToDelete.TFUN_ID}` || buttonDisabled} >Eliminar</button>
                            </div>
                        </div>
                    </div>
                </Modal>
            }
        </>
    );
};

export default Page;
