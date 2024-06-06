"use client"
import React from 'react'
import { getDrivers, findAllDrivers, updateDriver, createDriver, deleteDriver } from '@/api/dashboard/parametros/conductor.api';
import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import Modal from '@/components/shared/Modal';
import { FaPen, FaXmark } from 'react-icons/fa6';
import { useForm, type SubmitHandler } from "react-hook-form"
import { toast } from 'react-toastify';
import Table from '@/components/shared/Table/Table';
import { generateDownloadExcel } from '@/utils/tools';
export default function page() {

    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm();

    const [data, setData] = useState<any[]>([]);

    const [selectedRows, setSelectedRows] = useState<any[]>([]);

    const [imgSelected, setImgSelected] = useState<string>("");

    const [imgToChange, setImgToChange] = useState<any>();

    const [conductorToEdit, setConductorToEdit] = useState<any>();

    const [conductorToDelete, setConductorToDelete] = useState<any>();

    const [conductorCodVerificar, setConductorCodVerificar] = useState<string>("");

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

    const [term, setTerm] = useState<string>('');

    const [loading, setLoading] = useState<boolean>(true);


    const onSubmit: SubmitHandler<any> = async (data) => {
        let base64 = null;
        setButtonDisabled(true);
        if (imgToChange) {

            const base64Convert = new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(imgToChange);
                reader.onloadend = () => {
                    resolve(reader.result!.toString().split(',')[1]);
                };
                reader.onerror = () => {
                    console.error("Error reading file");
                    reject(null);
                };
            }
            );
            base64 = await base64Convert;
        }

        console.log(data);
        const dataToSend = {
            ...data,
            CONDUCTOR_ID_RH: Number(data.CONDUCTOR_ID_RH),
            CONDUCTOR_ID_TIPOIDENTIFICACION: `${data.CONDUCTOR_ID_TIPOIDENTIFICACION}`,
            CONDUCTOR_ESTADO: `${data.CONDUCTOR_ESTADO}`,
            CONDUCTOR_FOTO: base64
        }

        if (conductorToEdit.CONDUCTOR_ID !== 0) {
            await updateDriver(dataToSend, conductorToEdit.CONDUCTOR_ID).then(() => {
                setConductorToEdit(null);
                fetchData();
                toast.success('Conductor actualizado correctamente');
            }).catch((error) => {
                console.error('Error updating driver:', error);
                toast.error('Error actualizando conductor');
            });
        } else {
            await createDriver(dataToSend).then(() => {
                setConductorToEdit(null);
                fetchData();
                toast.success('Conductor creado correctamente');
            }).catch((error) => {
                console.error('Error creating driver:', error);
                toast.error('Error creando conductor');
            });
        }
        setButtonDisabled(false);
    }

    const onChangeBuscador = (e: any) => {
        setTerm(e.target.value);
        fetchData(1, paginationOptions.take, e.target.value);
    }

    const handleChange = ({ selectedRows }: any) => {
        setSelectedRows(selectedRows);
    };

    const handleCreate = () => {
        console.log("create");
        setConductorToEdit({
            CONDUCTOR_ID: 0,
            CONDUCTOR_PRIMERNOMBRE: "",
            CONDUCTOR_SEGUNDONOMBRE: "",
            CONDUCTOR_PRIMERAPELLIDO: "",
            CONDUCTOR_SEGUNDOAPELLIDO: "",
            CONDUCTOR_CORREO: "",
            CONDUCTOR_CODCONDUCTOR: "",
            CONDUCTOR_TELPERSONAL: "",
            CONDUCTOR_TELCORPORATIVO: "",
            CONDUCTOR_IDENTIFICACION: "",
            CONDUCTOR_ID_RH: 1,
            CONDUCTOR_ID_TIPOIDENTIFICACION: 1,
            CONDUCTOR_ESTADO: 1,
            CONDUCTOR_FOTO: "",
            mapFactorRh: { FACTOR_RH_DESCRIPCION: "A -", FACTOR_RH_ID_REG: 1 },
            mapTypeIdentification: { TIP_IDEN_DESCRIPCION: "CEDULA DE CUIDADANIA", TIP_IDEN_ID: 1 }
        });
        setImgSelected("");
    }

    const handleChangeImage = (e: any) => {
        const file = e.target.files[0];
        setImgToChange(file);
    }

    const getDataExport = async () => {
        setButtonDisabled(true);

        let data = [];
        if (selectedRows.length) {
            data = selectedRows;
        } else {
            const response = await findAllDrivers();
            data = response?.data;
        }
        const dataExport: { [key: string]: any }[] = [];

        data.forEach((element: any) => {
            dataExport.push({
                "ID": element?.CONDUCTOR_ID,
                "Tipo de Documento": element?.mapTypeIdentification?.TIP_IDEN_DESCRIPCION,
                "Documento": element?.CONDUCTOR_IDENTIFICACION,
                "Código": element?.CONDUCTOR_CODCONDUCTOR,
                "Nombre Completo": `${element?.CONDUCTOR_PRIMERNOMBRE} ${element?.CONDUCTOR_SEGUNDONOMBRE} ${element?.CONDUCTOR_PRIMERAPELLIDO} ${element?.CONDUCTOR_SEGUNDOAPELLIDO}`,
                "Teléfono Personal": element?.CONDUCTOR_TELPERSONAL,
                "Teléfono Corporativo": element?.CONDUCTOR_TELCORPORATIVO,
                "Correo Electrónico": element?.CONDUCTOR_CORREO,
                "RH": element?.mapFactorRh?.FACTOR_RH_DESCRIPCION
            });
        });
        generateDownloadExcel(dataExport, "Conductores");
        setButtonDisabled(false);
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

    const fetchData = async (page: number = paginationOptions.page, take: number = paginationOptions.take, termino: string | null = null) => {
        try {
            termino = termino !== null ? termino : term;
            setLoading(true);
            const response2 = await getDrivers(page, take, termino || "");
            setData(response2.data);
            setPaginationOptions({
                currentItems: response2.data,
                page: response2.meta.page,
                take: response2.meta.take,
                itemCount: response2.meta.itemCount,
                pageCount: response2.meta.pageCount,
                hasPreviousPage: response2.meta.hasPreviousPage,
                hasNextPage: response2.meta.hasNextPage
            });
            console.log(response2);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error('Error fetching data:', error);
        }
    };

    const deleteConductor = async () => {
        setButtonDisabled(true);

        try {
            await deleteDriver(conductorToDelete.CONDUCTOR_ID);
            setConductorToDelete(null);
            fetchData();
            toast.success('Conductor eliminado correctamente');
        } catch (error) {
            console.error('Error deleting driver:', error);
            toast.error('Error eliminando conductor');
        }
        setButtonDisabled(false);
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (conductorToEdit) {
            for (const key in conductorToEdit) {
                setValue(key, conductorToEdit[key]);
            }
            setImgSelected(conductorToEdit.CONDUCTOR_FOTO || "");
        } else {
            reset();
            setImgSelected("");
        }
    }, [conductorToEdit, setValue, reset]);


    const columnas: any = [
        {
            name: 'Conductor',
            cell: (row: any) => <div className={`avatar size-16 relative ${row.CONDUCTOR_FOTO ? "" : "placeholder"}`} >
                {row.CONDUCTOR_FOTO ? (
                    <img src={`data:image/jpeg;base64,${row.CONDUCTOR_FOTO}`} alt="conductor foto" className="rounded-full border size-full object-cover" />
                ) : (
                    <div className="bg-neutral text-neutral-content rounded-full w-48">
                        <span className="text-lg">No Foto</span>
                    </div>
                )}
            </div>,
        },
        {
            name: 'Nombre',
            cell: (row: any) => <span>{`${row.CONDUCTOR_PRIMERNOMBRE || ""} ${row.CONDUCTOR_SEGUNDONOMBRE || ""} ${row.CONDUCTOR_PRIMERAPELLIDO || ""} ${row.CONDUCTOR_SEGUNDOAPELLIDO || ""}`}</span>,
            selector: (row: any) => row.CONDUCTOR_PRIMERNOMBRE,
        },
        {

            name: 'Código',
            cell: (row: any) => row.CONDUCTOR_CODCONDUCTOR,
            selector: (row: any) => row.CONDUCTOR_CODCONDUCTOR,
            sortable: true,
        },
        {
            name: "Correo Electrónico",
            cell: (row: any) => row.CONDUCTOR_CORREO,
            selector: (row: any) => row.CONDUCTOR_CORREO,
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
        },
        {
            name: 'Tipo de Documento',
            cell: (row: any) => row.mapTypeIdentification.TIP_IDEN_DESCRIPCION,
            sortable: true,
        },
        {
            name: 'Numero de Documento',
            cell: (row: any) => row.CONDUCTOR_IDENTIFICACION,
            selector: (row: any) => row.CONDUCTOR_IDENTIFICACION,
            sortable: true,
        },

        {
            name: "RH",
            cell: (row: any) => row.mapFactorRh ? row.mapFactorRh.FACTOR_RH_DESCRIPCION : "No definido",
            selector: (row: any) => row.mapFactorRh ? row.mapFactorRh.FACTOR_RH_DESCRIPCION : "No definido",

        },
        {
            name: "Estado",
            cell: (row: any) => row.CONDUCTOR_ESTADO !== "1" ? <span className='badge badge-error'> Inactivo</span> : <span className='badge badge-success'> Activo</span>,
            selector: (row: any) => row.CONDUCTOR_ESTADO,
        },
        {
            name: 'Acciones',
            cell: (row: any) => <div className='flex gap-3' >
                <button className="btn btn-sm btn-warning" onClick={() => { setConductorToEdit(row); console.log(row); }} >Editar</button>
                <button className="btn btn-sm btn-error" onClick={() => setConductorToDelete(row)} >Eliminar</button>
            </div>
        }
    ];

    return (
        <div className='w-full h-full overflow-auto scroll p-8' >
            <div className="flex gap-5 mb-8 items-center">
                <h1 className='font-bold text-3xl' >
                    Listado de Conductores
                </h1>
            </div>
            <div className="w-full mb-3 flex justify-between items-center" >
                <div>
                    <label className="input input-bordered flex items-center gap-2">
                        <input onChange={onChangeBuscador} type="text" className="grow" placeholder="Buscar conductor" />
                        <FaSearch className="text-gray-500" />
                    </label>
                </div>
                <div className="flex gap-3" >
                    <button className="btn btn-success" onClick={() => handleCreate()} >Nuevo Conductor</button>
                    <button disabled={buttonDisabled} className="btn btn-primary" onClick={() => getDataExport()}>Exportar datos {selectedRows.length === 0 ? "(Todos)" : `(${selectedRows.length})`}</button>
                </div>

            </div>
            <Table data={data} columns={columnas} selectableRows
                onSelectedRowsChange={handleChange} paginationOptions={paginationOptions} onChangePage={onChangePage} onChangePerPage={onChangePerPage} progressPending={loading} />

            <Modal id='modalEditConductor' className="rounded-xl " isOpen={conductorToEdit} canCloseEsc={false} onClose={() => setConductorToEdit(null)} canCloseOut={false} >
                <div className='modal-header flex justify-between items-center border-b w-full px-10' >
                    <div />
                    <h1 className='text-2xl font-bold' >
                        {
                            conductorToEdit ? "Editar Conductor" : "Nuevo Conductor"
                        }
                    </h1>
                    <button onClick={() => setConductorToEdit(null)} >
                        <FaXmark />
                    </button>
                </div>
                <div>
                    <form className='p-10' >
                        <div className='flex flex-col items-center gap-3'>

                            <div className={`avatar size-48 relative ${imgSelected ? "" : "placeholder"}`} >
                                {imgToChange ? (
                                    <img src={URL.createObjectURL(imgToChange)} alt="conductor foto" className="rounded-full border size-full object-cover" />
                                ) : (
                                    conductorToEdit && (conductorToEdit.CONDUCTOR_FOTO ? (
                                        <img src={`data:image/jpeg;base64,${conductorToEdit.CONDUCTOR_FOTO}`} alt="conductor foto" className="rounded-full border size-full object-cover" />
                                    ) : (
                                        <div className="bg-neutral text-neutral-content rounded-full w-48">
                                            <span className="text-3xl">No Foto</span>
                                        </div>

                                    ))

                                )}
                                <button className="btn btn-primary rounded-full absolute top-0 right-0" onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById('imageLoader')?.click();
                                }} ><FaPen /></button>
                                <input type="file" className="hidden" id='imageLoader' accept='image/*' onChange={handleChangeImage} />
                            </div>

                            <div className='grid grid-cols-4 gap-5' >
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">Primer Nombre</span>
                                    </div>
                                    <input type="text" placeholder="Primer Nombre" className="input input-bordered w-full max-w-xs" {...register("CONDUCTOR_PRIMERNOMBRE")} defaultValue={conductorToEdit ? conductorToEdit.CONDUCTOR_PRIMERNOMBRE : ''} />

                                </label>
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">Segundo Nombre</span>
                                    </div>
                                    <input type="text" placeholder="Segundo Nombre" className="input input-bordered w-full max-w-xs" {...register("CONDUCTOR_SEGUNDONOMBRE")} defaultValue={conductorToEdit ? conductorToEdit.CONDUCTOR_SEGUNDONOMBRE : null} />
                                </label>
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">Primer Apellido</span>
                                    </div>
                                    <input type="text" placeholder="Primer Apellido" className="input input-bordered w-full max-w-xs" {...register("CONDUCTOR_PRIMERAPELLIDO")} defaultValue={conductorToEdit ? conductorToEdit.CONDUCTOR_PRIMERAPELLIDO : null} />
                                </label>
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">Segundo Apellido</span>
                                    </div>
                                    <input type="text" placeholder="Segundo Apellido" className="input input-bordered w-full max-w-xs" {...register("CONDUCTOR_SEGUNDOAPELLIDO")} defaultValue={conductorToEdit ? conductorToEdit.CONDUCTOR_SEGUNDOAPELLIDO : null} />
                                </label>
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">Correo</span>
                                    </div>
                                    <input type="email" placeholder="Correo" className="input input-bordered w-full max-w-xs" {...register("CONDUCTOR_CORREO")} defaultValue={conductorToEdit ? conductorToEdit.CONDUCTOR_CORREO : "null"} />
                                </label>
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">Código</span>
                                    </div>
                                    <input type="text" placeholder="Código" className="input input-bordered w-full max-w-xs" {...register("CONDUCTOR_CODCONDUCTOR")} defaultValue={conductorToEdit ? conductorToEdit.CONDUCTOR_CODCONDUCTOR : null} />
                                </label>
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">Teléfono Personal</span>
                                    </div>
                                    <input type="text" placeholder="Teléfono Personal" className="input input-bordered w-full max-w-xs" {...register("CONDUCTOR_TELPERSONAL")} defaultValue={conductorToEdit ? conductorToEdit.CONDUCTOR_TELPERSONAL : null} />
                                </label>
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">Teléfono Corporativo</span>
                                    </div>
                                    <input type="text" placeholder="Teléfono Corporativo" className="input input-bordered w-full max-w-xs" {...register("CONDUCTOR_TELCORPORATIVO")} defaultValue={conductorToEdit ? conductorToEdit.CONDUCTOR_TELCORPORATIVO : null} />
                                </label>

                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">Tipo de Documento</span>
                                    </div>
                                    <select className="select select-bordered w-full max-w-xs" {...register("CONDUCTOR_ID_TIPOIDENTIFICACION")} defaultValue={conductorToEdit ? conductorToEdit.mapTypeIdentification.TIP_IDEN_ID : null} >
                                        <option value="1">CEDULA DE CUIDADANIA</option>
                                        <option value="2">NIT</option>
                                        <option value="3">CEDULA DE EXTRANJERIA</option>
                                        <option value="4">PEP</option>
                                        <option value="5">PASAPORTE</option>
                                        <option value="6">SIN IDENTIFICACION</option>
                                        <option value="7">DOCUMENTO EXTRANJERO</option>
                                        <option value="8">TARJETA DE IDENTIDAD</option>
                                    </select>
                                </label>
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">Número de Documento</span>
                                    </div>
                                    <input type="text" placeholder="Número de Documento" className="input input-bordered w-full max-w-xs" {...register("CONDUCTOR_IDENTIFICACION")} defaultValue={conductorToEdit ? conductorToEdit.CONDUCTOR_IDENTIFICACION : null} />
                                </label>



                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">RH</span>
                                    </div>
                                    <select className="select select-bordered w-full max-w-xs" {...register("CONDUCTOR_ID_RH")} defaultValue={conductorToEdit ? conductorToEdit.mapFactorRh.FACTOR_RH_ID_REG : null}  >
                                        <option value={1}>A -</option>
                                        <option value={2}>A +</option>
                                        <option value={3}>AB -</option>
                                        <option value={4}>AB +</option>
                                        <option value={5}>B -</option>
                                        <option value={6}>B +</option>
                                        <option value={7}>O -</option>
                                        <option value={8}>O +</option>
                                    </select>
                                </label>

                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">Estado</span>
                                    </div>
                                    <select className="select select-bordered w-full max-w-xs" {...register("CONDUCTOR_ESTADO")} defaultValue={conductorToEdit ? conductorToEdit.CONDUCTOR_ESTADO : null}  >
                                        <option value="1">Activo</option>
                                        <option value="0">Inactivo</option>
                                    </select>
                                </label>

                            </div>

                        </div>

                        <div className='flex justify-center gap-5 mt-5' >
                            <button className="btn btn-error" onClick={() => setConductorToEdit(null)} >Cancelar</button>
                            <button disabled={buttonDisabled} type="submit" onClick={handleSubmit(onSubmit)} className="btn btn-success" >Guardar</button>
                        </div>
                    </form>
                </div>
            </Modal>

            {
                conductorToDelete &&
                <Modal id='modalDeleteConductor' className="rounded-xl " isOpen={conductorToDelete} onClose={() => setConductorToDelete(null)} >
                    <div className='modal-header flex justify-between items-center border-b w-full px-10' >
                        <div />
                        <h1 className='text-2xl font-bold' >
                            Eliminar Conductor
                        </h1>
                        <button onClick={() => setConductorToDelete(null)} >
                            <FaXmark />
                        </button>
                    </div>
                    <div>
                        <div className='p-10 flex flex-col items-center gap-3' >
                            <h1 className='text-xl' >
                                ¿Está seguro de eliminar al conductor <span className='font-bold'>{`${conductorToDelete?.CONDUCTOR_PRIMERNOMBRE} ${conductorToDelete?.CONDUCTOR_SEGUNDONOMBRE} ${conductorToDelete?.CONDUCTOR_PRIMERAPELLIDO} ${conductorToDelete?.CONDUCTOR_SEGUNDOAPELLIDO}`}</span> con código <span className='font-bold'>{`${conductorToDelete?.CONDUCTOR_CODCONDUCTOR}`}</span>?
                            </h1>
                            <div className={`avatar size-48 relative ${conductorToDelete.CONDUCTOR_FOTO ? "" : "placeholder"}`} >
                                {conductorToDelete.CONDUCTOR_FOTO ? (
                                    <img src={`data:image/jpeg;base64,${conductorToDelete.CONDUCTOR_FOTO}`} alt="conductor foto" className="rounded-full border size-full object-cover" />
                                ) : (
                                    <div className="bg-neutral text-neutral-content rounded-full w-48">
                                        <span className="text-3xl">No Foto</span>
                                    </div>
                                )}

                            </div>
                            <div>
                                <p className='font-bold mb-5' >
                                    Para confirmar la eliminación del conductor, por favor ingrese el código del conductor
                                </p>
                                <div className="form-control">

                                    <input type="text" placeholder="Código de Conductor" className="input input-bordered" value={conductorCodVerificar} onChange={(e) => setConductorCodVerificar(e.target.value)} onPaste={(e) => e.preventDefault()} />



                                    {conductorCodVerificar === conductorToDelete.CONDUCTOR_CODCONDUCTOR && <p className="text-success" >
                                        Código correcto
                                    </p>}
                                    {conductorCodVerificar !== conductorToDelete.CONDUCTOR_CODCONDUCTOR && <p className="text-error" >
                                        Código incorrecto
                                    </p>}


                                </div>
                            </div>
                            <div className='flex justify-center gap-5 mt-5' >
                                <button className="btn btn-error" onClick={() => setConductorToDelete(null)} >Cancelar</button>
                                <button className="btn btn-success" disabled={conductorCodVerificar !== conductorToDelete.CONDUCTOR_CODCONDUCTOR || buttonDisabled} onClick={() => deleteConductor()} >Eliminar</button>
                            </div>
                        </div>
                    </div>
                </Modal>
            }

        </div>
    )
}