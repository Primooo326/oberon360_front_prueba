import { changePassword } from "@/api/conexiones.api";
import usuLogo from "@assets/img/login/ICONO-USUARIO-GRANDE.png";
import inputLogo from "@assets/img/login/CUADRO-USUARIO.png";
import passwordLogo from "@assets/img/login/CUADRO-CONTRASEÑA.png";
import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../formularioStyle.css";


export default function FormularioReset({ setCargando }: { setCargando: (b: boolean) => void }) {
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [mostrarPassword, setMostrarPassword] = useState(false);

    const handleNewPasswordChange = (event: any) => {
        setNewPassword(event.target.value);
    };

    const handlePasswordChange = (event: any) => {
        setConfirmPassword(event.target.value);
    };

    const onClickReset = async () => {
        setCargando(true);
        try {
            const respuesta = await changePassword(newPassword, confirmPassword);
            console.log(respuesta);
            localStorage.setItem("token", respuesta.data.token);
            navigate("/mapa");

        } catch (error: any) {
            toast.error(error.response.data.message, { autoClose: 5000 })
            console.log(error);

        }
        setCargando(false);
    };

    const MostrarPass = () => {
        setMostrarPassword(!mostrarPassword);
    };

    const handleKeyPress = (event: any) => {
        if (event.key === "Enter") {
            onClickReset();
        }
    };

    useEffect(() => {
        toast.info("Por favor cambia tu contraseña", { autoClose: 5000 })
    }, [])

    return (
        <div className="contenedor_formulario">
            <img className="usuLogo" src={usuLogo} alt="Usuario Logo" />
            <h1>Cambia la contraseña</h1>
            <form>
                <div className="ContainerUsuText">
                    <label htmlFor="user">Nueva contraseña</label>

                    <img className="ImgUsuText" src={inputLogo} alt="Input Logo" />
                    <input
                        autoComplete="false"
                        id="user"
                        className="ImgUsuText InputText TextPass"
                        onChange={handleNewPasswordChange}
                        type={mostrarPassword ? "text" : "password"}
                        onKeyUp={handleKeyPress}
                    />
                    <button
                        className="MostrarContraseña"
                        onClick={MostrarPass}
                        type="button"
                    >
                        {mostrarPassword ? <FaEye style={{ color: "#00e7ff" }} /> : <FaEyeSlash style={{ color: "#00e7ff" }} />}
                    </button>
                </div>
                <div className="ContainerUsuText ConetenedorContrasena">
                    <label htmlFor="pass">Confirma Contraseña</label>
                    <img className="ImgUsuText" src={passwordLogo} alt="Password Logo" />
                    <input
                        id="pass"
                        className="ImgUsuText InputText TextPass"
                        onChange={handlePasswordChange}
                        type={mostrarPassword ? "text" : "password"}
                        onKeyUp={handleKeyPress}
                    />
                    <button
                        className="MostrarContraseña"
                        onClick={MostrarPass}
                        type="button"
                    >
                        {mostrarPassword ? <FaEye style={{ color: "#00e7ff" }} /> : <FaEyeSlash style={{ color: "#00e7ff" }} />}
                    </button>
                </div>
                <div className="ContainerBtn">
                    <button className="btnSubmit" onClick={onClickReset} type="button">
                        Ingresar
                    </button>
                </div>
            </form>
        </div>
    );
}
