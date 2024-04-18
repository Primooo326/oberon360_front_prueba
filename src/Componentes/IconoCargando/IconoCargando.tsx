// import LogoCarga from '@assets/img/login/CIRCULO-CARGAR.png';
import LogoCarga from '@assets/img/login/gif/OBERON BLANCO RESPONSIVE.gif';

import './IconoCargando.css'
import Image from 'next/image';

export default function IconoCargando() {
  return (
    <div className='contenedorImagen'>
      <Image
        className='logoCarga'
        src={LogoCarga}
        alt="Icono de Cargando"
      />
    </div>
  );
}
