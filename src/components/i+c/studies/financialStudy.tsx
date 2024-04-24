import React, { useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber, Select, Space, Upload } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { showError, showSuccess } from '../ui/Toast';
import { beforeUpload } from '@/utils/i+c/helpers';
import { ConceptEnums, ConceptEnumsLabels } from '@/models/i+c/ConceptsEnum';
import type { SimpleStudyProps } from '@/models/i+c/props/StepsProps';
import {
  getStudyFinancialData,
  loadStudyFinancialData,
} from '@/api/i+c/Studies';
import SimpleLoading from '../ui/SimpleLoading';
import OperationalParameterList from '../common/ParameterList/operational';
import type { RcFile } from 'antd/es/upload';

export default function StudyFlowFinancialStudy({ studyId }: SimpleStudyProps) {
  const [studyInfo, setStudyInfo] = useState<any>(null);
  const [loadingStudy, setLoadingStudy] = useState(false);
  const [finishRetrieveData, setfinishRetrieveData] = useState(false);
  const [defaultFiles, setDefaultFiles] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    if (!finishRetrieveData) {
      getStudyFinancialData(String(studyId))
        .then((res) => {
          if (res) {
            setStudyInfo(res.data);
            res.data.annexes.length > 0 && setDefaultFiles(res.data.annexes);
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
    const formData = new FormData();
    const studyData = {
      studyId,
      studyFinancialData: values.studyFinancialData.map((item: any) => {
        return {
          ...item,
          studyId,
        };
      }),
      studyFinancialAccountsData: values.studyFinancialAccountsData.map(
        (item: any) => {
          return {
            ...item,
            studyId,
          };
        }
      ),
      totalQuota: values.totalQuota,
      totalMonthlyPayment: values.totalMonthlyPayment,
      totalArrears: values.totalArrears,
      totalCurrentBalance: values.totalCurrentBalance,
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
    loadStudyFinancialData(formData)
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

  const handleChangeTotalQuota = () => {
    let value = 0;
    form.getFieldValue('studyFinancialData').map((field: any) => {
      value = value + field.quota;
    });
    form.setFieldValue('totalQuota', value);
  };

  const handleChangeTotalMonthlyPayment = () => {
    let value = 0;
    form.getFieldValue('studyFinancialData').map((field: any) => {
      value = value + field.monthlyPayment;
    });
    form.setFieldValue('totalMonthlyPayment', value);
  };

  const handleChangeTotalArrears = () => {
    let value = 0;
    form.getFieldValue('studyFinancialData').map((field: any) => {
      value = value + field.arrears;
    });
    form.setFieldValue('totalArrears', value);
  };

  const handleChangeTotalCurrentBalance = () => {
    let value = 0;
    form.getFieldValue('studyFinancialData').map((field: any) => {
      value = value + field.currentBalance;
    });
    form.setFieldValue('totalCurrentBalance', value);
  };

  if (!finishRetrieveData) {
    return <SimpleLoading />;
  }
    return (
      <div className="flow_section_container">
        <div className="flow_title_container">
          <div className="flow_title_box">
            <h3>Información financiera</h3>
          </div>
        </div>

        <div className="flow_content">
          <div className="form_container">
            <Form
              form={form}
              className="form_box"
              name="basic"
              style={{ width: '100%' }}
              initialValues={{
                studyFinancialAccountsData:
                  studyInfo && studyInfo.financialAccounts.length > 0
                    ? studyInfo.financialAccounts
                    : [
                      {
                        entity: '',
                        typeOfAccount: '',
                        quality: '',
                        status: '',
                        currentBalance: 0,
                        rating: '',
                      },
                    ],
                studyFinancialData:
                  studyInfo && studyInfo.studyData.length > 0
                    ? studyInfo.studyData
                    : [
                      {
                        entity: '',
                        product: '',
                        quota: 0,
                        monthlyPayment: 0,
                        arrears: 0,
                        currentBalance: 0,
                        quality: '',
                        behavior: '',
                      },
                    ],
                totalQuota:
                  studyInfo?.studyFinancialResult
                    ? studyInfo.studyFinancialResult.totalQuota
                    : 0,
                totalMonthlyPayment:
                  studyInfo?.studyFinancialResult
                    ? studyInfo.studyFinancialResult.totalMonthlyPayment
                    : 0,
                totalArrears:
                  studyInfo?.studyFinancialResult
                    ? studyInfo.studyFinancialResult.totalArrears
                    : 0,
                totalCurrentBalance:
                  studyInfo?.studyFinancialResult
                    ? studyInfo.studyFinancialResult.totalCurrentBalance
                    : 0,
                concept:
                  studyInfo?.studyFinancialResult
                    ? studyInfo.studyFinancialResult.concept
                    : '',
                remarks:
                  studyInfo?.studyFinancialResult
                    ? studyInfo.studyFinancialResult.remarks
                    : '',
              }}
              onFinish={submitFlow}
            >
              <div>
                <h3>Cuentas bancarias</h3>
              </div>

              <Form.List name="studyFinancialAccountsData">
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
                          <OperationalParameterList
                            fieldProps={restField}
                            listId="3"
                            className="input_element_flow_operation"
                            label="Entidad"
                            name={[name, 'entity']}
                            placeHolder="Entidad"
                            requiredMessage="Selecciona una opción!"
                            required
                          />

                          <OperationalParameterList
                            fieldProps={restField}
                            listId="4"
                            className="input_element_flow_operation"
                            label="Tipo de Cuenta"
                            name={[name, 'typeOfAccount']}
                            placeHolder="Tipo de Cuenta"
                            requiredMessage="Selecciona una opción!"
                            required
                          />

                          <Form.Item
                            {...restField}
                            className="input_element_flow_operation"
                            label="Calidad"
                            name={[name, 'quality']}
                            rules={[
                              {
                                required: true,
                                message: 'Ingresa la información',
                              },
                            ]}
                          >
                            <Input placeholder="Calidad" />
                          </Form.Item>

                          <OperationalParameterList
                            fieldProps={restField}
                            listId="5"
                            className="input_element_flow_operation"
                            label="Estado"
                            name={[name, 'status']}
                            placeHolder="Estado"
                            requiredMessage="Selecciona una opción!"
                            required
                          />

                          <Form.Item
                            {...restField}
                            className="input_element_flow_operation"
                            label="Saldo actual"
                            name={[name, 'currentBalance']}
                            rules={[
                              {
                                required: true,
                                message: 'Ingresa la información',
                              },
                            ]}
                          >
                            <InputNumber
                              className="w_100"
                              formatter={(value) =>
                                `$ ${value}`.replace(
                                  /\B(?=(\d{3})+(?!\d))/g,
                                  ','
                                )
                              }
                              parser={(value) =>
                                value!.replace(/\$\s?|(,*)/g, '')
                              }
                              placeholder="Saldo actual"
                            />
                          </Form.Item>

                          <Form.Item
                            {...restField}
                            className="input_element_flow_operation"
                            label="Calificación"
                            name={[name, 'rating']}
                            rules={[
                              {
                                required: true,
                                message: 'Ingresa la información',
                              },
                            ]}
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

              <div style={{ marginTop: 30 }}>
                <h3>Información Productos</h3>
              </div>

              <Form.List name="studyFinancialData">
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
                          <OperationalParameterList
                            fieldProps={restField}
                            listId="3"
                            className="input_element_flow_operation"
                            label="Entidad"
                            name={[name, 'entity']}
                            placeHolder="Entidad"
                            requiredMessage="Selecciona una opción!"
                            required
                          />

                          <OperationalParameterList
                            fieldProps={restField}
                            listId="6"
                            className="input_element_flow_operation"
                            label="Producto"
                            name={[name, 'product']}
                            placeHolder="Producto"
                            requiredMessage="Selecciona una opción!"
                            required
                          />

                          <Form.Item
                            {...restField}
                            className="input_element_flow_operation"
                            label="Cupo"
                            name={[name, 'quota']}
                            rules={[
                              {
                                required: true,
                                message: 'Ingresa la información',
                              },
                            ]}
                          >
                            <InputNumber
                              className="w_100"
                              formatter={(value) =>
                                `$ ${value}`.replace(
                                  /\B(?=(\d{3})+(?!\d))/g,
                                  ','
                                )
                              }
                              parser={(value) =>
                                value!.replace(/\$\s?|(,*)/g, '')
                              }
                              onChange={handleChangeTotalQuota}
                            />
                          </Form.Item>

                          <Form.Item
                            {...restField}
                            className="input_element_flow_operation"
                            label="Pago Mensual"
                            name={[name, 'monthlyPayment']}
                            rules={[
                              {
                                required: true,
                                message: 'Ingresa la información',
                              },
                            ]}
                          >
                            <InputNumber
                              className="w_100"
                              formatter={(value) =>
                                `$ ${value}`.replace(
                                  /\B(?=(\d{3})+(?!\d))/g,
                                  ','
                                )
                              }
                              parser={(value) =>
                                value!.replace(/\$\s?|(,*)/g, '')
                              }
                              onChange={handleChangeTotalMonthlyPayment}
                            />
                          </Form.Item>

                          <Form.Item
                            {...restField}
                            className="input_element_flow_operation"
                            label="Mora"
                            name={[name, 'arrears']}
                            rules={[
                              {
                                required: true,
                                message: 'Ingresa la información',
                              },
                            ]}
                          >
                            <InputNumber
                              className="w_100"
                              formatter={(value) =>
                                `$ ${value}`.replace(
                                  /\B(?=(\d{3})+(?!\d))/g,
                                  ','
                                )
                              }
                              parser={(value) =>
                                value!.replace(/\$\s?|(,*)/g, '')
                              }
                              onChange={handleChangeTotalArrears}
                            />
                          </Form.Item>

                          <Form.Item
                            {...restField}
                            className="input_element_flow_operation"
                            label="Saldo actual"
                            name={[name, 'currentBalance']}
                            rules={[
                              {
                                required: true,
                                message: 'Ingresa la información',
                              },
                            ]}
                          >
                            <InputNumber
                              className="w_100"
                              formatter={(value) =>
                                `$ ${value}`.replace(
                                  /\B(?=(\d{3})+(?!\d))/g,
                                  ','
                                )
                              }
                              parser={(value) =>
                                value!.replace(/\$\s?|(,*)/g, '')
                              }
                              onChange={handleChangeTotalCurrentBalance}
                            />
                          </Form.Item>

                          <Form.Item
                            {...restField}
                            className="input_element_flow_operation"
                            label="Calidad"
                            name={[name, 'quality']}
                            rules={[
                              {
                                required: true,
                                message: 'Ingresa la información',
                              },
                            ]}
                          >
                            <Input />
                          </Form.Item>

                          <Form.Item
                            {...restField}
                            className="input_element_flow_operation"
                            label="Comportamiento"
                            name={[name, 'behavior']}
                            rules={[
                              {
                                required: true,
                                message: 'Ingresa la información',
                              },
                            ]}
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

              <div className="section" style={{ alignItems: 'center' }}>
                <span className="total_label_finance">TOTAL GENERAL</span>
                <Form.Item
                  className="input_element_flow_operation"
                  label="Total Cupo"
                  name="totalQuota"
                >
                  <InputNumber
                    className="w_100"
                    formatter={(value) =>
                      `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    }
                    parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
                    disabled
                  />
                </Form.Item>
                <Form.Item
                  className="input_element_flow_operation"
                  label="Total Pago Mensual"
                  name="totalMonthlyPayment"
                >
                  <InputNumber
                    className="w_100"
                    formatter={(value) =>
                      `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    }
                    parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
                    disabled
                  />
                </Form.Item>
                <Form.Item
                  className="input_element_flow_operation"
                  label="Total Mora"
                  name="totalArrears"
                >
                  <InputNumber
                    className="w_100"
                    formatter={(value) =>
                      `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    }
                    parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
                    disabled
                  />
                </Form.Item>
                <Form.Item
                  className="input_element_flow_operation"
                  label="Total Saldo actual"
                  name="totalCurrentBalance"
                >
                  <InputNumber
                    className="w_100"
                    formatter={(value) =>
                      `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    }
                    parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
                    disabled
                  />
                </Form.Item>
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
        </div>
      </div>
    );
}
