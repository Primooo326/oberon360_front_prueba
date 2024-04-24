"use client"
import React, { useEffect, useState } from 'react';
import OperationLayoutComponent from '@/components/i+c/layout/Operation';
import HelmetTitle from '@/components/i+c/ui/HelmetTitle';
import OperationTopBar from '@/components/i+c/ui/Operation/TopBar';
import { Form } from 'antd';
import { showError } from '@/components/i+c/ui/Toast';
import { TableOptions } from '@/utils/i+c/helpers';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import ACLModules from '@/components/i+c/auth/AccessModule';
import { EModules } from '@/models/i+c/Modules';

export default function OperationSearchPage() {
  const [finishRetrieveData, setFinishRetrieveData] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (!finishRetrieveData) {
      setSearchData([]);
      setFinishRetrieveData(true);
    }
  }, [finishRetrieveData]);

  const createNewsearch = () => {
    console.log('first');
  };

  const columns = [
    {
      title: 'Número de Identificación',
      dataIndex: 'searchname',
      key: 'searchname',
    },
    {
      title: 'Nombre',
      dataIndex: 'searchname',
      key: 'searchname',
    },
    {
      title: 'Estado',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Tipo de Persona',
      dataIndex: 'charge',
      key: 'charge',
    },
    {
      title: 'Fecha de Consulta',
      dataIndex: 'charge',
      key: 'charge',
    },
    {
      title: 'Usuario',
      dataIndex: 'charge',
      key: 'charge',
    },
    {
      title: 'Lista Restrictiva',
      dataIndex: 'charge',
      key: 'charge',
    },
    {
      title: 'Noticias',
      dataIndex: 'charge',
      key: 'charge',
    },
    {
      title: 'PEPS',
      dataIndex: 'charge',
      key: 'charge',
    },
  ];

  const submitsearchForm = (values: any) => { };

  return (
    <OperationLayoutComponent>
      <HelmetTitle title="Consulta Básica" />

      <ACLModules requiredPermission={EModules.BASIC_CONSULTATION}>
        <OperationTopBar title="Consulta Básica">
          <div className="top_menu_actions">
            <div className="action_menu_item" onClick={createNewsearch}>
              <div id="new_request_search" />
              <span>NUEVA SOLICITUD</span>
            </div>
            <div className="action_menu_item">
              <div id="report_search" />
              <span>INFORME</span>
            </div>
          </div>
        </OperationTopBar>

        <div className="operation_module_content">
          <div className="operation_logo_back" />

          <DataTable
            {...TableOptions}
            scrollable
            scrollHeight="flex"
            className="custom_table"
            value={searchData}
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
