import React from 'react';
import { Input } from 'antd';
import { onGlobalFilterChange } from '@/utils/i+c/helpers';

export default function HeaderTable({
  globalFilterValue,
  filters,
  setFilters,
  setGlobalFilterValue,
}: {
  globalFilterValue: string;
  filters: any;
  setFilters: Function;
  setGlobalFilterValue: Function;
}) {
  return (
    <div style={{ margin: '10px 0 10px 8px' }}>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <Input
          value={globalFilterValue}
          onChange={(e: any) =>
            onGlobalFilterChange(filters, setFilters, setGlobalFilterValue, e)
          }
          placeholder="Buscar"
        />
      </span>
    </div>
  );
}
