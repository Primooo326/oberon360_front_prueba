// import { useEffect, useState } from "react";
// import "./ContenedorTickets.css";
// import LineaBoton from "../../assets/Recursos/CUADRO-USUARIO.png";
// import { useConections } from "../../context/conexionesprovider";

// export default function ContenedorTickets({
//   setSelectedMarker,
//   setCenter,
// }: any) {
//   const { ubicaciones, getUbicaciones }: any = useConections();
//   const [filtroVisible, setFiltroVisible] = useState(false);

//   const handleMarkerClick = (marker: any) => {
//     setSelectedMarker(marker);
//     setCenter({
//       lat: parseFloat(marker.Latitud),
//       lng: parseFloat(marker.Longitud),
//     });
//   };

//   useEffect(() => {
//     getUbicaciones();
//   }, [getUbicaciones]);

//   const toggleFiltro = () => {
//     setFiltroVisible(!filtroVisible);
//   };

//   return (
//     <>
//       {/* <button className={`botonMostrarFiltros ${filtroVisible ? 'oculto' : ''}`} onClick={toggleFiltro}>
//         <img className='lineaFiltro' src={BotonFiltro} alt="LineaBoton" />
//         Tickets
//       </button> */}
//       <div className={`ContenedorTickets ${filtroVisible ? "visible" : ""}`}>
//         {ubicaciones.map((ticket: any, index: number) => (
//           <div
//             key={index}
//             className="TicketUnitario"
//             onClick={() => handleMarkerClick(ticket)}
//           >
//             <div className="containerImgTxtBox">
//               <img
//                 className="imagenTextBox"
//                 src={LineaBoton}
//                 alt="LineaBoton"
//               />
//               <p className="TextOption">{ticket.Detalle}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// }
