import "@/app/globals.css"
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Oberon 360',
  description: 'Oberon 360 es una plataforma de seguimiento satelital y gestión de flotas de vehículos y activos móviles.',

}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/OBERON-DEGRADADO.png" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
