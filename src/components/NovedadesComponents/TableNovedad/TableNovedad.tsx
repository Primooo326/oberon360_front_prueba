"use client"
import Table from '@/components/Shared/Table/Table';
import { useNovedadesStore } from '@/states/novedades.state';
import { responseTableExample } from '@/utils/dataTemp';
import { useEffect, useState } from 'react';

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
  // const columns: any = [
  //   {
  //     name: 'Conductor',
  //     cell: (row: NovedadConductor) => <div className='flex items-center gap-2 cursor-pointer' >
  //       <img src={row.conductor.foto} alt={row.conductor.nombre} className="rounded-full h-10 w-10" />
  //       <span className='underline text-primary' >{row.conductor.nombre} {row.conductor.apellido}</span>
  //     </div>,
  //   },
  //   {
  //     name: 'Tipo de Alerta',
  //     selector: (row: any) => row.tipoAlerta,
  //     sortable: true,
  //   },
  //   {
  //     name: 'Estado',
  //     selector: (row: any) => row.estado,
  //     cell: (row: NovedadConductor) => <span className={`px-2 py-1 rounded-full ${row.estado === 'Pendiente' ? 'bg-red-500' : row.estado === 'En Proceso' ? 'bg-yellow-500' : 'bg-green-500'} text-white`} >{row.estado}</span>,
  //     sortable: true,
  //   },
  //   {

  //     name: 'Fecha',
  //     selector: (row: any) => row.fecha,
  //     sortable: true,
  //   },
  //   {
  //     name: 'Acciones',
  //     cell: (row: NovedadConductor) => <button onClick={() => setNovedadSelected(row)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Ver Protocolo</button>,
  //   },
  // ];

  const [data, setData] = useState<any[]>([]);
  const [columns, setColumns] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await responseTableExample("api/novedades");
        setColumns(response.columns);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  return (

    <Table data={data} columns={columns} />
  );
}