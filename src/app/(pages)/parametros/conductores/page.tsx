"use client"
import React from 'react'
import { downloadExcel, getDrivers, findAllDrivers, updateDriver, createDriver } from '@/api/conductor.api';
import Table from '@/components/Shared/Table/Table';
import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import Modal from '@/components/Shared/Modal';
import { FaPen, FaXmark } from 'react-icons/fa6';
import { useForm, type SubmitHandler } from "react-hook-form"
export default function page() {

    const { register, handleSubmit, formState: { errors } } = useForm();



    const [data, setData] = useState<any[]>([]);

    const [columns, setColumns] = useState<any[]>([]);

    const [selectedRows, setSelectedRows] = useState<any[]>([]);

    const [imgSelected, setImgSelected] = useState<string>("");

    const [imgToChange, setImgToChange] = useState<any>();

    const [conductorToEdit, setConductorToEdit] = useState<any>(null);

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


    const onSubmit: SubmitHandler<any> = (data) => {
        console.log(data);
        console.log(imgToChange);
        let base64 = null;
        const reader = new FileReader();
        reader.readAsDataURL(imgToChange);
        reader.onloadend = () => {
            base64 = reader.result?.toString().split(',')[1];
        }
        reader.onerror = () => {
            console.error('Error reading file');
        }

        const dataToSend = {
            ...data,
            CONDUCTOR_FOTO: base64
        }
        if (conductorToEdit) {
            updateDriver(dataToSend, conductorToEdit.CONDUCTOR_ID);
        } else {
            createDriver(dataToSend);
        }
    }
    const handleChange = ({ selectedRows }: any) => {
        setSelectedRows(selectedRows);
    };

    const handleEdit = () => {
        setConductorToEdit(selectedRows[0]);
    }

    const handleChangeImage = (e: any) => {
        const file = e.target.files[0];
        setImgToChange(file);
    }

    const generateDownloadExcel = async () => {
        let data = [];
        if (selectedRows.length) {
            data = selectedRows;
        } else {
            const response = await findAllDrivers();
            data = response?.data;
        }

        const dataExport = await getDataExport(data);

        const responseExcel = await downloadExcel(dataExport);

        if (responseExcel) {
            const url = window.URL.createObjectURL(new Blob([responseExcel], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'Conductores.xlsx');
            document.body.appendChild(link);
            link.click();
            link.remove();
        }
    };

    const getDataExport = async (data: any[]): Promise<any[]> => {
        const dataExport: { [key: string]: any }[] = [];

        data.forEach((element: any) => {
            dataExport.push({
                "ID": element?.CONDUCTOR_ID,
                "Tipo de Documento": element?.typeIdentification?.TIP_IDEN_DESCRIPCION,
                "Documento": element?.CONDUCTOR_IDENTIFICACION,
                "Código": element?.CONDUCTOR_CODCONDUCTOR,
                "Nombre Completo": `${element?.CONDUCTOR_PRIMERNOMBRE} ${element?.CONDUCTOR_SEGUNDONOMBRE} ${element?.CONDUCTOR_PRIMERAPELLIDO} ${element?.CONDUCTOR_SEGUNDOAPELLIDO}`,
                "Teléfono Personal": element?.CONDUCTOR_TELPERSONAL,
                "Teléfono Corporativo": element?.CONDUCTOR_TELCORPORATIVO,
                "Correo Electrónico": element?.CONDUCTOR_CORREO,
                "RH": element?.factorRh?.FACTOR_RH_DESCRIPCION
            });
        });

        return dataExport;
    };

    const onChangePage = (page: number) => {
        console.log('page', page);
        setPaginationOptions({ ...paginationOptions, page });
        fetchData(page);
    }

    const onChangePerPage = (newPerPage: number, page: number) => {
        console.log('newPerPage', newPerPage);
        console.log('page', page);
        if (newPerPage > paginationOptions.take) {
            fetchData(page, newPerPage);

        } else {
            fetchData(1, newPerPage);

        }
    }


    const fetchData = async (page: number = paginationOptions.page, take: number = paginationOptions.take) => {
        try {
            setLoading(true);
            const response2 = await getDrivers(page, take);

            setColumns(columnas);
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
    useEffect(() => {
        fetchData();
    }, []);

    const columnas: any = [
        {
            name: 'Conductor',
            cell: (row: any) => <div onClick={() => setImgSelected(row.CONDUCTOR_FOTO)} className='cursor-pointer w-full flex items-center justify-center py-2'>
                <img src={`data:image/jpeg;base64,${row.CONDUCTOR_FOTO}`} alt="conductor foto" className="rounded-full size-14 object-cover" />
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
            cell: (row: any) => row.factorRh ? row.factorRh.FACTOR_RH_DESCRIPCION : "No definido",
            selector: (row: any) => row.factorRh ? row.factorRh.FACTOR_RH_DESCRIPCION : "No definido",

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
                        <input type="text" className="grow" placeholder="Buscar conductor" />
                        <FaSearch className="text-gray-500" />
                    </label>
                </div>
                <div className="flex gap-3" >
                    <button disabled={selectedRows.length !== 1} className="btn btn-warning" onClick={() => handleEdit()} >Editar</button>
                    <button disabled={selectedRows.length === 0} className="btn btn-error" >Eliminar</button>
                    <button className="btn btn-success" >Nuevo Conductor</button>
                    <button className="btn btn-primary" onClick={() => generateDownloadExcel()}>Exportar datos {selectedRows.length === 0 ? "(Todos)" : `(${selectedRows.length})`}</button>
                </div>

            </div>
            <Table data={data} columns={columns} selectableRows
                onSelectedRowsChange={handleChange} paginationOptions={paginationOptions} onChangePage={onChangePage} onChangePerPage={onChangePerPage} progressPending={loading} />

            <Modal id="modalConductor" className="rounded-full" isOpen={imgSelected !== ""} onClose={() => { setImgSelected("") }} >
                <div className='size-[520px] p-5' >
                    <img src={`data:image/jpeg;base64,${imgSelected}`} alt="conductor foto" className="rounded-full size-full object-cover" />

                </div>
            </Modal>
            <Modal id='modalEditConductor' className="rounded-xl " isOpen={conductorToEdit} canCloseEsc={false} onClose={() => setConductorToEdit(null)} >
                <div className='modal-header flex justify-between items-center border-b w-full px-10' >
                    <div />
                    <h1 className='text-2xl font-bold' >Editar Conductor</h1>
                    <button onClick={() => setConductorToEdit(null)} >
                        <FaXmark />
                    </button>
                </div>
                <div>
                    <form className='p-10' >
                        <div className='flex flex-col items-center gap-3'>

                            <div className='avatar size-48 relative' >
                                {imgToChange ? (
                                    <img src={URL.createObjectURL(imgToChange)} alt="conductor foto" className="rounded-full size-full object-cover" />
                                ) : (
                                    <img src={`data:image/jpeg;base64,${imgSelected}`} alt="conductor foto" className="rounded-full size-full object-cover" />
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
                                    <input type="text" placeholder="Primer Nombre" className="input input-bordered w-full max-w-xs" {...register("CONDUCTOR_PRIMERNOMBRE")} value={conductorToEdit?.CONDUCTOR_PRIMERNOMBRE} />

                                </label>
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">Segundo Nombre</span>
                                    </div>
                                    <input type="text" placeholder="Segundo Nombre" className="input input-bordered w-full max-w-xs" {...register("CONDUCTOR_SEGUNDONOMBRE")} value={conductorToEdit?.CONDUCTOR_SEGUNDONOMBRE} />
                                </label>
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">Primer Apellido</span>
                                    </div>
                                    <input type="text" placeholder="Primer Apellido" className="input input-bordered w-full max-w-xs" {...register("CONDUCTOR_PRIMERAPELLIDO")} value={conductorToEdit?.CONDUCTOR_PRIMERAPELLIDO} />
                                </label>
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">Segundo Apellido</span>
                                    </div>
                                    <input type="text" placeholder="Segundo Apellido" className="input input-bordered w-full max-w-xs" {...register("CONDUCTOR_SEGUNDOAPELLIDO")} value={conductorToEdit?.CONDUCTOR_SEGUNDOAPELLIDO} />
                                </label>
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">Correo</span>
                                    </div>
                                    <input type="email" placeholder="Correo" className="input input-bordered w-full max-w-xs" {...register("CONDUCTOR_CORREO")} value={conductorToEdit?.CONDUCTOR_CORREO} />
                                </label>
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">Código</span>
                                    </div>
                                    <input type="text" placeholder="Código" className="input input-bordered w-full max-w-xs" {...register("CONDUCTOR_CODCONDUCTOR")} value={conductorToEdit?.CONDUCTOR_CODCONDUCTOR} />
                                </label>
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">Teléfono Personal</span>
                                    </div>
                                    <input type="text" placeholder="Teléfono Personal" className="input input-bordered w-full max-w-xs" {...register("CONDUCTOR_TELPERSONAL")} value={conductorToEdit?.CONDUCTOR_TELPERSONAL} />
                                </label>
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">Teléfono Corporativo</span>
                                    </div>
                                    <input type="text" placeholder="Teléfono Corporativo" className="input input-bordered w-full max-w-xs" {...register("CONDUCTOR_TELCORPORATIVO")} value={conductorToEdit?.CONDUCTOR_TELCORPORATIVO} />
                                </label>

                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">Tipo de Documento</span>
                                    </div>
                                    <select className="select select-bordered w-full max-w-xs" {...register("CONDUCTOR_ID_TIPOIDENTIFICACION")} value={conductorToEdit.CONDUCTOR_ID_TIPOIDENTIFICACION || null} >
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
                                    <input type="text" placeholder="Número de Documento" className="input input-bordered w-full max-w-xs" {...register("CONDUCTOR_IDENTIFICACION")} value={conductorToEdit?.CONDUCTOR_IDENTIFICACION} />
                                </label>



                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">RH</span>
                                    </div>
                                    <select className="select select-bordered w-full max-w-xs" {...register("CONDUCTOR_ID_RH")} value={conductorToEdit.CONDUCTOR_ID_RH || null} >
                                        <option value="1">A -</option>
                                        <option value="2">A +</option>
                                        <option value="3">AB -</option>
                                        <option value="4">AB +</option>
                                        <option value="5">B -</option>
                                        <option value="6">B +</option>
                                        <option value="7">O -</option>
                                        <option value="8">O +</option>
                                    </select>
                                </label>

                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">Estado</span>
                                    </div>
                                    <select className="select select-bordered w-full max-w-xs" {...register("estado")} >
                                        <option value="1">Activo</option>
                                        <option value="0">Inactivo</option>
                                    </select>
                                </label>

                            </div>

                        </div>

                        <div className='flex justify-center gap-5 mt-5' >
                            <button className="btn btn-error" onClick={() => setConductorToEdit(null)} >Cancelar</button>
                            <button type="submit" onClick={handleSubmit(onSubmit)} className="btn btn-success" >Guardar</button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    )
}