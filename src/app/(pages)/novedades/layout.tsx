import Sidebar from "@/components/Sidebar/Sidebar";
import MainLayout from "@/layouts/MainLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <MainLayout>
            <main className="w-screen mainLayout max-w-screen" >
                <Sidebar />

                {children}
            </main>

        </MainLayout>
    );
}