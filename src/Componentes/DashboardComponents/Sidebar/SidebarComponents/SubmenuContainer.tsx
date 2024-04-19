import { useSystemStore } from "@/states/System.state";
import { RxCross1 } from "react-icons/rx";

export default function SubmenuContainer({ title, children }: { title: string; children: React.ReactNode }) {

  const {
    setShowSidebar,
  } = useSystemStore()

  return (
    <div className="h-screen py-8 overflow-y-auto scroll bg-white border-l border-r w-[400px] dark:bg-gray-900 dark:border-gray-700">
      <div className="px-5 flex justify-between items-center">

        <h2 className=" text-lg font-medium text-gray-800 dark:text-white">{title}</h2>
        <button className="btn btn-ghost btn-sm" onClick={() => setShowSidebar(false)} >
          <RxCross1 />
        </button>
      </div>
      <div className="mt-8 space-y-4">
        {children}
      </div>
    </div>
  )
}
