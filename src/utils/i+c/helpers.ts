// @ts-nocheck
import dayjs from 'dayjs';
var relativeTime = require('dayjs/plugin/relativeTime');
import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';
import { RcFile } from 'antd/es/upload';

dayjs.extend(relativeTime);

export function getAge(dateString: string): number {
  const today = dayjs();
  const birthDate = dayjs(dateString);
  var age = today.format('YYYY') - birthDate.format('YYYY');
  var m = today.format('M') - birthDate.format('M');
  if (m < 0 || (m === 0 && today < birthDate)) {
    age--;
  }
  return age;
}

export const CustomUploadProps: UploadProps = {
  beforeUpload: (file) => {
    const isValidImage =
      file.type === 'image/png' || file.type === 'image/jpeg';
    if (!isValidImage) {
      message.error(`${file.name} No es una imagen valida (PNG, JPG)`);
    }
    return isValidImage || Upload.LIST_IGNORE;
  },
};

export const parameterOptionConfig = {
  label: 'value',
  value: 'id',
};

export const generateCsvFileTemplates = (csvData: any[]) => {
  return (
    'data:text/csv;charset=utf-8,' +
    csvData.map((row) => row.join(',')).join('\n')
  );
};

export const TableOptions = {
  paginator: true,
  rows: 12,
  rowsPerPageOptions: [12, 25, 50],
  paginatorTemplate:
    'RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
  currentPageReportTemplate: '{first} a {last} de {totalRecords} registros',
  emptyMessage: 'Sin Información',
  stripedRows: true,
};

export const onGlobalFilterChange = (
  filters: any,
  setFilters: Function,
  setGlobalFilterValue: Function,
  e: any
) => {
  const value = e.target.value;
  let _filters = { ...filters };
  _filters['global'].value = value;
  setFilters(_filters);
  setGlobalFilterValue(value);
};

export const beforeUpload = (file: RcFile) => {
  const isValidFile =
    file.type === 'image/png' ||
    file.type === 'image/jpeg' ||
    file.type ===
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    file.type === 'application/pdf';
  if (!isValidFile) {
    message.error('Sólo puede cargar imagenes, PDF o .docx!');
  }
  return isValidFile;
};
