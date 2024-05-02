
export default function SidebarRight() {
    return (
        <section className="flex h-full bg-transparent" data-theme="oberon">
            <div className="flex flex-col justify-between w-[550px] h-full bg-base-100 border-l">
                <div className=" flex justify-between p-6">
                    <h1 className="font-bold text-lg" >Novedad</h1>

                    <button className="btn btn-outline btn-accent btn-sm" >Cerrar</button>
                </div>

                <div className="overflow-y-auto scroll overflow-x-hidden mt-3 p-6" >

                </div>

            </div>
        </section>
    )
}
