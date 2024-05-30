import CustomCell from "@/components/Shared/Table/CustomCell";

export const responseTableDriverExample = (api: string) => {
    return new Promise<any>((resolve) => {
        setTimeout(() => {
            resolve({
                data: [
                    {
                        CONDUCTOR_ID: "1",
                        fecha: "2024-04-30",
                        tipoAlerta: "Fuera de Ruta",
                        observaciones: [
                            { observacion: "Desvío detectado cerca del punto de control 5", fecha: "2024-04-30" }
                        ],
                        estado: "Pendiente",
                        pasosProtocolo: [
                            { orden: 1, descripcion: 'Contactar al conductor para verificar situación', estado: 'Pendiente' },
                            { orden: 2, descripcion: 'Actualizar ruta en GPS', estado: 'Pendiente' }
                        ],
                        conductor: {
                            id: "101",
                            nombre: "Carlos",
                            apellido: "Gómez",
                            dni: "48274658",
                            telefono: "987654321",
                            email: "carlos.gomez@example.com",
                            foto: "https://ui-avatars.com/api/?name=carlos.gomez@example.com"
                        }
                    },
                    {
                        id: "2",
                        fecha: "2024-04-29",
                        tipoAlerta: "Exceso de Velocidad",
                        observaciones: [
                            { observacion: "Velocidad excesiva registrada en autopista M30", fecha: "2024-04-29" }
                        ],
                        estado: "En Proceso",
                        pasosProtocolo: [
                            { orden: 1, descripcion: 'Notificar al conductor sobre políticas de velocidad', estado: 'Completado' },
                            { orden: 2, descripcion: 'Realizar seguimiento de comportamiento de velocidad', estado: 'Pendiente' }
                        ],
                        conductor: {
                            id: "102",
                            nombre: "Ana",
                            apellido: "Martínez",
                            dni: "47281924",
                            telefono: "923456789",
                            email: "ana.martinez@example.com",
                            foto: "https://ui-avatars.com/api/?name=ana.martinez@example.com"
                        }
                    },
                    {
                        id: "3",
                        fecha: "2024-04-28",
                        tipoAlerta: "Frenado Brusco",
                        observaciones: [
                            { observacion: "Frenado brusco detectado en cruce peligroso", fecha: "2024-04-28" }
                        ],
                        estado: "Finalizado",
                        pasosProtocolo: [
                            { orden: 1, descripcion: 'Revisar condiciones del vehículo', estado: 'Completado' },
                            { orden: 2, descripcion: 'Capacitar al conductor en técnicas de manejo seguro', estado: 'Completado' }
                        ],
                        conductor: {
                            id: "103",
                            nombre: "Miguel",
                            apellido: "Ruiz",
                            dni: "48905631",
                            telefono: "912345678",
                            email: "miguel.ruiz@example.com",
                            foto: "https://ui-avatars.com/api/?name=miguel.ruiz@example.com"
                        }
                    },
                    {
                        id: "4",
                        fecha: "2024-04-27",
                        tipoAlerta: "Aceleración Brusca",
                        observaciones: [
                            { observacion: "Aceleración brusca registrada en autopista M40", fecha: "2024-04-27" }
                        ],
                        estado: "Finalizado",
                        pasosProtocolo: [
                            { orden: 1, descripcion: 'Revisar condiciones del vehículo', estado: 'Completado' },
                            { orden: 2, descripcion: 'Capacitar al conductor en técnicas de manejo seguro', estado: 'Completado' }
                        ],
                        conductor: {
                            id: "104",
                            nombre: "Laura",
                            apellido: "García",
                            dni: "48274658",
                            telefono: "987654321",
                            email: "laura.garcia@example.com",
                            foto: "https://ui-avatars.com/api/?name=laura.garcia@example.com"

                        },
                    },
                    {
                        id: "5",
                        fecha: "2024-04-26",
                        tipoAlerta: "Retraso en Ruta",
                        observaciones: [
                            { observacion: "Retraso detectado en punto de control 3", fecha: "2024-04-26" }
                        ],
                        estado: "Pendiente",
                        pasosProtocolo: [
                            { orden: 1, descripcion: 'Contactar al conductor para verificar situación', estado: 'Pendiente' },
                            { orden: 2, descripcion: 'Actualizar ruta en GPS', estado: 'Pendiente' }
                        ],
                        conductor: {
                            id: "105",
                            nombre: "Javier",
                            apellido: "Hernández",
                            dni: "47281924",
                            telefono: "923456789",
                            email: "javi.herna@example.com",
                            foto: "https://ui-avatars.com/api/?name=javi.herna@example.com+Doe"

                        },
                    }
                ],
                columns: [
                    {
                        name: 'Detalle',
                        cell: (row: any) => CustomCell.Button({
                            options: {
                                color: 'primary',
                                size: 'sm',
                            },
                            disabled: false,
                            children: 'Foto',
                            onClick: () => {console.log('prueba')}
                        })
                    },
                    {
                        name: 'Tipo de Documento',
                        selector: (row: any) => row.typeIdentification.TIP_IDEN_DESCRIPCION,
                        sortable: true,
                    },
                    {
                        name: 'Documento',
                        selector: (row: any) => row.CONDUCTOR_IDENTIFICACION,
                        sortable: true,
                    },
                    {
                        name: 'Código',
                        selector: (row: any) => row.CONDUCTOR_CODCONDUCTOR,
                        sortable: true,
                    },
                    {
                        name: 'Nombre',
                        selector: (row: any) => row.CONDUCTOR_PRIMERNOMBRE,
                        sortable: true,
                    },
                    {
                        name: 'RH',
                        selector: (row: any) => row.factorRh.FACTOR_RH_DESCRIPCION,
                        sortable: true,
                    },
                    {
                        name: 'Teléfono Personal',
                        selector: (row: any) => row.CONDUCTOR_TELPERSONAL,
                        sortable: true,
                    },
                    {
                        name: 'Teléfono Corporativo',
                        selector: (row: any) => row.CONDUCTOR_TELCORPORATIVO,
                        sortable: true,
                    }
                ],
            });
        }, 1);
    });
}