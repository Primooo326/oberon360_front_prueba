import React, { useEffect, useState } from 'react';
import type { StudiesProps } from '@/models/i+c/props/StepsProps';
import { Button, Form, Input, InputNumber } from 'antd';
import SimpleLoading from '@/components/i+c/ui/SimpleLoading';
import {
  getEconomicIncomeData,
  getVisitDomicilaryRemarks,
  loadEconomicIncomeData,
} from '@/api/i+c/Studies';
import { showError, showSuccess } from '@/components/i+c/ui/Toast';

const { TextArea } = Input;

export default function StudyHomeVisitStep7({
  studyId,
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
      getEconomicIncomeData(String(studyId))
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
      monthlyIncome: values.monthlyIncome,
      incomeConcept: values.incomeConcept,
      monthlyExpenses: values.monthlyExpenses,
      expenseConcept: values.expenseConcept,
      numberOfContributors: values.numberOfContributors,
      economicalDataRemarks: values.remarks,
    };
    loadEconomicIncomeData(data)
      .then((res) => {
        if (res) {
          showSuccess(res.data);
          onChangeStep(7);
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
            monthlyIncome: studyInfo ? studyInfo.monthlyIncome : '',
            incomeConcept: studyInfo ? studyInfo.incomeConcept : '',
            monthlyExpenses: studyInfo ? studyInfo.monthlyExpenses : '',
            expenseConcept: studyInfo ? studyInfo.expenseConcept : '',
            numberOfContributors: studyInfo
              ? studyInfo.numberOfContributors
              : 0,
            remarks: remarksData ? remarksData.economicalDataRemarks : '',
          }}
          onFinish={submitFlow}
        >
          <div className="section">
            <Form.Item
              className="input_element_flow_operation"
              label="Ingreso Mensuales"
              name="monthlyIncome"
            >
              <InputNumber
                className="w_100"
                formatter={(value) =>
                  `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
              />
            </Form.Item>

            <Form.Item
              className="input_element_flow_operation"
              label="Concepto"
              name="incomeConcept"
            >
              <Input className="w_100" />
            </Form.Item>

            <Form.Item
              className="input_element_flow_operation"
              name="numberOfContributors"
              label="No. Personas que dependen del ingreso
              familiar"
            >
              <InputNumber name="numberOfContributors" className="w_100" />
            </Form.Item>
          </div>

          <div className="section">
            <Form.Item
              className="input_element_flow_operation"
              label="Gastos Mensuales"
              name="monthlyExpenses"
            >
              <InputNumber
                className="w_100"
                formatter={(value) =>
                  `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
              />
            </Form.Item>

            <Form.Item
              className="input_element_flow_operation"
              label="Concepto"
              name="expenseConcept"
            >
              <Input className="w_100" />
            </Form.Item>
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
