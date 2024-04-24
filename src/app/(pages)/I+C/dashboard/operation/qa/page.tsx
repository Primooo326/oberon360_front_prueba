"use client"
import React, { useEffect, useState } from 'react';
import OperationLayoutComponent from '@/components/i+c/layout/Operation';
import HelmetTitle from '@/components/i+c/ui/HelmetTitle';
import OperationTopBar from '@/components/i+c/ui/Operation/TopBar';
import { Form } from 'antd';
import OperationFooter from '@/components/i+c/ui/Operation/Footer';
import { showError } from '@/components/i+c/ui/Toast';
import { DataTable } from 'primereact/datatable';
import { TableOptions } from '@/utils/i+c/helpers';
import { Column } from 'primereact/column';
import ACLModules from '@/components/i+c/auth/AccessModule';
import { EModules } from '@/models/i+c/Modules';

export default function OperationQAPage() {
  const [finishRetrieveData, setFinishRetrieveData] = useState(false);
  const [qaData, setqaData] = useState([]);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (!finishRetrieveData) {
      setqaData([]);
      setFinishRetrieveData(true);
    }
  }, []);

  const createNewqa = () => {
    console.log('first');
  };

  const columns = [
    {
      title: 'No de Orden de servicio',
      dataIndex: 'qaname',
      key: 'qaname',
    },
    {
      title: 'Cliente',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Fecha de Entrega',
      dataIndex: 'charge',
      key: 'charge',
    },
    {
      title: 'Identificación del candidato',
      dataIndex: 'charge',
      key: 'charge',
    },
    {
      title: 'Nombres candidato',
      dataIndex: 'charge',
      key: 'charge',
    },
    {
      title: 'Cargo',
      dataIndex: 'charge',
      key: 'charge',
    },
    {
      title: 'Servicios',
      dataIndex: 'charge',
      key: 'charge',
    },
    {
      title: 'Analista',
      dataIndex: 'charge',
      key: 'charge',
    },
  ];

  const handleEditqa = () => { };

  return (
    <OperationLayoutComponent>
      <HelmetTitle title="QA" />

      <ACLModules requiredPermission={EModules.QA}>
        <OperationTopBar title="QA">
          <div className="top_menu_actions">
            <div className="action_menu_item" onClick={createNewqa}>
              <div id="update_qa" />
              <span>ACTUALIZAR</span>
            </div>
          </div>
        </OperationTopBar>

        <div className="operation_module_content_all">
          <div className="operation_logo_back" />
          <DataTable
            {...TableOptions}
            scrollable
            scrollHeight="flex"
            className="custom_table"
            value={qaData}
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

        <OperationFooter>
          <div className="bottom_menu_actions">
            <div className="action_menu_item" onClick={handleEditqa}>
              <div className="bottom_button" id="report_qa" />
              <span>VER INFORME</span>
            </div>
            <div className="action_menu_item" onClick={handleEditqa}>
              <div className="bottom_button" id="edit_qa" />
              <span>EDITAR</span>
            </div>
            <div className="action_menu_item" onClick={handleEditqa}>
              <div className="bottom_button" id="publish_qa" />
              <span>PUBLICAR</span>
            </div>
            <div className="action_menu_item" onClick={handleEditqa}>
              <div className="bottom_button" id="return_qa" />
              <span>DEVOLVER</span>
            </div>
          </div>
        </OperationFooter>
      </ACLModules>
    </OperationLayoutComponent>
  );
}
