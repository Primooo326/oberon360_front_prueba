import Image from "next/image";
import "./AuthLayout.css"
import MainLayout from '@/layouts/MainLayout';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <MainLayout>
            <main className='mainAuth' >
                <div className='w-full h-full flex flex-col items-center justify-center' >
                    <Image className='img360' src="/assets/Recursos/login/Oberon-360-LOGOV2.png" width={444} height={250} alt="Logo 360" />

                    {children}
                </div>
                <Image className='LogoRms' src="/assets/Recursos/login/POWERED-BY-RMS.png" width={185} height={103} alt="Powered by RMS" />
            </main>
        </MainLayout>
    );
}