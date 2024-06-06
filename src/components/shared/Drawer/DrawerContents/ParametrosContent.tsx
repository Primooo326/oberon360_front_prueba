import { useSystemStore } from '@/states/System.state'
import { useRouter, usePathname } from 'next/navigation'
import React from 'react'
import { MdAltRoute, MdFaceUnlock, MdManageAccounts, MdOutlineBuildCircle, MdOutlineCategory, MdOutlineEventAvailable, MdOutlineFolder, MdOutlineLocalShipping, MdOutlineLocationOn, MdOutlinePayments, MdOutlineRule } from 'react-icons/md'

export default function ParametrosContent() {
    const { setShowDrawer } = useSystemStore()
    const router = useRouter()
    const currentPath = usePathname()
    console.log(currentPath);
    const parametros2 = [

        { title: "Directorio", href: "/parametros/directorio", icon: <MdOutlineFolder className="w-6 h-auto text-gray-500" /> },

        {
            parent: "Protocolos",
            childrens: [
                { title: "Responsable Protocolo", href: "/parametros/responsable-protocolo", icon: <MdManageAccounts className="w-6 h-auto" /> },
                { title: "Actividad", href: "/parametros/actividades", icon: <MdOutlineEventAvailable className="w-6 h-auto" /> },
                { title: "Protocolos", href: "/parametros/protocolos", icon: <MdOutlineRule className="w-6 h-auto" /> },
            ]
        },

        {
            parent: "Novedades",
            childrens: [
                { title: "Categoria Novedad", href: "/parametros/categoria-novedad", icon: <MdOutlineCategory className="w-6 h-auto" /> },
                { title: "Subcategoria Novedad", href: "/parametros/subcategoria-novedad", icon: <MdOutlineCategory className="w-6 h-auto" /> },
            ]
        },
        { title: "Motivo Viaticos", href: "/parametros/motivo-viaticos", icon: <MdOutlinePayments className="w-6 h-auto" /> },
        { title: "Categoria Pre-Operacional", href: "/parametros/categoria-preoperacional", icon: <MdOutlineBuildCircle className="w-6 h-auto" /> },
        { title: "Subcategoria Pre-Operacional", href: "/parametros/subcategoria-preoperacional", icon: <MdOutlineBuildCircle className="w-6 h-auto" /> },
        { title: "Conductores", href: "/parametros/conductores", icon: <MdFaceUnlock className="w-6 h-auto" /> },
        { title: "Puntos", href: "/parametros/puntos", icon: <MdOutlineLocationOn className="w-6 h-auto" /> },
        { title: "Itinerario", href: "/parametros/itinerario", icon: <MdAltRoute className="w-6 h-auto" /> },
        { title: "Vehiculos", href: "/parametros/vehiculos", icon: <MdOutlineLocalShipping className="w-6 h-auto" /> },
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
                                        <li key={index}><a className={`${currentPath === child.href ? "active" : "text-gray-500"}`}
                                            onClick={() => { setShowDrawer(false); router.push(child.href) }} >{child.icon}{child.title}</a></li>
                                    ))}
                                </ul>
                            </>
                        ) : (
                            <a className={`${currentPath === parametro.href ? "active" : "text-gray-500"}`}
                                onClick={() => { setShowDrawer(false); router.push(parametro.href || "") }} >{parametro.icon}{parametro.title}</a>
                        )}
                    </li>
                ))}
            </ul>

        </div>
    )
}
