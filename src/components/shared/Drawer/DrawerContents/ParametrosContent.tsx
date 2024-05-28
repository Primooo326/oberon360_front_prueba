import React from 'react'
import { FaFolder, FaUserTie, FaTasks, FaBook, FaTag, FaTags, FaMoneyBillWave, FaTools, FaCar, FaWrench, FaMapMarkerAlt, FaRoute, FaTruck } from "react-icons/fa";

export default function ParametrosContent() {

    const parametros = [

        { title: "Directorio", href: "", icon: <FaFolder /> },
        { title: "Responsable Protocolo", href: "", icon: <FaUserTie /> },
        { title: "Actividad", href: "", icon: <FaTasks /> },
        { title: "Protocolo", href: "", icon: <FaBook /> },
        { title: "Categoria Novedad", href: "", icon: <FaTag /> },
        { title: "Subcategoria Novedad", href: "", icon: <FaTags /> },
        { title: "Motivo Viaticos", href: "", icon: <FaMoneyBillWave /> },
        { title: "Categoria Pre-Operacional", href: "", icon: <FaTools /> },
        { title: "Conductores", href: "/parametros/conductores", icon: <FaCar /> },
        { title: "Subcategoria Pre-Operacional", href: "", icon: <FaWrench /> },
        { title: "Puntos", href: "", icon: <FaMapMarkerAlt /> },
        { title: "Itinerario", href: "", icon: <FaRoute /> },
        { title: "Vehiculos", href: "", icon: <FaTruck /> },
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
