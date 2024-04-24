import React from 'react';
import { Button, Form, Input, Select, Upload } from 'antd';
import { beforeUpload } from '@/utils/i+c/helpers';
import { ConceptEnums, ConceptEnumsLabels } from '@/models/i+c/ConceptsEnum';
import { showSuccess } from '../ui/Toast';
import type { SimpleStudyProps } from '@/models/i+c/props/StepsProps';

const { TextArea } = Input;

export default function StudyFlowIntegrityTest({ studyId }: SimpleStudyProps) {
  const [form] = Form.useForm();

  const submitFlow = () => {
    showSuccess('Proceso finalizado');
  };

  return (
    <div className="flow_section_container">
      <div className="flow_title_container">
        <div className="flow_title_box">
          <h3>Prueba de integridad</h3>
        </div>
      </div>

      <div className="flow_content">
        <div className="form_container">
          <Form
            form={form}
            className="form_box"
            name="basic"
            style={{ width: '100%' }}
            onFinish={submitFlow}
          >
            <div className="section w_100">
              <Form.Item
                className="input_element_flow_operation w_100"
                label="Análisis"
                name="analysis"
                rules={[
                  {
                    required: true,
                    message: 'Ingresa un análisis!',
                  },
                ]}
              >
                <TextArea rows={10} />
              </Form.Item>
            </div>

            <div className="section">
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
                name="obervations"
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
