
import type { IVehiculo } from "@/models/vehiculos.model";
import VehiculosContent from "./VehiculosContent/VehiculosContent";
import type { IUbicacionCliente } from "@/models/ubicaciones.model";
import { useSystemStore } from "@/states/System.state";
import { MdOutlineLocationSearching } from "react-icons/md";
interface SidebarRightProps {
    item: "vehiculos" | "ubicaciones"
    content: IVehiculo | IUbicacionCliente
}
export default function SidebarRight({ item, content }: SidebarRightProps) {
    const { setItemSidebarRight, mapExpand, mapConfig, setMapConfig } = useSystemStore();

    const handleSetMapConfig = () => {
        setMapConfig({
            zoom: 15,
            fixed: true,
            center: {
                lat: Number.parseFloat(`${(content as IVehiculo).WTLT_LAT}`),
                lng: Number.parseFloat(`${(content as IVehiculo).WTLT_LON}`)
            },
            showLoadMap: false

        })
    }

    return (
        <section className="flex h-full bg-transparent" data-theme="oberon">
            <div className={`flex flex-col justify-between w-[550px] h-full bg-base-100 ${mapExpand ? "border-l" : "border rounded-xl"}`}>
                <div className=" flex justify-between p-6">
                    <h1 className="font-bold text-lg" >{item === "vehiculos" ? "Vehiculo" : "Ubicación"}</h1>
                    <button onClick={() => handleSetMapConfig()} className={`btn btn-secondary btn-sm ${mapConfig.fixed ? "btn-disabled" : ""}`}>
                        <MdOutlineLocationSearching className="text-lg" />  Ubicar </button>
                    <button className="btn btn-outline btn-accent btn-sm" onClick={() => setItemSidebarRight(null)} >Cerrar</button>
                </div>

                <div className="overflow-y-auto scroll overflow-x-hidden mt-3 p-6" >

                    {item === "vehiculos" ? (

                        <VehiculosContent content={content as IVehiculo} />
                    ) : (
                        <VehiculosContent content={content as IVehiculo} />
                    )}
                </div>

            </div>
        </section>
    )
}
