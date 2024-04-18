import React from "react";
import LineaBoton from "../LateralFiltroMapa/Recursos/CUADRO-USUARIO.png";

import "./BotonMenu.css";

export default function BotonMenu(props: any) {
  return (
    <div className="containerImgTxtBox" onClick={props.onClick1}>
      <img className="imagenTextBox" src={LineaBoton} alt="LineaBoton" />
      <p className="TextOption">{props.children}</p>
    </div>
  );
}
