import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  Select,
  Space,
  Upload,
} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import type { StepsProps } from '@/models/i+c/props/StepsProps';
import {
  getCandidateEmploymentStudyData,
  loadCandidateEmploymentStudyData,
} from '@/api/i+c/Studies';
import SimpleLoading from '@/components/i+c/ui/SimpleLoading';
import { beforeUpload } from '@/utils/i+c/helpers';
import { ConceptEnums, ConceptEnumsLabels } from '@/models/i+c/ConceptsEnum';
import { showError, showSuccess } from '@/components/i+c/ui/Toast';
import { getCharges } from '@/api/i+c/Core';
import OperationalParameterList from '@/components/i+c/common/ParameterList/operational';
import type { RcFile } from 'antd/es/upload';

export default function ReferencingStep2({ studyId, candidateId }: StepsProps) {
  const [studyInfo, setStudyInfo] = useState<any>(null);
  const [candidateInfo, setCandidateInfo] = useState<any>(null);
  const [chargesList, setChargesList] = useState([]);
  const [loadingStudy, setLoadingStudy] = useState(false);
  const [finishCallCatalogs, setFinishCallCatalogs] = useState(false);
  const [finishRetrieveData, setfinishRetrieveData] = useState(false);
  const [defaultFiles, setDefaultFiles] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    if (!finishCallCatalogs) {
      getCharges()
        .then((res) => {
          if (res) {
            setChargesList(res.data);
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
      getCandidateEmploymentStudyData(String(studyId), candidateId)
        .then((res) => {
          if (res) {
            setCandidateInfo(res.data.candidateData);
            res.data.annexes.length > 0 && setDefaultFiles(res.data.annexes);
            setStudyInfo(res.data);
            setfinishRetrieveData(true);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [finishRetrieveData]);

  const onSubmitStep = (values: any) => {
    setLoadingStudy(true);
    const formData = new FormData();
    const studyData = {
      studyId,
      inactivityWorkData: values.periodOfInactivityAtWork,
      workData: values.candidateEmploymentData.map((studyData: any) => {
        return {
          candidateDataId: studyData.id,
          performanceEvaluation: studyData.performanceEvaluation,
          informationProvidedBy: studyData.informationProvidedBy,
          position: studyData.position,
          reasonForRetirement: studyData.reasonForRetirement,
          sourceOfInquiry: studyData.sourceOfInquiry,
          remarks: studyData.remarks,
        };
      }),
      concept: values.concept,
      remarks: values.remarks,
    };
    formData.append('studyData', JSON.stringify(studyData));
    values.annexes?.file.originFileObj &&
      formData.append(
        'file',
        values.annexes.file.originFileObj as RcFile,
        values.annexes.file.originFileObj.name
      );
    loadCandidateEmploymentStudyData(formData)
      .then((res) => {
        if (res) {
          showSuccess(res.data);
          setLoadingStudy(false);
        }
      })
      .catch((err) => {
        console.error(err);
        setLoadingStudy(false);
        showError('No se ha podido guardar la información');
      });
  };

  if (!finishRetrieveData) {
    return <SimpleLoading />;
  }
    return (
      <div className="form_container">
        <Form
          form={form}
          className="form_box"
          name="basic"
          style={{ width: '100%' }}
          initialValues={{
            candidateEmploymentData: candidateInfo.map((item: any) => {
              return {
                ...item,
                dateLeaving: dayjs(item.dateLeaving, 'YYYY/MM/DD'),
                dateEntry: dayjs(item.dateEntry, 'YYYY/MM/DD'),
                candidateDataId:
                  studyInfo && studyInfo.studyData.length > 0
                    ? studyInfo.studyData.find(
                      (data: any) => data.candidateDataId === item.id
                    ).candidateDataId
                    : '',
                performanceEvaluation:
                  studyInfo && studyInfo.studyData.length > 0
                    ? studyInfo.studyData.find(
                      (data: any) => data.candidateDataId === item.id
                    ).performanceEvaluation
                    : '',
                informationProvidedBy:
                  studyInfo && studyInfo.studyData.length > 0
                    ? studyInfo.studyData.find(
                      (data: any) => data.candidateDataId === item.id
                    ).informationProvidedBy
                    : '',
                position:
                  studyInfo && studyInfo.studyData.length > 0
                    ? studyInfo.studyData.find(
                      (data: any) => data.candidateDataId === item.id
                    ).position
                    : '',
                reasonForRetirement:
                  studyInfo && studyInfo.studyData.length > 0
                    ? studyInfo.studyData.find(
                      (data: any) => data.candidateDataId === item.id
                    ).reasonForRetirement
                    : '',
                sourceOfInquiry:
                  studyInfo && studyInfo.studyData.length > 0
                    ? studyInfo.studyData.find(
                      (data: any) => data.candidateDataId === item.id
                    ).sourceOfInquiry
                    : '',
                remarks:
                  studyInfo && studyInfo.studyData.length > 0
                    ? studyInfo.studyData.find(
                      (data: any) => data.candidateDataId === item.id
                    ).remarks
                    : '',
              };
            }),
            periodOfInactivityAtWork:
              studyInfo && studyInfo.inactivityWorkData.length > 0
                ? studyInfo.inactivityWorkData.map(
                  (inactivityWorkData: any) => {
                    return {
                      periodFrom: dayjs(
                        inactivityWorkData.periodFrom,
                        'YYYY/MM/DD'
                      ),
                      periodTo: dayjs(
                        inactivityWorkData.periodTo,
                        'YYYY/MM/DD'
                      ),
                      occupancy: inactivityWorkData.occupancy,
                    };
                  }
                )
                : [],
            concept:
              studyInfo?.studyEmploymentResult
                ? studyInfo.studyEmploymentResult.concept
                : '',
            remarks:
              studyInfo?.studyEmploymentResult
                ? studyInfo.studyEmploymentResult.remarks
                : '',
          }}
          onFinish={onSubmitStep}
        >
          <Form.List name="candidateEmploymentData">
            {(fields, { }) => (
              <div>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      marginBottom: 8,
                      borderBottom: '1px solid #00336a',
                      paddingBottom: '20px',
                    }}
                    align="baseline"
                  >
                    <div className="section">
                      <Form.Item
                        {...restField}
                        className="input_element_flow_operation"
                        label="Nombre de la empresa"
                        name={[name, 'companyName']}
                      >
                        <Input className="w_100" disabled />
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        className="input_element_flow_operation"
                        label="Cargo Candidato"
                        name={[name, 'charge']}
                      >
                        <Input className="w_100" disabled />
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        className="input_element_flow_operation"
                        label="Fecha de Ingreso"
                        name={[name, 'dateEntry']}
                      >
                        <DatePicker
                          format="YYYY/MM/DD"
                          className="w_100"
                          placeholder="Fecha de Ingreso"
                          disabled
                        />
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        className="input_element_flow_operation"
                        label="Fecha de Retiro"
                        name={[name, 'dateLeaving']}
                      >
                        <DatePicker
                          format="YYYY/MM/DD"
                          className="w_100"
                          placeholder="Fecha de Retiro"
                          disabled
                        />
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        className="input_element_flow_operation"
                        label="Actualmente"
                        name={[name, 'actually']}
                      >
                        <Checkbox className="w_100" />
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        className="input_element_flow_operation"
                        label="Telefono"
                        name={[name, 'bossPhone']}
                      >
                        <Input className="w_100" disabled />
                      </Form.Item>
                    </div>

                    <div className="section">
                      <Form.Item
                        {...restField}
                        className="input_element_flow_operation"
                        label="Nombre Jefe Inmediato"
                        name={[name, 'bossName']}
                      >
                        <Input className="w_100" disabled />
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        className="input_element_flow_operation"
                        label="Cargo"
                        name={[name, 'bossCharge']}
                      >
                        <Input className="w_100" disabled />
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        className="input_element_flow_operation_double"
                        label="Evaluación de desempeño"
                        name={[name, 'performanceEvaluation']}
                        rules={[
                          {
                            required: true,
                            message: 'Ingrese la información!',
                          },
                        ]}
                      >
                        <Input className="w_100" />
                      </Form.Item>
                    </div>

                    <div className="section">
                      <Form.Item
                        {...restField}
                        className="input_element_flow_operation"
                        label="Información suministrada por"
                        name={[name, 'informationProvidedBy']}
                        rules={[
                          {
                            required: true,
                            message: 'Ingrese la información!',
                          },
                        ]}
                      >
                        <Input className="w_100" />
                      </Form.Item>

                      <Form.Item
                        className="input_element_flow_operation"
                        label="Cargo"
                        name={[name, 'position']}
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

                      <OperationalParameterList
                        fieldProps={restField}
                        listId="2"
                        className="input_element_flow_operation"
                        label="Motivo del Retiro"
                        name={[name, 'reasonForRetirement']}
                        placeHolder="Fuente"
                        requiredMessage="Selecciona una opción!"
                        required
                      />

                      <OperationalParameterList
                        fieldProps={restField}
                        listId="1"
                        className="input_element_flow_operation"
                        label="Fuente de consulta"
                        name={[name, 'sourceOfInquiry']}
                        placeHolder="Fuente"
                        requiredMessage="Selecciona una opción!"
                        required
                      />

                      <Form.Item
                        {...restField}
                        className="input_element_flow_operation"
                        label="Observación"
                        name={[name, 'remarks']}
                      >
                        <Input className="w_100" />
                      </Form.Item>
                    </div>
                  </Space>
                ))}
              </div>
            )}
          </Form.List>

          <div style={{ marginTop: 30 }}>
            <h3>Periodo de inactividad laboral</h3>
            <Form.List name="periodOfInactivityAtWork">
              {(fields, { add, remove }) => (
                <div>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space
                      key={key}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        marginBottom: 8,
                        borderBottom: '1px solid #00336a',
                        paddingBottom: '20px',
                      }}
                      align="baseline"
                    >
                      <div className="section">
                        <Form.Item
                          {...restField}
                          className="input_element_flow_operation"
                          label="Desde"
                          name={[name, 'periodFrom']}
                        >
                          <DatePicker
                            format="YYYY/MM/DD"
                            className="w_100"
                            placeholder="Desde"
                          />
                        </Form.Item>

                        <Form.Item
                          {...restField}
                          className="input_element_flow_operation"
                          label="Hasta"
                          name={[name, 'periodTo']}
                        >
                          <DatePicker
                            format="YYYY/MM/DD"
                            className="w_100"
                            placeholder="Hasta"
                          />
                        </Form.Item>

                        <Form.Item
                          {...restField}
                          className="input_element_flow_operation"
                          label="Ocupación"
                          name={[name, 'occupancy']}
                        >
                          <Input />
                        </Form.Item>

                        <div className="remove_item_operator">
                          <MinusCircleOutlined
                            style={{ marginLeft: 20 }}
                            onClick={() => remove(name)}
                          />
                        </div>
                      </div>
                    </Space>
                  ))}
                  <div className="list_actions_container">
                    <Button
                      shape="circle"
                      onClick={() => add()}
                      icon={<PlusOutlined />}
                    />
                  </div>
                </div>
              )}
            </Form.List>
          </div>

          <div className="section" style={{ justifyContent: 'center' }}>
            <Form.Item
              className="input_element_flow_operation"
              label="Concepto"
              name="concept"
              rules={[
                {
                  required: true,
                  message: 'Ingresa un concepto!',
                },
              ]}
            >
              <Select
                options={[
                  {
                    value: ConceptEnums.FAVORABLE,
                    label: ConceptEnumsLabels.FAVORABLE,
                  },
                  {
                    value: ConceptEnums.NOT_FAVORABLE,
                    label: ConceptEnumsLabels.NOT_FAVORABLE,
                  },
                  {
                    value: ConceptEnums.FAVORABLE_WITH_NEW,
                    label: ConceptEnumsLabels.FAVORABLE_WITH_NEW,
                  },
                ]}
              />
            </Form.Item>

            <Form.Item
              className="input_element_flow_operation"
              label="Observación"
              name="remarks"
              rules={[
                {
                  required: true,
                  message: 'Ingresa una observación!',
                },
              ]}
            >
              <Input type="text" />
            </Form.Item>

            <Form.Item
              className="input_element_flow_operation"
              label="Anexos"
              name="annexes"
            >
              <Upload
                beforeUpload={beforeUpload}
                action={`${process.env.NEXT_PUBLIC_API_URL}/multer/process`}
                method="POST"
                className="w_100"
                maxCount={1}
                defaultFileList={defaultFiles.map((annexe: any) => {
                  return {
                    uid: `${annexe._id}`,
                    name: annexe.name,
                    status: 'done',
                    url: `${process.env.NEXT_PUBLIC_API_URL}/files/operation/getFile/${annexe._id}`,
                  };
                })}
              >
                <Button className="button_upload_control">
                  <div className="loader_file_container">
                    <span>Cargar Documento</span>
                    <div className="upload_action_button">
                      <span>Cargar</span>
                    </div>
                  </div>
                </Button>
              </Upload>
            </Form.Item>
          </div>

          <div className="buttons_bottom_navigation buttons_bottom_navigation_simple">
            <Button
              type="primary"
              className="submit_studie_button"
              htmlType="submit"
              loading={loadingStudy}
            >
              <span>GUARDAR</span>
            </Button>
          </div>
        </Form>
      </div>
    );
}
