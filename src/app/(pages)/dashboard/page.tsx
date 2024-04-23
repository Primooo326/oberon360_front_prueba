"use client"
import DashboardLayout from '@/layouts/Dashboard/DashboardLayout'
import './Dashboard.css'
import IndicadoresComponent from '@components/DashboardComponents/IndicadoresComponent/IndicadoresComponent'
import FiltrosComponent from '@components/DashboardComponents/FiltrosComponent/FiltrosComponent'
import { useEffect, useState } from 'react'
import { useClientesStore } from '@/states/Clientes.state'
import MapaGoogleComponent from '@components/DashboardComponents/MapaComponent/MapaGoogle'
import { useSystemStore } from '@/states/System.state'
import SidebarRight from '@components/DashboardComponents/SidebarRight/SidebarRight'
import { useFiltrosMapa } from '@/states/FiltrosMapa.state'
import { AnimatePresence, motion } from 'framer-motion'

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
                    <div className="flex-grow overflow-y-auto overflow-x-hidden flex lg:flex-row md:flex-col gap-4 h-full relative">
                        <div className="w-full h-full rounded-xl">
                            {showLoadMap ?
                                <div className="skeleton w-full h-full flex items-center justify-center ">
                                    <span className="loading loading-spinner loading-lg" />
                                </div>
                                :
                                <motion.div
                                    initial={{ position: "relative", width: itemSidebarRight ? "calc(100% - 550px)" : "100%" }}
                                    animate={{ left: 0, position: "absolute", width: itemSidebarRight ? "calc(100% - 582px)" : "100%" }}
                                    exit={{ width: "100%" }}
                                    transition={{ type: 'linear', stiffness: 200 }}
                                    className='contenedorMapa w-full h-full rounded-xl'
                                >
                                    <MapaGoogleComponent />
                                </motion.div>
                            }
                        </div>
                        <AnimatePresence>
                            {itemSidebarRight && (

                                <motion.div
                                    initial={{ x: '100%' }}
                                    animate={{ x: 0 }}
                                    exit={{ x: '100%' }}
                                    transition={{ type: 'linear', stiffness: 200 }}
                                >

                                    <SidebarRight item={itemSidebarRight.item} content={itemSidebarRight.content} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            )}
        </DashboardLayout>
    )
}
