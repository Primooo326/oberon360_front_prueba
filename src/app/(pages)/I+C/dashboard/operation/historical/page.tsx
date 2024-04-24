"use client"
import React, { useState } from 'react';
import OperationLayoutComponent from '@/components/i+c/layout/Operation';
import HelmetTitle from '@/components/i+c/ui/HelmetTitle';
import OperationTopBar from '@/components/i+c/ui/Operation/TopBar';
import { Form, Input } from 'antd';
import { TableOptions } from '@/utils/i+c/helpers';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import ACLModules from '@/components/i+c/auth/AccessModule';
import { EModules } from '@/models/i+c/Modules';

const { Search } = Input;

export default function OperationHistoricalPage() {
  const [finishRetrieveData, setFinishRetrieveData] = useState(true);
  const [historicalData, setHistoricalData] = useState([]);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [form] = Form.useForm();

  const createNewHistorical = () => {
    console.log('first');
  };

  const columns = [
    {
      title: 'Estado',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Concepto',
      dataIndex: 'charge',
      key: 'charge',
    },
    {
      title: 'Fecha de radicado',
      dataIndex: 'charge',
      key: 'charge',
    },
    {
      title: 'Fecha inicial',
      dataIndex: 'charge',
      key: 'charge',
    },
    {
      title: 'Fecha de vencimiento',
      dataIndex: 'charge',
      key: 'charge',
    },
    {
      title: 'Fecha de envio',
      dataIndex: 'charge',
      key: 'charge',
    },
    {
      title: 'Nombre',
      dataIndex: 'charge',
      key: 'charge',
    },
    {
      title: 'Identificación',
      dataIndex: 'charge',
      key: 'charge',
    },
    {
      title: 'Cargo',
      dataIndex: 'charge',
      key: 'charge',
    },
    {
      title: 'No de Orden de Servicio',
      dataIndex: 'charge',
      key: 'charge',
    },
    {
      title: 'Cliente',
      dataIndex: 'charge',
      key: 'charge',
    },
  ];

  return (
    <OperationLayoutComponent>
      <HelmetTitle title="Historico Solicitudes" />

      <ACLModules requiredPermission={EModules.HISTORY_OF_SERVICES}>
        <OperationTopBar title="Historico Solicitudes">
          <div className="top_menu_actions">
            <Search
              className="operation_search_element"
              placeholder=""
              style={{ width: 300 }}
            />
          </div>
        </OperationTopBar>

        <div className="operation_module_content_all">
          <div className="operation_logo_back" />
          <DataTable
            {...TableOptions}
            scrollable
            scrollHeight="flex"
            className="custom_table"
            value={historicalData}
            loading={!finishRetrieveData}
            tableStyle={{ minWidth: '50rem' }}
          >
            {columns.map((col: any, i) => (
              <Column
                key={i}
                field={col.dataIndex}
                header={col.title}
                body={col.render && col.render}
              />
            ))}
          </DataTable>
        </div>
      </ACLModules>
    </OperationLayoutComponent>
  );
}
