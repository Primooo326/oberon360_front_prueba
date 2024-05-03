"use client"
import Sidebar from "@/components/Sidebar/Sidebar";
import MainLayout from "@/layouts/MainLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <MainLayout>
            <section className="w-screen h-screen mainLayout relative scroll" >
                <Sidebar />

                {children}
            </section>
        </MainLayout>
    );
}