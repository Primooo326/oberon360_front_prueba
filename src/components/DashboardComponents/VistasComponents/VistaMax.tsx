import { useSystemStore } from '@/states/System.state'
import React from 'react'
import MapaGoogleComponent from '../MapaComponent/MapaGoogle'

export default function VistaMax() {

    const { mapConfig } = useSystemStore()

    return (
        <div className="w-full h-screen
             rounded-xl contenedorMapa relative">
            {mapConfig.showLoadMap ?
                <div className="skeleton w-full h-full flex items-center justify-center ">
                    <span className="loading loading-spinner loading-lg" />
                </div>
                :
                <MapaGoogleComponent />
            }
        </div>
    )
}
