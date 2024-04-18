import Logoimg from "../../assets/img/img-asistencia/TSI.png";
import "./asistenciaLayout.css"
export default function AsistenciaLayout({ children }: { children: React.ReactNode }) {
    return (
        <main>
            <header>
                <div className="titleContainer">
                    <h1 className="title"> CONTROL DE ASISTENCIA</h1>
                    <div className="LineaConPuntos" />
                </div>
                <img className="logoTsi" src={Logoimg} alt="logo" />

            </header>
            <section>

                {children}
            </section>
        </main>
    )
}
