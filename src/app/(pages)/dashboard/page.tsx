"use client"
import DashboardLayout from '@/layouts/Dashboard/DashboardLayout'
import './Dashboard.css'
import { useSystemStore } from '@/states/System.state'
import VistaMax from '@/components/DashboardComponents/VistasComponents/VistaMax'
import VistaMin from '@/components/DashboardComponents/VistasComponents/VistaMin'

export default function Dashboard() {

    const { mapExpand } = useSystemStore()

    return (
        <DashboardLayout>
            {mapExpand ? (
                <VistaMax />
            ) : (
                <VistaMin />
            )}
        </DashboardLayout>
    )
}
