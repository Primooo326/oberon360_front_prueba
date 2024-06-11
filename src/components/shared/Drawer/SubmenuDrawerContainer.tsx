import { useSystemStore } from "@/states/System.state";
import { RxCross1 } from "react-icons/rx";
export default function SubmenuDrawerContainer({ title, canClose = true, children }: { title: string; canClose?: boolean; children: React.ReactNode }) {

  const {
    setShowDrawer: setShowSidebar,
  } = useSystemStore()

  return (
    <div className="h-screen py-8 overflow-y-auto scroll bg-base-100  border-r w-[400px]">
      <div className="px-5 flex justify-between items-center">

        <h2 className="text-xl font-bold">{title}</h2>
        {
          canClose && (
            <button
              onClick={() => setShowSidebar(false)}
              className="p-1.5 text-gray-500 focus:outline-none transition-colors duration-200 rounded-lg hover:bg-gray-100"
            >
              <RxCross1 className="w-6 h-auto" />
            </button>
          )
        }
      </div>
      <div className="mt-4 space-y-4">
        {children}
      </div>
    </div>
  )
}
