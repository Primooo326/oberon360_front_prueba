"use client"
import { getDrivers } from '@/api/conductor.api';
import Table from '@/components/Shared/Table/Table';
import { responseTableDriverExample } from '@/utils/dataTemCond';
import { useEffect, useState } from 'react';

export default function TableConductor() {

  const [data, setData] = useState<any[]>([]);
  const [columns, setColumns] = useState<any[]>([]);

  const columnas: any = [
    {
      name: 'Conductor',
      cell: (row: any) => <div className=' w-full flex items-center justify-center py-2' >
        <img src={`data:image/jpeg;base64,${row.CONDUCTOR_FOTO}`} alt="conductor foto" className="rounded-full size-14" />
      </div>,
    },
    {
      name: 'Tipo de Documento',
      cell: (row: any) => row.typeIdentification.TIP_IDEN_DESCRIPCION,
      sortable: true,
    },
    {
      name: 'Numero de Documento',
      cell: (row: any) => row.CONDUCTOR_IDENTIFICACION,
      selector: (row: any) => row.CONDUCTOR_IDENTIFICACION,
      sortable: true,
    },
    {

      name: 'Código',
      cell: (row: any) => row.CONDUCTOR_CODCONDUCTOR,
      sortable: true,
    },

    {
      name: 'Nombre',
      cell: (row: any) => <span>{row.CONDUCTOR_PRIMERNOMBRE}</span>,
    },
    {
      name: "RH",
      cell: (row: any) => row.factorRh.FACTOR_RH_DESCRIPCION,

    },
    {
      name: "Teléfono Personal",
      cell: (row: any) => row.CONDUCTOR_TELPERSONAL,
    },
    {
      name: "Teléfono Corporativo",
      cell: (row: any) => row.CONDUCTOR_TELCORPORATIVO,
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await responseTableDriverExample("api/conductores");
        const response2 = await getDrivers();
        console.log('responseFront =>', response);
        console.log('responseBack =>', response2);

        setColumns(columnas);
        setData(response2.data);
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