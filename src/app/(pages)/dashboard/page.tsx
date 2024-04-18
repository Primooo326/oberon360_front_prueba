import React from 'react'
import IndicadoresComponent from '@/Componentes/DashboardComponents/IndicadoresComponent/IndicadoresComponent'
import FiltrosComponent from '@/Componentes/DashboardComponents/FiltrosComponent/FiltrosComponent'
import DashboardLayout from '@/layouts/Dashboard/DashboardLayout'
import MapaGoogleComponent from '@/Componentes/DashboardComponents/MapaComponent/MapaComponent'
import "./Dashboard.css"
export default function page() {


    return (
        <DashboardLayout>

            <div className='mb-8' >
                <IndicadoresComponent />
            </div>
            <div className='mb-2' >
                <FiltrosComponent />
            </div>
            <div className="flex lg:flex-row md:flex-col gap-4 ">
                <div className="w-full h-[650px] rounded-xl contenedorMapa">
                    <MapaGoogleComponent />
                </div>
                <div className="flex flex-col lg:w-2/6 md:w-full h-[650px] bg-base-100 shadow-lg rounded-xl p-5">

                    <div>
                        <h1 className=' text-lg font-bolf' >Control de asistencia</h1>
                        <small className='text-gray-400' >Shift 1</small>
                    </div>
                    <div className='my-4  overflow-y-auto scroll' >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
                            <div className='flex mb-4 bg-secondary rounded-lg h-14' >
                            </div>
                        ))}
                    </div>
                    <button className='btn btn-accent text-white btn-block' >Ver mas</button>
                </div>
            </div>
        </DashboardLayout>
    )
}
