"use client"
import React, { useEffect, useState } from 'react';
import { CheckCircleTwoTone, StopTwoTone } from '@ant-design/icons';
import OperationLayoutComponent from '@/components/i+c/layout/Operation';
import HelmetTitle from '@/components/i+c/ui/HelmetTitle';
import OperationTopBar from '@/components/i+c/ui/Operation/TopBar';
import {
  Button,
  Checkbox,
  Form,
  Input,
  Modal,
  Popconfirm,
  Select,
  Table,
} from 'antd';
import OperationFooter from '@/components/i+c/ui/Operation/Footer';
import {
  createOperationalGroup,
  deleteOperationalGroup,
  editOperationalGroup,
  getOperationalGroups,
} from '@/api/i+c/Parameters';
import { showError, showSuccess } from '@/components/i+c/ui/Toast';
import { getCustomers } from '@/api/i+c/Customers';
import { getUsers } from '@/api/i+c/Users';
import { DataTable } from 'primereact/datatable';
import { TableOptions } from '@/utils/i+c/helpers';
import { Column } from 'primereact/column';
import ACLModules from '@/components/i+c/auth/AccessModule';
import { EModules } from '@/models/i+c/Modules';

export default function OperationOperationalGroupsGroupsPage() {
  const [finishRetrieveOperationalGroups, setFinishRetrieveOperationalGroups] =
    useState(false);
  const [finishRetrieveCatalogs, setFinishRetrieveCatalogs] = useState(false);
  const [
    openCreatedOperationalGroupModal,
    setOpenCreatedOperationalGroupModal,
  ] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [customersList, setCustomersList] = useState<any[]>([]);
  const [usersList, setUsersList] = useState<any[]>([]);
  const [operationalGroupData, setOperationalGroupData] = useState([]);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [isEdited, setIsEdited] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (!finishRetrieveOperationalGroups) {
      getOperationalGroups()
        .then((res) => {
          if (res) {
            setOperationalGroupData(res.data);
            setFinishRetrieveOperationalGroups(true);
          }
        })
        .catch((err) => {
          console.error(err);
          showError('error al obtener el listado');
          setFinishRetrieveOperationalGroups(true);
        });
    }
  }, [finishRetrieveOperationalGroups]);

  useEffect(() => {
    if (!finishRetrieveCatalogs) {
      getCustomers()
        .then((res) => {
          if (res) {
            setCustomersList(res.data);
          }
        })
        .catch((err) => {
          console.error(err);
        });
      getUsers()
        .then((res) => {
          if (res) {
            setUsersList(res.data);
            setFinishRetrieveCatalogs(true);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [finishRetrieveCatalogs]);

  const columns = [
    {
      title: 'Código',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Nombre del grupo',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Líder operativo',
      dataIndex: 'leader',
      key: 'leader',
      render: (group: any) => <span>{group.leader.name}</span>,
    },
    {
      title: 'Equipo',
      dataIndex: 'team',
      key: 'team',
      render: (group: any) => <span>{group.team.length}</span>,
    },
    {
      title: 'Clientes',
      dataIndex: 'customers',
      key: 'customers',
      render: (group: any) => <span>{group.customers.length}</span>,
    },
    {
      title: 'Activo',
      dataIndex: 'active',
      key: 'active',
      render: (group: any) =>
        group.active ? (
          <CheckCircleTwoTone twoToneColor="#52c41a" />
        ) : (
          <StopTwoTone twoToneColor="#eb2f96" />
        ),
    },
  ];

  const createNewOperationalGroup = () => {
    setIsEdited(false);
    setOpenCreatedOperationalGroupModal(true);
  };

  const submitOperationalGroupForm = (values: any) => {
    setSubmitLoading(true);
    const operationalGroup = {
      ...values,
      customers: values.customers.map((cus: string) => Number(cus)),
    };
    if (selectedRow) {
      editOperationalGroup(selectedRow.id, operationalGroup)
        .then((res: any) => {
          if (res) {
            showSuccess(res.data);
            handleCancelModal();
            setSubmitLoading(false);
            setIsEdited(false);
            setFinishRetrieveOperationalGroups(false);
          }
        })
        .catch(() => {
          showError('Error al editar el grupo operacional');
          setSubmitLoading(false);
        });
    } else {
      createOperationalGroup(operationalGroup)
        .then((res) => {
          if (res) {
            showSuccess(res.data);
            handleCancelModal();
            setSubmitLoading(false);
            setFinishRetrieveOperationalGroups(false);
          }
        })
        .catch((err) => {
          console.error(err);
          showError('Error al crear el grupo operacional');
          setSubmitLoading(false);
        });
    }
  };

  const handleConfirmDelete = () => {
    if (selectedRow) {
      setOpenConfirmDialog(true);
    }
  };

  const handleEditOperationalGroup = () => {
    if (!isEdited && selectedRow) {
      setIsEdited(true);
      const operationalGroup = {
        ...selectedRow,
        leader: selectedRow.leader.id,
        team: selectedRow.team.map((user: any) => user.user.id),
        customers: selectedRow.customers.map((customer: any) =>
          String(customer.customer.id)
        ),
      };
      form.setFieldsValue(operationalGroup);
      setOpenCreatedOperationalGroupModal(true);
    }
  };

  const handleDeleteOperationalGroup = () => {
    deleteOperationalGroup(selectedRow.id)
      .then((res) => {
        if (res) {
          showSuccess(res.data);
          setOpenConfirmDialog(false);
          setSelectedRow(null);
          setIsEdited(false);
          setFinishRetrieveOperationalGroups(false);
        }
      })
      .catch((err) => {
        showError(err);
      });
  };

  const handleCancelModal = () => {
    form.resetFields();
    setIsEdited(false);
    setOpenCreatedOperationalGroupModal(false);
  };

  return (
    <OperationLayoutComponent>
      <HelmetTitle title="Grupos operativos" />

      <ACLModules requiredPermission={EModules.OPERATIONAL_GROUPS}>
        <OperationTopBar title="Grupos operativos">

        </OperationTopBar>

        <div className="operation_module_content">
          <div className="operation_logo_back" />
          <DataTable
            {...TableOptions}
            className="custom_table"
            value={operationalGroupData}
            loading={!finishRetrieveOperationalGroups}
            tableStyle={{ minWidth: '50rem' }}
            selectionMode="radiobutton"
            selection={selectedRow}
            onSelectionChange={(e: any) => setSelectedRow(e.value)}
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
            <div className="action_menu_item" onClick={createNewOperationalGroup}>
              <div className="bottom_button" id="add_group" />
              <span>AGREGAR</span>
            </div>
            <div
              className="action_menu_item"
              onClick={handleEditOperationalGroup}
            >
              <div className="bottom_button" id="edit_group" />
              <span>MODIFICAR</span>
            </div>
            <Popconfirm
              placement="top"
              open={openConfirmDialog}
              onOpenChange={handleConfirmDelete}
              onCancel={() => setOpenConfirmDialog(false)}
              title="Confirmar acción"
              description="¿Esta seguro de eliminar este grupo operacional?"
              onConfirm={handleDeleteOperationalGroup}
              okText="Sí"
              cancelText="No"
            >
              <div className="action_menu_item">
                <div className="bottom_button" id="delete_group" />
                <span>ELIMINAR</span>
              </div>
            </Popconfirm>
          </div>
        </OperationFooter>

        <Modal
          open={openCreatedOperationalGroupModal}
          onCancel={handleCancelModal}
          footer={[]}
          title="Nuevo Grupo Operativo"
          centered
          className="custom_operation_modal"
        >
          <Form
            form={form}
            className="form_modal"
            name="formGroups"
            style={{ maxWidth: 600 }}
            onFinish={submitOperationalGroupForm}
            initialValues={{
              name: '',
              leader: '',
              team: [],
              customers: [],
              active: false,
            }}
          >
            <div className="section">
              <Form.Item
                className="operation_input_element"
                label="Nombre del grupo"
                name="name"
                rules={[
                  {
                    required: true,
                    message: 'Ingresa el nombre del grupo!',
                  },
                ]}
              >
                <Input placeholder="Nombre del grupo" />
              </Form.Item>

              <Form.Item
                className="operation_input_element"
                label="Líder Operativo"
                name="leader"
                rules={[
                  {
                    required: true,
                    message: 'Selecciona un Líder Operativo!',
                  },
                ]}
              >
                <Select placeholder="Líder Operativo">
                  {usersList.map((user: any) => (
                    <Select.Option key={user.id} value={user.id}>
                      {user.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            <div>
              <Form.Item
                className="operation_input_element"
                label="Equipo"
                name="team"
                rules={[
                  {
                    required: true,
                    message: 'Selecciona el Equipo!',
                  },
                ]}
                style={{ minWidth: '97%' }}
              >
                <Select
                  mode="multiple"
                  showSearch
                  optionFilterProp="value"
                  placeholder="Equipo"
                >
                  {usersList.map((user: any) => (
                    <Select.Option key={user.id} value={user.id}>
                      {user.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            <div>
              <Form.Item
                className="operation_input_element"
                label="Clientes"
                name="customers"
                rules={[
                  {
                    required: true,
                    message: 'Selecciona los clientes!',
                  },
                ]}
                style={{ minWidth: '97%' }}
              >
                <Select
                  mode="multiple"
                  showSearch
                  optionFilterProp="value"
                  placeholder="Clientes"
                >
                  {customersList.map((customer: any) => (
                    <Select.Option
                      key={customer.cliente_ID}
                      value={customer.cliente_ID}
                    >
                      {customer.cliente_Nombre}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            <div>
              <Form.Item
                className="operation_input_element"
                label="Activo"
                name="active"
                valuePropName="checked"
                style={{ minWidth: '97%' }}
              >
                <Checkbox defaultChecked={false} />
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
