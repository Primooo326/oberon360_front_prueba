"use client"
import SidebarRight from '@/components/NovedadesComponents/SidebarRight/SidebarRight'
import TableNovedad from '@/components/NovedadesComponents/Table/Table'
import React from 'react'

export default function page() {
    return (
        <div className='w-full scroll p-8' >
            <h1 className='font-bold text-3xl' >
                Novedades
            </h1>


            <TableNovedad />
            {/* <SidebarRight /> */}
        </div>
    )
}
