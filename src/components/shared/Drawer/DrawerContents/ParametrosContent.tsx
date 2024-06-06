import { useSystemStore } from '@/states/System.state'
import { useRouter } from 'next/navigation'
import React from 'react'
import { MdAltRoute, MdFaceUnlock, MdManageAccounts, MdOutlineBuildCircle, MdOutlineCategory, MdOutlineEventAvailable, MdOutlineFolder, MdOutlineLocalShipping, MdOutlineLocationOn, MdOutlinePayments, MdOutlineRule } from 'react-icons/md'

export default function ParametrosContent() {
    const { setShowDrawer } = useSystemStore()
    const router = useRouter()
    const parametros2 = [

        { title: "Directorio", href: "", icon: <MdOutlineFolder className="w-6 h-auto text-gray-500" /> },

        {
            parent: "Protocolos",
            childrens: [
                { title: "Responsable Protocolo", href: "", icon: <MdManageAccounts className="w-6 h-auto text-gray-500" /> },
                { title: "Actividad", href: "", icon: <MdOutlineEventAvailable className="w-6 h-auto text-gray-500" /> },
                { title: "Protocolos", href: "/parametros/protocolos", icon: <MdOutlineRule className="w-6 h-auto text-gray-500" /> },
            ]
        },

        {
            parent: "Novedades",
            childrens: [
                { title: "Categoria Novedad", href: "", icon: <MdOutlineCategory className="w-6 h-auto text-gray-500" /> },
                { title: "Subcategoria Novedad", href: "", icon: <MdOutlineCategory className="w-6 h-auto text-gray-500" /> },
            ]
        },
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
                {parametros2.map((parametro, index) => (
                    <li key={index}>
                        {parametro.parent ? (
                            <>
                                <a>{parametro.parent}</a>
                                <ul>
                                    {parametro.childrens.map((child, index) => (
                                        <li key={index}><a onClick={() => { setShowDrawer(false); router.push(child.href) }} >{child.icon}{child.title}</a></li>
                                    ))}
                                </ul>
                            </>
                        ) : (
                            <a onClick={() => { setShowDrawer(false); router.push(parametro.href || "") }} >{parametro.icon}{parametro.title}</a>
                        )}
                    </li>
                ))}
            </ul>

        </div>
    )
}
