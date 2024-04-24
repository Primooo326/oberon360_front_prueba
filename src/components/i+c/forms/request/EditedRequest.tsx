import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input, Select, Space } from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';
import { getCustomers } from '@/api/i+c/Customers';
import { parameterOptionConfig } from '@/utils/i+c/helpers';
import { getParametersByGroup } from '@/api/i+c/Parameters';

export default function EditedRequestForm({
  submitEdit,
  submitLoading,
  handleCancelModal,
  requestData,
}: any) {
  const [finishCallLists, setFinishCallLists] = useState(false);
  const [customerInfo, setCustomerInfo] = useState<any>([]);
  const [customersList, setCustomersList] = useState<any[]>([]);
  const [listParameters, setListParameters] = useState([]);
  const [services, setServices] = useState<any[]>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    if (!finishCallLists) {
      getCustomers()
        .then((res) => {
          if (res) {
            const customer = res.data.find(
              (customer: any) => customer.cliente_ID === requestData.customerId
            );
            setCustomersList(res.data);
            setCustomerInfo(customer);
          }
        })
        .catch((err) => {
          console.error(err);
        });
      getParametersByGroup('1')
        .then((res) => {
          if (res) {
            setListParameters(res.data);
            setFinishCallLists(true);
          }
        })
        .catch((err) => {
          console.error(err.response ? err.response.data.error : err);
        });
    }
  }, [finishCallLists]);

  return (
    <div>
      <Form
        form={form}
        className="form_modal"
        name="formRequestStep1"
        style={{ maxWidth: 600 }}
        onFinish={submitEdit}
        initialValues={{
          customerId: String(requestData.customer.id),
          client: requestData.client,
          costCenterId: '',
          regionId: '',
          billable: requestData.billable,
          remarks: '',
          services: requestData.services,
          candidates: requestData.candidates,
        }}
      >
        <div className="section">
          <Form.Item
            className="operation_input_element w_100"
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
              showSearch
              optionFilterProp="value"
              placeholder="Razón Social"
              value={undefined}
              disabled
            >
              {customersList.map((customer: any) => (
                <Select.Option
                  key={customer.cliente_ID}
                  value={customer.cliente_ID}
                >
                  {customer.cliente_Nombre}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        {false && (
          <div className="section">
            <Form.Item
              className="operation_input_element"
              label="Región"
              name="regionId"
              rules={[
                {
                  required: true,
                  message: 'Ingresa una Región!',
                },
              ]}
            >
              <Input placeholder="Región" />
            </Form.Item>

            <Form.Item
              className="operation_input_element"
              label="Centro de costo"
              name="costCenterId"
              rules={[
                {
                  required: true,
                  message: 'Ingresa un Centro de costo!',
                },
              ]}
            >
              <Input placeholder="Centro de costo" />
            </Form.Item>
          </div>
        )}

        <div>
          <Form.Item
            className="operation_input_element"
            label="Observaciones"
            name="remarks"
            style={{ minWidth: '97%' }}
          >
            <Input.TextArea
              style={{ width: '100%' }}
              placeholder="Observaciones"
            />
          </Form.Item>
        </div>

        <div className="section">
          <Form.Item
            className="operation_input_element"
            label="Facturables"
            name="billable"
            valuePropName="checked"
          >
            <Checkbox>¿Es Facturable?</Checkbox>
          </Form.Item>
        </div>

        <div className="section">
          <Form.Item
            className="operation_input_element w_100"
            label="Servicios"
            name="services"
            rules={[
              {
                required: true,
                message: 'Ingresa los Servicios!',
              },
            ]}
          >
            <Select placeholder="Servicios">
              {services.map((service: any) => (
                <Select.Option key={service.id}>{service.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        <div className="section">
          <Form.List name="candidates">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{ display: 'flex', marginBottom: 8 }}
                    align="baseline"
                  >
                    <Form.Item
                      {...restField}
                      name={[name, 'name']}
                      rules={[{ required: true, message: 'Nombre Completo' }]}
                      className="operation_input_element"
                      style={{ width: '100px' }}
                    >
                      <Input placeholder="Nombre Completo" />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      name={[name, 'identificationType']}
                      className="operation_input_element"
                      rules={[
                        {
                          required: true,
                          message: 'Tipo de identificación',
                        },
                      ]}
                      style={{ width: '100px' }}
                    >
                      <Select
                        showSearch
                        optionFilterProp="value"
                        fieldNames={parameterOptionConfig}
                        className="w_100"
                        placeholder="Tipo de identificación"
                        options={listParameters}
                      />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      name={[name, 'identification']}
                      rules={[
                        { required: true, message: 'N° de identificación' },
                      ]}
                      className="operation_input_element"
                      style={{ width: '100px' }}
                    >
                      <Input placeholder="N° de identificación" />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      name={[name, 'charge']}
                      rules={[{ required: true, message: 'Cargo' }]}
                      className="operation_input_element"
                      style={{ width: '100px' }}
                    >
                      <Input placeholder="Cargo" />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      name={[name, 'email']}
                      rules={[{ required: true, message: 'Correo' }]}
                      className="operation_input_element"
                      style={{ width: '100px' }}
                    >
                      <Input placeholder="Correo" />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      name={[name, 'phone']}
                      rules={[{ required: true, message: 'Telefono' }]}
                      className="operation_input_element"
                      style={{ width: '100px' }}
                    >
                      <Input placeholder="Telefono" />
                    </Form.Item>

                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
              </>
            )}
          </Form.List>
        </div>

        <div className="section align_end">
          <Form.Item>
            <Button
              htmlType="submit"
              className="operation_modal_button ok_button"
              loading={submitLoading}
            >
              GUARDAR
            </Button>
          </Form.Item>

          <Form.Item>
            <Button
              htmlType="button"
              danger
              className="operation_modal_button cancel_button"
              onClick={handleCancelModal}
            >
              CANCELAR
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
}
