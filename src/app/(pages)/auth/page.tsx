"use client"
import LoginCard from "@components/AuthComponents/LoginCard/LoginCard"
import ResetCard from "@components/AuthComponents/ResetCard/ResetCard"
import AuthLayout from "@/layouts/Auth/AuthLayout"
import { useState } from "react";
import IconoCargando from "@components/IconoCargando/IconoCargando";

export default function page() {
    const [cargando, setCargando] = useState(false);
    const [reset, setReset] = useState(false)
    return (
        <AuthLayout data-theme="oberon" >
            {reset ? (
                <ResetCard setCargando={setCargando} />
            ) : (
                <LoginCard setCargando={setCargando} setReset={setReset} />
            )}
            {cargando && <IconoCargando />}
        </AuthLayout>
    )
}
