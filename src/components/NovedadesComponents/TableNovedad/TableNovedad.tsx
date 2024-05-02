"use client"
import { useNovedadesStore } from '@/states/novedades.state';
import DataTable, { defaultThemes } from 'react-data-table-component';

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

  const { setNovedadSelected } = useNovedadesStore()

  const data = [
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
    },

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
        foto: "https://ui-avatars.com/api/?name=miguel.ruiz@example.com+Doe"
      }
    },
    {
      id: "4",
      fecha: "2024-04-27",
      tipoAlerta: "Aceleración Brusca",
      observaciones: [
        { observacion: "Aceleración brusca al incorporarse a tráfico denso", fecha: "2024-04-27" }
      ],
      estado: "En Proceso",
      pasosProtocolo: [
        { orden: 1, descripcion: 'Analizar datos del telemático para contexto', estado: 'Pendiente' },
        { orden: 2, descripcion: 'Discusión de prácticas seguras con el conductor', estado: 'Pendiente' }
      ],
      conductor: {
        id: "104",
        nombre: "Sofía",
        apellido: "López",
        dni: "45789123",
        telefono: "954321678",
        email: "sofia.lopez@example.com",
        foto: "https://ui-avatars.com/api/?name=sofia.lopez@example.com+Doe"
      }
    },
    {
      id: "5",
      fecha: "2024-04-26",
      tipoAlerta: "Retraso en Ruta",
      observaciones: [
        { observacion: "Retraso significativo debido a tráfico inesperado", fecha: "2024-04-26" }
      ],
      estado: "Pendiente",
      pasosProtocolo: [
        { orden: 1, descripcion: 'Verificar estado del tráfico actual', estado: 'Pendiente' },
        { orden: 2, descripcion: 'Ajustar horarios de entrega esperados', estado: 'Pendiente' }
      ],
      conductor: {
        id: "105",
        nombre: "Jorge",
        apellido: "Navarro",
        dni: "47382910",
        telefono: "968574123",
        email: "jorge.navarro@example.com",
        foto: "https://ui-avatars.com/api/?name=jorge.navarro@example.com"
      }
    },
    {
      id: "6",
      fecha: "2024-04-25",
      tipoAlerta: "Fuera de Ruta",
      observaciones: [
        { observacion: "El vehículo ha entrado en una zona no autorizada", fecha: "2024-04-25" }
      ],
      estado: "En Proceso",
      pasosProtocolo: [
        { orden: 1, descripcion: 'Contactar inmediatamente al conductor', estado: 'Pendiente' },
        { orden: 2, descripcion: 'Revisar parámetros de geofencing', estado: 'Pendiente' }
      ],
      conductor: {
        id: "106",
        nombre: "Laura",
        apellido: "Vidal",
        dni: "46851029",
        telefono: "976543218",
        email: "laura.vidal@example.com",
        foto: "https://ui-avatars.com/api/?name=laura.vidal@example.com+Doe"
      }
    },
    {
      id: "7",
      fecha: "2024-04-24",
      tipoAlerta: "Exceso de Velocidad",
      observaciones: [
        { observacion: "Exceso de 20 km/h sobre el límite permitido en zona urbana", fecha: "2024-04-24" }
      ],
      estado: "Finalizado",
      pasosProtocolo: [
        { orden: 1, descripcion: 'Emitir advertencia formal al conductor', estado: 'Completado' },
        { orden: 2, descripcion: 'Monitorizar comportamiento de conducción futura', estado: 'Completado' }
      ],
      conductor: {
        id: "107",
        nombre: "Elena",
        apellido: "Gutiérrez",
        dni: "48273645",
        telefono: "934567890",
        email: "elena.gutierrez@example.com",
        foto: "https://ui-avatars.com/api/?name=elena.gutierrez@example.c"
      }
    },
    {
      id: "8",
      fecha: "2024-04-23",
      tipoAlerta: "Frenado Brusco",
      observaciones: [
        { observacion: "Frenada intensa para evitar colisión con peatón", fecha: "2024-04-23" }
      ],
      estado: "En Proceso",
      pasosProtocolo: [
        { orden: 1, descripcion: 'Analizar datos de la cámara delantera', estado: 'Pendiente' },
        { orden: 2, descripcion: 'Realizar sesión informativa sobre seguridad peatonal', estado: 'Pendiente' }
      ],
      conductor: {
        id: "108",
        nombre: "Antonio",
        apellido: "Moreno",
        dni: "49283756",
        telefono: "945678123",
        email: "antonio.moreno@example.com",
        foto: "https://ui-avatars.com/api/?name=antonio.moreno@example.co"
      }
    },
    {
      id: "9",
      fecha: "2024-04-22",
      tipoAlerta: "Aceleración Brusca",
      observaciones: [
        { observacion: "Aceleración inadecuada en zona escolar", fecha: "2024-04-22" }
      ],
      estado: "Pendiente",
      pasosProtocolo: [
        { orden: 1, descripcion: 'Revisar políticas de conducción en zonas sensibles', estado: 'Pendiente' },
        { orden: 2, descripcion: 'Discutir incidente con el conductor', estado: 'Pendiente' }
      ],
      conductor: {
        id: "109",
        nombre: "Isabel",
        apellido: "Fernández",
        dni: "47819245",
        telefono: "912348567",
        email: "isabel.fernandez@example.com",
        foto: "https://ui-avatars.com/api/?name=isabel.fernandez@example."
      }
    },
    {
      id: "10",
      fecha: "2024-04-21",
      tipoAlerta: "Retraso en Ruta",
      observaciones: [
        { observacion: "Demora debido a cierre inesperado de carretera", fecha: "2024-04-21" }
      ],
      estado: "En Proceso",
      pasosProtocolo: [
        { orden: 1, descripcion: 'Informar a clientes sobre posibles retrasos', estado: 'Pendiente' },
        { orden: 2, descripcion: 'Reevaluar rutas alternativas', estado: 'Pendiente' }
      ],
      conductor: {
        id: "110",
        nombre: "Roberto",
        apellido: "Díaz",
        dni: "48021359",
        telefono: "915673489",
        email: "roberto.diaz@example.com",
        foto: "https://ui-avatars.com/api/?name=roberto.diaz@example.com"
      }
    },
    {
      id: "11",
      fecha: "2024-04-20",
      tipoAlerta: "Fuera de Ruta",
      observaciones: [
        { observacion: "Desvío no autorizado para evitar tráfico", fecha: "2024-04-20" }
      ],
      estado: "Pendiente",
      pasosProtocolo: [
        { orden: 1, descripcion: 'Contactar al conductor para aclaraciones', estado: 'Pendiente' },
        { orden: 2, descripcion: 'Revisar y ajustar parámetros de ruta permitida', estado: 'Pendiente' }
      ],
      conductor: {
        id: "111",
        nombre: "Patricia",
        apellido: "Lara",
        dni: "47123985",
        telefono: "947821634",
        email: "patricia.lara@example.com",
        foto: "https://ui-avatars.com/api/?name=patricia.lara@example.com"
      }
    },
    {
      id: "12",
      fecha: "2024-04-19",
      tipoAlerta: "Exceso de Velocidad",
      observaciones: [
        { observacion: "Superación del límite de velocidad en 30 km/h", fecha: "2024-04-19" }
      ],
      estado: "Finalizado",
      pasosProtocolo: [
        { orden: 1, descripcion: 'Sanción disciplinaria al conductor', estado: 'Completado' },
        { orden: 2, descripcion: 'Monitoreo continuo de la velocidad del vehículo', estado: 'Completado' }
      ],
      conductor: {
        id: "112",
        nombre: "Lucía",
        apellido: "Morales",
        dni: "46271890",
        telefono: "917834256",
        email: "lucia.morales@example.com",
        foto: "https://ui-avatars.com/api/?name=lucia.morales@example.com"
      }
    },
    {
      id: "13",
      fecha: "2024-04-18",
      tipoAlerta: "Frenado Brusco",
      observaciones: [
        { observacion: "Frenada intensa en autopista por obstáculo en la vía", fecha: "2024-04-18" }
      ],
      estado: "En Proceso",
      pasosProtocolo: [
        { orden: 1, descripcion: 'Revisar grabación de dashcam para detalles del incidente', estado: 'Pendiente' },
        { orden: 2, descripcion: 'Capacitar al conductor en maniobras evasivas seguras', estado: 'Pendiente' }
      ],
      conductor: {
        id: "113",
        nombre: "Fernando",
        apellido: "Sánchez",
        dni: "46791283",
        telefono: "943562781",
        email: "fernando.sanchez@example.com",
        foto: "https://ui-avatars.com/api/?name=fernando.sanchez@example.com"
      }
    },
    {
      id: "14",
      fecha: "2024-04-17",
      tipoAlerta: "Aceleración Brusca",
      observaciones: [
        { observacion: "Aceleración agresiva tras semáforo en rojo", fecha: "2024-04-17" }
      ],
      estado: "Pendiente",
      pasosProtocolo: [
        { orden: 1, descripcion: 'Evaluar comportamiento del conductor', estado: 'Pendiente' },
        { orden: 2, descripcion: 'Discutir con el conductor las normas de tráfico', estado: 'Pendiente' }
      ],
      conductor: {
        id: "114",
        nombre: "Carmen",
        apellido: "Jiménez",
        dni: "47851236",
        telefono: "921478563",
        email: "carmen.jimenez@example.com",
        foto: "https://ui-avatars.com/api/?name=carmen.jimenez@example.co"
      }
    },
    {
      id: "15",
      fecha: "2024-04-16",
      tipoAlerta: "Retraso en Ruta",
      observaciones: [
        { observacion: "Retraso por avería mecánica inesperada", fecha: "2024-04-16" }
      ],
      estado: "En Proceso",
      pasosProtocolo: [
        { orden: 1, descripcion: 'Coordinar reparación en sitio', estado: 'Pendiente' },
        { orden: 2, descripcion: 'Actualizar al cliente sobre el estado del envío', estado: 'Pendiente' }
      ],
      conductor: {
        id: "115",
        nombre: "Oscar",
        apellido: "Torres",
        dni: "46928517",
        telefono: "934265789",
        email: "oscar.torres@example.com",
        foto: "https://ui-avatars.com/api/?name=oscar.torres@example.com"
      }
    }
  ];


  const columns: any = [
    {
      name: 'Conductor',
      cell: (row: NovedadConductor) => <div className='flex items-center gap-2 cursor-pointer' >
        <img src={row.conductor.foto} alt={row.conductor.nombre} className="rounded-full h-10 w-10" />
        <span className='underline text-primary' >{row.conductor.nombre} {row.conductor.apellido}</span>
      </div>,
    },
    {
      name: 'Tipo de Alerta',
      selector: row => row.tipoAlerta,
      sortable: true,
    },
    {
      name: 'Estado',
      selector: row => row.estado,
      cell: (row: NovedadConductor) => <span className={`px-2 py-1 rounded-full ${row.estado === 'Pendiente' ? 'bg-red-500' : row.estado === 'En Proceso' ? 'bg-yellow-500' : 'bg-green-500'} text-white`} >{row.estado}</span>,
      sortable: true,
    },
    {

      name: 'Fecha',
      selector: row => row.fecha,
      sortable: true,
    },



    {
      name: 'Acciones',
      cell: (row: NovedadConductor) => <button onClick={() => setNovedadSelected(row)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Ver Protocolo</button>,
    },
  ];

  const customStyles: any = {
    header: {
      style: {
        minHeight: '56px',
        fontSize: '14px',
        fontWeight: 'bold',
      },
    },
    headRow: {
      style: {
        borderTopStyle: 'solid',
        borderTopWidth: '1px',
        borderTopColor: defaultThemes.default.divider.default,

      },
    },
    headCells: {
      style: {
        fontWeight: 'semi-bold',
        fontSize: '20px',
        borderRightStyle: 'solid',
        borderRightWidth: '1px',
        borderRightColor: defaultThemes.default.divider.default,
        borderLeftStyle: 'solid',
        borderLeftWidth: '1px',
        borderLeftColor: defaultThemes.default.divider.default,
        height: '56px',
      },
    },
    cells: {
      style: {
        borderRightStyle: 'solid',
        borderRightWidth: '1px',
        borderRightColor: defaultThemes.default.divider.default,
        borderLeftStyle: 'solid',
        borderLeftWidth: '1px',
        borderLeftColor: defaultThemes.default.divider.default,
        height: '56px',
      },
    },
  };


  return (
    <DataTable
      columns={columns}
      data={data}
      pagination
      paginationPerPage={5}
      paginationRowsPerPageOptions={[5, 10, 15, 20]}
      customStyles={customStyles}
      dense
      className='w-full'
    />
  );
}