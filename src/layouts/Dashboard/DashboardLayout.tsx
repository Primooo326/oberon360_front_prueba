import Sidebar from "@/Componentes/DashboardComponents/Sidebar/Sidebar"
import "./DashboardLayout.css"
export default function DashboardLayout({ children }: { children: React.ReactNode }) {

    

    return (
        <main className="mainDashboard">
            <Sidebar />
            <section className="w-full h-full overflow-y-scroll py-16 md:p-8 scroll" >
                {children}
            </section>
        </main>
    )
}
