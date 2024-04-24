import React, { useEffect, useState } from 'react';
import { Form, Select } from 'antd';
import { getOperationParametersByListId } from '@/api/i+c/Parameters';
import { showError } from '@/components/i+c/ui/Toast';
import { parameterOptionConfig } from '@/utils/i+c/helpers';

type ParameterListProps = {
  listId: string;
  label: string;
  name: string | any[];
  placeHolder: string;
  required?: boolean;
  requiredMessage?: string;
  fieldProps?: any;
  style?: any;
  disabled?: boolean;
  className?: string;
};

export default function OperationalParameterList({
  listId,
  label,
  name,
  placeHolder,
  required = true,
  requiredMessage,
  fieldProps = null,
  style,
  disabled = false,
  className = 'input_element',
}: ParameterListProps) {
  const [finishCall, setFinishCall] = useState(false);
  const [listParameters, setListParameters] = useState([]);

  useEffect(() => {
    if (!finishCall) {
      getOperationParametersByListId(listId)
        .then((res) => {
          if (res) {
            setListParameters(res.data);
            setFinishCall(true);
          }
        })
        .catch((err) => {
          showError(err.response ? err.response.data.error : err);
        });
    }
  }, [finishCall, listId]);

  return (
    <Form.Item
      {...fieldProps}
      className={className}
      label={label}
      name={name}
      rules={[
        {
          required: required,
          message: requiredMessage,
        },
      ]}
      {...style}
    >
      <Select
        showSearch
        optionFilterProp="value"
        fieldNames={parameterOptionConfig}
        className="w_100"
        placeholder={placeHolder}
        options={listParameters}
        disabled={disabled}
      />
    </Form.Item>
  );
}
