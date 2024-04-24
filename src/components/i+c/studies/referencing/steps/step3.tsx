import React, { useEffect, useState } from 'react';
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
import type { StepsProps } from '@/models/i+c/props/StepsProps';
import { beforeUpload } from '@/utils/i+c/helpers';
import { ConceptEnums, ConceptEnumsLabels } from '@/models/i+c/ConceptsEnum';
import dayjs from 'dayjs';
import {
  getCandidateAcademicData,
  loadCandidateAcademicStudyData,
} from '@/api/i+c/Studies';
import ParameterList from '@/components/i+c/common/ParameterList';
import SimpleLoading from '@/components/i+c/ui/SimpleLoading';
import { showError, showSuccess } from '@/components/i+c/ui/Toast';
import { getCharges } from '@/api/i+c/Core';
import OperationalParameterList from '@/components/i+c/common/ParameterList/operational';
import type { RcFile } from 'antd/es/upload';

export default function ReferencingStep3({ studyId, candidateId }: StepsProps) {
  const [candidateInfo, setCandidateInfo] = useState<any>(null);
  const [studyInfo, setStudyInfo] = useState<any>(null);
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
      getCandidateAcademicData(String(studyId), candidateId)
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
      academicData: values.candidateAcademicData.map((studyData: any) => {
        return {
          candidateDataId: studyData.id,
          phone: studyData.phone,
          folioOrRegistration: studyData.folioOrRegistration,
          informationProvidedBy: studyData.informationProvidedBy,
          position: studyData.position,
          SourceOfInquiry: studyData.SourceOfInquiry,
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
    loadCandidateAcademicStudyData(formData)
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
            candidateAcademicData: candidateInfo.map((item: any) => {
              return {
                ...item,
                dateOfGrade: dayjs(item.dateOfGrade, 'YYYY/MM/DD'),
                phone:
                  studyInfo && studyInfo.studyData.length > 0
                    ? studyInfo.studyData.find(
                      (data: any) => data.candidateDataId === item.id
                    ).phone
                    : '',
                folioOrRegistration:
                  studyInfo && studyInfo.studyData.length > 0
                    ? studyInfo.studyData.find(
                      (data: any) => data.candidateDataId === item.id
                    ).folioOrRegistration
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
                SourceOfInquiry:
                  studyInfo && studyInfo.studyData.length > 0
                    ? studyInfo.studyData.find(
                      (data: any) => data.candidateDataId === item.id
                    ).SourceOfInquiry
                    : '',
                remarks:
                  studyInfo && studyInfo.studyData.length > 0
                    ? studyInfo.studyData.find(
                      (data: any) => data.candidateDataId === item.id
                    ).remarks
                    : '',
              };
            }),
            concept:
              studyInfo?.studyAcademicResult
                ? studyInfo.studyAcademicResult.concept
                : '',
            remarks:
              studyInfo?.studyAcademicResult
                ? studyInfo.studyAcademicResult.remarks
                : '',
          }}
          onFinish={onSubmitStep}
        >
          <Form.List name="candidateAcademicData">
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
                      <ParameterList
                        groupId="14"
                        className="input_element_flow_operation"
                        label="Institución Educativa"
                        name={[name, 'academyName']}
                        placeHolder="Institución Educativa"
                        fieldProps={restField}
                        required={false}
                        disabled
                      />

                      <ParameterList
                        groupId="4"
                        className="input_element_flow_operation"
                        label="Tipo de Estudio"
                        name={[name, 'studyType']}
                        placeHolder="Tipo de Estudio"
                        fieldProps={restField}
                        required={false}
                        disabled
                      />

                      <Form.Item
                        {...restField}
                        className="input_element_flow_operation"
                        label="Título Obtenido"
                        name={[name, 'academycDegree']}
                        rules={[
                          {
                            required: true,
                            message: 'Ingresa el nombre del título!',
                          },
                        ]}
                      >
                        <Input placeholder="Título" disabled />
                      </Form.Item>

                      <Form.Item
                        className="input_element_flow_operation"
                        label="Fecha de Grado"
                        name={[name, 'dateOfGrade']}
                        rules={[
                          {
                            required: true,
                            message: 'Selecciona tu Fecha de Grado!',
                          },
                        ]}
                      >
                        <DatePicker
                          format="YYYY/MM/DD"
                          className="w_100"
                          placeholder="Fecha de Grado"
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
                        name={[name, 'phone']}
                      >
                        <Input className="w_100" />
                      </Form.Item>
                    </div>

                    <div className="section">
                      <Form.Item
                        {...restField}
                        className="input_element_flow_operation"
                        label="Folio y/o Regsitro"
                        name={[name, 'folioOrRegistration']}
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
                        {...restField}
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
                        listId="1"
                        className="input_element_flow_operation"
                        label="Fuente de consulta"
                        name={[name, 'SourceOfInquiry']}
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
