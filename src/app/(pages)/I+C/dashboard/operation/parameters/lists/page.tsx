"use client"
import React, { useEffect, useState } from 'react';
import {
  CheckCircleTwoTone,
  StopTwoTone,
  SearchOutlined,
} from '@ant-design/icons';
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
  Popover,
  Select,
} from 'antd';
import OperationFooter from '@/components/i+c/ui/Operation/Footer';
import {
  createParameter,
  deleteParameter,
  editParameter,
  getParameterGroups,
  getParameterTypes,
  getParametersByGroup,
} from '@/api/i+c/Parameters';
import { showError, showSuccess } from '@/components/i+c/ui/Toast';
import { DataTable } from 'primereact/datatable';
import { TableOptions } from '@/utils/i+c/helpers';
import { Column } from 'primereact/column';
import ACLModules from '@/components/i+c/auth/AccessModule';
import { EModules } from '@/models/i+c/Modules';

export default function OperationParametersListsPage() {
  const [finishRetrieveCatalogs, setFinishRetrieveCatalogs] = useState(false);
  const [finishRetrieveData, setFinishRetrieveData] = useState(false);
  const [openCreatedParameterModal, setOpenCreatedParameterModal] =
    useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [groupsList, setGroupsList] = useState([]);
  const [typesList, setTypesList] = useState([]);
  const [parametersData, setParametersData] = useState([]);
  const [groupSelection, setGroupSelection] = useState<any>(null);
  const [isEdited, setIsEdited] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    if (!finishRetrieveCatalogs) {
      getParameterGroups()
        .then((res) => {
          if (res) {
            setGroupsList(res.data);
          }
        })
        .catch((err) => {
          console.error(err);
        });
      getParameterTypes()
        .then((res) => {
          if (res) {
            setTypesList(res.data);
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
      title: 'Tipo de Parametro',
      dataIndex: 'parameterGroupId',
      key: 'parameterGroupId',
      render: (parameter: any) => (
        <span>{parameter.parameterGroupId.groupName}</span>
      ),
    },
    {
      title: 'Descripción',
      dataIndex: 'value',
      key: 'value',
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
    setIsEdited(false);
    setOpenCreatedParameterModal(true);
  };

  const submitParameterForm = (values: any) => {
    setSubmitLoading(true);
    if (selectedRow) {
      editParameter(selectedRow.id, values)
        .then((res) => {
          if (res) {
            showSuccess(res.data);
            handleCancelModal();
            setFinishRetrieveData(true);
            setSubmitLoading(false);
            setIsEdited(false);
          }
        })
        .catch(() => {
          showError('Error al crear el parametro');
          setSubmitLoading(false);
        });
    } else {
      createParameter(values)
        .then((res) => {
          if (res) {
            showSuccess(res.data);
            handleCancelModal();
            setFinishRetrieveData(true);
            setSubmitLoading(false);
          }
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
      getParametersByGroup(groupSelection.id)
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
    form.setFieldValue('groupId', group.id);
  };

  const handleConfirmDelete = () => {
    if (selectedRow) {
      setOpenConfirmDialog(true);
    }
  };

  const handleEditParameter = () => {
    if (!isEdited && selectedRow) {
      setIsEdited(true);
      form.setFieldsValue(selectedRow);
      setOpenCreatedParameterModal(true);
    }
  };

  const handleDeleteParameter = () => {
    deleteParameter(selectedRow.id)
      .then((res) => {
        if (res) {
          showSuccess(res.data);
          setOpenConfirmDialog(false);
          setFinishRetrieveData(true);
          setSelectedRow(null);
          setIsEdited(false);
        }
      })
      .catch((err) => {
        showError(err);
      });
  };

  const handleCancelModal = () => {
    form.resetFields();
    setIsEdited(false);
    setOpenCreatedParameterModal(false);
  };

  const onChangeFilterGroup = (e: any) => {
    console.log(e);
  };

  return (
    <OperationLayoutComponent>
      <HelmetTitle title="Listas Parametricas" />

      <ACLModules requiredPermission={EModules.PARAMETRIC_LISTS}>
        <OperationTopBar title="Listas Parametricas">
          <div className="top_menu_actions">
            <Popover
              content={
                <div className="parameters_list">
                  <div className="search_box">
                    <Input onChange={onChangeFilterGroup} placeholder="Buscar" />
                    <SearchOutlined />
                  </div>
                  <div className="items">
                    {groupsList.map((group: any) => (
                      <span
                        onClick={() => changeParameterGroup(group)}
                        key={group.id}
                        style={{ cursor: 'pointer' }}
                      >
                        {group.groupName}
                      </span>
                    ))}
                  </div>
                </div>
              }
            >
              <div className="action_menu_item reverse">
                <div id="filter_list" />
                <span>LISTAS</span>
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
              <div className="bottom_button" id="add_list" />
              <span>AGREGAR</span>
            </div>
            <div className="action_menu_item" onClick={handleEditParameter}>
              <div className="bottom_button" id="edit_list" />
              <span>MODIFICAR</span>
            </div>
            <Popconfirm
              placement="top"
              open={openConfirmDialog}
              onOpenChange={handleConfirmDelete}
              onCancel={() => setOpenConfirmDialog(false)}
              title="Confirmar acción"
              description="¿Esta seguro de eliminar este parametro?"
              onConfirm={handleDeleteParameter}
              okText="Sí"
              cancelText="No"
            >
              <div className="action_menu_item">
                <div className="bottom_button" id="delete_list" />
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
              groupId: groupSelection ? Number(groupSelection.id) : '',
              isParametric: false,
              value: '',
              valueType: '',
            }}
          >
            <div className="section">
              <Form.Item
                className="operation_input_element"
                label="Tipo de parametro"
                name="groupId"
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
                      {group.groupName}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                className="operation_input_element"
                label="Descripción"
                name="value"
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

            <div className="section">
              <Form.Item
                className="operation_input_element"
                label="Tipo de dato"
                name="valueType"
                rules={[
                  {
                    required: true,
                    message: 'Selecciona el tipo de dato!',
                  },
                ]}
              >
                <Select placeholder="Tipo de dato">
                  {typesList.map((type: any) => (
                    <Select.Option key={type.id} value={type.id}>
                      {type.type}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                className="operation_input_element"
                label="¿Es Parametrico ?"
                name="isParametric"
                valuePropName="checked"
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
