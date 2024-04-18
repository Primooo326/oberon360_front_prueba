import "./loginLayout.css"
import BKGoberon from '@assets/img/login/BACKGROUND-WEB.png';
import Pwdrms from '@assets/img/login/POWERED-BY-RMS.png';
import logo360 from '@assets/img/login/Oberon-360-LOGOV2.png';
import logo360Mov from '@assets/img/login/gif/OBERON BLANCO RESPONSIVE.gif';
export default function loginLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <img className='prueb' src={BKGoberon} alt="Background" />
      <img className='logo360ima' src={logo360} alt="Logo 360" />
      <img className='LogoRms' src={Pwdrms} alt="Powered by RMS" />
      <img className='ImagenOberonGirando' src={logo360Mov} alt="Oberon Logo" />
      {children}
    </main>
  )
}
