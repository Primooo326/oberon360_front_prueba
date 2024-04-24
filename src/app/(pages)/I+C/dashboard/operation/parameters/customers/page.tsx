"use client"
import React, { useEffect, useState } from 'react';
import OperationLayoutComponent from '@/components/i+c/layout/Operation';
import HelmetTitle from '@/components/i+c/ui/HelmetTitle';
import OperationFooter from '@/components/i+c/ui/Operation/Footer';
import OperationTopBar from '@/components/i+c/ui/Operation/TopBar';
import { getCustomers } from '@/api/i+c/Customers';
import { DataTable } from 'primereact/datatable';
import { TableOptions } from '@/utils/i+c/helpers';
import { Column } from 'primereact/column';
import { EModules } from '@/models/i+c/Modules';
import ACLModules from '@/components/i+c/auth/AccessModule';

export default function OperationParametersCustomersPage() {
  const [finishRetrieveData, setFinishRetrieveData] = useState(false);
  const [customersData, setCustomersData] = useState([]);

  useEffect(() => {
    if (!finishRetrieveData) {
      getCustomers()
        .then((res) => {
          if (res) {
            setCustomersData(res.data);
            setFinishRetrieveData(true);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [finishRetrieveData]);

  const columns = [
    {
      title: 'ID Cliente',
      dataIndex: 'cliente_ID',
      key: 'cliente_ID',
    },
    {
      title: 'Nombre',
      dataIndex: 'cliente_Nombre',
      key: 'cliente_Nombre',
    },
    {
      title: 'N° Servicios',
      dataIndex: 'servicios',
      key: 'servicios',
      render: (customer: any) => <span>{customer.servicios.length}</span>,
    },
    {
      title: 'N° Paquetes',
      dataIndex: 'paquetes',
      key: 'paquetes',
      render: (customer: any) => <span>{customer.paquetes.length}</span>,
    },
  ];

  return (
    <OperationLayoutComponent>
      <HelmetTitle title="Clientes" />

      <ACLModules requiredPermission={EModules.CUSTOMER_PARAMETERS}>
        <OperationTopBar title="Clientes">
          <div className="top_menu_actions">
            <div className="action_menu_item">
              <div id="search_user" />
              <span>BUSCAR</span>
            </div>
          </div>
        </OperationTopBar>

        <div className="operation_module_content">
          <div className="operation_logo_back" />
          <DataTable
            {...TableOptions}
            className="custom_table"
            value={customersData}
            loading={!finishRetrieveData}
            tableStyle={{ minWidth: '50rem' }}
            selectionMode="radiobutton"
          >
            {columns.map((col, i) => (
              <Column
                key={i}
                field={col.dataIndex}
                header={col.title}
                body={col.render && col.render}
              />
            ))}
          </DataTable>
        </div>

        <OperationFooter>
          <div className="bottom_menu_actions" />
        </OperationFooter>
      </ACLModules>
    </OperationLayoutComponent>
  );
}
