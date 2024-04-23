import LogoCarga from '@assets/img/login/gif/OBERON BLANCO RESPONSIVE.gif';
import Image from 'next/image';
import './IconoCargando.css'

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
