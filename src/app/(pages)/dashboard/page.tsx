"use client"
import DashboardLayout from '@/layouts/Dashboard/DashboardLayout'
import './Dashboard.css'
import IndicadoresComponent from '@/Componentes/DashboardComponents/IndicadoresComponent/IndicadoresComponent'
import FiltrosComponent from '@/Componentes/DashboardComponents/FiltrosComponent/FiltrosComponent'
import { useEffect, useState } from 'react'
import { useClientesStore } from '@/states/Clientes.state'
import MapaGoogleComponent from '@/Componentes/DashboardComponents/MapaComponent/MapaGoogle'
import { useSystemStore } from '@/states/System.state'
import SidebarRight from '@/Componentes/DashboardComponents/SidebarRight/SidebarRight'
import { useFiltrosMapa } from '@/states/FiltrosMapa.state'

export default function Dashboard() {

    const { clienteSelected } = useClientesStore()
    const { mobileFiltro, proteccionFiltro, telemetriaFiltro } = useFiltrosMapa()
    const [showLoadMap, setShowLoadMap] = useState(true)
    const { mapExpand, itemSidebarRight } = useSystemStore()

    useEffect(() => {
        if (clienteSelected) {
            setShowLoadMap(true)
        }
        setTimeout(() => {
            setShowLoadMap(false)
        }, 2000);
    }, [clienteSelected])
    useEffect(() => {
        setShowLoadMap(true)
        setTimeout(() => {
            setShowLoadMap(false)
        }, 2000);
    }, [mobileFiltro, proteccionFiltro, telemetriaFiltro])

    return (
        <DashboardLayout>
            {mapExpand ? (
                <div className="w-full h-screen
             rounded-xl contenedorMapa relative">
                    {showLoadMap ?
                        <div className="skeleton w-full h-full flex items-center justify-center ">
                            <span className="loading loading-spinner loading-lg" />
                        </div>
                        :
                        <MapaGoogleComponent />
                    }
                </div>
            ) : (
                <div className='flex flex-col p-8 h-screen' >

                    <div className=' mb-8' >
                        <IndicadoresComponent />
                    </div>
                    <div className=' mb-2' >
                        <FiltrosComponent />
                    </div>
                    <div className="flex-grow overflow-auto flex lg:flex-row md:flex-col gap-4 h-full">
                        <div className="w-full h-full rounded-xl contenedorMapa">
                            {showLoadMap ?
                                <div className="skeleton w-full h-full flex items-center justify-center ">
                                    <span className="loading loading-spinner loading-lg" />

                                </div>
                                :
                                <MapaGoogleComponent />
                            }
                        </div>
                        {itemSidebarRight && (

                            <div className="animate__animated animate__faster animate__slideInRight">
                                <SidebarRight item={itemSidebarRight.item} content={itemSidebarRight.content} />
                            </div>
                        )}
                        {/* <div className="flex flex-col justify-between lg:w-2/6 md:w-full h-full bg-base-100 border rounded-xl p-5">

                            <div>
                                <h1 className=' text-lg font-bolf' >Control de asistencia</h1>
                                <small className='text-gray-400' >Shift 1</small>
                                <div className='my-4  overflow-y-auto scroll' >
                                    {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
                                        <div className='flex mb-4 bg-secondary rounded-lg h-14' >
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <button className='btn btn-accent text-white btn-block' >Ver mas</button>
                        </div> */}
                    </div>
                </div>
            )}
        </DashboardLayout>
    )
}
