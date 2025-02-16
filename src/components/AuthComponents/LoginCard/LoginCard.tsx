
import "./LoginCard.css"
import { useLoginStore } from "@/states/Login.state";
import { verifyJWT } from "@/utils/tools";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"
import Image from "next/image";
import Cookies from "js-cookie";
import { login } from "@/api/dashboard/auth.api";
export default function LoginCard({ setCargando, setReset }: { setCargando: (b: boolean) => void, setReset: (b: boolean) => void }) {
    const router = useRouter();
    const { setToken, setUser } = useLoginStore()
    const [userForm, setUserForm] = useState("");
    const [password, setPassword] = useState("");
    const [mostrarPassword, setMostrarPassword] = useState(false);

    const handleUsuarioChange = (event: any) => {
        setUserForm(event.target.value);
    };

    const handlePasswordChange = (event: any) => {
        setPassword(event.target.value);
    };

    const onClickLogin = async (e: any) => {
        setCargando(true);
        e.preventDefault();
        try {
            const respuesta = await login({ user: userForm, password });

            setUser(userForm);
            setToken(respuesta.token);
            Cookies.set("token", respuesta.token);
            if (respuesta.resetPass) {
                setReset(true);
            }
            else {
                router.push("/dashboard")
            }
        } catch (error: any) {
            console.log(error);
        }
        setCargando(false);
    };

    const MostrarPass = () => {
        setMostrarPassword(!mostrarPassword);
    };

    const verifyToken = async (token: string) => {
        const data = await verifyJWT(token)
        if (data !== false) {
            setCargando(false)
            router.push("/dashboard")
        } else {
            setCargando(false)

        }
    }

    useEffect(() => {
        const token = Cookies.get("token")
        if (token) {
            verifyToken(token)
        }
        setCargando(false)

    }, [])

    return (
        <div className="card bg-primary px-[30px] lg:py-[20px] md:py-[20px] flex flex-col items-center">
            <Image className="usuLogo" src="/assets/Recursos/login/ICONO-USUARIO-GRANDE.png" width={126} height={128} alt="Usuario Logo" />
            <h1 className="font-bold text-xl text-info mt-5" >INGRESO</h1>
            <form className="mt-5" >
                <label className="input input-primary flex items-center gap-2">
                    <svg role="img" aria-label="x" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                    <input onChange={handleUsuarioChange} type="text" className="grow" placeholder="Usuario" />
                </label>
                <label className="input  flex items-center gap-2 mt-3">
                    <svg role="img" aria-label="x" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                    <input onChange={handlePasswordChange} type={mostrarPassword ? "text" : "password"} className="grow" placeholder="Contraseña" />
                </label>
                <div className="form-control ">
                    <label className="label cursor-pointer">
                        <span className="label-text text-white">Mostrar contraseña</span>
                        <input onChange={MostrarPass} type="checkbox" className="checkbox checkbox-secondary" />
                    </label>
                </div>
                <button onClick={onClickLogin} className="btn btn-accent bordered btn-block mt-5">Ingresar</button>
            </form>
        </div>
    )
}
