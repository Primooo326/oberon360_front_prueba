import React from 'react'
import { MdAltRoute, MdFaceUnlock, MdManageAccounts, MdOutlineBuildCircle, MdOutlineCategory, MdOutlineEventAvailable, MdOutlineFolder, MdOutlineLocalShipping, MdOutlineLocationOn, MdOutlinePayments, MdOutlineRule } from 'react-icons/md'

export default function ParametrosContent() {

    const parametros = [

        { title: "Directorio", href: "", icon: <MdOutlineFolder className="w-6 h-auto text-gray-500" /> },
        { title: "Responsable Protocolo", href: "", icon: <MdManageAccounts className="w-6 h-auto text-gray-500" /> },
        { title: "Actividad", href: "", icon: <MdOutlineEventAvailable className="w-6 h-auto text-gray-500" /> },
        { title: "Protocolo", href: "/parametros/protocolo", icon: <MdOutlineRule className="w-6 h-auto text-gray-500" /> },
        { title: "Categoria Novedad", href: "", icon: <MdOutlineCategory className="w-6 h-auto text-gray-500" /> },
        { title: "Subcategoria Novedad", href: "", icon: <MdOutlineCategory className="w-6 h-auto text-gray-500" /> },
        { title: "Motivo Viaticos", href: "", icon: <MdOutlinePayments className="w-6 h-auto text-gray-500" /> },
        { title: "Categoria Pre-Operacional", href: "", icon: <MdOutlineBuildCircle className="w-6 h-auto text-gray-500" /> },
        { title: "Subcategoria Pre-Operacional", href: "", icon: <MdOutlineBuildCircle className="w-6 h-auto text-gray-500" /> },
        { title: "Conductores", href: "/parametros/conductores", icon: <MdFaceUnlock className="w-6 h-auto text-gray-500" /> },
        { title: "Puntos", href: "", icon: <MdOutlineLocationOn className="w-6 h-auto text-gray-500" /> },
        { title: "Itinerario", href: "", icon: <MdAltRoute className="w-6 h-auto text-gray-500" /> },
        { title: "Vehiculos", href: "", icon: <MdOutlineLocalShipping className="w-6 h-auto text-gray-500" /> },
    ]

    return (
        <div className="px-4">
            <ul className="menu rounded-box">
                {parametros.map((parametro, index) => (
                    <li key={index}><a href={parametro.href} >{parametro.icon}{parametro.title}</a></li>
                ))}
            </ul>

        </div>
    )
}
