import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = (
  <LoadingOutlined style={{ fontSize: 100, color: '#1132a4' }} spin />
);

export default function SimpleLoading() {
  return (
    <div className="loading_main_box">
      <Spin indicator={antIcon} />
    </div>
  );
}
