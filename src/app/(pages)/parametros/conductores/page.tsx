"use client"
import TableConductor from '@/components/ConductoresComponents/TableConductor/TableConductor'
import React from 'react'

export default function page() {
    return (
        <div className='w-full h-full scroll p-8' >
            <div className="flex gap-5 mb-8 items-center">
                <h1 className='font-bold text-3xl' >
                    Conductores
                </h1>
            </div>
            <TableConductor/>
        </div>
    )
}