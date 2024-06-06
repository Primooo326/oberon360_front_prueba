"use client"
import Table from '@/components/shared/Table/Table';
import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { createActivity, deleteActivity, getActivities, updateActivity } from "@/api/dashboard/parametros/actividades.api"
import Modal from '@/components/shared/Modal';
import { useForm } from 'react-hook-form';
import { FaXmark } from 'react-icons/fa6';
import { generateDownloadExcel } from '@/utils/tools';
import { toast } from 'react-toastify';

const Page = () => {

    // {
    //         "PREFUN_ID": "VIAT",
    //         "PREFUN_PREGUNTA": "LEGALIZACIÓN VIÁTICOS",
    //         "PREFUN_STATUS": "0"
    //     }
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

    const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);

    const [actividadToEdit, setActividadToEdit] = useState<any | null>(null);

    const [actividadToDelete, setActividadToDelete] = useState<any | null>(null);

    const [actividadCodVerificar, setActividadCodVerificar] = useState<string>('');

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
            const response = await getActivities(1, paginationOptions.itemCount);
            data = response?.data;
        }
        const dataExport: { [key: string]: any }[] = [];

        data.forEach((element: any) => {
            dataExport.push({
                "Código": element.PREFUN_ID,
                "Actividad": element.PREFUN_PREGUNTA,
                "Estado": element.PREFUN_STATUS === '1' ? 'Activo' : 'Inactivo',
            });
        });
        generateDownloadExcel(dataExport, "Actividades");
        setButtonDisabled(false);
    };

    const onSubmit = async (data: any) => {
        setButtonDisabled(true);

        console.log(data);
        try {
            if (actividadToEdit.PREFUN_ID) {
                const response = await updateActivity(data, actividadToEdit.PREFUN_ID);
                if (response) {
                    fetchData();
                    setActividadToEdit(null);
                    toast.success("Actividad actualizada correctamente");
                }
            } else {
                const response = await createActivity(data);
                if (response) {
                    fetchData();
                    setActividadToEdit(null);
                    toast.success("Actividad creada correctamente");
                }
            }
        } catch (error: any) {
            console.log(error);
        }
        setButtonDisabled(false);
    }

    const handleCreate = () => {
        setActividadToEdit({
            PREFUN_ID: "",
            PREFUN_PREGUNTA: "",
            PREFUN_STATUS: "1"
        });
    }

    const fetchData = async (page: number = paginationOptions.page, take: number = paginationOptions.take, termino: string | null = null) => {

        try {
            termino = termino !== null ? termino : term;
            setLoading(true);
            const response = await getActivities(page, take, termino || "");
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
            const response = await deleteActivity(id);
            if (response) {
                fetchData();
                setActividadToDelete(null);
                toast.success("Actividad eliminada correctamente");
            }
        } catch (error: any) {
            console.log(error);
            toast.error("Error al eliminar la actividad");
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
        if (actividadToEdit) {
            for (const key in actividadToEdit) {
                setValue(key, actividadToEdit[key])
            }
        } else {
            reset()
        }
    }, [actividadToEdit])

    const columnas = [
        {
            name: "Código",
            cell: (row: any) => row.PREFUN_ID,
            sortable: true,

        },
        {
            name: "Actividad",
            cell: (row: any) => row.PREFUN_PREGUNTA,
            selector: (row: any) => row.PREFUN_PREGUNTA,
            sortable: true,
        },
        {
            name: "Estado",
            cell: (row: any) => row.PREFUN_STATUS === '1' ? <span className='badge badge-success'>Activo</span> : <span className='badge badge-error'>Inactivo</span>,
        },
        {
            name: "Acciones",
            cell: (row: any) => <div className="flex gap-3" >
                <button className="btn btn-sm btn-warning" onClick={() => setActividadToEdit(row)} >Editar</button>
                <button className="btn btn-sm btn-error" onClick={() => { setActividadToDelete(row); console.log(row); }} >Eliminar</button>
            </div>
        }
    ]
    return (
        <>
            <div className='w-full h-full overflow-auto scroll p-8' >
                <div className="flex gap-5 mb-8 items-center">
                    <h1 className='font-bold text-3xl' >
                        Listado de Actividades
                    </h1>
                </div>
                <div className="w-full mb-3 flex justify-between items-center" >
                    <div>
                        <label className="input input-bordered flex items-center gap-2">
                            <input type="text" className="grow" placeholder="Buscar actividad" onChange={onChangeBuscador} />
                            <FaSearch className="text-gray-500" />
                        </label>
                    </div>
                    <div className="flex gap-3" >
                        <button className="btn btn-success" onClick={() => handleCreate()} >Nueva Actividad</button>
                        <button className="btn btn-primary" onClick={() => getDataExport()} disabled={buttonDisabled} >Exportar datos {selectedRows.length === 0 ? "(Todos)" : `(${selectedRows.length})`}</button>
                    </div>

                </div>
                <Table data={data} columns={columnas} selectableRows
                    onSelectedRowsChange={handleChange} paginationOptions={paginationOptions} onChangePage={onChangePage} onChangePerPage={onChangePerPage} progressPending={loading} />
            </div>
            <Modal id="Actividad" className="rounded-xl " isOpen={actividadToEdit} onClose={() => { setActividadToEdit(null) }} >
                <div className='modal-header flex justify-between items-center border-b w-full px-10' >

                    <h1 className='text-2xl font-bold' >
                        {
                            actividadToEdit ? "Editar Actividad" : "Nueva Actividad"
                        }
                    </h1>
                    <button onClick={() => setActividadToEdit(null)} >
                        <FaXmark />
                    </button>
                </div>
                <div className='p-10' >
                    <form className='grid grid-cols-1 gap-5' >
                        <div className="flex gap-5">

                            <div>
                                <label className='label' >Código</label>
                                <input className='input input-bordered' defaultValue={actividadToEdit ? actividadToEdit.PREFUN_ID : null} {...register('PREFUN_ID', { required: true, minLength: 3 })} />
                            </div>
                            <div>
                                <label className='label' >Actividad</label>
                                <input className='input input-bordered' defaultValue={actividadToEdit ? actividadToEdit.PREFUN_PREGUNTA : null} {...register('PREFUN_PREGUNTA', { required: true, minLength: 3 })} />
                            </div>
                            <div>
                                <label className='label' >Estado</label>
                                <select className='input input-bordered' defaultValue={actividadToEdit ? actividadToEdit.PREFUN_STATUS : null}  {...register('PREFUN_STATUS', { required: true })} >
                                    <option value="1" >Activo</option>
                                    <option value="0" >Inactivo</option>
                                </select>
                            </div>
                        </div>

                        <div className='flex justify-end gap-3' >
                            <button className='btn btn-error' onClick={() => setActividadToEdit(null)} >Cancelar</button>
                            <button className='btn btn-success' disabled={buttonDisabled} onClick={handleSubmit(onSubmit)} >Guardar</button>
                        </div>
                    </form>
                </div>
            </Modal>
            {
                actividadToDelete &&
                <Modal id='modalDeleteActividad' className="rounded-xl " isOpen={actividadToDelete} onClose={() => setActividadToDelete(null)} >
                    <div className='modal-header flex justify-between items-center border-b w-full px-10' >
                        <div />
                        <h1 className='text-2xl font-bold' >
                            Eliminar Actividad
                        </h1>
                        <button onClick={() => setActividadToDelete(null)} >
                            <FaXmark />
                        </button>
                    </div>
                    <div>
                        <div className='p-10 flex flex-col items-center gap-3' >
                            <h1 className='text-xl' >
                                ¿Está seguro de eliminar la actividad <span className='font-bold' >{actividadToDelete.PREFUN_PREGUNTA}</span> con código <span className='font-bold' >{actividadToDelete.PREFUN_ID}</span>?
                            </h1>
                            <div>
                                <p className='font-bold mb-5' >
                                    Para confirmar la eliminación de la actividad, por favor ingrese el código de la actividad a eliminar.
                                </p>
                                <div className="form-control">

                                    <input type="text" placeholder="Código de la actividad" className="input input-bordered" value={actividadCodVerificar} onChange={(e) => setActividadCodVerificar(e.target.value)} onPaste={(e) => e.preventDefault()} />

                                </div>
                            </div>
                            <div className='flex justify-center gap-5 mt-5' >
                                <button className="btn btn-error" onClick={() => setActividadToDelete(null)} >Cancelar</button>
                                <button className="btn btn-success" onClick={() => onDeleteActivity(actividadToDelete.PREFUN_ID)} disabled={actividadCodVerificar !== `${actividadToDelete.PREFUN_ID}` || buttonDisabled} >Eliminar</button>
                            </div>
                        </div>
                    </div>
                </Modal>
            }
        </>
    );
};

export default Page;
