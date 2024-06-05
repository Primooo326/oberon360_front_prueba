import type { PasoProtocolo } from "@/models/oleoductos.model";

import { useSystemStore } from "@/states/System.state";
import { useEffect, useState } from "react";
import { FaXmark, FaCheck, FaCircleInfo, FaFilePdf, FaRegFileAudio, FaRegFileImage, FaRegFilePdf, FaRegFileVideo, FaRegFileWord } from "react-icons/fa6";
import { FiFilePlus } from "react-icons/fi";
import { CiCirclePlus } from "react-icons/ci";
import { LuPlus } from "react-icons/lu";
import { FaRegFileArchive, FaRegFileAlt } from "react-icons/fa";
import Modal from "@/components/shared/Modal";
export default function ModalProtocolo() {


    const extencionesArchivos: { ext: string, icon: any }[] = [
        { icon: <FaRegFileArchive className="size-6" />, ext: 'zip' },
        { icon: <FaRegFilePdf className="size-6" />, ext: 'pdf' },
        { icon: <FaRegFileWord className="size-6" />, ext: 'doc' },
        { icon: <FaRegFileAlt className="size-6" />, ext: 'txt' },
        { icon: <FaRegFileImage className="size-6" />, ext: 'png' },
        { icon: <FaRegFileImage className="size-6" />, ext: 'jpg' },
        { icon: <FaRegFileImage className="size-6" />, ext: 'jpeg' },
        { icon: <FaFilePdf className="size-6" />, ext: 'pdf' },
        { icon: <FaRegFileVideo className="size-6" />, ext: 'mp4' },
        { icon: <FaRegFileAudio className="size-6" />, ext: 'mp3' },
    ]

    const { itemProtocolo, showModalProtocolo, setShowModalProtocolo } = useSystemStore()
    const [currentProtocolo, setCurrentProtocolo] = useState<PasoProtocolo | null>(null);

    const [bitacora, setBitacora] = useState<string>('');
    const [files, setFiles] = useState<{ ext: string, icon: any, file: File }[]>([]);
    const handleOnChangeBitacora = (e: any) => {
        setBitacora(e.target.value);
    }

    const handleOnChangeFiles = (e: any) => {
        const files = e.target.files;
        if (files) {
            try {
                const filesArray = Array.from(files);
                const filesFiltered = filesArray.map((file: any) => {
                    console.log(file);
                    const ext = file.name.split('.').pop().toLowerCase();
                    const icon = extencionesArchivos.find(item => item.ext === ext)?.icon || <FaRegFileAlt className="size-6" />;

                    return { ext, icon, file };
                });
                setFiles(filesFiltered);
            } catch (error) {
                console.log(error);
            }
        }
    }

    useEffect(() => {
        setBitacora("");
        console.log(itemProtocolo);
        if (itemProtocolo && showModalProtocolo) {
            const current = itemProtocolo.protocolos.find(item => item.current);
            setCurrentProtocolo(current!);
        }
    }, [itemProtocolo])

    return (
        <>
            {showModalProtocolo &&
                <Modal id='modalPrueba' className="w-[70%] h-[70%] rounded-xl border flex flex-col" isOpen={showModalProtocolo} onClose={() => setShowModalProtocolo(false)}>
                    <div className='modal-header flex justify-between items-center border-b w-full px-10' >
                        <div />
                        <h1 className='text-2xl font-bold' >Protocolo</h1>
                        <button onClick={() => setShowModalProtocolo(false)} >
                            <FaXmark />
                        </button>
                    </div>
                    <div className='flex h-full flex-grow overflow-y-auto overflow-x-hidden rounded-b-xl ' >
                        <div className="w-[35%] border-r flex justify-center items-center overflow-auto scroll h-full ">
                            <div className="flex flex-col items-center gap-10 h-full py-10 px-5" >
                                {
                                    itemProtocolo.protocolos.map((item, index) => (
                                        <>
                                            <div key={index} className={`rounded-xl p-5 flex items-center w-full gap-5 ${item.current ? 'border-2 border-warning' : 'border'}`} >
                                                <div className="w-1/5" >

                                                    <div className={`size-10 flex justify-center items-center rounded-full text-lg font-semibold ${item.estado === 'Pendiente' ? 'bg-warning text-white' : 'bg-success text-white'

                                                        }`} >
                                                        {item.estado === 'Pendiente' ? <FaXmark /> : <FaCheck />}
                                                    </div>
                                                </div>
                                                <div className="flex flex-col" >
                                                    <h1 className="text-lg font-semibold" >Protocolo {item.orden}</h1>
                                                    <p className="text-tertiary text-balance" >{item.descripcion}</p>
                                                </div>
                                            </div>

                                        </>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="w-[65%] h-full" >
                            {
                                currentProtocolo && (
                                    <div className="w-full h-full py-10 px-5" >
                                        <h1 className="text-lg font-semibold text-center" >Protocolo {currentProtocolo.orden}</h1>
                                        <p className="text-tertiary text-center mb-5" >{currentProtocolo.descripcion}</p>
                                        <div className="flex flex-col gap-3" >

                                            <label className="form-control">
                                                <div className="label" >
                                                    <div className="tooltip" data-tip="Incluye fecha, hora, ubicación, descripción del evento, participantes, prioridades tratadas, acciones tomadas, resultados, y documentos adjuntos con su descripción">
                                                        <span className="label-text font-semibold">Bitácora
                                                        </span>

                                                    </div>

                                                </div>
                                                <textarea onChange={handleOnChangeBitacora} className="textarea textarea-bordered h-48" rows={7} placeholder="Incluye fecha, hora, ubicación, descripción del evento, participantes, prioridades tratadas, acciones tomadas, resultados, y documentos adjuntos con su descripción" />
                                                <div className="label">
                                                    <span className="label-text-alt">
                                                    </span>
                                                    <span className="label-text-alt">{bitacora.length}/2500</span>
                                                </div>
                                            </label>
                                            <p className="label-text font-semibold" >Adjuntar Documentos</p>
                                            <div className="flex gap-5" >
                                                {/* input files */}
                                                <div className="form-control">
                                                    <label className="size-24 bg-secondary flex justify-center items-center rounded-xl cursor-pointer">
                                                        <LuPlus className="size-8" />
                                                        <input onChange={handleOnChangeFiles} type="file" multiple className="hidden" />
                                                    </label>
                                                </div>
                                                {/* preview files */}
                                                {
                                                    files.length > 0 && (
                                                        <div className="flex gap-5" >
                                                            {
                                                                files.map((file, index) => (
                                                                    <div key={index} className="flex gap-5 items-center" >
                                                                        <div className="size-24 bg-secondary flex flex-col justify-center items-center rounded-xl cursor-pointer overflow-hidden text-center p-1 ">
                                                                            {file.icon}
                                                                            <span className="text-xs mt-2 w-full overflow-hidden whitespace-nowrap truncate" >
                                                                                {file.file.name}

                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                ))
                                                            }
                                                        </div>
                                                    )
                                                }

                                            </div>


                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </Modal>}
        </>
    )
}
