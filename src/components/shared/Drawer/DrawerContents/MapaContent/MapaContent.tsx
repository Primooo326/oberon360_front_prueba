import React, { useState } from 'react'
import { MdOutlineFolder, MdOutlineLocationOn, MdAltRoute, MdOutlineLocalShipping } from 'react-icons/md'
import { IoChevronBack, IoShieldOutline } from "react-icons/io5";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { MdOutlineSportsMotorsports } from "react-icons/md";
import { PiAirplaneTilt } from "react-icons/pi";
import { AiOutlineAlert } from "react-icons/ai";
import FiltrosTelemetria from './FiltrosTelemetria';
import FiltrosProteccion from './FiltrosProteccion';
import { useFiltrosMapa } from '@/states/FiltrosMapa.state';
import FiltrosMobile from './FiltrosMobile';
import FiltrosOleoducto from './FiltrosOleoducto';

export default function MapaContent() {


  const [currentItem, setCurrentItem] = useState<any | null>(null)

  const handleOnClick = (item: any) => {
    setCurrentItem(item)
  }
  const { mobileFiltro, oleoductosFiltro, proteccionFiltro, telemetriaFiltro } = useFiltrosMapa().filtrosMapState


  const items = [

    { title: "Puntos de Interes", icon: <MdOutlineLocationOn className="w-6 h-auto text-gray-500" />, component: <div>Puntos de Interes</div> },
    { title: "Simular Ruta", icon: <MdAltRoute className="w-6 h-auto" />, component: <div>Simular Ruta</div> },
    { title: "Solucionar Alertas", icon: <AiOutlineAlert className="w-6 h-auto" />, component: <div>Solucionar Alertas</div> },
    { title: "Informacion General", icon: <MdOutlineFolder className="w-6 h-auto" />, component: <div>Informacion General</div> },
    { title: "Traking", icon: <HiMagnifyingGlass className="w-6 h-auto" />, component: <div>Traking</div> },
    {
      parent: "Filtros Avanzados",
      childrens: [
        { title: "Protección", icon: <IoShieldOutline className="w-6 h-auto" />, component: <FiltrosProteccion /> },
        { title: "Telemetria", icon: <MdOutlineLocalShipping className="w-6 h-auto" />, component: <FiltrosTelemetria /> },
        { title: "Oleoductos", icon: <PiAirplaneTilt className="w-6 h-auto" />, component: <FiltrosOleoducto /> },
        { title: "Mobile", icon: <MdOutlineSportsMotorsports className="w-6 h-auto" />, component: <FiltrosMobile /> },
      ]
    },
  ]

  return (
    <div className="px-4">
      {
        currentItem === null &&
        <ul className="menu rounded-box">
          {items.map((item, index) => (
            <li key={index}>
              {item.parent ? (
                <>
                  <a>{item.parent}</a>
                  <ul>
                    {item.childrens.map((child, index) => (
                      <li key={index}><a className="text-gray-500 flex justify-between" onClick={() => handleOnClick(child)} >
                        <span className='flex gap-2'>{child.icon}{child.title}</span>
                        <span className={`badge ${child.title === "Protección" ? proteccionFiltro ? "badge-success" : "badge-secondary" : child.title === "Telemetria" ? telemetriaFiltro ? "badge-success" : "badge-secondary" : child.title === "Oleoductos" ? oleoductosFiltro ? "badge-success" : "badge-secondary" : mobileFiltro ? "badge-success" : "badge-secondary"}`} />
                      </a></li>
                    ))}
                  </ul>
                </>
              ) : (
                <a className="text-gray-500" onClick={() => handleOnClick(item)}>{item.icon}{item.title}</a>
              )}
            </li>
          ))}
        </ul>
      }

      {
        currentItem && (
          <div className="">
            <div className="flex items-center w-full font-semibold border-b pb-3">
              <button onClick={() => setCurrentItem(null)} className="font-semibold mr-2"><IoChevronBack /></button>
              <h1>
                {currentItem.title}
              </h1>
            </div>
            <div className='m-4' >

              {
                currentItem.component
              }
            </div>
          </div>
        )
      }

    </div>
  )
}

