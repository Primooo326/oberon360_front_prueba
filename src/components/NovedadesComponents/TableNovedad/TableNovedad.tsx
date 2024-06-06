"use client"
import { getDrivers } from '@/api/dashboard/parametros/conductor.api';
import Table from '@/components/shared/Table/Table';
import { responseTableExample } from '@/utils/dataTemp';
import { generateColumns } from '@/utils/tools';
import { useEffect, useState } from 'react';

export default function TableNovedad() {

  const [data, setData] = useState<any[]>([]);
  const [columns, setColumns] = useState<any[]>([]);

  const optionsPagination = {
    currentItems: data,
    page: 1,
    take: 10,
    itemCount: 100,
    pageCount: 10,
    hasPreviousPage: true,
    hasNextPage: true
  }

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
  return <Table data={data} columns={columns} onChangePage={() => { }} onChangePerPage={() => { }} paginationOptions={optionsPagination} />
}