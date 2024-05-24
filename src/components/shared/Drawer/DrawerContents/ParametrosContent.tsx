import React from 'react'
import { FaFolder, FaUserTie, FaTasks, FaBook, FaTag, FaTags, FaMoneyBillWave, FaTools, FaCar, FaWrench, FaMapMarkerAlt, FaRoute, FaTruck } from "react-icons/fa";

export default function ParametrosContent() {

    const parametros = [

        { title: "Directorio", icon: <FaFolder /> },
        { title: "Responsable Protocolo", icon: <FaUserTie /> },
        { title: "Actividad", icon: <FaTasks /> },
        { title: "Protocolo", icon: <FaBook /> },
        { title: "Categoria Novedad", icon: <FaTag /> },
        { title: "Subcategoria Novedad", icon: <FaTags /> },
        { title: "Motivo Viaticos", icon: <FaMoneyBillWave /> },
        { title: "Categoria Pre-Operacional", icon: <FaTools /> },
        { title: "Conductores", icon: <FaCar /> },
        { title: "Subcategoria Pre-Operacional", icon: <FaWrench /> },
        { title: "Puntos", icon: <FaMapMarkerAlt /> },
        { title: "Itinerario", icon: <FaRoute /> },
        { title: "Vehiculos", icon: <FaTruck /> },
    ]

    return (
        <div className="px-4">
            <ul className="menu rounded-box">
                {parametros.map((parametro, index) => (
                    <li key={index}><a href='' >{parametro.icon}{parametro.title}</a></li>
                ))}
            </ul>

        </div>
    )
}
