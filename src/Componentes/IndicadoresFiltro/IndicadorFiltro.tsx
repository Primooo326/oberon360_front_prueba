import React, { useState } from "react";
import "./IndicadorFiltro.css";
import BotonFiltro from "../../assets/Recursos/CUADRO-USUARIO.png";

export default function IndicadorFiltro() {
  const [filtroVisible, setFiltroVisible] = useState(false);
  const toggleFiltro = () => {
    setFiltroVisible(!filtroVisible);
  };
  return (
    <div>
      <button
        className={`botonMostrarTickets ${filtroVisible ? "oculto" : ""}`}
        onClick={toggleFiltro}
      >
        <img className="lineaFiltro" src={BotonFiltro} alt="Linea Boton" />
        Tickets
      </button>
      <div className={`contenedorTickets ${filtroVisible ? "visible" : ""}`}>
        <table className="table table-striped ">
          <thead>
            <tr>
              <th>CLASIFICACIÓN DE RIESGO</th>
              <th>ESTADO</th>
              <th>DATOS TICKETS</th>
            </tr>
          </thead>
        </table>
        <button className="botonCerrar" onClick={toggleFiltro}>
          X
        </button>
      </div>
      <div className="contenedor">
        <div
          className="indicadorColor"
          style={{ backgroundColor: "#00a148" }}
        />
        <p>Sin novedad</p>
        <div
          className="indicadorColor"
          style={{ backgroundColor: "#aa0000" }}
        />
        <p>Con novedad</p>
        <div
          className="indicadorColor"
          style={{ backgroundColor: "#00429f" }}
        />
        <p>En curso</p>
        <div
          className="indicadorColor"
          style={{ backgroundColor: "#c7c100" }}
        />
        <p>Resuelto</p>
      </div>
    </div>
  );
}
