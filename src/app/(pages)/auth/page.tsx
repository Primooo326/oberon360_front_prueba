"use client";
import LoginCard from "@/Componentes/AuthComponents/LoginCard/LoginCard"
import ResetCard from "@/Componentes/AuthComponents/ResetCard/ResetCard"
import AuthLayout from "@/layouts/Auth/AuthLayout"
import { useState } from "react";
import IconoCargando from "@/Componentes/IconoCargando/IconoCargando";

export default function page() {
    const [cargando, setCargando] = useState(false);
    const [reset, setReset] = useState(false)
    return (
        <AuthLayout>
            {reset ? (
                <ResetCard setCargando={setCargando} />
            ) : (
                <LoginCard setCargando={setCargando} setReset={setReset} />
            )}
            {cargando && <IconoCargando />}
        </AuthLayout>
    )
}
