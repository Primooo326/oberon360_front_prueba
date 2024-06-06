"use client"
import Drawer from "@/components/shared/Drawer/Drawer";
import MainLayout from "@/layouts/MainLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">

            <head>
                <meta charSet="UTF-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Oberon 360 - Motivo Viaticos</title>
                <link rel="icon" href="/OBERON-NEGRO.png" />
            </head>

            <body >
                <MainLayout>
                    <section className="w-screen h-screen mainLayout relative scroll" >
                        <Drawer />
                        {children}
                    </section>
                </MainLayout>

            </body>
        </html>
    );
}