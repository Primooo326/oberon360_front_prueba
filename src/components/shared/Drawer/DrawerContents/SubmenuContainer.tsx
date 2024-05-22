import { useSystemStore } from "@/states/System.state";
import { RxCross1 } from "react-icons/rx";

export default function SubmenuContainer({ title, children }: { title: string; children: React.ReactNode }) {

  const {
    setShowDrawer: setShowSidebar,
  } = useSystemStore()

  return (
    <div className="h-screen py-8 overflow-y-auto scroll bg-base-100  border-r w-[400px]">
      <div className="px-5 flex justify-between items-center">

        <h2 className="text-xl font-bold">{title}</h2>
        <button className="btn btn-ghost btn-sm" onClick={() => setShowSidebar(false)} >
          <RxCross1 className="text-xl" />
        </button>
      </div>
      <div className="mt-8 space-y-4">
        {children}
      </div>
    </div>
  )
}
