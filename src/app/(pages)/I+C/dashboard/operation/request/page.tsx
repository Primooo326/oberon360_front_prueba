"use client"
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Button, Checkbox, Form, Modal, Popconfirm, Tag } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { FilterMatchMode } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import OperationLayoutComponent from '@/components/i+c/layout/Operation';
import OperationTopBar from '@/components/i+c/ui/Operation/TopBar';
import HelmetTitle from '@/components/i+c/ui/HelmetTitle';
import OperationFooter from '@/components/i+c/ui/Operation/Footer';
import RequestStep1Form from '@/components/i+c/forms/request/Step1';
import RequestStep2Form from '@/components/i+c/forms/request/Step2';
import { TableOptions } from '@/utils/i+c/helpers';
import {
  createRequest,
  deleteRequest,
  downloadRequestTemplate,
  getRequests,
  loadRequest,
  sendAndSubmitRequest,
} from '@/api/i+c/Request';
import { showError, showSuccess } from '@/components/i+c/ui/Toast';
import type { RequestCustom, RequestCustomList } from '@/models/i+c/Requests';
import HeaderTable from '@/components/i+c/ui/Table/HeaderTable';
import RowExpansionTemplate from '@/components/i+c/ui/Table/RowExpansionTemplate';
import { RequestEnum, RequestEnumLabels } from '@/models/i+c/RequestEnum';
import type { RcFile } from 'antd/es/upload';
import EditedRequestForm from '@/components/i+c/forms/request/EditedRequest';
import SimpleLoading from '@/components/i+c/ui/SimpleLoading';
import ACLModules from '@/components/i+c/auth/AccessModule';
import { EModules } from '@/models/i+c/Modules';

