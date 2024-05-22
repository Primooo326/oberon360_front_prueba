import Image from 'next/image';
import './IconoCargando.css'

export default function IconoCargando() {
  return (
    <div className='contenedorImagen'>
      <Image
        className='logoCarga'
        width={900}
        height={1080}
        src="/assets/Recursos/login/gif/OBERON BLANCO RESPONSIVE.gif"

        alt="Icono de Cargando"
      />
    </div>
  );
}
