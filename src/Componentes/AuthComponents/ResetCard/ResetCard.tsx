import usuLogo from "@assets/img/login/ICONO-USUARIO-GRANDE.png";
import "./ResetCard.css"
import { changePassword } from "@/api/conexiones.api";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation"
export default function ResetCard({ setCargando }: { setCargando: (b: boolean) => void }) {
    const router = useRouter()
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [mostrarPassword, setMostrarPassword] = useState(false);

    const handleNewPasswordChange = (event: any) => {
        setNewPassword(event.target.value);
    };

    const handlePasswordChange = (event: any) => {
        setConfirmPassword(event.target.value);
    };

    const onClickReset = async (e) => {
        e.preventDefault();
        setCargando(true);
        try {
            const respuesta = await changePassword(newPassword, confirmPassword);
            console.log(respuesta);
            localStorage.setItem("token", respuesta.data.token);
            router.push("/dashboard");

        } catch (error: any) {
            console.log(error);
            toast.error(`${error}`, { autoClose: 5000 })
            setCargando(false);
        }
        setCargando(false);
    };

    const MostrarPass = () => {
        setMostrarPassword(!mostrarPassword);
    };


    useEffect(() => {
        toast.info("Por favor cambia tu contraseña", { autoClose: 5000 })
    }, [])
    return (
        <div className="card bg-primary p-[30px] flex flex-col items-center">
            <img className="usuLogo" src={usuLogo} alt="Usuario Logo" />
            <h1 className="font-bold text-xl text-info mt-5 " >Cambia de contraseña</h1>
            <form className="mt-5" >
                <label className="input  flex items-center gap-2 mt-3">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                    <input onChange={handleNewPasswordChange} type={mostrarPassword ? "text" : "password"} className="grow" placeholder="Contraseña nueva" />
                </label>
                <label className="input  flex items-center gap-2 mt-3">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                    <input onChange={handlePasswordChange} type={mostrarPassword ? "text" : "password"} className="grow" placeholder="Repite contraseña" />
                </label>
                <div className="form-control">
                    <label className="label cursor-pointer">
                        <span className="label-text">Mostrar contraseñas</span>
                        <input onChange={MostrarPass} type="checkbox" className="checkbox checkbox-tertiary" />
                    </label>
                </div>
                <button onClick={onClickReset} className="btn btn-tertiary bordered text-white btn-block mt-5">Cambiar contraseña</button>
            </form>
        </div>
    )
}
