"use client"
import Table from '@/components/shared/Table/Table';
import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import Modal from '@/components/shared/Modal';
import { useForm } from 'react-hook-form';
import { FaXmark } from 'react-icons/fa6';
import { generateDownloadExcel } from '@/utils/tools';
import { toast } from 'react-toastify';
import { createSubCategoryNovelty, deleteSubCategoryNovelty, getSubCategoryNovelty, updateSubCategoryNovelty } from "@/api/dashboard/parametros/subCateNovedad.api";

import { findAllCategories } from "@/api/dashboard/parametros/cateNovedad.api";

const Page = () => {
    //          {
    //             "NOVRUTA_ID": 16,
    //             "NOVRUTA_IDTIPO": 27,
    //             "NOVRUTA_DESCRIPCION": "NO HAY ACCESO EN FINCA",
    //             "NOVRUTA_STATUS": "1"
    //         },
    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm();

    const [selectedRows, setSelectedRows] = useState<any[]>([]);

    const [data, setData] = useState<any[]>([]);

    const [categoryNovelty, setCategoryNovelty] = useState<any[]>([]);

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

    const [subCatNovedadToEdit, setSubCatNovedadToEdit] = useState<any | null>(null);

    const [subCatNovedadToDelete, setSubCatNovedadToDelete] = useState<any | null>(null);

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
            const response = await getSubCategoryNovelty(1, paginationOptions.itemCount);
            data = response?.data;
        }
        const dataExport: { [key: string]: any }[] = [];

        data.forEach((element: any) => {
            dataExport.push({
                "ID": element.NOVRUTA_ID,
                "Categoria Novedad": element.NOVRUTA_DESCRIPCION,
                "Estado": element.NOVRUTA_STATUS === '1' ? 'Activo' : 'Inactivo',
            });
        });
        generateDownloadExcel(dataExport, "Sub-Categoria Novedades");
        setButtonDisabled(false);
    };

    const onSubmit = async (data: any) => {
        setButtonDisabled(true);

        console.log(data);
        data.NOVRUTA_IDTIPO = Number.parseInt(data.NOVRUTA_IDTIPO);
        try {
            if (subCatNovedadToEdit.NOVRUTA_ID) {
                const response = await updateSubCategoryNovelty(data, subCatNovedadToEdit.NOVRUTA_ID);
                if (response) {
                    fetchData();
                    setSubCatNovedadToEdit(null);
                    toast.success("Sub-Categoria novedad actualizada correctamente");
                }
            } else {
                const response = await createSubCategoryNovelty(data);
                if (response) {
                    fetchData();
                    setSubCatNovedadToEdit(null);
                    toast.success("Sub-Categoria novedad creada correctamente");
                }
            }
        } catch (error: any) {
            console.log(error);
        }
        setButtonDisabled(false);
    }

    const handleCreate = () => {
        setSubCatNovedadToEdit({
            NOVRUTA_ID: null,
            NOVRUTA_DESCRIPCION: null,
            TIPRUTA_STATUS: '1'
        });
    }

    const fetchData = async (page: number = paginationOptions.page, take: number = paginationOptions.take, termino: string | null = null) => {

        try {

            termino = termino !== null ? termino : term;
            setLoading(true);

            const responseCategory = await findAllCategories();
            setCategoryNovelty(responseCategory.data);
            const response = await getSubCategoryNovelty(page, take, termino || "");
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
            const response = await deleteSubCategoryNovelty(id);
            if (response) {
                fetchData();
                setSubCatNovedadToDelete(null);
                toast.success("Sub-categoria novedad eliminada correctamente");
            }
        } catch (error: any) {
            console.log(error);
            toast.error("Error al eliminar la sub-categoria novedad");
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
        if (subCatNovedadToEdit) {
            for (const key in subCatNovedadToEdit) {
                setValue(key, subCatNovedadToEdit[key])
            }
        } else {
            reset()
        }
    }, [subCatNovedadToEdit])

    const columnas = [
        {
            name: "Categoria",
            cell: (row: any) => categoryNovelty.find((cat: any) => cat.TIPRUTA_ID === row.NOVRUTA_IDTIPO)?.TIPRUTA_DESCRIPCION,
        },
        {
            name: "Novedad",
            cell: (row: any) => row.NOVRUTA_DESCRIPCION,
            selector: (row: any) => row.NOVRUTA_DESCRIPCION,
            sortable: true,
        },
        {
            name: "Acciones",
            cell: (row: any) => <div className="flex gap-3" >
                <button className="btn btn-sm btn-warning" onClick={() => setSubCatNovedadToEdit(row)} >Editar</button>
                <button className="btn btn-sm btn-error" onClick={() => { setSubCatNovedadToDelete(row); console.log(row); }} >Eliminar</button>
            </div>
        }
    ];

    return (
        <>
            <div className='w-full h-full overflow-auto scroll p-8' >
                <div className="flex gap-5 mb-8 items-center">
                    <h1 className='font-bold text-3xl' >
                        Listado de Sub-Categoria Novedades
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
                        <button className="btn btn-success" onClick={() => handleCreate()} >Nueva Sub-Categoria Novedad</button>
                        <button className="btn btn-primary" onClick={() => getDataExport()} disabled={buttonDisabled} >Exportar datos {selectedRows.length === 0 ? "(Todos)" : `(${selectedRows.length})`}</button>
                    </div>

                </div>
                <Table data={data} columns={columnas} selectableRows
                    onSelectedRowsChange={handleChange} paginationOptions={paginationOptions} onChangePage={onChangePage} onChangePerPage={onChangePerPage} progressPending={loading} />
            </div>
            <Modal id="Sub-CategoriaNovedad" className="rounded-xl " isOpen={subCatNovedadToEdit} onClose={() => { setSubCatNovedadToEdit(null) }} >
                <div className='modal-header flex justify-between items-center border-b w-full px-10' >

                    <h1 className='text-2xl font-bold' >
                        {
                            subCatNovedadToEdit ? "Editar Sub-Categoria novedad" : "Nueva Sub-Categoria novedad"
                        }
                    </h1>
                    <button onClick={() => setSubCatNovedadToEdit(null)} >
                        <FaXmark />
                    </button>
                </div>
                <div className='p-10' >
                    <form className='grid grid-cols-1 gap-5' >
                        <div className="flex gap-5">


                            <div className="w-[350px]">
                                <label className='label' >Categoria</label>
                                <select className='input input-bordered w-full' defaultValue={subCatNovedadToEdit ? subCatNovedadToEdit.NOVRUTA_IDTIPO : null} {...register('NOVRUTA_IDTIPO', { required: true })} >
                                    {
                                        categoryNovelty.map((cat: any) => (
                                            <option value={cat.TIPRUTA_ID} key={cat.TIPRUTA_ID} >{cat.TIPRUTA_DESCRIPCION}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className='w-[125px]'>
                                <label className='label' >Estado</label>
                                <select className='input input-bordered w-full' defaultValue={subCatNovedadToEdit ? subCatNovedadToEdit.NOVRUTA_STATUS : null}  {...register('NOVRUTA_STATUS', { required: true })} >
                                    <option value="1" >Activo</option>
                                    <option value="0" >Inactivo</option>
                                </select>
                            </div>


                        </div>
                        <div className="w-full">
                            <label className='label' >Novedad</label>
                            <textarea className='textarea textarea-bordered w-full' defaultValue={subCatNovedadToEdit ? subCatNovedadToEdit.NOVRUTA_DESCRIPCION : null} {...register('NOVRUTA_DESCRIPCION', { required: true })} placeholder="Novedad" />
                        </div>

                        <div className='flex justify-end gap-3' >
                            <button className='btn btn-error' onClick={() => setSubCatNovedadToEdit(null)} >Cancelar</button>
                            <button className='btn btn-success' disabled={buttonDisabled} onClick={handleSubmit(onSubmit)} >Guardar</button>
                        </div>
                    </form>
                </div>
            </Modal>
            {
                subCatNovedadToDelete &&
                <Modal id='modalDeleteCatNov' className="rounded-xl " isOpen={subCatNovedadToDelete} onClose={() => setSubCatNovedadToDelete(null)} >
                    <div className='modal-header flex justify-between items-center border-b w-full px-10' >
                        <div />
                        <h1 className='text-2xl font-bold' >
                            Eliminar Novedad
                        </h1>
                        <button onClick={() => setSubCatNovedadToDelete(null)} >
                            <FaXmark />
                        </button>
                    </div>
                    <div>
                        <div className='p-10 flex flex-col items-center gap-3' >
                            <h1 className='text-xl' >

                                ¿Está seguro de eliminar la novedad <span className='font-bold' >{subCatNovedadToDelete.NOVRUTA_DESCRIPCION}</span>?
                            </h1>
                            <div>
                                <p className='font-bold mb-5' >
                                    Para confirmar la eliminación de la novedad, por favor ingrese la novedad a eliminar.
                                </p>
                                <div className="form-control">

                                    <input type="text" placeholder="Novedad" className="input input-bordered" value={codVerificar} onChange={(e) => setCodVerificar(e.target.value)} onPaste={(e) => e.preventDefault()} />

                                </div>
                            </div>
                            <div className='flex justify-center gap-5 mt-5' >
                                <button className="btn btn-error" onClick={() => setSubCatNovedadToDelete(null)} >Cancelar</button>
                                <button className="btn btn-success" onClick={() => onDeleteActivity(subCatNovedadToDelete.NOVRUTA_ID)} disabled={codVerificar !== `${subCatNovedadToDelete.NOVRUTA_DESCRIPCION}` || buttonDisabled} >Eliminar</button>
                            </div>
                        </div>
                    </div>
                </Modal>
            }
        </>
    );
};

export default Page;
