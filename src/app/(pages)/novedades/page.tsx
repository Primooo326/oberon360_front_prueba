"use client"
import SidebarRight from '@/components/NovedadesComponents/SidebarRight/SidebarRight'
import TableNovedad from '@/components/NovedadesComponents/TableNovedad/TableNovedad'
import { useNovedadesStore } from '@/states/novedades.state'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'

export default function page() {

    const { novedadSelected } = useNovedadesStore()

    return (
        <div className='w-full h-full scroll p-8' >
            <h1 className='font-bold text-3xl' >
                Novedades
            </h1>


            <TableNovedad />
            <AnimatePresence>

                {novedadSelected && (
                    <motion.div
                        initial={{ x: "100" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100" }}
                        transition={{ type: "linear", stiffness: 200 }}
                        className="z-10"
                    >
                        <SidebarRight />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
