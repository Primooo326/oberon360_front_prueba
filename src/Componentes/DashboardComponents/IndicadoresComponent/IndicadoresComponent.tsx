import { FaTicketAlt } from 'react-icons/fa'
import { HiOutlineUsers } from 'react-icons/hi2'

export default function IndicadoresComponent() {
    return (
        <div className="indicadores ">
            <div className='flex flex-col justify-between rounded-xl border p-5 text-error' >
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className='text-xl font-semibold'>EN RETRASO</h1>
                        <small className='font-extralight' >Shift 1</small>
                    </div>
                    <FaTicketAlt className="w-10 h-auto" />

                </div>
                <div className="flex justify-between items-end mt-5">
                    <h1 className='text-6xl' >15%</h1>
                    <div className="radial-progress" style={{ "--value": 15 }} role="progressbar">15%</div>
                    {/* <button className='btn btn-sm btn-ghost' >
                        Gestionar novedades
                    </button> */}
                </div>
            </div>
            <div className='flex flex-col justify-between rounded-xl border p-5 text-success' >
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className='text-xl font-semibold'>EN ANTICIPO</h1>
                        <small className='font-extralight' >Shift 1</small>
                    </div>
                    <FaTicketAlt className="w-10 h-auto" />
                </div>
                <div className="flex justify-between items-end mt-5">
                    <h1 className='text-6xl' >83%</h1>
                    <div className="radial-progress" style={{ "--value": 83 }} role="progressbar">83%</div>
                </div>
            </div>
            <div className='flex flex-col justify-between rounded-xl border p-5 text-primary' >
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className='text-xl font-semibold'>TOTAL VEHICULOS</h1>
                        <small className='font-extralight' >Shift 1</small>
                    </div>
                    <FaTicketAlt className="w-10 h-auto" />

                </div>
                <div className="flex justify-between items-end mt-5">
                    <h1 className='text-6xl' >98%</h1>
                    <div className="radial-progress" style={{ "--value": 98 }} role="progressbar">98%</div>
                </div>
            </div>
            <div className='flex flex-col justify-between rounded-xl border p-5 text-blue-700 ' >
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className='text-xl font-semibold'>DISPONIBLES</h1>
                    </div>
                    <HiOutlineUsers className="w-10 h-auto" />

                </div>
                <div className="flex justify-between items-end mt-5">
                    <h1 className='text-6xl' >66%</h1>
                    <div className="radial-progress" style={{ "--value": 66 }} role="progressbar">66%</div>
                </div>
            </div>
        </div>
    )
}
