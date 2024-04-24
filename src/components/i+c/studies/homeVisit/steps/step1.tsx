import React, { useEffect, useState } from 'react';
import { DatePicker, Form, Input } from 'antd';
import dayjs from 'dayjs';
import { FilePdfOutlined } from '@ant-design/icons';
import type { StudiesProps } from '@/models/i+c/props/StepsProps';
import SimpleLoading from '@/components/i+c/ui/SimpleLoading';
import { getCandidateBasicData, getCandidateFiles } from '@/api/i+c/Studies';
import { FileTypes } from '@/models/i+c/FileTypes';

export default function StudyHomeVisitStep1({
  candidateId,
}: StudiesProps) {
  const [candidateFiles, setCandidateFiles] = useState<any>(null);
  const [candidateInfo, setCandidateInfo] = useState<any>(null);
  const [finishRetrieveData, setfinishRetrieveData] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (!finishRetrieveData) {
      getCandidateFiles(candidateId)
        .then((res) => {
          if (res) {
            setCandidateFiles(res.data);
          }
        })
        .catch((err) => {
          console.error(err);
        });
      getCandidateBasicData(candidateId)
        .then((res) => {
          if (res) {
            setCandidateInfo(res.data);
            setfinishRetrieveData(true);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [finishRetrieveData]);

  if (!finishRetrieveData) {
    return <SimpleLoading />;
  }
    return (
      <div className="form_container">
        <Form
          form={form}
          className="form_box"
          name="basic"
          style={{ width: '100%' }}
          initialValues={{
            firstLastName: candidateInfo!.firstLastName,
            middleLastName: candidateInfo!.middleLastName,
            firstName: candidateInfo!.firstName,
            middleName: candidateInfo!.middleName,
            documentType: candidateInfo!.documentType,
            identificationNumber: candidateInfo!.identificationNumber,
            documentIssueDate: dayjs(
              candidateInfo!.documentIssueDate,
              'YYYY/MM/DD'
            ),
            documentIssuePlace: candidateInfo!.documentIssuePlace,
            birthDate: dayjs(candidateInfo!.birthDate, 'YYYY/MM/DD'),
            age: candidateInfo!.age,
            birthCountry: candidateInfo!.birthCountry,
            birthDepartment: candidateInfo!.birthDepartment,
            birthTown: candidateInfo!.birthTown,
            cityResidence: candidateInfo!.cityResidence,
            residenceAddress: candidateInfo!.residenceAddress,
            district: candidateInfo!.district,
            phone:
              candidateInfo.phone !== 'undefined' ? candidateInfo!.phone : '',
            cellPhone: candidateInfo!.cellPhone,
            maritalStatus: candidateInfo!.maritalStatus,
            childrenNumber: candidateInfo!.childrenNumber,
            RH: candidateInfo!.RH,
            height: candidateInfo!.height,
            bodyMarkings: candidateInfo!.bodyMarkings,
            locationBodyMarkings: candidateInfo!.locationBodyMarkings,
            typeOfPassbook:
              candidateInfo.typeOfPassbook !== 'undefined'
                ? candidateInfo!.typeOfPassbook
                : '',
            militaryDistrict:
              candidateInfo.militaryDistrict !== 'undefined'
                ? candidateInfo!.militaryDistrict
                : '',
            militaryPassbookNumber:
              candidateInfo.militaryPassbookNumber !== 'undefined'
                ? candidateInfo!.militaryPassbookNumber
                : '',
          }}
        >
          <div className="section">
            <Form.Item
              className="input_element_flow_operation"
              label="Primer Apellido"
              name="firstLastName"
            >
              <Input className="w_100" disabled />
            </Form.Item>

            <Form.Item
              className="input_element_flow_operation"
              label="Segundo Apellido"
              name="middleLastName"
            >
              <Input className="w_100" disabled />
            </Form.Item>

            <Form.Item
              className="input_element_flow_operation"
              label="Primer Nombre"
              name="firstName"
            >
              <Input className="w_100" disabled />
            </Form.Item>

            <Form.Item
              className="input_element_flow_operation"
              label="Segundo Nombre"
              name="middleName"
            >
              <Input className="w_100" disabled />
            </Form.Item>

            <Form.Item
              className="input_element_flow_operation"
              label="Tipo de Documento"
              name="documentType"
            >
              <Input className="w_100" disabled />
            </Form.Item>

            <Form.Item
              className="input_element_flow_operation"
              label="No. de Identificación"
              name="identificationNumber"
            >
              <Input className="w_100" disabled />
            </Form.Item>
          </div>

          <div className="section">
            <Form.Item
              className="input_element_flow_operation"
              label="Fecha de expedición"
              name="documentIssueDate"
            >
              <DatePicker
                format="YYYY/MM/DD"
                className="w_100"
                placeholder="Fecha de Expedición"
                disabled
              />
            </Form.Item>

            <Form.Item
              className="input_element_flow_operation"
              label="Lugar de Expedición"
              name="documentIssuePlace"
            >
              <Input className="w_100" disabled />
            </Form.Item>

            <Form.Item
              className="input_element_flow_operation"
              label="Fecha de Nacimiento"
              name="birthDate"
            >
              <DatePicker
                format="YYYY/MM/DD"
                className="w_100"
                placeholder="Fecha de Nacimiento"
                disabled
              />
            </Form.Item>

            <Form.Item
              className="input_element_flow_operation"
              label="Edad"
              name="age"
            >
              <Input className="w_100" disabled />
            </Form.Item>

            <Form.Item
              className="input_element_flow_operation"
              label="País de Nacimiento"
              name="birthCountry"
            >
              <Input className="w_100" disabled />
            </Form.Item>

            <Form.Item
              className="input_element_flow_operation"
              label="Departamento de Nacimiento"
              name="birthDepartment"
            >
              <Input className="w_100" disabled />
            </Form.Item>
          </div>

          <div className="section">
            <Form.Item
              className="input_element_flow_operation"
              label="Municipio de Nacimiento"
              name="birthTown"
            >
              <Input className="w_100" disabled />
            </Form.Item>

            <Form.Item
              className="input_element_flow_operation"
              label="Ciudad de Residencia"
              name="cityResidence"
            >
              <Input className="w_100" disabled />
            </Form.Item>

            <Form.Item
              className="input_element_flow_operation"
              label="Dirección de Residencia"
              name="residenceAddress"
            >
              <Input className="w_100" disabled />
            </Form.Item>

            <Form.Item
              className="input_element_flow_operation"
              label="Barrio"
              name="district"
            >
              <Input className="w_100" disabled />
            </Form.Item>

            <Form.Item
              className="input_element_flow_operation"
              label="Telefono Fijo"
              name="phone"
            >
              <Input className="w_100" disabled />
            </Form.Item>

            <Form.Item
              className="input_element_flow_operation"
              label="Telefono Celular"
              name="cellPhone"
            >
              <Input className="w_100" disabled />
            </Form.Item>
          </div>

          <div className="section">
            <Form.Item
              className="input_element_flow_operation"
              label="Estado Civil"
              name="maritalStatus"
            >
              <Input className="w_100" disabled />
            </Form.Item>

            <Form.Item
              className="input_element_flow_operation"
              label="No. de Hijos"
              name="childrenNumber"
            >
              <Input className="w_100" disabled />
            </Form.Item>

            <Form.Item
              className="input_element_flow_operation"
              label="RH"
              name="RH"
            >
              <Input className="w_100" disabled />
            </Form.Item>

            <Form.Item
              className="input_element_flow_operation"
              label="Estatura(cm)"
              name="height"
            >
              <Input className="w_100" disabled />
            </Form.Item>

            <Form.Item
              className="input_element_flow_operation"
              label="Marcas Corporales"
              name="bodyMarkings"
            >
              <Input className="w_100" disabled />
            </Form.Item>

            <Form.Item
              className="input_element_flow_operation"
              label="Ubicación Marcas Corporales"
              name="locationBodyMarkings"
            >
              <Input className="w_100" disabled />
            </Form.Item>
          </div>

          <div className="section">
            <Form.Item
              className="input_element_flow_operation"
              label="Clase de libreta"
              name="typeOfPassbook"
            >
              <Input className="w_100" disabled />
            </Form.Item>

            <Form.Item
              className="input_element_flow_operation"
              label="Distrito Militar"
              name="militaryDistrict"
            >
              <Input className="w_100" disabled />
            </Form.Item>

            <Form.Item
              className="input_element_flow_operation"
              label="Libreta Militar"
              name="militaryPassbookNumber"
            >
              <Input className="w_100" disabled />
            </Form.Item>
          </div>

          <div className="row_documents">
            <h3>DOCUMENTOS CARGADOS</h3>

            <div>
              {candidateFiles
                  ?.filter(
                    (file: any) =>
                      file.fileType === FileTypes.CANDIDATE_CV_FILE ||
                      file.fileType === FileTypes.CANDIDATE_DOCUMENT_FILE ||
                      file.fileType === FileTypes.CANDIDATE_MILITARY_BOOK_FILE
                  )
                  .map((file: any, index: number) => (
                    <div key={index}>
                      <a
                        href={`${process.env.NEXT_PUBLIC_API_URL}/files/getFile/${file.fileMongoPath}`}
                        target="_blank"
                        className="doc_link" rel="noreferrer"
                      >
                        <FilePdfOutlined />{' '}
                        {`${file.fileType === FileTypes.CANDIDATE_CV_FILE
                          ? 'Hoja de vida'
                          : file.fileType ===
                            FileTypes.CANDIDATE_DOCUMENT_FILE
                            ? 'Documento de identidad'
                            : 'Documento Libreta Militar'
                          }`}
                      </a>
                    </div>
                  ))}
            </div>
          </div>
        </Form>
      </div>
    );
}
