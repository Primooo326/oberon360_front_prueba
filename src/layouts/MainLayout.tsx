import { Inter } from 'next/font/google'
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Oberon 360',
    description: 'Oberon 360 es una plataforma de seguimiento satelital y gestión de flotas de vehículos y activos móviles.',
}
import 'react-toastify/dist/ReactToastify.css';
export default function MainLayout({ children }: { children: React.ReactNode }) {

    return (
        <html lang="es">
            <body className={inter.className}>
                {children}
                <ToastContainer />
            </body>
        </html>
    )
}
