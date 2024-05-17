import React, { useEffect, useState } from 'react';
import { MinusCircleOutlined, UploadOutlined } from '@ant-design/icons';
import {
  Button,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Space,
  Upload,
  message,
} from 'antd';
import type { RcFile } from 'antd/es/upload/interface';
import { getCustomerInfo } from '@/api/i+c/Customers';
import { parameterOptionConfig } from '@/utils/i+c/helpers';
import { getParametersByGroup } from '@/api/i+c/Parameters';
import SimpleLoading from '@/components/i+c/ui/SimpleLoading';

export default function RequestStep2Form({
  requestData,
  submitRequestStep2,
  submitLoading,
  handleCancelModal,
}: any) {
  const [finishCallLists, setFinishCallLists] = useState(false);
  const [serviceType, setServiceType] = useState(0);
  const [customerInfo, setCustomerInfo] = useState<any>([]);
  const [services, setServices] = useState<any[]>([]);
  const [finishCall, setFinishCall] = useState(false);
  const [saveType, setSaveType] = useState('false');
  const [listParameters, setListParameters] = useState<any[]>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    if (!finishCall) {
      getParametersByGroup('1')
        .then((res) => {
          if (res) {
            setListParameters(res.data);
            setFinishCall(true);
          }
        })
        .catch((err) => {
          console.error(err.response ? err.response.data.error : err);
        });
    }
  }, [finishCall]);

  useEffect(() => {
    if (!finishCallLists) {
      getCustomerInfo(requestData.customerId)
        .then((res) => {
          if (res) {
            setCustomerInfo(res.data);
            setFinishCallLists(true);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [finishCallLists, requestData]);

  const handleChangeServiceType = () => {
    const services: any[] = [];
    form.setFieldValue('services', []);
    setServiceType(2);
    customerInfo.paquetes.map((paquete: any) => {
      services.push({
        id: paquete.paquete_ID,
        name: paquete.paquete_Nombre,
        value: paquete.paquete_Nombre,
      });
    });
    console.log(customerInfo);
    console.log(services);
    setServices(services);
    form.setFieldValue('requestServiceType', 2);
  };

  const handleChangeCandidatesNumber = (event: any) => {
    handleChangeServiceType()
    const value = Number(event);
    const currentCandidates = form.getFieldValue('candidates');
    const currentItemCount = currentCandidates.length;
    let newCandidates = [];
    if (value > currentItemCount) {
      const itemsToAdd = value - currentItemCount;
      newCandidates = [...currentCandidates];
      for (let index = 0; index < itemsToAdd; index++) {
        newCandidates.push({
          name: '',
          email: '',
          username: '',
          charge: '',
          phone: '',
        });
      }
    } else if (value < currentItemCount) {
      newCandidates = currentCandidates.slice(0, value);
    }
    form.setFieldValue('candidates', newCandidates);
  };

  const onRemoveItem = (index: number, onFunction: (i: any) => void) => {
    onFunction(index);
    const currentCandidates = form.getFieldValue('candidatesNumber');
    form.setFieldValue('candidatesNumber', currentCandidates - 1);
  };

  const finishRequest = (values: any) => {
    submitRequestStep2({ ...values, saveType });
  };

  const beforeUpload = (file: RcFile) => {
    const isXlsx =
      file.type ===
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      file.type === 'application/vnd.ms-excel' ||
      file.type === 'application/excel' ||
      file.type === 'application/x-msexcel';
    if (!isXlsx) {
      message.error('Sólo se admiten archivos .xlsx!');
    }
    return isXlsx;
  };

  if (!finishCallLists) {
    return <SimpleLoading />;
  }
  return (
    <div>
      <Form
        form={form}
        className="form_modal"
        name="formRequestStep2"
        style={{ maxWidth: 700 }}
        onFinish={finishRequest}
        initialValues={{
          candidatesNumber: '',
          services: [],
          candidates: [],
        }}
      >
        {/* <div className="section">
            <Form.Item
              label="Tipo de solicitud"
              className="operation_input_element w_100"
              name="requestServiceType"
              rules={[
                {
                  required: true,
                  message: 'Selecciona una opción',
                },
              ]}
            >
              <Radio.Group onChange={handleChangeServiceType}>
                <Radio value={1}>SERVICIOS INDIVIDUALES</Radio>
                <Radio value={2}>PAQUETE DE SERVICIOS</Radio>
              </Radio.Group>
            </Form.Item>
          </div> */}

        <div className="section">

          {requestData.requestType === 1 ? (
            <Form.Item
              className="operation_input_element"
              label="No. de candidatos"
              name="candidatesNumber"
              rules={[
                {
                  required: true,
                  message: 'Ingresa un No de candidatos!',
                },
              ]}
            >
              <InputNumber
                style={{ width: '100% ' }}
                placeholder="No de candidatos (max 10)."
                onChange={handleChangeCandidatesNumber}
                min={0}
                max={10}
              />
            </Form.Item>
          ) : (
            <Form.Item
              className="operation_input_element"
              label="Plantilla"
              name="candidatesTemplate"
              rules={[
                {
                  required: true,
                  message: 'Adjunta la plantilla!',
                },
              ]}
            >
              <Upload
                beforeUpload={beforeUpload}
                action={`${process.env.NEXT_PUBLIC_API_URL}/multer/process`}
                method="POST"
              >
                <Button icon={<UploadOutlined />}>Adjuntar Plantilla</Button>
              </Upload>
            </Form.Item>
          )}
        </div>

        {requestData.requestType === 1 && (
          <div style={{ marginTop: 20 }}>
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
                        rules={[
                          { required: true, message: 'Nombre Completo' },
                        ]}
                        className="operation_input_element"
                      // style={{ width: '100px' }}
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

                      <Form.Item
                        {...restField}
                        name={[name, 'service']}
                        className="operation_input_element"

                        rules={[
                          {
                            required: true,
                            message: 'Servicio',
                          },
                        ]}
                      >
                        <Select
                          mode='multiple'
                          showSearch
                          optionFilterProp="value"
                          fieldNames={parameterOptionConfig}
                          className="w_100"
                          placeholder="Servicio"
                          options={services}
                        />
                      </Form.Item>


                      <MinusCircleOutlined
                        onClick={() => onRemoveItem(name, remove)}
                      />
                    </Space>
                  ))}
                </>
              )}
            </Form.List>
          </div>
        )}

        <div className="section align_end">
          <Form.Item>
            <Button
              onClick={() => setSaveType('save')}
              htmlType="submit"
              className="operation_modal_button ok_button"
              loading={submitLoading && saveType === 'save'}
            >
              GUARDAR
            </Button>
          </Form.Item>

          <Form.Item>
            <Button
              onClick={() => setSaveType('saveAndSubmit')}
              htmlType="submit"
              className="operation_modal_button ok_button"
              loading={submitLoading && saveType === 'saveAndSubmit'}
            >
              GUARDAR Y RADICAR
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
