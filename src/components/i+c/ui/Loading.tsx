import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = (
  <LoadingOutlined style={{ fontSize: 100, color: '#1132a4' }} spin />
);

export default function Loading() {
  return (
    <div className="loader_container">
      <div className="loader_box">
        <Spin indicator={antIcon} />
        <span>Cargando...</span>
      </div>
    </div>
  );
}
