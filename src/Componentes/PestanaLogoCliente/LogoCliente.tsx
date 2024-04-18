import React from "react";

export default function LogoCliente() {
  const AlpinaLogo = "";
  return (
    <div
      style={{
        width: "150px",
        height: "100px",
        padding: "20px",
        position: "absolute",
        boxShadow: "#0000000",
        top: 30,
        right: 0,
        bottom: 0,
        zIndex: 1,
        backgroundImage:
          "linear-gradient(to right, rgba(200, 200, 200, 1), rgba(200, 200, 200, 1))",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <img src={AlpinaLogo} alt="Logo Usuario"></img>
    </div>
  );
}
