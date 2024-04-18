import { useState } from "react";
import LogoUsuarioIndefinido from "../../assets/Recursos/BARRA-BOTON.png";
import BotonFiltro from "../../assets/Recursos/CUADRO-USUARIO.png";
import Ondas from "@assets/Recursos/ONDA-BARRA-LATERAL.svg"
import "./LateralFiltroMapa.css";
import oberon360 from "@assets/img/login/LOGO-OBERON-360-FIN.png"
import { Link } from "react-router-dom";
import type { TRiesgo } from "@/models/ubicaciones.model";
import { riesgosData } from "@/data/mapaData";
export default function LateralFiltroMapa({
  clientes, cliente, setCliente, setRiesgosShow
}: any) {
  const [filtroVisible, setFiltroVisible] = useState(false);
  const [mostrarClientes, setMostrarClientes] = useState(false);
  const [mostrarRiesgos, setMostrarRiesgos] = useState(false);
  const [riesgos, setRiesgos] = useState<TRiesgo[]>([]);
  const mostrarClientesFiltro = () => {
    setMostrarClientes(!mostrarClientes);
  }

  const mostrarRiesgosFiltro = () => {
    setMostrarRiesgos(!mostrarRiesgos);
  }

  const handleRiesgos = (riesgoItem: TRiesgo) => {

    if (riesgos.find((item: TRiesgo) => item === riesgoItem)) {
      setRiesgos(riesgos.filter((item: TRiesgo) => item !== riesgoItem));
      setRiesgosShow(riesgos.filter((item: TRiesgo) => item !== riesgoItem));
    } else {
      const riesgosArray = riesgos.slice();
      riesgosArray.push(riesgoItem);
      setRiesgosShow(riesgosArray);
      setRiesgos(riesgosArray);
    }
  }

  const toggleFiltro = () => {
    setFiltroVisible(!filtroVisible);
  };

  const seleccionarCliente = (cliente: any) => {
    setCliente(cliente);
  }

  return (
    <div>
      <button
        type="button"
        className={`botonMostrarFiltros ${filtroVisible ? "oculto" : ""}`}
        onClick={toggleFiltro}
      >
        <img className="lineaFiltro" src={BotonFiltro} alt="Linea Boton" />
        Menú
      </button>
      <div className={`BarraLateral ${filtroVisible ? "visible" : ""}`}>
        <img src={Ondas} alt="ondas" className="ondas" />
        <img className="FotoUsuario" src={LogoUsuarioIndefinido} alt="User" />
        <img className="oberon360" src={oberon360} alt="oberon360" />
        <h2 className="textoUsuario">USUARIO</h2>
        <button
          type="button"
          className="botonCerrar" onClick={toggleFiltro}>
          X
        </button>
        <div className="textMenu">
          <div className="menu">
            <div className="btn-menu" onClick={() => mostrarClientesFiltro()} >
              Clientes
            </div>
            <div className={`sub-menu ${mostrarClientes ? "visible" : ""}`}>
              {clientes.map((item: any, index: number) => (
                <div onClick={() => seleccionarCliente(item)} key={index} className={`sub-menu-item ${cliente !== null && cliente.CLIE_ID_REG === item.CLIE_ID_REG ? "active" : ""}`}>
                  {item.CLIE_COMERCIAL}
                </div>
              ))
              }
            </div>
          </div>
          <Link to={"/asistencia"} className="btn-menu">
            Control de asistencia
          </Link>
          <div className="btn-menu">
            Tecnología Inteligente
          </div>
          <div className="menu">
            <div className="btn-menu" onClick={() => mostrarRiesgosFiltro()} >
              Riesgos
            </div>
            <div className={`sub-menu ${mostrarRiesgos ? "visible" : ""}`}>
              {riesgosData.map((item: TRiesgo, index: number) => (
                <div onClick={() => handleRiesgos(item)} key={index} className={`sub-menu-item ${riesgos.find((riesgo: TRiesgo) => riesgo === item) ? "active" : ""}`}>
                  {item}
                </div>
              ))
              }
            </div>
          </div>
          <div className="btn-menu">
            Operación
          </div>
          <div className="btn-menu">
            Tickets
          </div>
          <div className="btn-menu">
            Tableros de control
          </div>
        </div>
      </div>
    </div>
  );
}
