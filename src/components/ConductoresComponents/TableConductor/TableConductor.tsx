"use client"
import { getDrivers } from '@/api/conductor.api';
import Table from '@/components/Shared/Table/Table';
import { responseTableDriverExample } from '@/utils/dataTemCond';
import { useEffect, useState } from 'react';

export default function TableConductor() {

  const [data, setData] = useState<any[]>([]);
  const [columns, setColumns] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await responseTableDriverExample("api/conductores");
        const response2 = await getDrivers();
        console.log('responseFront =>', response);
        console.log('responseBack =>', response2);
        
        setColumns(response.columns);
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