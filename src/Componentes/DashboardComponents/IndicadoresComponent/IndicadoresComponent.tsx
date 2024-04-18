import { HiOutlineUsers } from 'react-icons/hi2'

export default function IndicadoresComponent() {
    return (
        <div className="indicadores text-white">
            <div className='flex flex-col justify-between rounded-xl bg-error p-5' >
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className='text-lg'>Asistencias con novedad</h1>
                        <small className='text-gray-300' >Shift 1</small>
                    </div>
                    <HiOutlineUsers className="w-5 h-auto" />
                </div>
                <div className="flex justify-between items-end mt-5">
                    <h1 className='text-3xl' >15%</h1>
                    <span>Ver mas</span>
                </div>
            </div>
            <div className='flex flex-col justify-between rounded-xl bg-gray-500 p-5' >
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className='text-lg'>Asistencias sin novedad</h1>
                        <small className='text-gray-300' >Shift 1</small>
                    </div>
                    <HiOutlineUsers className="w-5 h-auto" />
                </div>
                <div className="flex justify-between items-end mt-5">
                    <h1 className='text-3xl' >83%</h1>
                    <span>Ver mas</span>
                </div>
            </div>
            <div className='flex flex-col justify-between rounded-xl bg-accent p-5' >
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className='text-lg'>Asistencias total</h1>
                        <small className='text-gray-300' >Shift 1</small>
                    </div>
                    <HiOutlineUsers className="w-5 h-auto" />
                </div>
                <div className="flex justify-between items-end mt-5">
                    <h1 className='text-3xl' >98%</h1>
                    <span>Ver mas</span>
                </div>
            </div>
            <div className='flex flex-col justify-between rounded-xl bg-indigo-500 p-5' >
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className='text-lg'>Riesgos</h1>
                    </div>
                    <HiOutlineUsers className="w-5 h-auto" />
                </div>
                <div className="flex justify-between items-end mt-5">
                    <h1 className='text-3xl' >45%</h1>
                    <span>Ver mas</span>
                </div>
            </div>
        </div>
    )
}
