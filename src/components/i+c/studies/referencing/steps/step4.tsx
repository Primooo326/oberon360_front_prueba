import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Select, Space, Upload } from 'antd';
import type { StepsProps } from '@/models/i+c/props/StepsProps';
import { beforeUpload } from '@/utils/i+c/helpers';
import { ConceptEnums, ConceptEnumsLabels } from '@/models/i+c/ConceptsEnum';
import {
  getCandidateReferencesData,
  loadCandidateReferencesStudyData,
} from '@/api/i+c/Studies';
import SimpleLoading from '@/components/i+c/ui/SimpleLoading';
import ParameterList from '@/components/i+c/common/ParameterList';
import { showError, showSuccess } from '@/components/i+c/ui/Toast';
import type { RcFile } from 'antd/es/upload';

export default function ReferencingStep4({ studyId, candidateId }: StepsProps) {
  const [candidateInfo, setCandidateInfo] = useState<any>(null);
  const [studyInfo, setStudyInfo] = useState<any>(null);
  const [loadingStudy, setLoadingStudy] = useState(false);
  const [finishRetrieveData, setfinishRetrieveData] = useState(false);
  const [defaultFiles, setDefaultFiles] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    if (!finishRetrieveData) {
      getCandidateReferencesData(String(studyId), candidateId)
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
      referencesData: values.referencesData.map((studyData: any) => {
        return {
          candidateDataId: studyData.id,
          ConceptOfTheEvaluated: studyData.ConceptOfTheEvaluated,
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
    loadCandidateReferencesStudyData(formData)
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
            referencesData: candidateInfo.map((item: any) => {
              return {
                ...item,
                ConceptOfTheEvaluated:
                  studyInfo && studyInfo.studyData.length > 0
                    ? studyInfo.studyData.find(
                      (data: any) => data.candidateDataId === item.id
                    ).ConceptOfTheEvaluated
                    : '',
              };
            }),
            concept:
              studyInfo?.studyReferencesResult
                ? studyInfo.studyReferencesResult.concept
                : '',
            remarks:
              studyInfo?.studyReferencesResult
                ? studyInfo.studyReferencesResult.remarks
                : '',
          }}
          onFinish={onSubmitStep}
        >
          <Form.List name="referencesData">
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
                        label="Nombres Completos"
                        name={[name, 'fullName']}
                        rules={[
                          {
                            required: true,
                            message: 'Ingresa el nombre!',
                          },
                        ]}
                      >
                        <Input disabled />
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        className="input_element_flow_operation"
                        label="Telefono"
                        name={[name, 'phoneNumber']}
                      >
                        <Input disabled />
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        className="input_element_flow_operation"
                        label="Tiempo de conocido (Años)"
                        name={[name, 'yearsOfAcquaintances']}
                      >
                        <Input disabled />
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        className="input_element_flow_operation"
                        label="Ámbito en el que se conocieron"
                        name={[name, 'whereKnowFrom']}
                      >
                        <Input disabled />
                      </Form.Item>

                      <ParameterList
                        groupId="15"
                        className="input_element_flow_operation"
                        label="Profesión"
                        name={[name, 'profession']}
                        fieldProps={restField}
                        placeHolder="Profesión"
                        required={false}
                        disabled
                      />

                      <Form.Item
                        {...restField}
                        className="input_element_flow_operation"
                        label="Concepto del evaluado"
                        name={[name, 'ConceptOfTheEvaluated']}
                        rules={[
                          {
                            required: true,
                            message: 'Ingrese la información!',
                          },
                        ]}
                      >
                        <Input />
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
