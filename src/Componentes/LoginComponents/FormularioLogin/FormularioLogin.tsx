import { useEffect, useState } from "react";
import "../formularioStyle.css";
import usuLogo from "@assets/img/login/ICONO-USUARIO-GRANDE.png";
import inputLogo from "@assets/img/login/CUADRO-USUARIO.png";
import passwordLogo from "@assets/img/login/CUADRO-CONTRASEÑA.png";
import { useNavigate } from "react-router-dom";
import { login } from "@/api/conexiones.api";
import { toast } from "react-toastify";
import { useLoginStore } from "@/states/Login.state";
import { verifyJWT } from "@/tools";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

export default function Formulario({ setCargando, setReset }: { setCargando: (b: boolean) => void, setReset: (b: boolean) => void }) {
  const navigate = useNavigate();
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

  const onClickLogin = async () => {
    setCargando(true);
    try {
      const respuesta = await login({ user: userForm, password });
      console.log(respuesta);

      setUser(userForm);
      setToken(respuesta.data.token);
      localStorage.setItem("token", respuesta.data.token);
      if (respuesta.data.resetPass) {
        setReset(true);
      } else {
        navigate("/mapa");

      }
      setCargando(false);
    } catch (error: any) {
      toast.error(error.response.data.message, { autoClose: 5000 })
      console.log(error);
      setCargando(false);
    }
    setCargando(false);
  };

  const MostrarPass = () => {
    setMostrarPassword(!mostrarPassword);
  };

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      onClickLogin();
    }
  };

  const verifyToken = async (token: string) => {
    const data = await verifyJWT(token)
    console.log(data);
    if (data !== false) {
      // navigate("/mapa")
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      verifyToken(token)
    }
  }, [])

  return (
    <div className="contenedor_formulario">
      <img className="usuLogo" src={usuLogo} alt="Usuario Logo" />
      <h1>Ingreso</h1>
      <form>
        <div className="ContainerUsuText">
          <label htmlFor="user">Usuario</label>

          <img className="ImgUsuText" src={inputLogo} alt="Input Logo" />
          <input
            id="user"
            autoComplete="false"
            className="ImgUsuText InputText"
            onChange={handleUsuarioChange}
            type="text"
            onKeyUp={handleKeyPress}
          />
        </div>
        <div className="ContainerUsuText ConetenedorContrasena">
          <label htmlFor="pass">Contraseña</label>
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
          <button className="btnSubmit" onClick={onClickLogin} type="button">
            IngresaronClickLogin
          </button>
        </div>
      </form>
    </div>
  );
}