export default function OperationRequestPage() {
  const [openCreationModal, setOpenCreationModal] = useState(false);
  const [finishRetrieveData, setFinishRetrieveData] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [openSubmitDialog, setOpenSubmitDialog] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [requestData, setRequestData] = useState<any>({});
  const [expandedRows, setExpandedRows] = useState<any>(null);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [requestDetail, setrequestDetail] = useState<any>(null);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [openEditedModal, setOpenEditedModal] = useState(false);
  const [loadingEditedRequest, setLoadingEditedRequest] = useState(false);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();

  useEffect(() => {
    if (!finishRetrieveData) {
      getRequests()
        .then((res) => {
          if (res) {
            setData(res.data);
            setFinishRetrieveData(true);
          }
        })
        .catch((error) => {
          console.error(error);
          showError('No se ha podido obtener el listado de solicitudes');
          setFinishRetrieveData(true);
        });
    }
  }, [finishRetrieveData]);

  const createNewRequest = () => {
    setOpenCreationModal(true);
  };

  const handleCancelModal = () => {
    form.resetFields();
    setRequestData(null);
    setCurrent(0);
    setOpenCreationModal(false);
  };

  const submitRequestStep1 = (values: any) => {
    setRequestData(values);
    setCurrent(current + 1);
  };

  const submitRequestStep2 = (values: any) => {
    setSubmitLoading(true);
    if (requestData.requestType === 1) {
      const requestToGenerate = {
        customerId: requestData.customerId,
        customerInternal: requestData.customerInternal,
        regional: requestData.regional,
        costCenterId: requestData.costCenterId,
        billable: requestData.billable,
        remarks: requestData.remarks,
        saveType: values.saveType,
        services:
          values.requestServiceType === 2
            ? [
              {
                isPackage: values.requestServiceType !== 1,
                id: values.services,
              },
            ]
            : values.services.map((service: any) => {
              return {
                isPackage: values.requestServiceType !== 1,
                id: service,
              };
            }),
        candidates: values.candidates.map((candidate: any) => {
          return {
            username: candidate.identification,
            name: candidate.name,
            email: candidate.email,
            charge: candidate.charge,
          };
        }),
      } as RequestCustom;
      createRequest(requestToGenerate)
        .then((res) => {
          if (res) {
            showSuccess(res.data);
            setFinishRetrieveData(false);
            handleCancelModal();
          }
          setSubmitLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setSubmitLoading(false);
          showError(
            error.response.data.error
              ? error.response.data.error.message
              : 'No se ha podido crear la solicitud'
          );
        });
    } else {
      const formData = new FormData();
      formData.append('customerId', String(requestData.customerId));
      formData.append('customerInternal', String(requestData.customerInternal));
      formData.append('regional', String(requestData.regional));
      formData.append('costCenterId', String(requestData.costCenterId));
      formData.append('billable', String(requestData.billable));
      formData.append('remarks', requestData.remarks);
      formData.append('saveType', values.saveType);
      formData.append(
        'services',
        JSON.stringify(
          values.requestServiceType === 2
            ? [
              {
                isPackage: values.requestServiceType !== 1,
                id: values.services,
              },
            ]
            : values.services.map((service: any) => {
              return {
                isPackage: values.requestServiceType !== 1,
                id: service,
              };
            })
        )
      );
      formData.append(
        'file',
        values.candidatesTemplate.fileList[0].originFileObj as RcFile
      );
      loadRequest(formData)
        .then((res) => {
          if (res) {
            showSuccess(res.data);
            setFinishRetrieveData(false);
            handleCancelModal();
          }
          setSubmitLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setSubmitLoading(false);
          showError('No se ha podido crear la solicitud');
        });
    }
  };

  const steps = [
    {
      content: (
        <RequestStep1Form
          form={form}
          submitRequestStep1={submitRequestStep1}
          submitLoading={submitLoading}
          handleCancelModal={handleCancelModal}
        />
      ),
    },
    {
      content: (
        <RequestStep2Form
          requestData={requestData}
          submitRequestStep2={submitRequestStep2}
          submitLoading={submitLoading}
          handleCancelModal={handleCancelModal}
        />
      ),
    },
  ];

  const downloadCSVTemplate = () => {
    downloadRequestTemplate()
      .then((response) => {
        if (response) {
          const blob = new Blob([response], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          });
          // Crear una URL para el Blob
          const url = window.URL.createObjectURL(blob);
          // Crear un enlace para descargar el archivo
          const a = document.createElement('a');
          a.href = url;
          a.download = 'plantilla_candidatos.xlsx';
          a.click();
          // Liberar la URL creada
          window.URL.revokeObjectURL(url);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const editRequest = () => {
    if (selectedRow && selectedRow.status === RequestEnum.REGISTERED) {
      setOpenEditedModal(true);
    }
  };

  const cancelRequest = () => {
    if (selectedRow) {
      setOpenConfirmDialog(true);
    }
  };

  const submitRequest = () => {
    if (selectedRow && selectedRow.status === RequestEnum.REGISTERED) {
      setOpenSubmitDialog(true);
    }
  };

  const onChangeOpenDetail = (data: RequestCustomList) => {
    setOpenDetailModal(true);
    setrequestDetail(data);
  };

  const handleCancelDetailModal = () => {
    setOpenDetailModal(false);
  };

  const handleCancelEditedModal = () => {
    setOpenEditedModal(false);
  };

  const viewDetail = (request: RequestCustomList) => {
    return (
      <div>
        <InfoCircleOutlined onClick={() => onChangeOpenDetail(request)} />
      </div>
    );
  };

  const handleCancelRequest = () => {
    deleteRequest(selectedRow.id)
      .then((res) => {
        if (res) {
          showSuccess(res.data);
          setOpenConfirmDialog(false);
          setFinishRetrieveData(false);
          setSelectedRow(null);
        }
      })
      .catch((err) => {
        showError(err);
      });
  };

  const handleSubmitRequest = () => {
    sendAndSubmitRequest(selectedRow.id, String(selectedRow.customer.id))
      .then((res) => {
        if (res) {
          showSuccess(res.data);
          setOpenSubmitDialog(false);
          setFinishRetrieveData(false);
          setSelectedRow(null);
        }
      })
      .catch((err) => {
        showError(err);
      });
  };

  const columns = [
    {
      title: 'N° SOLICITUD',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'FECHA DE CREACIÓN',
      dataIndex: 'creationDate',
      key: 'creationDate',
      render: (request: RequestCustomList) => (
        <span>{dayjs(request.creationDate).format('DD/MM/YYYY')}</span>
      ),
    },
    {
      title: 'FECHA DE RADICACIÓN',
      dataIndex: 'submitDate',
      key: 'submitDate',
      render: (request: RequestCustomList) => (
        <span>
          {request.submitDate
            ? dayjs(request.submitDate).format('DD/MM/YYYY')
            : '--'}
        </span>
      ),
    },
    {
      title: 'HORA',
      dataIndex: 'time',
      key: 'time',
      render: (request: RequestCustomList) => (
        <span>{dayjs(request.creationDate).format('hh:mm')}</span>
      ),
    },
    {
      title: 'RAZÓN SOCIAL',
      dataIndex: 'customer',
      key: 'customer',
      render: (request: RequestCustomList) => (
        <span>{request.customer.name}</span>
      ),
    },
    {
      title: 'FACTURABLES',
      dataIndex: 'billable',
      key: 'billable',
      render: (request: RequestCustomList) => (
        <Checkbox disabled defaultChecked={request.billable} />
      ),
    },
    {
      title: 'ESTADO',
      dataIndex: 'status',
      key: 'status',
      render: (request: RequestCustomList) => (
        <Tag
          color={
            request.status === RequestEnum.REGISTERED
              ? 'gold'
              : request.status === RequestEnum.SUBMIT
                ? 'green'
                : 'red'
          }
        >
          {RequestEnumLabels[request.status]}
        </Tag>
      ),
    },
  ];

  const handleEditRequest = (values: any) => {
    setLoadingEditedRequest(true);
    setLoadingEditedRequest(false);
  };

  return (
    <OperationLayoutComponent>
      <HelmetTitle title="Solicitud" />

      <ACLModules requiredPermission={EModules.REQUESTS}>
        <>
          <OperationTopBar title="Solicitud">
            <div className="top_menu_actions">
              <div className="action_menu_item" onClick={createNewRequest}>
                <div id="new" />
                <span>NUEVA SOLICITUD</span>
              </div>
              <div className="action_menu_item" onClick={downloadCSVTemplate}>
                <div id="template" />
                <span>PLANTILLA CARGUE MASIVO</span>
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
              value={data}
              loading={!finishRetrieveData}
              tableStyle={{ minWidth: '50rem' }}
              selectionMode="radiobutton"
              selection={selectedRow}
              onSelectionChange={(e) => setSelectedRow(e.value)}
              emptyMessage="Sin Información"
              expandedRows={expandedRows}
              onRowToggle={(e: any) => setExpandedRows(e.data)}
              filters={filters}
              globalFilterFields={['customer.name']}
              header={
                <HeaderTable
                  globalFilterValue={globalFilterValue}
                  filters={filters}
                  setFilters={setFilters}
                  setGlobalFilterValue={setGlobalFilterValue}
                />
              }
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
              <Column header="Detalle" body={viewDetail} />
            </DataTable>
          </div>

          <OperationFooter>
            <div className="bottom_menu_actions">
              <div className="action_menu_item">
                <div
                  className="bottom_button"
                  id="edit"
                  onClick={editRequest}
                />
                <span>EDITAR</span>
              </div>
              <Popconfirm
                placement="top"
                open={openConfirmDialog}
                onOpenChange={cancelRequest}
                onCancel={() => setOpenConfirmDialog(false)}
                title="Confirmar acción"
                description="¿Esta seguro de anular esta solicitud?"
                onConfirm={handleCancelRequest}
                okText="Sí"
                cancelText="No"
              >
                <div className="action_menu_item">
                  <div className="bottom_button" id="delete" />
                  <span>ANULAR</span>
                </div>
              </Popconfirm>
              <Popconfirm
                placement="top"
                open={openSubmitDialog}
                onOpenChange={submitRequest}
                onCancel={() => setOpenSubmitDialog(false)}
                title="Confirmar acción"
                description="¿Se radicara esta solicitud esta seguro?"
                onConfirm={handleSubmitRequest}
                okText="Sí"
                cancelText="No"
              >
                <div className="action_menu_item">
                  <div className="bottom_button" id="register" />
                  <span>RADICAR</span>
                </div>
              </Popconfirm>
            </div>
          </OperationFooter>

          <Modal
            open={openCreationModal}
            onCancel={handleCancelModal}
            footer={[]}
            title="Nueva Solicitud"
            centered
            className="custom_operation_modal"
          >
            <div>{steps[current].content}</div>
          </Modal>

          <Modal
            open={openDetailModal}
            onCancel={handleCancelDetailModal}
            footer={
              <Button
                htmlType="button"
                danger
                className="operation_modal_button ok_button"
                onClick={handleCancelDetailModal}
                style={{ marginBottom: 10 }}
              >
                ACEPTAR
              </Button>
            }
            title="Información Solicitud"
            centered
            className="custom_operation_modal"
          >
            <RowExpansionTemplate data={requestDetail} />
          </Modal>

          <Modal
            open={openEditedModal}
            onCancel={handleCancelEditedModal}
            footer={[]}
            title="Modificar Solicitud"
            centered
            className="custom_operation_modal"
          >
            {finishRetrieveData ? (
              <EditedRequestForm
                submitEdit={handleEditRequest}
                submitLoading={loadingEditedRequest}
                handleCancelModal={handleCancelEditedModal}
                requestData={selectedRow}
              />
            ) : (
              <SimpleLoading />
            )}
          </Modal>
        </>
      </ACLModules>
    </OperationLayoutComponent>
  );
}
