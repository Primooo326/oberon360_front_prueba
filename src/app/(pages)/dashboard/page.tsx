"use client"
import './Dashboard.css'
import { useSystemStore } from '@/states/System.state'
import VistaMax from '@/components/DashboardComponents/VistasComponents/VistaMax'
import VistaMin from '@/components/DashboardComponents/VistasComponents/VistaMin'
import ModalComponent from '@/components/DashboardComponents/ModalComponent/ModalComponent'

export default function Dashboard() {

    const { mapExpand } = useSystemStore()

    return (
        <>
            {mapExpand ? (
                <VistaMax />
            ) : (
                <VistaMin />
            )}
            <ModalComponent />
        </>

    )
}
