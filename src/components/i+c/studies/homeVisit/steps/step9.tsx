import React, { useEffect, useState } from 'react';
import type { StudiesProps } from '@/models/i+c/props/StepsProps';
import { Button, Form, Input, Space } from 'antd';
import SimpleLoading from '@/components/i+c/ui/SimpleLoading';
import {
  getHousingData,
  getVisitDomicilaryRemarks,
  loadVisitDomiciliaryReferencingData,
} from '@/api/i+c/Studies';
import { showError, showSuccess } from '@/components/i+c/ui/Toast';

const { TextArea } = Input;

export default function StudyHomeVisitStep9({
  studyId,
  candidateId,
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
      getHousingData(String(studyId), String(candidateId))
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
      referencingRemark: values.remarks,
    };
    loadVisitDomiciliaryReferencingData(data)
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
            numberPersonsWithLive: studyInfo.peopleWithLiveData.length,
            peopleWithLiveData: studyInfo ? studyInfo.peopleWithLiveData : [],
            remarks: remarksData ? remarksData.referencingRemarks : '',
          }}
          onFinish={submitFlow}
        >
          <div className="section">
            <Form.Item
              className="input_element_flow_operation"
              label="No. de personas con las que vive"
              name="numberPersonsWithLive"
            >
              <Input className="w_100" disabled />
            </Form.Item>
          </div>

          <Form.List name="peopleWithLiveData">
            {(fields) => (
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
                        label="Nombres completos"
                        name={[name, 'fullName']}
                      >
                        <Input className="w_100" disabled />
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        className="input_element_flow_operation"
                        label="Edad"
                        name={[name, 'age']}
                      >
                        <Input className="w_100" disabled />
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        className="input_element_flow_operation"
                        label="Telefono"
                        name={[name, 'cellPhone']}
                      >
                        <Input className="w_100" disabled />
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        className="input_element_flow_operation"
                        label="Parentesco"
                        name={[name, 'relationship']}
                      >
                        <Input className="w_100" disabled />
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        className="input_element_flow_operation"
                        label="Estado Civil"
                        name={[name, 'maritalStatus']}
                      >
                        <Input className="w_100" disabled />
                      </Form.Item>
                    </div>
                  </Space>
                ))}
              </div>
            )}
          </Form.List>
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
