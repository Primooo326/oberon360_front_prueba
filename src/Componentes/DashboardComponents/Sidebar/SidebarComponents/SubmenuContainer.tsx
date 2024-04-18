import { RxCross1 } from "react-icons/rx";

export default function SubmenuContainer({ title, children }: { title: string; children: React.ReactNode }) {

  return (
    <div className="h-screen py-8 overflow-y-auto bg-white border-l border-r sm:w-64 w-60 dark:bg-gray-900 dark:border-gray-700">
      <div className="px-5 flex justify-between items-center">

        <h2 className=" text-lg font-medium text-gray-800 dark:text-white">{title}</h2>
        <button className="btn btn-ghost btn-sm" >
          <RxCross1 />
        </button>
        {/* {showSidebar && (<button onClick={() => handleToggleSidebar()} className="border-2 rounded-full border-accent bg-blue-100 w-4 h-4 " />)}
        {!showSidebar && <button onClick={() => handleToggleSidebar()} className="border-2 rounded-full border-gray-400  w-4 h-4 " />} */}
      </div>
      <div className="mt-8 space-y-4">
        {children}
      </div>
    </div>
  )
}
