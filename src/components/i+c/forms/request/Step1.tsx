import React, { useEffect, useState } from 'react';
import { getCustomerInfo } from '@/api/i+c/Customers';
import { Button, Checkbox, Form, Input, Radio, Select } from 'antd';
import SimpleLoading from '@/components/i+c/ui/SimpleLoading';
import { getCustomerOperationalGroupByUser } from '@/api/i+c/Parameters';
import { useICAuthStore } from '@/states/i+c/I+C-auth.state';

export default function RequestStep1Form({
  form,
  submitRequestStep1,
  submitLoading,
  handleCancelModal,
}: any) {
  const [finishCallCustomerInfo, setFinishCallCustomerInfo] = useState(false);
  const [finishCallCatalogs, setFinishCallCatalogs] = useState(false);
  const [operationalGroup, setOperationalGroup] = useState<any>(null);
  const [defaultParams, setdefaultParams] = useState<any>(null);
  const [customerSelected, setCustomerSelected] = useState(0);
  const [customerInfo, setCustomerInfo] = useState<any>(null);
  const { userInfo } = useICAuthStore()

  useEffect(() => {
    if (!finishCallCatalogs) {
      getCustomerOperationalGroupByUser(String(userInfo!.id))
        .then((res) => {
          if (res) {
            setOperationalGroup(res.data);
            setFinishCallCatalogs(true);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [finishCallCatalogs]);

  useEffect(() => {
    if (!finishCallCustomerInfo && customerSelected > 0) {
      getCustomerInfo(String(customerSelected))
        .then((res) => {
          if (res) {
            setCustomerInfo(res.data);
            const customerDefaultParams = {
              customerInternal: res.data.parameters
                .find((param: any) => param.customerParameterTypeId === 3)
                .values.find((value: any) => value.isDefault === true)!.id,
              regional: res.data.parameters
                .find((param: any) => param.customerParameterTypeId === 1)
                .values.find((value: any) => value.isDefault === true)!.id,
              costCenterId: res.data.parameters
                .find((param: any) => param.customerParameterTypeId === 2)
                .values.find((value: any) => value.isDefault === true)!.id,
            };
            setdefaultParams(customerDefaultParams);
            setFinishCallCustomerInfo(true);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [finishCallCustomerInfo, customerSelected]);

  const submitForm = (values: any) => {
    const data = {
      ...values,
      customerInternal: values.customerInternal
        ? values.customerInternal
        : defaultParams.customerInternal,
      regional: values.regional ? values.regional : defaultParams.regional,
      costCenterId: values.costCenterId
        ? values.costCenterId
        : defaultParams.costCenterId,
    };
    submitRequestStep1(data);
  };

  const cancelForm = () => {
    setCustomerSelected(0);
    setCustomerInfo(null);
    handleCancelModal();
  };

  if (!finishCallCustomerInfo && !finishCallCatalogs) {
    return <SimpleLoading />;
  }
  return (
    <div>
      <Form
        form={form}
        className="form_modal"
        name="formRequestStep1"
        style={{ maxWidth: 600 }}
        onFinish={submitForm}
        initialValues={{
          billable: true,
          remarks: '',
        }}
      >
        <div className="section">
          <Form.Item
            className="operation_input_element"
            label="Razón Social"
            name="customerId"
            rules={[
              {
                required: true,
                message: 'Selecciona un Razón Social!',
              },
            ]}
          >
            <Select
              placeholder="Selecciona una opción"
              onChange={(e: any) => {
                setCustomerSelected(e);
                form.setFieldValue('customerId', e);
                form.setFieldValue('costCenterId', '');
                form.setFieldValue('regional', '');
                form.setFieldValue('customerInternal', '');
                setFinishCallCustomerInfo(false);
              }}
            >
              {operationalGroup &&
                operationalGroup!.customers.map(
                  (customer: any, index: number) => (
                    <Select.Option key={index} value={customer.id}>
                      {customer.name}
                    </Select.Option>
                  )
                )}
            </Select>
          </Form.Item>

          {customerInfo &&
            customerInfo.parameters.find(
              (param: any) => param.customerParameterTypeId === 3
            ).values.length > 1 && (
              <Form.Item
                className="operation_input_element"
                label="cliente"
                name="customerInternal"
                rules={[
                  {
                    required: true,
                    message: 'Ingresa un cliente!',
                  },
                ]}
              >
                <Select
                  placeholder="Selecciona un Cliente"
                  loading={!finishCallCustomerInfo}
                  disabled={!finishCallCustomerInfo}
                >
                  {customerInfo.parameters
                    .find((param: any) => param.customerParameterTypeId === 3)
                    .values.map((item: any) => (
                      <Select.Option key={item.id} value={item.id}>
                        {item.name}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
            )}
        </div>

        <div className="section">
          {customerInfo &&
            customerInfo.parameters.find(
              (param: any) => param.customerParameterTypeId === 1
            ).values.length > 1 && (
              <Form.Item
                className="operation_input_element"
                label="Región"
                name="regional"
                rules={[
                  {
                    required: true,
                    message: 'Ingresa una Región!',
                  },
                ]}
              >
                <Select
                  placeholder="Selecciona una Región"
                  loading={!finishCallCustomerInfo}
                  disabled={!finishCallCustomerInfo}
                >
                  {customerInfo.parameters
                    .find((param: any) => param.customerParameterTypeId === 1)
                    .values.map((item: any) => (
                      <Select.Option key={item.id} value={item.id}>
                        {item.name}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
            )}

          {customerInfo &&
            customerInfo.parameters.find(
              (param: any) => param.customerParameterTypeId === 2
            ).values.length > 1 && (
              <Form.Item
                className="operation_input_element"
                label="Centro de costo"
                name="costCenterId"
                rules={[
                  {
                    required: false,
                    message: 'Ingresa un Centro de costo!',
                  },
                ]}
              >
                <Select
                  placeholder="Selecciona un Centro de Costo"
                  loading={!finishCallCustomerInfo}
                  disabled={!finishCallCustomerInfo}
                >
                  {customerInfo.parameters
                    .find((param: any) => param.customerParameterTypeId === 2)
                    .values.map((item: any) => (
                      <Select.Option key={item.id} value={item.id}>
                        {item.name}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
            )}
        </div>

        <div>
          {/* <Form.Item
            className="operation_input_element"
            label="Observaciones"
            name="remarks"
            style={{ minWidth: '97%' }}
          >
            <Input.TextArea
              style={{ width: '100%' }}
              placeholder="Observaciones"
            />
          </Form.Item> */}
        </div>

        <div className="section">
          {/* <Form.Item
            className="operation_input_element"
            label="Facturables"
            name="billable"
            valuePropName="checked"
          >
            <Checkbox>¿Es Facturable?</Checkbox>
          </Form.Item> */}

          <Form.Item
            className="operation_input_element"
            label="Tipo de Solicitud"
            name="requestType"
            rules={[
              {
                required: true,
                message: 'Selecciona una opción!',
              },
            ]}
          >
            <Radio.Group>
              <Radio value={1}>REGISTRO INDIVIDUAL</Radio>
              <Radio value={2}>CARGUE MASIVO</Radio>
            </Radio.Group>
          </Form.Item>
        </div>

        <div className="section align_end">
          <Form.Item>
            <Button
              htmlType="submit"
              className="operation_modal_button ok_button"
              loading={submitLoading}
            >
              SIGUIENTE
            </Button>
          </Form.Item>

          <Form.Item>
            <Button
              htmlType="button"
              danger
              className="operation_modal_button cancel_button"
              onClick={cancelForm}
            >
              CANCELAR
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
}
