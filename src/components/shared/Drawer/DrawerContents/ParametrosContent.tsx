import React from 'react'
import { FaFolder, FaUserTie, FaTasks, FaBook, FaTag, FaTags, FaMoneyBillWave, FaTools, FaCar, FaWrench, FaMapMarkerAlt, FaRoute, FaTruck } from "react-icons/fa";

export default function ParametrosContent() {

    const parametros = [

        { title: "Directorio", href: "", icon: <FaFolder className="w-6 h-auto" /> },
        { title: "Responsable Protocolo", href: "", icon: <FaUserTie className="w-6 h-auto" /> },
        { title: "Actividad", href: "", icon: <FaTasks className="w-6 h-auto" /> },
        { title: "Protocolo", href: "", icon: <FaBook className="w-6 h-auto" /> },
        { title: "Categoria Novedad", href: "", icon: <FaTag className="w-6 h-auto" /> },
        { title: "Subcategoria Novedad", href: "", icon: <FaTags className="w-6 h-auto" /> },
        { title: "Motivo Viaticos", href: "", icon: <FaMoneyBillWave className="w-6 h-auto" /> },
        { title: "Categoria Pre-Operacional", href: "", icon: <FaTools className="w-6 h-auto" /> },
        { title: "Conductores", href: "/parametros/conductores", icon: <FaCar className="w-6 h-auto" /> },
        { title: "Subcategoria Pre-Operacional", href: "", icon: <FaWrench className="w-6 h-auto" /> },
        { title: "Puntos", href: "", icon: <FaMapMarkerAlt className="w-6 h-auto" /> },
        { title: "Itinerario", href: "", icon: <FaRoute className="w-6 h-auto" /> },
        { title: "Vehiculos", href: "", icon: <FaTruck className="w-6 h-auto" /> },
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
