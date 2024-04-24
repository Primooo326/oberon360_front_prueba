import React from 'react';
import dayjs from 'dayjs';
import { Descriptions } from 'antd';
import type { RequestCustomList } from '@/models/i+c/Requests';

export default function RowExpansionTemplate({
  data,
}: {
  data: RequestCustomList;
}) {
  return (
    <div className="request_details">
      <Descriptions bordered style={{ width: '100%' }}>
        <Descriptions.Item label="N° de Solicitud" span={4}>
          {data.id}
        </Descriptions.Item>
        <Descriptions.Item label="Razón Social" span={4}>
          {data.customer.name}
        </Descriptions.Item>
        <Descriptions.Item label="Fecha de creación" span={2}>
          {dayjs(data.creationDate).format('DD/MM/YYYY hh:mm')}
        </Descriptions.Item>
        <Descriptions.Item label="Fecha de radicación" span={2}>
          {data.submitDate
            ? dayjs(data.submitDate).format('DD/MM/YYYY hh:mm')
            : '--'}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
}
