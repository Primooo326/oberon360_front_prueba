"use client"
import { getDrivers } from '@/api/conductor.api';
import Table from '@/components/Shared/Table/Table';
import { responseTableExample } from '@/utils/dataTemp';
import { generateColumns } from '@/utils/tools';
import { useEffect, useState } from 'react';

export default function TableNovedad() {

  const [data, setData] = useState<any[]>([]);
  const [columns, setColumns] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await getDrivers();
        const response2 = await responseTableExample("novedades")
        console.log("response2");
        const dynamicColumns = generateColumns(response2.columns);
        setColumns(dynamicColumns);
        setData(response2.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  return <Table data={data} columns={columns} />

}