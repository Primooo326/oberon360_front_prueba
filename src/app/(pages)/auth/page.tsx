"use client"
import LoginCard from "@components/AuthComponents/LoginCard/LoginCard"
import ResetCard from "@components/AuthComponents/ResetCard/ResetCard"
import AuthLayout from "@/layouts/Auth/AuthLayout"
import { useState } from "react";
import IconoCargando from "@components/IconoCargando/IconoCargando";
import { motion } from 'framer-motion';

export default function page() {
    const [cargando, setCargando] = useState(false);
    const [reset, setReset] = useState(false)
    return (
        <AuthLayout data-theme="oberon" >
            {reset ? (
                <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ type: 'linear', stiffness: 200 }}
                    exit={{ y: "100%" }}
                >
                    <ResetCard setCargando={setCargando} />
                </motion.div>
            ) : (

                <LoginCard setCargando={setCargando} setReset={setReset} />
            )}
            {cargando && <IconoCargando />}
        </AuthLayout>
    )
}
