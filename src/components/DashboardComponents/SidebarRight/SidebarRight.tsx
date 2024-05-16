
import type { IVehiculo } from "@/models/vehiculos.model";
import VehiculosContent from "./VehiculosContent/VehiculosContent";
import type { IUbicacionCliente } from "@/models/ubicaciones.model";
import { useSystemStore } from "@/states/System.state";
import { MdOutlineLocationSearching } from "react-icons/md";
import OleoductosContent from "./VehiculosContent/OleoductosContent";
// interface SidebarRightProps {
//     item: "vehiculos" | "ubicaciones"
//     content: IVehiculo | IUbicacionCliente
// }
export default function SidebarRight() {
    const { setShowSidebarRight, mapExpand, mapConfig, setMapConfig, itemSidebarRight } = useSystemStore();


    const cerrar = () => {
        setMapConfig({
            zoom: 5,
            fixed: true,
            center: { lat: 3.3345374, lng: -74.2701511 },
            showLoadMap: false,
        })
        setShowSidebarRight(false)
    }

    const handleSetMapConfig = () => {
        setMapConfig({
            zoom: 15,
            fixed: true,
            center: {
                lat: Number.parseFloat(`${(itemSidebarRight!.content as IVehiculo).WTLT_LAT}`),
                lng: Number.parseFloat(`${(itemSidebarRight!.content as IVehiculo).WTLT_LON}`)
            },
            showLoadMap: false

        })
    }

    return (
        <section className="flex h-full bg-transparent" data-theme="oberon">
            <div className={`flex flex-col justify-between w-[550px] h-full bg-base-100 ${mapExpand ? "border-l" : "border rounded-xl"}`}>
                <div className=" flex justify-between p-6">
                    {itemSidebarRight?.item === "vehiculos" && (
                        <>
                            <h1 className="font-bold text-lg" >{itemSidebarRight?.item === "vehiculos" ? "Vehiculo" : "Ubicación"}</h1>
                            <button onClick={() => handleSetMapConfig()} className={`btn btn-secondary btn-sm ${mapConfig.fixed ? "btn-disabled" : ""}`}>
                                <MdOutlineLocationSearching className="text-lg" />  Ubicar </button>
                            <button className="btn btn-outline btn-accent btn-sm" onClick={() => cerrar()} >Cerrar</button>
                        </>
                    )}
                    {itemSidebarRight?.item === "oleoducto" && (
                        <>
                            <h1 className="font-bold text-lg" >Oleoducto</h1>
                            <button className={`btn btn-secondary btn-sm ${mapConfig.fixed ? "btn-disabled" : ""}`}>
                                <MdOutlineLocationSearching className="text-lg" />  Ubicar </button>
                            <button className="btn btn-outline btn-accent btn-sm" onClick={() => cerrar()} >Cerrar</button>
                        </>
                    )}
                </div>

                <div className="overflow-y-auto scroll overflow-x-hidden mt-3 p-6" >

                    {itemSidebarRight?.item === "vehiculos" && <VehiculosContent />}
                    {itemSidebarRight?.item === "oleoducto" && <OleoductosContent />}
                </div>

            </div>
        </section>
    )
}
