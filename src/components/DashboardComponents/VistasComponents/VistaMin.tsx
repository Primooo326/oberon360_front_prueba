import React from 'react'
import IndicadoresComponent from '../IndicadoresComponent/IndicadoresComponent'
import FiltrosComponent from '../FiltrosComponent/FiltrosComponent'
import { useSystemStore } from '@/states/System.state'
import { AnimatePresence, motion } from 'framer-motion'
import MapaGoogleComponent from '../MapaComponent/MapaGoogle'
import SidebarRight from '../SidebarRight/SidebarRight'

export default function VistaMin() {
    const { mapConfig, itemSidebarRight } = useSystemStore()

    return (
        <div className='flex flex-col p-8 h-screen w-full' >

            <div className=' mb-8' >
                <IndicadoresComponent />
            </div>
            <div className=' mb-2' >
                <FiltrosComponent />
            </div>
            <div className="flex-grow overflow-y-auto overflow-x-hidden flex lg:flex-row md:flex-col gap-4 h-full relative">
                <div className="w-full h-full rounded-xl">
                    {mapConfig.showLoadMap ?
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
                            <SidebarRight />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
