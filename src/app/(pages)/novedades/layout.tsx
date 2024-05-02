import Sidebar from "@/components/Sidebar/Sidebar";
import MainLayout from "@/layouts/MainLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <MainLayout>
            <main className="mainLayout" >
                <Sidebar />

                {children}
            </main>

        </MainLayout>
    );
}