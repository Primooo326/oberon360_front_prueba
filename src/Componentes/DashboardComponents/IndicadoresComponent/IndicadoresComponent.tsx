import { useIndicadoresStore } from '@/states/indicadores.state';
import { FaTicketAlt } from 'react-icons/fa'
import { HiOutlineUsers } from 'react-icons/hi2'

export default function IndicadoresComponent() {

    const { indicadores } = useIndicadoresStore();
    console.log(indicadores);

    return (
        <div className="indicadores">
            <div className='flex flex-col  rounded-xl border p-5' >
                <div>

                    <h1 className='text-lg '>EN RETRASO</h1>
                    <div className="divider" />
                </div>
                <div className="flex flex-col">
                    <div>
                        <h1 className='text-3xl' >
                            {indicadores.delay.total} unidades
                        </h1>
                    </div>

                </div>
                {/* <div className="flex justify-between items-start">
                    <div>
                        <small className='font-extralight' >Shift 1</small>
                    </div>
                    <FaTicketAlt className="w-10 h-auto" />

                </div>
                <div className="flex justify-between items-end mt-5">
                    <h1 className='text-6xl' >{indicadores.delay.total}</h1>
                    <div className="radial-progress" style={{ "--value": Number.parseInt(indicadores.delay.percentage.replace("%", "")) }} role="progressbar">{indicadores.delay.percentage}</div>
                </div> */}
            </div>
            <div className='flex flex-col justify-between rounded-xl border border-success p-5 text-success' >
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className='text-xl font-semibold'>EN ANTICIPO</h1>
                        <small className='font-extralight' >Shift 1</small>
                    </div>
                    <FaTicketAlt className="w-10 h-auto" />
                </div>
                <div className="flex justify-between items-end mt-5">
                    <h1 className='text-6xl' >{indicadores.advance.total}</h1>
                    <div className="radial-progress" style={{ "--value": Number.parseInt(indicadores.advance.percentage.replace("%", "")) }} role="progressbar">{indicadores.advance.percentage}</div>
                </div>
            </div>
            <div className='flex flex-col justify-between rounded-xl border border-warning p-5 text-warning' >
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className='text-xl font-semibold'>NO REPORTADOS</h1>
                        <small className='font-extralight' >Shift 1</small>
                    </div>
                    <FaTicketAlt className="w-10 h-auto" />

                </div>
                <div className="flex justify-between items-end mt-5">
                    <h1 className='text-6xl' >{indicadores.notReported.total}</h1>
                    <div className="radial-progress" style={{ "--value": Number.parseInt(indicadores.notReported.percentage.replace("%", "")) }} role="progressbar">{indicadores.notReported.percentage}</div>
                </div>
            </div>
            <div className='flex flex-col justify-between rounded-xl border border-primary p-5 text-primary' >
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className='text-xl font-semibold'>EN OPERACIÓN</h1>
                        <small className='font-extralight' >Shift 1</small>
                    </div>
                    <FaTicketAlt className="w-10 h-auto" />

                </div>
                <div className="flex justify-between items-end mt-5">
                    <h1 className='text-6xl' >{indicadores.inOperation.total}</h1>
                    <div className="radial-progress" style={{ "--value": Number.parseInt(indicadores.inOperation.percentage.replace("%", "")) }} role="progressbar">{indicadores.inOperation.percentage}</div>
                </div>
            </div>
            <div className='flex flex-col justify-between rounded-xl border border-blue p-5 text-blue-700 ' >
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className='text-xl font-semibold'>DISPONIBLES</h1>
                    </div>
                    <HiOutlineUsers className="w-10 h-auto" />

                </div>
                <div className="flex justify-between items-end mt-5">
                    <h1 className='text-6xl' >{indicadores.available.total}</h1>
                    <div className="radial-progress" style={{ "--value": Number.parseInt(indicadores.available.percentage.replace("%", "")) }} role="progressbar">{indicadores.available.percentage}</div>
                </div>
            </div>
        </div>
    )
}
