import "./AuthLayout.css"
import logo360 from '@assets/img/login/Oberon-360-LOGOV2.png';
import Pwdrms from '@assets/img/login/POWERED-BY-RMS.png';
import Image from "next/image";
import MainLayout from "../MainLayout";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <MainLayout>
            <main className='mainAuth' >
                <div className='w-full h-full flex flex-col items-center justify-center' >
                    <Image className='img360' src={logo360} alt="Logo 360" />

                    {children}
                </div>
                <Image className='LogoRms' src={Pwdrms} alt="Powered by RMS" />
            </main>
        </MainLayout>
    )
}
