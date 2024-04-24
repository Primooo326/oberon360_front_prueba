import React from 'react';
import { Form, Radio } from 'antd';

type YesOrNotProps = {
  label: string;
  name: string;
  requiredMessage: string;
  disabled?: boolean;
};

export default function YesOrNot({
  label,
  name,
  requiredMessage,
  disabled = false,
}: YesOrNotProps) {
  return (
    <Form.Item
      className="input_element"
      label={label}
      name={name}
      rules={[
        {
          required: true,
          message: requiredMessage,
        },
      ]}
    >
      <Radio.Group disabled={disabled}>
        <Radio value={true}>Sí</Radio>
        <Radio value={false}>No</Radio>
      </Radio.Group>
    </Form.Item>
  );
}
