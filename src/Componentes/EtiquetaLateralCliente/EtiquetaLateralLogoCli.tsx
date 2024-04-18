import AlpinaLogo from "@assets/Recursos/mapa/ALPINA-AZUL.png"
import './EtiquetaLateralLogoCli.css'
import OberonLogo from "@assets/img/logo-oberón-.png"
import { useEffect, useState } from "react"

export default function EtiquetaLateralLogoCli({ cliente }: { cliente: any | null }) {
  const [source, setSource] = useState<any>()
  useEffect(() => {
    if (cliente !== null) {
      setSource(AlpinaLogo)
    } else {
      setSource(OberonLogo)

    }
  }, [cliente])
  return (
    <div className='contenedorLogo'>
      <img className='logo' src={source} alt='Logo Usuario' />
    </div>
  )
}
