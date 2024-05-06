"use client"
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import OperationLayoutComponent from '@components/i+c/layout/Operation';
import HelmetTitle from '@components/i+c/ui/HelmetTitle';
import OperationTopBar from '@components/i+c/ui/Operation/TopBar';
import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
  Tag,
  TimePicker,
} from 'antd';
import OperationFooter from '@components/i+c/ui/Operation/Footer';
import { showError, showSuccess } from '@components/i+c/ui/Toast';
import {
  assignToAnalyst,
  getStudiesFromRequests,
  scheduleService,
} from '@/api/i+c/Studies';
import { DataTable } from 'primereact/datatable';
import { TableOptions } from '@/utils/i+c/helpers';
import { Column } from 'primereact/column';
import { useRouter } from 'next/navigation';
import {
  StudiesProgrammingStatus,
  StudiesStatus,
  StudiesStatusLabels,
} from '@/models/i+c/StudiesStatus';
import { getCustomerOperationalGroupByUser } from '@/api/i+c/Parameters';
import { API_ENDPOINTS } from '@/data/constants';
import SimpleLoading from '@components/i+c/ui/SimpleLoading';
import { EModules } from '@/models/i+c/Modules';
import ACLModules from '@components/i+c/auth/AccessModule';
import { FilterMatchMode } from 'primereact/api';
import { useICAuthStore } from '@/states/i+c/I+C-auth.state';
export default function OperationStudiesPage() {
  const [finishRetrieveData, setFinishRetrieveData] = useState(false);
  const [openProgrammingModal, setOpenProgrammingModal] = useState(false);
  const [openReports, setOpenReports] = useState(false);
  const [openNews, setOpenNews] = useState(false);
  const [finishCallCatalogs, setFinishCallCatalogs] = useState(false);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [showLinkControl, setShowLinkControl] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [expandedRows, setExpandedRows] = useState<any>(null);
  const [staff, setStaff] = useState<any[]>([]);
  const [operationalGroup, setOperationalGroup] = useState<any>(null);
  const [data, setData] = useState([]);
  const [form] = Form.useForm();
  const [formProgramming] = Form.useForm();
  const [formReports] = Form.useForm();
  const [formNews] = Form.useForm();
  const router = useRouter();
  const { userInfo } = useICAuthStore()

  useEffect(() => {
    if (!finishCallCatalogs) {
      console.log(userInfo);
      if (userInfo) {

        getCustomerOperationalGroupByUser(String(userInfo!.id))
          .then((res) => {
            if (res) {
              setOperationalGroup(res.data);
              setStaff(res.data.team);
              setFinishCallCatalogs(true);
            }
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        router.push('/I+C/auth')
      }
    }
  }, [finishCallCatalogs]);

  useEffect(() => {
    if (!finishRetrieveData) {
      getStudiesFromRequests()
        .then((res) => {
          if (res) {
            setData(res.data);
            setFinishRetrieveData(true);
          }
        })
        .catch((error) => {
          console.error(error);
          showError('No se ha podido obtener el listado de estudios');
          setFinishRetrieveData(true);
        });
    }
  }, [finishRetrieveData]);

  const editStudy = () => { };

  const handleAssignAnalyst = (rowData: any, value: any) => {
    assignToAnalyst({ studyId: rowData.id, analystId: value })
      .then((res) => {
        if (res) {
          showSuccess(res.data);
          setFinishRetrieveData(false);
        }
      })
      .catch(() => {
        showError('Error al trar de asignar el estudio');
      });
  };

  const getColorSemaforization = (date: any) => {
    const diffInDays = dayjs(date).diff(dayjs(), 'day', true);
    if (diffInDays > 2) {
      return 'green';
    } if (diffInDays > 1 && diffInDays <= 2) {
      return 'yellow';
    }
    return 'red';
  };

  const detailColumns = [
    {
      title: 'Estudio N°',
      dataIndex: 'id',
      key: 'id',
      render: (data: any) => <span style={{ fontSize: 12 }}>{data.id}</span>,
    },
    {
      title: 'Estado',
      dataIndex: 'status',
      key: 'status',
      render: (data: any) => (
        <Tag
          color={
            data.status === StudiesStatus.UNASSIGNED
              ? 'gold'
              : data.status === StudiesStatus.ASSIGNED
                ? 'green'
                : data.status === StudiesStatus.UNDER_REVIEW
                  ? 'blue'
                  : 'gold'
          }
        >
          {
            StudiesStatusLabels[
            String(data.status) as keyof typeof StudiesStatusLabels
            ]
          }
        </Tag>
      ),
    },
    {
      title: 'Progreso',
      dataIndex: 'AdvantageOfProgress',
      key: 'AdvantageOfProgress',
      render: (data: any) => (
        <span style={{ fontSize: 12 }}>{`${data.AdvantageOfProgress}%`}</span>
      ),
    },
    {
      title: 'Servicio',
      dataIndex: 'serviceName',
      key: 'serviceName',
      render: (data: any) => (
        <span style={{ fontSize: 12, padding: 10 }}>{data.serviceName}</span>
      ),
    },
    {
      title: 'Fecha de Asignación',
      dataIndex: 'assignmentDate',
      key: 'assignmentDate',
      render: (data: any) => (
        <span style={{ fontSize: 12, padding: 10 }}>
          {data.assignmentDate
            ? dayjs(data.assignmentDate).format('YYYY/MM/DD')
            : 'Sin asignar'}
        </span>
      ),
    },
    {
      title: 'Fecha realización del Servicio',
      dataIndex: 'completedDate',
      key: 'completedDate',
      render: (data: any) => (
        <span style={{ fontSize: 12, padding: 10 }}>
          {data.dateCompletion
            ? dayjs(data.dateCompletion).format('YYYY/MM/DD HH:mm')
            : 'Sin Realizar'}
        </span>
      ),
    },
    {
      title: 'Concepto del Estudio',
      dataIndex: 'completedDate',
      key: 'completedDate',
      render: (data: any) => (
        <span style={{ fontSize: 12, padding: 10 }}>--</span>
      ),
    },
    {
      title: 'Analista',
      dataIndex: 'AnalystAssigned',
      key: 'AnalystAssigned',
      render: (data: any) => (
        <span style={{ fontSize: 12, padding: 10 }}>
          {data.AnalystAssigned?.name ? (
            data.AnalystAssigned.name
          ) : operationalGroup &&
            operationalGroup.leader.id === userInfo!.id ? (
            <Select
              style={{ width: 150 }}
              options={staff}
              fieldNames={{
                label: 'name',
                value: 'id',
              }}
              value={data.AnalystAssigned.id}
              onChange={(e) => handleAssignAnalyst(data, e)}
            />
          ) : (
            data.AnalystAssigned.name
          )}
        </span>
      ),
    },
  ];

  const fatherColumns = [
    {
      title: 'N° Orden de servicio',
      dataIndex: 'request.id',
      key: 'request.id',
      render: (data: any) => (
        <span style={{ fontSize: 12 }}>{data.request.id}</span>
      ),
    },
    {
      title: 'Cliente',
      dataIndex: 'customer',
      key: 'customer',
      render: (data: any) => (
        <span style={{ fontSize: 12 }}>{data.request.customerName}</span>
      ),
    },
    {
      title: 'Estado',
      dataIndex: 'signaling',
      key: 'signaling',
      render: (data: any) => (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div
            style={{
              width: '50%',
              height: 20,
              backgroundColor: getColorSemaforization(
                dayjs(data.request.submitDate).add(3, 'day')
              ),
            }}
          />
        </div>
      ),
    },
    {
      title: 'Fecha de Radicación',
      dataIndex: 'submitDate',
      key: 'submitDate',
      render: (data: any) => (
        <span style={{ fontSize: 12 }}>
          {dayjs(data.request.submitDate).format('DD/MM/YYYY HH:mm')}
        </span>
      ),
    },
    {
      title: 'Fecha Proyectada de Entrega',
      dataIndex: 'deliveryDate',
      key: 'deliveryDate',
      render: (data: any) => (
        <span style={{ fontSize: 12 }}>
          {dayjs(data.request.submitDate).add(3, 'day').format('DD/MM/YYYY')}
        </span>
      ),
    },
    {
      title: 'Fecha Real de Entrega',
      dataIndex: 'deliveryDate',
      key: 'deliveryDate',
      render: () => <span style={{ fontSize: 12 }}>Sin Entregar</span>,
    },
    {
      title: 'Candidato',
      dataIndex: 'candidate.name',
      key: 'candidate.name',
      render: (data: any) => (
        <span style={{ fontSize: 12 }}>{data.candidate.name}</span>
      ),
    },
    {
      title: 'Identificación Candidato',
      dataIndex: 'candidate.username',
      key: 'candidate.username',
      render: (data: any) => (
        <span style={{ fontSize: 12 }}>{data.candidate.username}</span>
      ),
    },
    {
      title: 'Fecha Diligenciamiento Candidato',
      dataIndex: 'submitDate',
      key: 'submitDate',
      render: (data: any) => (
        <span style={{ fontSize: 12 }}>
          {data.candidate.RICDate
            ? dayjs(data.candidate.RICDate).format('DD/MM/YYYY HH:mm')
            : 'Sin diligenciar aún'}
        </span>
      ),
    },
    {
      title: 'Concepto Final',
      dataIndex: 'completedDate',
      key: 'completedDate',
      render: (data: any) => (
        <span style={{ fontSize: 12, padding: 10 }}>--</span>
      ),
    },
  ];

  const rowExpansionTemplate = (data: any) => {
    return (
      <div className="p-3">
        <div className="mb-3">
          <h3>Servicios del candidato:</h3>
        </div>
        <DataTable
          value={data.services.filter(
            (service: any) => service.candidateId === data.candidate.id
          )}
        >
          {detailColumns.map((col: any, i) => (
            <Column
              key={i}
              field={col.dataIndex}
              header={col.title}
              body={col.render && col.render}
            />
          ))}
        </DataTable>
      </div>
    );
  };

  const startStudy = () => {
    if (selectedRow) {
      if (
        selectedRow.studyStatus !== StudiesStatus.UNASSIGNED &&
        selectedRow.studyStatus !== StudiesStatus.POSTED &&
        selectedRow.studyStatus !== StudiesStatus.CANCELLED
      ) {
        if (
          selectedRow.services.filter(
            (service: any) => service.AnalystAssigned.id === userInfo!.id
          ).length > 0
        ) {
          if (selectedRow.candidate.RICDate === null) {
            showError(
              'El candidato no ha completado el ingreso de información'
            );
          } else {
            router.push(
              `/I+C/dashboard/operation/studies/${selectedRow.request.id}?candidateId=${selectedRow.candidate.id}`
            );
          }
        } else {
          showError('No tiene asignados estudios para iniciar');
        }
      } else {
        showError(
          'El servicio debe estar asignado a un analista para iniciar el estudio'
        );
      }
    }
  };

  const viewStudyReport = () => {
    if (selectedRow) {
      if (
        selectedRow.studyStatus !== StudiesStatus.UNASSIGNED &&
        selectedRow.studyStatus !== StudiesStatus.POSTED &&
        selectedRow.studyStatus !== StudiesStatus.CANCELLED
      ) {
        setOpenReports(true);
      } else {
        showError(
          'El estudio debe estar asignado y con un porcentaje de avance mayor al 1%'
        );
      }
    }
  };

  const handleProgrammingStudy = () => {
    if (selectedRow && selectedRow.studyStatus !== StudiesStatus.UNASSIGNED) {
      if (
        selectedRow.services.filter(
          (service: any) => service.studyNeedsProgramming === true
        ).length > 0
      ) {
        setOpenProgrammingModal(true);
      }
    }
  };

  const submitProgramming = (values: any) => {
    const formatDate = dayjs(values.dateEvent)
      .set('hour', dayjs(values.timeEvent, 'HH.mm').hour())
      .set('minute', dayjs(values.timeEvent, 'HH.mm').minute())
      .toISOString();
    const data = {
      candidateId: selectedRow.candidate.id,
      serviceId: values.eventType,
      studyId: selectedRow.services.find(
        (service: any) => service.serviceId === values.eventType
      ).id,
      dateTimeEvent: formatDate,
      status: StudiesProgrammingStatus.SCHEDULED,
      additionalInformation: values.virtualLink ? values.virtualLink : '',
    };
    scheduleService(data)
      .then((res) => {
        if (res) {
          showSuccess(res.data);
          handleProgramminCancelModal();
        }
      })
      .catch((error) => {
        showError(
          error.response
            ? error.response.data.error.message
            : 'No se pudo agendar el estudio'
        );
      });
  };

  const submitSelectedReport = (values: any) => {
    if (selectedRow) {
      if (selectedRow.candidate.RICDate === null) {
        showError('No hay información aún para mostrar');
      } else {
        window.open(
          `${process.env.NEXT_PUBLIC_API_URL}${API_ENDPOINTS.REPORTS}/generateReport?` +
          `reportType=${values.eventType}&candidateId=${selectedRow.candidate.id}&requestId=${selectedRow.request.id}`,
          '_blank'
        );
        handleReportsCancelModal();
      }
    }
  };

  const submitCreateNew = (saveType: string) => {
    console.log(saveType);
  };

  const handleReportsCancelModal = () => {
    formReports.resetFields();
    setOpenReports(false);
  };

  const handleProgramminCancelModal = () => {
    setShowLinkControl(false);
    formProgramming.resetFields();
    setOpenProgrammingModal(false);
  };

  const handleNewsCancelModal = () => {
    formNews.resetFields();
    setOpenNews(false);
  };

  const onGlobalFilterChange = (e: any) => {
    const value = e.target.value;
    const _filters = { ...filters };
    _filters.global.value = value;
    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-content-end p-1">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <Input
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Busqueda"
          />
        </span>
      </div>
    );
  };

  const header = renderHeader();

  return (
    <>
      {!finishCallCatalogs ? <SimpleLoading /> : (
        <OperationLayoutComponent>
          <HelmetTitle title="Estudios" />

          <ACLModules requiredPermission={EModules.STUDIES}>
            <>
              <OperationTopBar title="Estudios">
                <div className="top_menu_actions">
                  <div className="action_menu_item reverse" onClick={editStudy}>
                    <div id="edit_studie" />
                    <span>MODIFICAR</span>
                  </div>
                  <div className="action_menu_item reverse">
                    <div id="export_studie" />
                    <span>EXPORTAR</span>
                  </div>
                  <div
                    className="action_menu_item reverse"
                    onClick={() => setOpenNews(true)}
                  >
                    <div id="news_studie" />
                    <span>NOVEDADES</span>
                  </div>
                  <div
                    className="action_menu_item reverse"
                    onClick={() => setFinishRetrieveData(false)}
                  >
                    <div id="update_studie" />
                    <span>ACTUALIZAR</span>
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
                  rowExpansionTemplate={rowExpansionTemplate}
                  filters={filters}
                  header={header}
                  globalFilterFields={['candidate.name']}
                  dataKey="id"
                >
                  <Column expander={true} style={{ width: '5rem' }} />
                  <Column
                    selectionMode="single"
                    headerStyle={{ width: '3rem' }}
                  />
                  {fatherColumns.map((col: any, i) => (
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
                  <div
                    className="action_menu_item"
                    onClick={handleProgrammingStudy}
                  >
                    <div className="bottom_button" id="schedule_studie" />
                    <span>PROGRAMAR</span>
                  </div>
                  <div className="action_menu_item" onClick={startStudy}>
                    <div className="bottom_button" id="execute_studie" />
                    <span>REALIZAR ESTUDIO</span>
                  </div>
                  <div className="action_menu_item" onClick={viewStudyReport}>
                    <div className="bottom_button" id="report_studie" />
                    <span>VER INFORME</span>
                  </div>
                </div>
              </OperationFooter>

              <Modal
                open={openReports}
                onCancel={handleReportsCancelModal}
                footer={[]}
                title="Ver Informe"
                centered
                className="custom_operation_modal"
              >
                <Form
                  form={formReports}
                  className="form_modal"
                  name="formReports"
                  style={{ maxWidth: 600 }}
                  onFinish={submitSelectedReport}
                  initialValues={{
                    reportType: '',
                  }}
                >
                  <div className="section">
                    <Form.Item
                      className="operation_input_element w_100"
                      label="Informe"
                      name="eventType"
                      rules={[
                        {
                          required: true,
                          message: 'Selecciona una opción!',
                        },
                      ]}
                    >
                      <Select
                        placeholder="Informe"
                        options={[
                          {
                            value: 'executiveSummary',
                            label: 'Resumen Ejecutivo',
                          },
                          {
                            value: 'generalReport',
                            label: 'Informe General',
                          },
                          {
                            value: 'preEmploymentPolygraphReport',
                            label: 'Informe Poligrafía pre-empleo',
                          },
                          {
                            value: 'routinePolygraphReport',
                            label: 'Informe Poligrafía rutinaría',
                          },
                          {
                            value: 'specificPolygraphReport',
                            label: 'Informe Poligrafía especifica',
                          },
                        ]}
                      />
                    </Form.Item>
                  </div>

                  <div className="section align_end">
                    <Form.Item>
                      <Button
                        htmlType="submit"
                        className="operation_modal_button ok_button"
                      >
                        VER
                      </Button>
                    </Form.Item>

                    <Form.Item>
                      <Button
                        htmlType="button"
                        danger
                        className="operation_modal_button cancel_button"
                        onClick={handleReportsCancelModal}
                      >
                        CANCELAR
                      </Button>
                    </Form.Item>
                  </div>
                </Form>
              </Modal>

              <Modal
                open={openProgrammingModal}
                onCancel={handleProgramminCancelModal}
                footer={[]}
                title="Agendar Programación"
                centered
                className="custom_operation_modal"
              >
                <Form
                  form={formProgramming}
                  className="form_modal"
                  name="formProgramming"
                  style={{ maxWidth: 600 }}
                  onFinish={submitProgramming}
                >
                  <div className="section">
                    <Form.Item
                      className="operation_input_element"
                      label="Tipo de Programación"
                      name="eventType"
                      rules={[
                        {
                          required: true,
                          message: 'Selecciona una opción!',
                        },
                      ]}
                    >
                      <Select
                        placeholder="Tipo de Evento"
                        onChange={(e) => {
                          selectedRow.services.find(
                            (service: any) => service.serviceId === e
                          )!.studyCanBeTakenVirtual === true
                            ? setShowLinkControl(true)
                            : setShowLinkControl(false);
                          form.setFieldValue('eventType', e);
                        }}
                      >
                        {selectedRow?.services
                          .filter(
                            (service: any) =>
                              service.studyNeedsProgramming === true
                          )
                          .map((event: any) => (
                            <Select.Option
                              key={event.id}
                              value={event.serviceId}
                            >
                              <span style={{ textTransform: 'lowercase' }}>
                                {event.serviceName}
                              </span>
                            </Select.Option>
                          ))}
                      </Select>
                    </Form.Item>
                  </div>

                  {showLinkControl && (
                    <div className="section">
                      <Form.Item
                        className="operation_input_element w_100"
                        label="Enlace sala virtual"
                        name="virtualLink"
                      >
                        <Input placeholder="Enlace sala virtual" />
                      </Form.Item>
                    </div>
                  )}

                  <div className="section">
                    <Form.Item
                      className="operation_input_element"
                      label="Fecha"
                      name="dateEvent"
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
                        placeholder="Fecha programación"
                      />
                    </Form.Item>

                    <Form.Item
                      className="operation_input_element"
                      label="Hora"
                      name="timeEvent"
                      rules={[
                        {
                          required: true,
                          message: 'Selecciona una Hora!',
                        },
                      ]}
                    >
                      <TimePicker className="w_100" use12Hours format="HH:mm" />
                    </Form.Item>
                  </div>

                  <div className="section align_end">
                    <Form.Item>
                      <Button
                        htmlType="submit"
                        className="operation_modal_button ok_button"
                      >
                        PROGRAMAR
                      </Button>
                    </Form.Item>

                    <Form.Item>
                      <Button
                        htmlType="button"
                        danger
                        className="operation_modal_button cancel_button"
                        onClick={handleProgramminCancelModal}
                      >
                        CANCELAR
                      </Button>
                    </Form.Item>
                  </div>
                </Form>
              </Modal>

              <Modal
                open={openNews}
                onCancel={handleNewsCancelModal}
                footer={[]}
                title="Crear Novedad"
                centered
                className="custom_operation_modal"
              >
                <Form
                  form={formNews}
                  className="form_modal"
                  name="formNews"
                  style={{ maxWidth: 600 }}
                  onFinish={submitCreateNew}
                  initialValues={{
                    reportType: '',
                  }}
                >
                  <div className="section">
                    <Form.Item
                      className="operation_input_element w_100"
                      label="Tipo de Novedad"
                      name="newType"
                      rules={[
                        {
                          required: true,
                          message: 'Selecciona una opción!',
                        },
                      ]}
                    >
                      <Select
                        placeholder="Tipo de Novedad"
                        options={[
                          {
                            value: 'executiveSummary',
                            label: 'Resumen Ejecutivo',
                            disabled: true,
                          },
                        ]}
                      />
                    </Form.Item>
                  </div>

                  <div className="section">
                    <Form.Item
                      className="operation_input_element w_100"
                      label="Descripción"
                      name="newType"
                      rules={[
                        {
                          required: true,
                          message: 'Ingresa una descripción!',
                        },
                      ]}
                    >
                      <Input.TextArea rows={4} />
                    </Form.Item>
                  </div>

                  <div className="section align_end">
                    <Form.Item>
                      <Button
                        htmlType="button"
                        className="operation_modal_button ok_button"
                        onClick={() => {
                          formNews.validateFields();
                          formNews.getFieldsError().length === 0 &&
                            submitCreateNew('sendCustomer');
                        }}
                      >
                        ENVIAR AL CLIENTE
                      </Button>
                    </Form.Item>

                    <Form.Item>
                      <Button
                        htmlType="button"
                        className="operation_modal_button ok_button"
                        onClick={() => {
                          formNews.validateFields();
                          formNews.getFieldsError().length === 0 &&
                            submitCreateNew('save');
                        }}
                      >
                        GUARDAR
                      </Button>
                    </Form.Item>

                    <Form.Item>
                      <Button
                        htmlType="button"
                        danger
                        className="operation_modal_button cancel_button"
                        onClick={handleNewsCancelModal}
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
      )}
    </>
  )
}
