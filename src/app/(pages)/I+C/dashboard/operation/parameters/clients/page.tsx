"use client"
import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Modal, Popconfirm, Popover, Select } from 'antd';
import { CheckCircleTwoTone, StopTwoTone } from '@ant-design/icons';
import OperationLayoutComponent from '@/components/i+c/layout/Operation';
import HelmetTitle from '@/components/i+c/ui/HelmetTitle';
import OperationTopBar from '@/components/i+c/ui/Operation/TopBar';
import OperationFooter from '@/components/i+c/ui/Operation/Footer';
import { DataTable } from 'primereact/datatable';
import { TableOptions } from '@/utils/i+c/helpers';
import { Column } from 'primereact/column';
import {
  createCustomerParameter,
  deleteCustomerParameter,
  getCustomerParameterTypes,
  getParametersFromCustomerByGroup,
  updateParameter,
} from '@/api/i+c/Customers';
import { showError, showSuccess } from '@/components/i+c/ui/Toast';
import { EModules } from '@/models/i+c/Modules';
import ACLModules from '@/components/i+c/auth/AccessModule';
import { useICAuthStore } from '@/states/i+c/I+C-auth.state';

export default function OperationParametersClientsPage() {
  const [finishRetrieveLists, setFinishRetrieveLists] = useState(false);
  const [finishRetrieveData, setFinishRetrieveData] = useState(false);
  const [openCreatedParameterModal, setOpenCreatedParameterModal] =
    useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [groupsList, setGroupsList] = useState([]);
  const [parametersData, setParametersData] = useState([]);
  const [groupSelection, setGroupSelection] = useState<any>(null);
  const [isEdited, setIsEdited] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [form] = Form.useForm();
  const { userInfo } = useICAuthStore()

  useEffect(() => {
    if (!finishRetrieveLists) {
      getCustomerParameterTypes()
        .then((res) => {
          if (res) {
            setGroupsList(res.data);
          }
          setFinishRetrieveLists(true);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [finishRetrieveLists]);

  const columns = [
    {
      title: 'Código',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Grupo',
      dataIndex: 'customerParameterType',
      key: 'customerParameterType',
      render: (parameter: any) => (
        <span>{parameter.customerParameterType.name}</span>
      ),
    },
    {
      title: 'Valor',
      dataIndex: 'name',
      key: 'name',
      render: (param: any) => <span>{param.name}</span>,
    },
    {
      title: 'Activo',
      dataIndex: 'status',
      key: 'status',
      render: (param: any) =>
        param.status ? (
          <CheckCircleTwoTone twoToneColor="#52c41a" />
        ) : (
          <StopTwoTone twoToneColor="#eb2f96" />
        ),
    },
  ];

  const createNewParameter = () => {
    if (selectedRow) setSelectedRow(null);
    setIsEdited(false);
    setOpenCreatedParameterModal(true);
  };

  const submitParameterForm = (values: any) => {
    setSubmitLoading(true);
    const parameter = {
      ...values,
      customerId: userInfo?.customerId,
    };
    if (selectedRow) {
      updateParameter(selectedRow.id, parameter)
        .then((res) => {
          if (res) {
            showSuccess(res.data);
            handleCancelModal();
            setFinishRetrieveData(true);
            setIsEdited(false);
          }
          setSubmitLoading(false);
        })
        .catch(() => {
          showError('Error al crear el parametro');
          setSubmitLoading(false);
        });
    } else {
      createCustomerParameter(parameter)
        .then((res) => {
          if (res) {
            showSuccess(res.data);
            handleCancelModal();
            setFinishRetrieveData(true);
          }
          setSubmitLoading(false);
        })
        .catch((err) => {
          console.error(err);
          showError('Error al crear el parametro');
          setSubmitLoading(false);
        });
    }
  };

  useEffect(() => {
    if (groupSelection) {
      getParametersFromCustomerByGroup('55', groupSelection.id)
        .then((res) => {
          if (res) {
            setParametersData(res.data);
            setFinishRetrieveData(false);
            selectedRow && setSelectedRow(null);
          }
        })
        .catch((err) => {
          console.error(err);
          showError('error al obtener el listado');
          setFinishRetrieveData(false);
        });
    }
  }, [finishRetrieveData, groupSelection]);

  const changeParameterGroup = (group: any) => {
    setFinishRetrieveData(true);
    setGroupSelection(group);
    form.setFieldValue('customerParameterTypeId', group.id);
  };

  const handleConfirmDelete = () => {
    if (selectedRow) {
      setOpenConfirmDialog(true);
    }
  };

  const handleEditParameter = () => {
    if (!isEdited && selectedRow) {
      if (selectedRow.isDefault) {
        showError('No puedes modificar un parametro por defecto');
      } else {
        setIsEdited(true);
        form.setFieldsValue(selectedRow);
        setOpenCreatedParameterModal(true);
      }
    }
  };

  const handleDeleteParameter = () => {
    if (selectedRow.isDefault) {
      showError('No puedes eliminar un parametro por defecto');
      setTimeout(() => {
        handleConfirmCancel();
      }, 200);
    } else {
      deleteCustomerParameter(selectedRow.id)
        .then((res) => {
          if (res) {
            handleConfirmCancel();
            showSuccess(res.data);
            setFinishRetrieveData(true);
            setSelectedRow(null);
            setIsEdited(false);
          }
        })
        .catch((err) => {
          showError(err);
        });
    }
  };

  const handleCancelModal = () => {
    form.resetFields();
    setIsEdited(false);
    setOpenCreatedParameterModal(false);
  };

  const handleConfirmCancel = () => {
    setOpenConfirmDialog(false);
  };

  return (
    <OperationLayoutComponent>
      <HelmetTitle title="Parametros clientes" />

      <ACLModules requiredPermission={EModules.CUSTOMER_PARAMETERS}>
        <OperationTopBar title="Parametros clientes">
          <div className="top_menu_actions">
            <Popover
              content={
                <div className="parameters_list">
                  <div className="items">
                    {groupsList.map((group: any) => (
                      <span
                        onClick={() => changeParameterGroup(group)}
                        key={group.id}
                        style={{ cursor: 'pointer' }}
                      >
                        {group.name}
                      </span>
                    ))}
                  </div>
                </div>
              }
            >
              <div className="action_menu_item reverse">
                <div id="filter_client" />
                <span>PARAMETROS CLIENTES</span>
              </div>
            </Popover>
          </div>
        </OperationTopBar>

        <div className="operation_module_content">
          <div className="operation_logo_back" />
          <DataTable
            {...TableOptions}
            className="custom_table"
            value={parametersData}
            loading={finishRetrieveData}
            tableStyle={{ minWidth: '50rem' }}
            selectionMode="radiobutton"
            selection={selectedRow}
            onSelectionChange={(e) => setSelectedRow(e.value)}
          >
            <Column
              selectionMode="single"
              headerStyle={{ width: '3rem' }}
            />
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
          <div className="bottom_menu_actions">
            <div className="action_menu_item" onClick={createNewParameter}>
              <div className="bottom_button" id="add_client" />
              <span>AGREGAR</span>
            </div>
            <div className="action_menu_item" onClick={handleEditParameter}>
              <div className="bottom_button" id="edit_client" />
              <span>MODIFICAR</span>
            </div>
            <Popconfirm
              placement="top"
              open={openConfirmDialog}
              onOpenChange={handleConfirmDelete}
              onConfirm={handleDeleteParameter}
              onCancel={handleConfirmCancel}
              title="Confirmar acción"
              description="¿Esta seguro de eliminar este parametro?"
              okText="Sí"
              cancelText="No"
            >
              <div className="action_menu_item">
                <div className="bottom_button" id="delete_client" />
                <span>ELIMINAR</span>
              </div>
            </Popconfirm>
          </div>
        </OperationFooter>

        <Modal
          open={openCreatedParameterModal}
          onCancel={handleCancelModal}
          footer={[]}
          title="Nuevo Parametro"
          centered
          className="custom_operation_modal"
        >
          <Form
            form={form}
            className="form_modal"
            name="formUsers"
            style={{ maxWidth: 600 }}
            onFinish={submitParameterForm}
            initialValues={{
              customerParameterTypeId: groupSelection
                ? Number(groupSelection.id)
                : '',
              internalCode: '',
              name: '',
            }}
          >
            <div className="section">
              <Form.Item
                className="operation_input_element w_100"
                label="Tipo de parametro"
                name="customerParameterTypeId"
                rules={[
                  {
                    required: true,
                    message: 'Selecciona el tipo de parametro!',
                  },
                ]}
              >
                <Select placeholder="Tipo de parametro">
                  {groupsList.map((group: any) => (
                    <Select.Option key={group.id} value={group.id}>
                      {group.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            <div className="section">
              <Form.Item
                className="operation_input_element"
                label="Código Interno"
                name="internalCode"
              >
                <Input placeholder="Código Interno" />
              </Form.Item>

              <Form.Item
                className="operation_input_element"
                label="Descripción"
                name="name"
                rules={[
                  {
                    required: true,
                    message: 'Ingresa la descripción!',
                  },
                ]}
              >
                <Input placeholder="Descripción" />
              </Form.Item>
            </div>

            <div className="section align_end">
              <Form.Item>
                <Button
                  htmlType="submit"
                  className="operation_modal_button ok_button"
                  loading={submitLoading}
                >
                  {selectedRow ? 'EDITAR' : 'CREAR'}
                </Button>
              </Form.Item>

              <Form.Item>
                <Button
                  htmlType="button"
                  danger
                  className="operation_modal_button cancel_button"
                  onClick={handleCancelModal}
                >
                  CANCELAR
                </Button>
              </Form.Item>
            </div>
          </Form>
        </Modal>
      </ACLModules>
    </OperationLayoutComponent>
  );
}
