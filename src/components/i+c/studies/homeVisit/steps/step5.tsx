import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import type { StudiesProps } from '@/models/i+c/props/StepsProps';
import { Button, Checkbox, Form, Input, Space } from 'antd';
import SimpleLoading from '@/components/i+c/ui/SimpleLoading';
import {
  getEmploymentData,
  getVisitDomicilaryRemarks,
  loadVisitDomicilaryRemarks,
} from '@/api/i+c/Studies';
import { showError, showSuccess } from '@/components/i+c/ui/Toast';

const { TextArea } = Input;

export default function StudyHomeVisitStep5({
  studyId,
  candidateId,
  onChangeStep,
}: StudiesProps) {
  const [remarksData, setRemarksData] = useState<any>(null);
  const [studyInfo, setStudyInfo] = useState<any>(null);
  const [loadingStudy, setLoadingStudy] = useState(false);
  const [finishRetrieveData, setfinishRetrieveData] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (!finishRetrieveData) {
      getVisitDomicilaryRemarks(String(studyId))
        .then((res) => {
          if (res) {
            setRemarksData(res.data);
          }
        })
        .catch((err) => {
          console.error(err);
        });
      getEmploymentData(String(candidateId))
        .then((res) => {
          if (res) {
            setStudyInfo(res.data);
            setfinishRetrieveData(true);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [finishRetrieveData]);

  const submitFlow = (values: any) => {
    setLoadingStudy(true);
    const data = {
      studyId,
      employmentDataRemarks: values.remarks,
    };
    loadVisitDomicilaryRemarks(data)
      .then((res) => {
        if (res) {
          showSuccess(res.data);
          onChangeStep(5);
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
            employmentData: studyInfo.employmentData.map((item: any) => {
              return {
                companyName: item.companyName,
                charge: item.charge,
                dateEntry: dayjs(item.dateEntry).format('YYYY/MM/DD'),
                dateLeaving: dayjs(item.dateLeaving).format('YYYY/MM/DD'),
              };
            }),
            remarks: remarksData ? remarksData.employmentDataRemarks : '',
          }}
          onFinish={submitFlow}
        >
          <div>
            <Form.List name="employmentData">
              {(fields) => (
                <div>
                  {fields.length > 0 ? (
                    fields.map(({ key, name, ...restField }) => (
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
                            label="Cargo"
                            name={[name, 'charge']}
                          >
                            <Input className="w_100" disabled />
                          </Form.Item>

                          <Form.Item
                            {...restField}
                            className="input_element_flow_operation"
                            label="Fecha de ingreso"
                            name={[name, 'dateEntry']}
                          >
                            <Input className="w_100" disabled />
                          </Form.Item>

                          <Form.Item
                            {...restField}
                            className="input_element_flow_operation"
                            label="Fecha de retiro"
                            name={[name, 'dateLeaving']}
                          >
                            <Input className="w_100" disabled />
                          </Form.Item>

                          <Form.Item
                            {...restField}
                            className="input_element_flow_operation"
                            label="Actualmente"
                            name={[name, 'actually']}
                          >
                            <Checkbox className="w_100" />
                          </Form.Item>
                        </div>
                      </Space>
                    ))
                  ) : (
                    <span>No hay información cargada por el usuario</span>
                  )}
                </div>
              )}
            </Form.List>
          </div>

          <div className="section">
            <Form.Item
              className="input_element_flow_operation w_100"
              label="Observación"
              name="remarks"
              rules={[
                {
                  required: true,
                  message: 'Ingresa las obervaciones!',
                },
              ]}
            >
              <TextArea rows={8} />
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
