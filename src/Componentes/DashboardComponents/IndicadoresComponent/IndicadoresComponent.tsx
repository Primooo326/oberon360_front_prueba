import { useIndicadoresStore } from '@/states/Indicadores.state';
import { BiSolidError, BiSolidZap, BiTimer } from 'react-icons/bi';
import { LuBadgeInfo } from 'react-icons/lu';
import { MdSignalWifiStatusbarNotConnected } from 'react-icons/md';

export default function IndicadoresComponent() {

    const { indicadores } = useIndicadoresStore();

    return (
        <div className="indicadores">
            <div className='flex flex-col rounded-xl border p-5 bg-base-100 bg-base-100' >
                <div className='flex justify-between' >

                    <h1 className='text-lg'>Con Retraso</h1>
                    <BiSolidError className='text-3xl text-error' />
                </div>
                <div className="divider mt-0 mb-4" />
                <div className="flex flex-col">
                    <div>
                        <h1 className='text-3xl font-bold mb-2' >
                            {indicadores.delay.total} unidades
                        </h1>
                        <p  >
                            <span className='text-error'>{indicadores.delay.percentage}</span> de unidades presentan retraso
                        </p>
                    </div>
                </div>
            </div>
            <div className='flex flex-col rounded-xl border p-5 bg-base-100' >
                <div className='flex justify-between' >

                    <h1 className='text-lg'>Con Anticipo</h1>
                    <BiTimer className='text-3xl text-success' />
                </div>
                <div className="divider mt-0 mb-4" />
                <div className="flex flex-col">
                    <div>
                        <h1 className='text-3xl font-bold mb-2' >
                            {indicadores.advance.total} unidades
                        </h1>
                        <p  >
                            <span className='text-success'>{indicadores.advance.percentage}</span> de unidades presentan anticipo
                        </p>
                    </div>
                </div>
            </div>
            <div className='flex flex-col rounded-xl border p-5 bg-base-100' >
                <div className='flex justify-between' >

                    <h1 className='text-lg'>Sin Reportar</h1>
                    <MdSignalWifiStatusbarNotConnected className='text-3xl text-tertiary' />
                </div>
                <div className="divider mt-0 mb-4" />
                <div className="flex flex-col">
                    <div>
                        <h1 className='text-3xl font-bold mb-2' >
                            {indicadores.notReported.total} unidades
                        </h1>
                        <p  >
                            <span className='text-tertiary'>{indicadores.notReported.percentage}</span> de unidades sin reportar
                        </p>
                    </div>
                </div>
            </div>
            <div className='flex flex-col rounded-xl border p-5 bg-base-100' >
                <div className='flex justify-between' >

                    <h1 className='text-lg'>En Operación</h1>
                    <BiSolidZap className='text-3xl text-warning' />
                </div>
                <div className="divider mt-0 mb-4" />
                <div className="flex flex-col">
                    <div>
                        <h1 className='text-3xl font-bold mb-2' >
                            {indicadores.inOperation.total} unidades
                        </h1>
                        <p  >
                            <span className='text-tertiary'>{indicadores.inOperation.percentage}</span> de unidades operando
                        </p>
                    </div>
                </div>
            </div>
            <div className='flex flex-col rounded-xl border p-5 bg-base-100' >
                <div className='flex justify-between' >

                    <h1 className='text-lg'>Disponibles</h1>
                    <LuBadgeInfo className='text-3xl text-info' />
                </div>
                <div className="divider mt-0 mb-4" />
                <div className="flex flex-col">
                    <div>
                        <h1 className='text-3xl font-bold mb-2' >
                            {indicadores.available.total} unidades
                        </h1>
                        <p  >
                            <span className='text-info'>{indicadores.available.percentage}</span> de unidades disponibles para operar
                        </p>
                    </div>
                </div>
            </div>
            {/* <div className='flex flex-col justify-between rounded-xl border border-success p-5 text-success' >
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
            </div> */}
        </div>
    )
}
