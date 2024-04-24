import React, { useEffect, useState } from 'react';
import { Form, Select } from 'antd';
import { getParametersByGroupAndOrderFather } from '@/api/i+c/Parameters';
import { showError } from '@/components/i+c/ui/Toast';
import { parameterOptionConfig } from '@/utils/i+c/helpers';

type ParameterListByChildsProps = {
  groupId: string;
  fatherParameterId: string;
  label: string;
  name: string | any[];
  placeHolder: string;
  requiredMessage: string;
  fieldProps?: any;
  style?: any;
  disabled?: boolean;
};

export default function ParameterListByChilds({
  groupId,
  fatherParameterId,
  label,
  name,
  placeHolder,
  requiredMessage,
  fieldProps = null,
  style,
  disabled = false,
}: ParameterListByChildsProps) {
  const [finishCall, setFinishCall] = useState(false);
  const [listParameters, setListParameters] = useState([]);

  useEffect(() => {
    if (!finishCall) {
      getParametersByGroupAndOrderFather(groupId, fatherParameterId)
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
  }, [finishCall, groupId]);

  return (
    <Form.Item
      {...fieldProps}
      className="input_element"
      label={label}
      name={name}
      rules={[
        {
          required: true,
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
