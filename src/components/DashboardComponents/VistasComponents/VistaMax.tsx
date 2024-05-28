import { useSystemStore } from '@/states/System.state'
import React from 'react'
import MapaGoogleComponent from '../MapaComponent/MapaGoogle'
import { AnimatePresence, motion } from 'framer-motion'
import SidebarRightDashboard from '../SidebarRightDashboard/SidebarRightDashboard'

export default function VistaMax() {

    const { mapConfig, showDrawer: showSidebar, showSidebarRight, mapExpand } = useSystemStore()

    return (
        <div className="w-full h-screen
             rounded-xl 
              relative mainLayout">
            {mapConfig.showLoadMap ?
                <div className="skeleton w-full h-full flex items-center justify-center ">
                    <span className="loading loading-spinner loading-lg" />
                </div>
                :
                <>

                    <AnimatePresence>

                        <motion.section
                            initial={{ position: "absolute", left: 0, width: showSidebarRight ? "calc(100% - 550px)" : "100%" }}
                            animate={{ left: 0, position: "absolute", width: showSidebarRight ? "calc(100% - 550px)" : "100%" }}
                            exit={{ width: showSidebarRight ? "calc(100% - 550px)" : "100%" }}
                            transition={{ type: 'linear', stiffness: 200 }}
                            style={{ overflow: 'hidden', position: "relative" }}
                            className="w-full h-full scroll"
                        >
                            <MapaGoogleComponent />
                        </motion.section>

                    </AnimatePresence>

                    <AnimatePresence>
                        {(showSidebarRight && mapExpand) && (

                            <motion.div
                                initial={{ position: 'absolute', x: "100%", right: 0, }}
                                animate={{ position: 'absolute', right: 0, x: 0 }}
                                exit={{ x: '100%' }}
                                transition={{ type: 'linear', stiffness: 200 }}
                                className="h-full z-10">

                                <SidebarRightDashboard />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </>
            }
        </div>
    )
}
