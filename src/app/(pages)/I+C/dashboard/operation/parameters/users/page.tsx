"use client"
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  Modal,
  Popconfirm,
  Select,
  Upload,
  message,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { CheckCircleTwoTone, StopTwoTone } from '@ant-design/icons';
import OperationLayoutComponent from '@/components/i+c/layout/Operation';
import HelmetTitle from '@/components/i+c/ui/HelmetTitle';
import OperationFooter from '@/components/i+c/ui/Operation/Footer';
import OperationTopBar from '@/components/i+c/ui/Operation/TopBar';
import { createUser, deleteUser, getUsers, updateUser } from '@/api/i+c/Users';
import { getCharges } from '@/api/i+c/Core';
import { getRoles } from '@/api/i+c/Roles';
import { TableOptions } from '@/utils/i+c/helpers';
import { showError, showSuccess } from '@/components/i+c/ui/Toast';
import { getCustomers } from '@/api/i+c/Customers';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import type { RcFile } from 'antd/es/upload';
import { EModules } from '@/models/i+c/Modules';
import ACLModules from '@/components/i+c/auth/AccessModule';
import { useICAuthStore } from '@/states/i+c/I+C-auth.state';

export default function OperationParametersUsersPage() {
  const [openCreatedUserModal, setOpenCreatedUserModal] = useState(false);
  const [openChangeResponsibleModal, setOpenChangeResponsibleModal] =
    useState(false);
  const [openChangePasswordModal, setOpenChangePasswordModal] = useState(false);
  const [finishRetrieveData, setFinishRetrieveData] = useState(false);
  const [finishCallCatalogs, setFinishCallCatalogs] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitChangeResponsibleLoading, setSubmitChangeResponsibleLoading] =
    useState(false);
  const [submitChangePasswordLoading, setSubmitChangePasswordLoading] =
    useState(false);
  const [usersData, setUsersData] = useState([]);
  const [filterUsers, setFilterUsers] = useState([]);
  const [chargesList, setChargesList] = useState([]);
  const [rolesList, setRolesList] = useState([]);
  const [customersList, setCustomersList] = useState([]);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [isSystemUser, setIsSystemUser] = useState(false);
  const [form] = Form.useForm();
  const [formChangeResponsible] = Form.useForm();
  const [formChangePassword] = Form.useForm();
  const { userInfo } = useICAuthStore()

  useEffect(() => {
    if (!finishCallCatalogs) {
      getCharges()
        .then((res) => {
          if (res) {
            setChargesList(res.data);
          }
        })
        .catch((err) => {
          console.error(err);
        });
      getRoles()
        .then((res) => {
          if (res) {
            setRolesList(res.data);
          }
        })
        .catch((err) => {
          console.error(err);
        });
      getCustomers()
        .then((res) => {
          if (res) {
            setCustomersList(res.data);
            setFinishCallCatalogs(true);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [finishCallCatalogs]);

  const onChangeUserFilter = (value: any) => {
    setFilterUsers(usersData.filter((user: any) => user.id !== value));
  };

  useEffect(() => {
    if (!finishRetrieveData) {
      getUsers()
        .then((res) => {
          if (res) {
            setUsersData(res.data);
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
      title: 'Usuario',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Nombre Completo',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Cargo',
      dataIndex: 'charge',
      key: 'charge',
      render: (user: any) => <span>{user.charge.value}</span>,
    },
    {
      title: 'Rol',
      dataIndex: 'role',
      key: 'role',
      render: (user: any) => <span>{user.role.name}</span>,
    },
    {
      title: 'Correo Electronico',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Activo',
      dataIndex: 'status',
      key: 'status',
      render: (user: any) =>
        user.status ? (
          <CheckCircleTwoTone twoToneColor="#52c41a" />
        ) : (
          <StopTwoTone twoToneColor="#eb2f96" />
        ),
    },
    {
      title: 'Firma',
      dataIndex: 'signFilePath',
      key: 'signFilePath',
      render: (user: any) =>
        user.signFilePath ? (
          <CheckCircleTwoTone twoToneColor="#52c41a" />
        ) : (
          <StopTwoTone twoToneColor="#eb2f96" />
        ),
    },
    {
      title: 'Novedad',
      dataIndex: 'news',
      key: 'news',
      render: (user: any) =>
        !user.news ? (
          <CheckCircleTwoTone twoToneColor="#52c41a" />
        ) : (
          <StopTwoTone twoToneColor="#eb2f96" />
        ),
    },
  ];

  const submitUserForm = (values: any) => {
    setSubmitLoading(true);
    const formData = new FormData();
    formData.append('username', values.username);
    formData.append('name', values.name);
    formData.append('chargeId', values.chargeId);
    formData.append('roleId', values.roleId);
    formData.append('email', values.email);
    formData.append('status', values.status);
    formData.append('customerId', values.customerId);
    formData.append(
      'file',
      values.signFile.fileList[0].originFileObj as RcFile
    );
    if (isEdited) {
      updateUser(selectedRow.id, formData)
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
      createUser(formData)
        .then((res) => {
          if (res) {
            showSuccess(res.data);
            handleCancelModal();
            setFinishRetrieveData(false);
          }
          setSubmitLoading(false);
        })
        .catch((err) => {
          showError(
            `No se ha podido crear el usuario: \n ${err.response.data.error
              ? err.response.data.error.code === 'P2002'
                ? 'El correo o nombre de usuario ya existe'
                : ''
              : 'Error interno'
            }`
          );
          setSubmitLoading(false);
        });
    }
  };

  const submitChangeResponsibleForm = (values: any) => {
    const data = {
      ...values,
      periodFrom: dayjs(values.periodFrom).format('DD-MM-YYYY'),
      periodTo: dayjs(values.periodTo).format('DD-MM-YYYY'),
    };
    setSubmitChangeResponsibleLoading(true);
    setTimeout(() => {
      setSubmitChangeResponsibleLoading(false);
    }, 2000);
  };

  const submitChangePasswordForm = (values: any) => {
    setSubmitChangePasswordLoading(true);
    setTimeout(() => {
      setSubmitChangePasswordLoading(false);
    }, 2000);
  };

  const createNewUser = () => {
    setIsEdited(false);
    setOpenCreatedUserModal(true);
  };

  const changeResponsible = () => {
    setOpenChangeResponsibleModal(true);
  };

  const changePassword = () => {
    if (selectedRow) {
      setOpenChangePasswordModal(true);
    }
  };

  const handleCancelModal = () => {
    form.resetFields();
    setIsEdited(false);
    setOpenCreatedUserModal(false);
  };

  const handleChangeResponsibleCancelModal = () => {
    formChangeResponsible.resetFields();
    setOpenChangeResponsibleModal(false);
  };

  const handleChangePasswordCancelModal = () => {
    formChangePassword.resetFields();
    setOpenChangePasswordModal(false);
  };

  const handleEditUser = () => {
    if (!isEdited && selectedRow) {
      setIsEdited(true);
      const userData = {
        ...selectedRow,
        customerId: String(selectedRow.customerId),
      };
      form.setFieldsValue(userData);
      setOpenCreatedUserModal(true);
    }
  };

  const handleDeleteUser = () => {
    deleteUser(selectedRow.id)
      .then((res) => {
        if (res) {
          showSuccess(res.data);
          setOpenConfirmDialog(false);
          setFinishRetrieveData(false);
        }
      })
      .catch((err) => {
        showError(err);
      });
  };

  const handleConfirmDelete = () => {
    if (selectedRow) {
      setOpenConfirmDialog(true);
    }
  };

  const beforeUpload = (file: RcFile) => {
    const isValidImage =
      file.type === 'image/png' || file.type === 'image/jpeg';
    if (!isValidImage) {
      message.error('Sólo puede cargar archivos JPG/PNG!');
    }
    return isValidImage;
  };

  return (
    <OperationLayoutComponent>
      <HelmetTitle title="Parámetros Usuarios" />

      <ACLModules requiredPermission={EModules.USERS}>
        <>
          <OperationTopBar title="Parámetros Usuarios">
            <div className="top_menu_actions">
              <div className="action_menu_item" onClick={createNewUser}>
                <div id="new_user" />
                <span>NUEVO USUARIO</span>
              </div>
              <div className="action_menu_item" onClick={changeResponsible}>
                <div id="update_responsability" />
                <span>CAMBIO DE RESPONSABLE</span>
              </div>
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
              value={usersData}
              loading={!finishRetrieveData}
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
              <div className="action_menu_item" onClick={handleEditUser}>
                <div className="bottom_button" id="edit_user" />
                <span>MODIFICAR</span>
              </div>
              <div className="action_menu_item" onClick={changePassword}>
                <div className="bottom_button" id="edit_password" />
                <span>CAMBIO CONTRASEÑA</span>
              </div>
              <Popconfirm
                placement="top"
                open={openConfirmDialog}
                onOpenChange={handleConfirmDelete}
                onCancel={() => setOpenConfirmDialog(false)}
                title="Confirmar acción"
                description="¿Esta seguro de eliminar este usuario?"
                onConfirm={handleDeleteUser}
                okText="Sí"
                cancelText="No"
              >
                <div className="action_menu_item">
                  <div className="bottom_button" id="delete_user" />
                  <span>ELIMINAR</span>
                </div>
              </Popconfirm>
            </div>
          </OperationFooter>

          <Modal
            open={openCreatedUserModal}
            onCancel={handleCancelModal}
            footer={[]}
            title="Nuevo Usuario"
            centered
            className="custom_operation_modal"
          >
            <Form
              form={form}
              className="form_modal"
              name="formUsers"
              style={{ maxWidth: 600 }}
              onFinish={submitUserForm}
              initialValues={{
                chargeId: '',
                email: '',
                name: '',
                roleId: '',
                status: true,
                username: '',
                signFile: [],
              }}
            >
              <div className="section">
                <Form.Item
                  className="operation_input_element"
                  label="Usuario"
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: 'Ingresa el usuario!',
                    },
                  ]}
                >
                  <Input placeholder="Usuario" />
                </Form.Item>

                <Form.Item
                  className="operation_input_element"
                  label="Nombre Completo"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: 'Ingresa el nombre completo!',
                    },
                  ]}
                >
                  <Input placeholder="Nombre Completo" />
                </Form.Item>
              </div>

              <div className="section">
                <Form.Item
                  className="operation_input_element"
                  label="Cargo"
                  name="chargeId"
                  rules={[
                    {
                      required: true,
                      message: 'Selecciona el cargo!',
                    },
                  ]}
                >
                  <Select placeholder="Cargo">
                    {chargesList.map((charge: any) => (
                      <Select.Option key={charge.id} value={charge.id}>
                        {charge.value}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  className="operation_input_element"
                  label="Rol"
                  name="roleId"
                  rules={[
                    {
                      required: true,
                      message: 'Selecciona el Rol!',
                    },
                  ]}
                >
                  <Select placeholder="Rol">
                    {rolesList.map((role: any) => (
                      <Select.Option key={role.id} value={role.id}>
                        {role.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>

              <div className="section">
                <Form.Item
                  className="operation_input_element"
                  label="Correo Electronico"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: 'Ingresa el correo electronico!',
                    },
                  ]}
                >
                  <Input placeholder="Correo Electronico" />
                </Form.Item>

                <Form.Item
                  className="operation_input_element"
                  label="activo"
                  name="status"
                  valuePropName="checked"
                >
                  <Checkbox />
                </Form.Item>
              </div>

              <div className="section">
                {userInfo?.isSystemUser && (
                  <Form.Item
                    className="operation_input_element"
                    label="¿Es un usuario del sistema?"
                    name="isSystemUser"
                    valuePropName="checked"
                  >
                    <Checkbox
                      value={isSystemUser}
                      onChange={(e) => setIsSystemUser(e.target.checked)}
                    />
                  </Form.Item>
                )}

                {isSystemUser !== true && (
                  <Form.Item
                    className="operation_input_element"
                    label="Cliente"
                    name="customerId"
                    rules={[
                      {
                        required: true,
                        message: 'Selecciona un Cliente!',
                      },
                    ]}
                  >
                    <Select placeholder="Cliente">
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
                )}
              </div>

              <div className="section">
                <Form.Item
                  className="operation_input_element"
                  label="Firma"
                  name="signFile"
                  rules={[
                    {
                      required: !isEdited,
                      message: 'Adjunta una Firma!',
                    },
                  ]}
                  required={!isEdited}
                >
                  <Upload
                    beforeUpload={beforeUpload}
                    action={`${process.env.NEXT_PUBLIC_API_URL}/multer/process`}
                    method="POST"
                  >
                    <Button icon={<UploadOutlined />}>Selecciona un archivo</Button>
                  </Upload>
                </Form.Item>
              </div>

              <div className="section align_end">
                <Form.Item>
                  <Button
                    htmlType="submit"
                    className="operation_modal_button ok_button"
                    loading={submitLoading}
                  >
                    {isEdited ? 'EDITAR' : 'CREAR'}
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

          <Modal
            open={openChangeResponsibleModal}
            onCancel={handleChangeResponsibleCancelModal}
            footer={[]}
            title="Cambio de responsable"
            centered
            className="custom_operation_modal"
          >
            <Form
              form={formChangeResponsible}
              className="form_modal"
              name="formChangeResponsible"
              style={{ maxWidth: 600 }}
              onFinish={submitChangeResponsibleForm}
              initialValues={{
                user: '',
                targetUser: '',
                reason: '',
                periodFrom: '',
                periodTo: '',
              }}
            >
              <div className="section">
                <Form.Item
                  className="operation_input_element"
                  label="Usuario"
                  name="user"
                  rules={[
                    {
                      required: true,
                      message: 'Selecciona un Usuario!',
                    },
                  ]}
                >
                  <Select placeholder="Usuario" onChange={onChangeUserFilter}>
                    {usersData.map((user: any) => (
                      <Select.Option key={user.id} value={user.id}>
                        {user.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  className="operation_input_element"
                  label="Usuario Destino"
                  name="targetUser"
                  rules={[
                    {
                      required: true,
                      message: 'Selecciona un Usuario de destino!',
                    },
                  ]}
                >
                  <Select placeholder="Usuario Destino">
                    {filterUsers.map((user: any) => (
                      <Select.Option key={user.id} value={user.id}>
                        {user.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>

              <div className="section">
                <Form.Item
                  className="operation_input_element"
                  label="Periodo Desde"
                  name="periodFrom"
                  rules={[
                    {
                      required: true,
                      message: 'Selecciona una fecha!',
                    },
                  ]}
                >
                  <DatePicker
                    format="DD-MM-YYYY"
                    className="w_100"
                    placeholder="Periodo Desde"
                  />
                </Form.Item>

                <Form.Item
                  className="operation_input_element"
                  label="Periodo Hasta"
                  name="periodTo"
                  rules={[
                    {
                      required: true,
                      message: 'Selecciona una fecha!',
                    },
                  ]}
                >
                  <DatePicker
                    format="DD-MM-YYYY"
                    className="w_100"
                    placeholder="Periodo Hasta"
                  />
                </Form.Item>
              </div>

              <div className="section">
                <Form.Item
                  className="operation_input_element w_100"
                  label="Motivo"
                  name="reason"
                  rules={[
                    {
                      required: true,
                      message: 'Ingresa un Motivo!',
                    },
                  ]}
                >
                  <Input.TextArea placeholder="Motivo" />
                </Form.Item>
              </div>

              <div className="section align_end">
                <Form.Item>
                  <Button
                    htmlType="submit"
                    className="operation_modal_button ok_button"
                    loading={submitChangeResponsibleLoading}
                  >
                    CAMBIAR
                  </Button>
                </Form.Item>

                <Form.Item>
                  <Button
                    htmlType="button"
                    danger
                    className="operation_modal_button cancel_button"
                    onClick={handleChangeResponsibleCancelModal}
                  >
                    CANCELAR
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </Modal>

          {selectedRow && (
            <Modal
              open={openChangePasswordModal}
              onCancel={handleChangePasswordCancelModal}
              footer={[]}
              title={`Cambiar contraseña - ${selectedRow.user && selectedRow.name}`}
              centered
              className="custom_operation_modal"
            >
              <Form
                form={formChangePassword}
                className="form_modal"
                name="formChangePassword"
                style={{ maxWidth: 600 }}
                onFinish={submitChangePasswordForm}
                initialValues={{
                  oldPassword: '',
                  newPassword: '',
                }}
              >
                <div className="section">
                  <Form.Item
                    className="operation_input_element"
                    label="Contraseña antigua"
                    name="oldPassword"
                    rules={[
                      {
                        required: true,
                        message: 'Ingresa la contraseña antigua!',
                      },
                    ]}
                  >
                    <Input.Password placeholder="Contraseña antigua" />
                  </Form.Item>

                  <Form.Item
                    className="operation_input_element"
                    label="Contraseña nueva"
                    name="newPassword"
                    rules={[
                      {
                        required: true,
                        message: 'Ingresa una contraseña nueva!',
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('oldPassword') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error('Las contraseñas no coinciden!')
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password placeholder="Contraseña nueva" />
                  </Form.Item>
                </div>

                <div className="section align_end">
                  <Form.Item>
                    <Button
                      htmlType="submit"
                      className="operation_modal_button ok_button"
                      loading={submitChangePasswordLoading}
                    >
                      CAMBIAR
                    </Button>
                  </Form.Item>

                  <Form.Item>
                    <Button
                      htmlType="button"
                      danger
                      className="operation_modal_button cancel_button"
                      onClick={handleChangePasswordCancelModal}
                    >
                      CANCELAR
                    </Button>
                  </Form.Item>
                </div>
              </Form>
            </Modal>
          )}
        </>
      </ACLModules>
    </OperationLayoutComponent>
  );
}
