"use client"
import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Modal, Popconfirm, Table, Transfer } from 'antd';
import { CheckCircleTwoTone, StopTwoTone } from '@ant-design/icons';
import OperationLayoutComponent from '@/components/i+c/layout/Operation';
import HelmetTitle from '@/components/i+c/ui/HelmetTitle';
import OperationFooter from '@/components/i+c/ui/Operation/Footer';
import OperationTopBar from '@/components/i+c/ui/Operation/TopBar';
import { createRole, deleteRole, getRoles, updateRole } from '@/api/i+c/Roles';
import { getModules } from '@/api/i+c/Core';
import { showError, showSuccess } from '@/components/i+c/ui/Toast';
import { DataTable } from 'primereact/datatable';
import { TableOptions } from '@/utils/i+c/helpers';
import { Column } from 'primereact/column';
import ACLModules from '@/components/i+c/auth/AccessModule';
import { EModules } from '@/models/i+c/Modules';

export default function OperationParametersRolesPage() {
  const [openCreatedRoleModal, setOpenCreatedRoleModal] = useState(false);
  const [finishRetrieveData, setFinishRetrieveData] = useState(false);
  const [finishCallCatalogs, setFinishCallCatalogs] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [rolesData, setRolesData] = useState([]);
  const [modulesList, setModulesList] = useState<any[]>([]);
  const [targetKeys, setTargetKeys] = useState<string[]>([]);
  const [mappedRole, setMappedRole] = useState<any>(null);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    if (!finishCallCatalogs) {
      getModules()
        .then((res) => {
          if (res) {
            setModulesList(res.data);
            setFinishCallCatalogs(true);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [finishCallCatalogs]);

  useEffect(() => {
    if (!finishRetrieveData) {
      getRoles()
        .then((res) => {
          if (res) {
            setRolesData(res.data);
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
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Descripción',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'N° de Modulos',
      dataIndex: 'Permissions',
      key: 'Permissions',
      render: (role: any) => <span>{role.Permissions.length}</span>,
    },
    {
      title: 'Activo',
      dataIndex: 'status',
      key: 'status',
      render: (role: any) =>
        role.status ? (
          <CheckCircleTwoTone twoToneColor="#52c41a" />
        ) : (
          <StopTwoTone twoToneColor="#eb2f96" />
        ),
    },
  ];

  const submitRoleForm = (values: any) => {
    setSubmitLoading(true);
    if (selectedRow) {
      updateRole(selectedRow.id, values)
        .then((res) => {
          if (res) {
            showSuccess(res.data);
            handleCancelModal();
            setFinishRetrieveData(false);
            setSubmitLoading(false);
            setIsEdited(false);
          }
        })
        .catch((err) => {
          showError(err);
          setSubmitLoading(false);
        });
    } else {
      createRole(values)
        .then((res) => {
          if (res) {
            showSuccess(res.data);
            handleCancelModal();
            setFinishRetrieveData(false);
            setSubmitLoading(false);
          }
        })
        .catch((err) => {
          showError(err);
          setSubmitLoading(false);
        });
    }
  };

  const createNewRole = () => {
    setIsEdited(false);
    setOpenCreatedRoleModal(true);
  };

  const rowSelection = (value: any) => {
    const mappedRole = {
      ...value,
      Permissions: value.Permissions.map(
        (permission: any) => permission.module.id
      ),
    };
    setMappedRole(mappedRole);
    setSelectedRow(value);
  };

  const handleChangeModulesTransfer = (newTargetKeys: string[]) => {
    form.setFieldValue('modules', newTargetKeys);
    setTargetKeys(newTargetKeys);
  };

  const handleCancelModal = () => {
    form.resetFields();
    setIsEdited(false);
    setTargetKeys([]);
    setOpenCreatedRoleModal(false);
  };

  const handleEditRole = () => {
    if (!isEdited) {
      setIsEdited(true);
      form.setFieldsValue(mappedRole);
      setTargetKeys(mappedRole.Permissions);
      setOpenCreatedRoleModal(true);
    }
  };

  const handleDeleteRole = () => {
    deleteRole(selectedRow.id)
      .then((res) => {
        if (res) {
          showSuccess(res.data);
          setOpenConfirmDialog(false);
          setFinishRetrieveData(false);
        }
      })
      .catch((err) => {
        showError(err.response.data.error.message);
        setOpenConfirmDialog(false);
      });
  };

  const handleConfirmDelete = () => {
    if (selectedRow) {
      setOpenConfirmDialog(true);
    }
  };

  return (
    <OperationLayoutComponent>
      <HelmetTitle title="Roles" />

      <ACLModules requiredPermission={EModules.ROLES}>
        <>
          <OperationTopBar title="Roles">
            <div className="top_menu_actions">
              <div className="action_menu_item" onClick={createNewRole}>
                <div id="new_role" />
                <span>NUEVO ROL</span>
              </div>
              <div className="action_menu_item">
                <div id="search_role" />
                <span>BUSCAR</span>
              </div>
            </div>
          </OperationTopBar>

          <div className="operation_module_content">
            <div className="operation_logo_back" />
            <DataTable
              {...TableOptions}
              className="custom_table"
              value={rolesData}
              loading={!finishRetrieveData}
              tableStyle={{ minWidth: '50rem' }}
              selectionMode="radiobutton"
              selection={selectedRow}
              onSelectionChange={(e) => rowSelection(e.value)}
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
              <div className="action_menu_item" onClick={handleEditRole}>
                <div className="bottom_button" id="edit_user" />
                <span>EDITAR</span>
              </div>
              <Popconfirm
                placement="top"
                open={openConfirmDialog}
                onOpenChange={handleConfirmDelete}
                onCancel={() => setOpenConfirmDialog(false)}
                title="Confirmar acción"
                description="¿Esta seguro de eliminar este rol?"
                onConfirm={handleDeleteRole}
                okText="Sí"
                cancelText="No"
              >
                <div className="action_menu_item">
                  <div className="bottom_button" id="delete_role" />
                  <span>ELIMINAR</span>
                </div>
              </Popconfirm>
            </div>
          </OperationFooter>

          <Modal
            open={openCreatedRoleModal}
            onCancel={() => setOpenCreatedRoleModal(false)}
            footer={[]}
            title="Nuevo Rol"
            centered
            className="custom_operation_modal"
          >
            <Form
              form={form}
              className="form_modal"
              name="formRoles"
              style={{ maxWidth: 600 }}
              onFinish={submitRoleForm}
              initialValues={{
                name: '',
                description: '',
                modules: '',
              }}
            >
              <div className="section">
                <Form.Item
                  className="operation_input_element"
                  label="Nombre"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: 'Ingresa el Nombre del rol!',
                    },
                  ]}
                  style={{ minWidth: '97%' }}
                >
                  <Input placeholder="Nombre" />
                </Form.Item>
              </div>

              <div className="section">
                <Form.Item
                  className="operation_input_element w_100"
                  label="Descripción"
                  name="description"
                  rules={[
                    {
                      required: true,
                      message: 'Ingresa una Descripción!',
                    },
                  ]}
                >
                  <Input.TextArea placeholder="Descripción" />
                </Form.Item>
              </div>

              <div className="section">
                <Form.Item
                  className="operation_input_element w_100"
                  label="Modulos Asignados"
                  name="modules"
                  rules={[
                    {
                      required: true,
                      message: 'Selecciona al menos un modulo!',
                    },
                  ]}
                >
                  <Transfer
                    dataSource={modulesList}
                    render={(item) => item.name}
                    targetKeys={targetKeys}
                    onChange={handleChangeModulesTransfer}
                    rowKey={(item) => item.id}
                  />
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
        </>
      </ACLModules>

    </OperationLayoutComponent>
  );
}
