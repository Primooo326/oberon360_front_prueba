import { useFiltrosMapa } from '@/states/FiltrosMapa.state';
import { useSystemStore } from '@/states/System.state';

export default function FiltrosOleoducto() {
    const { toggleFiltro } = useFiltrosMapa()
    const { oleoductosFiltro } = useFiltrosMapa().filtrosMapState
    const { resetMapConfig } = useSystemStore()

    return (
        <div>
            <div className="space-y-4">
                <div className=''>
                    <div className='mb-5 flex justify-between items-center'>
                        <h2 className='mb-2 font-semibold'>
                            Visualizar en el mapa
                        </h2>
                        <input type="checkbox" className="toggle toggle-success" onChange={(e) => {
                            e.preventDefault()
                            resetMapConfig()
                            toggleFiltro("oleoductosFiltro")
                        }} checked={oleoductosFiltro} />
                    </div>
                </div>
            </div>
        </div>
    )
}