"use client"
import Table from '@/components/shared/Table/Table';
import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import Modal from '@/components/shared/Modal';
import { createTravelReason, deleteTravelReason, getTravelReasons, updateTravelReason } from "@/api/dashboard/parametros/motivoViaticos.api";
import { useForm } from 'react-hook-form';
import { FaXmark } from 'react-icons/fa6';
import { generateDownloadExcel } from '@/utils/tools';
import { toast } from 'react-toastify';

const Page = () => {
    // {
    //     "VIATIMOT_ID": 6,
    //     "VIATIMOT_DESCRIPCION": "LAVADO CABEZOTE",
    //     "VIATIMOT_REQUIEREFOTO": "1",
    //     "VIATIMOT_STATUS": "1"
    // },
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

    const [motViaticoToEdit, setMotViaticoToEdit] = useState<any | null>(null);

    const [motViaticoToDelete, setMotViaticoToDelete] = useState<any | null>(null);

    const [codVerificar, setCodVerificar] = useState<string>('');

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
            const response = await getTravelReasons(1, paginationOptions.itemCount);
            data = response?.data;
        }
        const dataExport: { [key: string]: any }[] = [];

        data.forEach((element: any) => {
            dataExport.push({
                "Descripción": element.VIATIMOT_DESCRIPCION,
                "Requiere foto": element.VIATIMOT_REQUIEREFOTO === '1' ? 'Si requiere' : 'No requiere',
                "Estado": element.VIATIMOT_STATUS === '1' ? 'Activo' : 'Inactivo',
            });
        });
        generateDownloadExcel(dataExport, "Motivos de viaticos");
        setButtonDisabled(false);
    };

    const onSubmit = async (data: any) => {
        setButtonDisabled(true);

        console.log(data);
        try {
            if (motViaticoToEdit.TIPRUTA_ID) {
                const response = await updateTravelReason(data, motViaticoToEdit.TIPRUTA_ID);
                if (response) {
                    fetchData();
                    setMotViaticoToEdit(null);
                    toast.success("Motivo viatico actualizado correctamente");
                }
            } else {
                const response = await createTravelReason(data);
                if (response) {
                    fetchData();
                    setMotViaticoToEdit(null);
                    toast.success("Motivo viatico creado correctamente");
                }
            }
        } catch (error: any) {
            console.log(error);
        }
        setButtonDisabled(false);
    }

    const handleCreate = () => {
        setMotViaticoToEdit({
            TIPRUTA_ID: null,
            TIPRUTA_DESCRIPCION: null,
            TIPRUTA_STATUS: '1'
        });
    }

    const fetchData = async (page: number = paginationOptions.page, take: number = paginationOptions.take, termino: string | null = null) => {

        try {
            termino = termino !== null ? termino : term;
            setLoading(true);
            const response = await getTravelReasons(page, take, termino || "");
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
            const response = await deleteTravelReason(id);
            if (response) {
                fetchData();
                setMotViaticoToDelete(null);
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
        if (motViaticoToEdit) {
            for (const key in motViaticoToEdit) {
                setValue(key, motViaticoToEdit[key])
            }
        } else {
            reset()
        }
    }, [motViaticoToEdit])

    const columnas = [

        {
            name: "Categoria Novedad",
            cell: (row: any) => row.TIPRUTA_DESCRIPCION,
            selector: (row: any) => row.TIPRUTA_DESCRIPCION,
            sortable: true,
        },

        {
            name: "Acciones",
            cell: (row: any) => <div className="flex gap-3" >
                <button className="btn btn-sm btn-warning" onClick={() => setMotViaticoToEdit(row)} >Editar</button>
                <button className="btn btn-sm btn-error" onClick={() => { setMotViaticoToDelete(row); console.log(row); }} >Eliminar</button>
            </div>
        }
    ]
    return (
        <>
            <div className='w-full h-full overflow-auto scroll p-8' >
                <div className="flex gap-5 mb-8 items-center">
                    <h1 className='font-bold text-3xl' >
                        Listado de Categoria Novedades
                    </h1>
                </div>
                <div className="w-full mb-3 flex justify-between items-center" >
                    <div>
                        <label className="input input-bordered flex items-center gap-2">
                            <input type="text" className="grow" placeholder="Buscar categoria novedad" onChange={onChangeBuscador} />
                            <FaSearch className="text-gray-500" />
                        </label>
                    </div>
                    <div className="flex gap-3" >
                        <button className="btn btn-success" onClick={() => handleCreate()} >Nueva Categoria Novedad</button>
                        <button className="btn btn-primary" onClick={() => getDataExport()} disabled={buttonDisabled} >Exportar datos {selectedRows.length === 0 ? "(Todos)" : `(${selectedRows.length})`}</button>
                    </div>

                </div>
                <Table data={data} columns={columnas} selectableRows
                    onSelectedRowsChange={handleChange} paginationOptions={paginationOptions} onChangePage={onChangePage} onChangePerPage={onChangePerPage} progressPending={loading} />
            </div>
            <Modal id="CategoriaNovedad" className="rounded-xl " isOpen={motViaticoToEdit} onClose={() => { setMotViaticoToEdit(null) }} >
                <div className='modal-header flex justify-between items-center border-b w-full px-10' >

                    <h1 className='text-2xl font-bold' >
                        {
                            motViaticoToEdit ? "Editar Categoria novedad" : "Nueva Categoria novedad"
                        }
                    </h1>
                    <button onClick={() => setMotViaticoToEdit(null)} >
                        <FaXmark />
                    </button>
                </div>
                <div className='p-10' >
                    <form className='grid grid-cols-1 gap-5' >
                        <div className="flex gap-5">


                            <div className="w-[350px]">
                                <label className='label' >Categoria Novedad</label>
                                <textarea className='textarea textarea-bordered w-full' defaultValue={motViaticoToEdit ? motViaticoToEdit.TIPRUTA_DESCRIPCION : null} {...register('TIPRUTA_DESCRIPCION', { required: true, minLength: 3 })} placeholder="Categoria Novedad" />
                            </div>
                            <div className='w-[125px]'>
                                <label className='label' >Estado</label>
                                <select className='input input-bordered w-full' defaultValue={motViaticoToEdit ? motViaticoToEdit.TIPRUTA_STATUS : null}  {...register('TIPRUTA_STATUS', { required: true })} >
                                    <option value="1" >Activo</option>
                                    <option value="0" >Inactivo</option>
                                </select>
                            </div>
                        </div>

                        <div className='flex justify-end gap-3' >
                            <button className='btn btn-error' onClick={() => setMotViaticoToEdit(null)} >Cancelar</button>
                            <button className='btn btn-success' disabled={buttonDisabled} onClick={handleSubmit(onSubmit)} >Guardar</button>
                        </div>
                    </form>
                </div>
            </Modal>
            {
                motViaticoToDelete &&
                <Modal id='modalDeleteCatNov' className="rounded-xl " isOpen={motViaticoToDelete} onClose={() => setMotViaticoToDelete(null)} >
                    <div className='modal-header flex justify-between items-center border-b w-full px-10' >
                        <div />
                        <h1 className='text-2xl font-bold' >
                            Eliminar Categoria Novedad
                        </h1>
                        <button onClick={() => setMotViaticoToDelete(null)} >
                            <FaXmark />
                        </button>
                    </div>
                    <div>
                        <div className='p-10 flex flex-col items-center gap-3' >
                            <h1 className='text-xl' >

                                ¿Está seguro de eliminar la categoria novedad <span className='font-bold' >{motViaticoToDelete.TIPRUTA_DESCRIPCION}</span>?
                            </h1>
                            <div>
                                <p className='font-bold mb-5' >
                                    Para confirmar la eliminación de la categoria novedad, por favor ingrese la categoría novedad a eliminar.
                                </p>
                                <div className="form-control">

                                    <input type="text" placeholder="Código de la actividad" className="input input-bordered" value={codVerificar} onChange={(e) => setCodVerificar(e.target.value)} onPaste={(e) => e.preventDefault()} />

                                </div>
                            </div>
                            <div className='flex justify-center gap-5 mt-5' >
                                <button className="btn btn-error" onClick={() => setMotViaticoToDelete(null)} >Cancelar</button>
                                <button className="btn btn-success" onClick={() => onDeleteActivity(motViaticoToDelete.TIPRUTA_ID)} disabled={codVerificar !== `${motViaticoToDelete.TIPRUTA_DESCRIPCION}` || buttonDisabled} >Eliminar</button>
                            </div>
                        </div>
                    </div>
                </Modal>
            }
        </>
    );
};

export default Page;
