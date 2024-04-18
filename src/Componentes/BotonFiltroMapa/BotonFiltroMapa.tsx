import React from "react";

export default function BotonFiltroMapa(props: any) {
  return (
    <button
      // onClick={onClick}
      style={{
        padding: "10px 20px",
        fontSize: "16px",
        backgroundColor: "#ff0000" /* Azul */,
        color: "#ffffff" /* Blanco */,
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      {props.children}
    </button>

    // <div>
    // {props.children}
    // </div>
  );
}
