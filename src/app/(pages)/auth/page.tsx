"use client"
import LoginCard from "@components/AuthComponents/LoginCard/LoginCard"
import ResetCard from "@components/AuthComponents/ResetCard/ResetCard"
import { useState } from "react";
import IconoCargando from "@components/Shared/IconoCargando/IconoCargando";
import { motion } from 'framer-motion';

export default function page() {
    const [cargando, setCargando] = useState(true);
    const [reset, setReset] = useState(false)
    return (
        <>
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
        </>
    )
}
