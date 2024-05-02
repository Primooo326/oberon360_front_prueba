"use client"
import DataTable from 'react-data-table-component';

interface NovedadConductor {
    id: string;
    fecha: string;
    tipoAlerta: "Fuera de Ruta" | "Exceso de Velocidad" | "Frenado Brusco" | "Aceleración Brusca" | "Retraso en Ruta";
    observaciones: {
        observacion: string;
        fecha: string;
    }[];
    estado: "Pendiente" | "En Proceso" | "Finalizado";
    pasosProtocolo: PasoProtocolo[];
    conductor: {
        id: string;
        nombre: string;
        apellido: string;
        dni: string;
        telefono: string;
        email: string;
        foto: string;
    };
}

interface PasoProtocolo {
  orden: number;
  descripcion: string;
  estado: 'Pendiente' | 'Completado';
}

const listaPasoProtocolo: PasoProtocolo[] = [
  { orden: 1, descripcion: 'Intentar contactar al conductor', estado: 'Pendiente' },
  { orden: 2, descripcion: 'Verificar estado del vehículo', estado: 'Pendiente' },
  { orden: 3, descripcion: 'Solicitar ubicación actual', estado: 'Pendiente' },
  { orden: 4, descripcion: 'Informar al supervisor de flota', estado: 'Pendiente' },
  { orden: 5, descripcion: 'Evaluar necesidad de asistencia en carretera', estado: 'Pendiente' },
  { orden: 6, descripcion: 'Revisar cámaras de seguridad', estado: 'Pendiente' },
  { orden: 7, descripcion: 'Actualizar la ruta en el sistema', estado: 'Pendiente' },
  { orden: 8, descripcion: 'Revisión de políticas de conducción con el conductor', estado: 'Pendiente' },
  { orden: 9, descripcion: 'Documentar el incidente', estado: 'Pendiente' },
  { orden: 10, descripcion: 'Realizar un seguimiento post-incidente', estado: 'Pendiente' }
    ];


export default function TableNovedad() {
    const data2: NovedadConductor[] = [
  {
    id: "1",
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
      foto: "https://ui-avatars.com/api/?name=John+Doe"
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
      foto: "https://ui-avatars.com/api/?name=John+Doe"
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
      foto: "https://ui-avatars.com/api/?name=John+Doe"
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
      foto: "https://ui-avatars.com/api/?name=John+Doe"
            
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
      foto: "https://ui-avatars.com/api/?name=John+Doe"
            
        },
    }
];
    const columns = [
        {
            name: 'Nombre',
            selector: (row: any) => row.nombre,
            sortable: true,
        },
        {
            name: 'Apellido',
            selector: (row: any) => row.apellido,
            sortable: true,
        },
        {
            name: 'DNI',
            selector: (row: any) => row.dni,
            sortable: true,
        },
        {
            name: 'Teléfono',
            selector: (row: any) => row.telefono,
            sortable: true,
        },
        {
            name: 'Email',
            selector: (row: any) => row.email,
            sortable: true,
        },
        {
            name: 'Foto',
            selector: (row: any) => row.foto,
            sortable: true,
        },
    ];

    return (
        <DataTable
            title="Lista de Personas"
            columns={columns}
            data={data2}
            pagination
            paginationPerPage={5}
            paginationRowsPerPageOptions={[5, 10, 15]}
        />
    );
}