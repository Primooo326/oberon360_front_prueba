import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Notificaciones() {
  useEffect(() => {
    const retrasos = [
      { id: 1, empleado: "Juan", tardanza: "5" },
      { id: 2, empleado: "María", tardanza: "10" },
    ];

    const retrasosSignificativos = retrasos.filter((retraso) => parseInt(retraso.tardanza) > 5);

    console.log(retrasosSignificativos)

    retrasosSignificativos.forEach((retraso) => {
      toast.warning(`El empleado ${retraso.empleado} está ${retraso.tardanza} tarde`, {
        position: "top-right",
        autoClose: 5000, 
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
  }, []); 

  return (
    <div>
    </div>
  );
}

export default Notificaciones;