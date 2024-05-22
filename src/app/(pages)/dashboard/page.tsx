"use client"
import './Dashboard.css'
import { useSystemStore } from '@/states/System.state'
import VistaMax from '@/components/DashboardComponents/VistasComponents/VistaMax'
import VistaMin from '@/components/DashboardComponents/VistasComponents/VistaMin'
import ModalProtocolo from '@/components/DashboardComponents/ModalProtocolo/ModalProtocolo'

export default function Dashboard() {

    const { mapExpand } = useSystemStore()

    return (
        <>
            {mapExpand ? (
                <VistaMax />
            ) : (
                <VistaMin />
            )}
            <ModalProtocolo />
        </>

    )
}
