import React, { useEffect, useState } from 'react';
import {
  Form,
  Input,
  InputNumber,
  Button,
  Select,
  DatePicker,
  Upload,
} from 'antd';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import BreadcrumbComponent from '@/components/i+c/ui/Breadcrumb';
import CandidatesLayoutComponent from '@/components/i+c/layout/Candidates';
import ParameterList from '@/components/i+c/common/ParameterList';
import YesOrNot from '@/components/i+c/common/YesOrNot';
import { showError, showSuccess } from '@/components/i+c/ui/Toast';
import { optionConfig } from '@/data/constants';
import { listBasicNumbers } from '@/data/lists';

import { getCandidateFiles, loadBasicData } from '@/api/i+c/Candidates';
import {
  getCitiesByCountry,
  getCountries,
  getDepartmentsByCountry,
  getDistrictsByMunicipality,
  getMunicipalitiesByDepartment,
} from '@/api/i+c/Parameters';
import type { CandidatesStep1FieldType } from '@/models/i+c/FormTypes';
import { beforeUpload, getAge } from '@/utils/i+c/helpers';
import HelmetTitle from '@/components/i+c/ui/HelmetTitle';
import type { RcFile } from 'antd/es/upload';
import { FileTypes } from '@/models/i+c/FileTypes';
import type { UploadFile } from 'antd/lib';
import Loading from '@/components/i+c/ui/Loading';
import { useICAuthStore } from '@/states/i+c/I+C-auth.state';
import { useICCandidatesStore } from '@/states/i+c/I+C-candidates.state';

export default function CandidatesInformationStep1() {
  const [countries, setCountries] = useState([]);
  const [listFiles, setListFiles] = useState<any[]>([]);
  const [departments, setDepartments] = useState([]);
  const [municipalities, setMunicipalities] = useState([]);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [callLists, setCallLists] = useState(false);
  const { finishProcess, basicData, saveBasicData } = useICCandidatesStore()
  const [loadingSave, setloadingSave] = useState(false);
  const { userInfo } = useICAuthStore();
  const [form] = Form.useForm();
  const router = useRouter();

  useEffect(() => {
    if (!callLists) {
      getCandidateFiles()
        .then((res) => {
          if (res) {
            setListFiles(res.data);
          }
        })
        .catch((err) => {
          console.error(err);
        });
      getCountries()
        .then((res) => {
          if (res) {
            setCountries(res.data);
          }
        })
        .catch((err) => {
          console.error(err);
        });
      if (basicData?.birthTown) {
        onChangeMunicipality(String(basicData.birthTown));
      }
      if (basicData?.birthDepartment) {
        onChangeDepartment(String(basicData.birthDepartment));
      }
      if (basicData?.birthCountry) {
        onChangeCountry(String(basicData.birthCountry));
        onChangeCities(String(basicData.birthCountry));
      }
      setCallLists(true);
    }
  }, [callLists, basicData]);

  function onFinish(values: any) {
    setloadingSave(true);
    const formData = new FormData();
    formData.append('firstLastName', basicData.firstLastName);
    basicData.middleLastName &&
      formData.append('middleLastName', basicData.middleLastName);
    formData.append('firstName', basicData.firstName);
    basicData.middleName && formData.append('middleName', basicData.middleName);
    formData.append('documentType', String(basicData.documentType));
    formData.append('identificationNumber', userInfo!.username);
    formData.append(
      'documentIssueDate',
      new Date(basicData.documentIssueDate).toISOString()
    );
    formData.append('documentIssuePlace', String(basicData.documentIssuePlace));
    formData.append('birthDate', new Date(basicData.birthDate).toISOString());
    formData.append('age', String(basicData.age));
    formData.append('birthCountry', String(basicData.birthCountry));
    formData.append('birthDepartment', String(basicData.birthDepartment));
    formData.append('birthTown', String(basicData.birthTown));
    formData.append('residenceAddress', basicData.residenceAddress);
    formData.append('cityResidence', String(basicData.cityResidence));
    formData.append('district', String(basicData.district));
    formData.append(
      'hasMilitaryPassbook',
      String(basicData.hasMilitaryPassbook)
    );
    basicData.militaryPassbookNumber &&
      formData.append(
        'militaryPassbookNumber',
        String(basicData.militaryPassbookNumber)
      );
    basicData.typeOfPassbook &&
      formData.append('typeOfPassbook', String(basicData.typeOfPassbook));
    basicData.militaryDistrict &&
      formData.append('militaryDistrict', basicData.militaryDistrict);
    basicData.phone && formData.append('phone', basicData.phone);
    formData.append('cellPhone', basicData.cellPhone);
    formData.append('maritalStatus', String(basicData.maritalStatus));
    formData.append('childrenNumber', String(basicData.childrenNumber));
    formData.append('bodyMarkings', String(basicData.bodyMarkings));
    basicData.otherBodyMarkings &&
      formData.append('otherBodyMarkings', basicData.otherBodyMarkings);
    basicData.locationBodyMarkings &&
      formData.append('locationBodyMarkings', basicData.locationBodyMarkings);
    formData.append('RH', String(basicData.RH));
    formData.append('height', basicData.height);
    formData.append(
      'financiallyDependentPersons',
      String(basicData.financiallyDependentPersons)
    );
    !listFiles.find(
      (file: any) => file.fileType === FileTypes.CANDIDATE_CV_FILE
    ) &&
      formData.append(
        'file',
        values.cvFile.fileList[0].originFileObj as RcFile,
        `${FileTypes.CANDIDATE_CV_FILE}###${values.cvFile.fileList[0].originFileObj.name}`
      );
    !listFiles.find(
      (file: any) => file.fileType === FileTypes.CANDIDATE_DOCUMENT_FILE
    ) &&
      formData.append(
        'file',
        values.documentFile.fileList[0].originFileObj as RcFile,
        `${FileTypes.CANDIDATE_DOCUMENT_FILE}###${values.documentFile.fileList[0].originFileObj.name}`
      );
    !listFiles.find(
      (file: any) => file.fileType === FileTypes.CANDIDATE_MILITARY_BOOK_FILE
    ) &&
      values.militaryBookFile &&
      formData.append(
        'file',
        values.militaryBookFile.fileList[0].originFileObj as RcFile,
        `${FileTypes.CANDIDATE_MILITARY_BOOK_FILE}###${values.militaryBookFile.fileList[0].originFileObj.name}`
      );
    loadBasicData(formData)
      .then((res) => {
        if (res) {
          showSuccess(res.data);
          router.push('/I+C/dashboard/candidates/information/step2');
          setloadingSave(false);
        }
      })
      .catch(() => {
        setloadingSave(false);
        showError('Error al cargar la información');
      });
  }

  function onChangeCountry(value: string) {
    getDepartmentsByCountry(value)
      .then((res) => {
        if (res) {
          setDepartments(res.data);
        }
      })
      .catch((err) => {
        showError(err.response ? err.response.data.error : err);
      });
  }

  function onChangeDepartment(value: string) {
    getMunicipalitiesByDepartment(value)
      .then((res) => {
        if (res) {
          setMunicipalities(res.data);
        }
      })
      .catch((err) => {
        showError(err.response ? err.response.data.error : err);
      });
  }

  function onChangeMunicipality(value: string) {
    getDistrictsByMunicipality(value)
      .then((res) => {
        if (res) {
          setDistricts(res.data);
        }
      })
      .catch((err) => {
        showError(err.response ? err.response.data.error : err);
      });
  }

  function onChangeCities(value: string) {
    getCitiesByCountry(value)
      .then((res) => {
        if (res) {
          setCities(res.data);
        }
      })
      .catch((err) => {
        showError(err.response ? err.response.data.error : err);
      });
  }

  function caldulatedAge(birthDate: string) {
    return getAge(birthDate);
  }

  function changeData(event: any) {
    let value: any = Object.values(event)[0];
    const key = Object.keys(event)[0];
    const mapBasicData: CandidatesStep1FieldType = { ...basicData };
    if (key === 'birthCountry') {
      onChangeCountry(value);
      onChangeCities(value);
    }
    if (key === 'birthDepartment') onChangeDepartment(value);
    if (key === 'birthTown') onChangeMunicipality(value);
    if (key === 'documentIssueDate') value = dayjs(value).format('YYYY/MM/DD');
    if (key === 'birthDate') {
      const age = caldulatedAge(value);
      value = dayjs(value).format('YYYY/MM/DD');
      form.setFieldValue('age', age);
      mapBasicData.age = age;
    }
    if (
      key !== 'cvFile' &&
      key !== 'documentFile' &&
      key !== 'militaryBookFile'
    ) {
      mapBasicData[key] = value;
    }
    saveBasicData(mapBasicData)
  }

  const defaultFiles = (name: string, fileType: FileTypes) => {
    const files = listFiles
      .map((file: any, index: number) => {
        return file.fileType === fileType
          ? {
            uid: `${index}`,
            name,
            status: 'done',
            url: `${process.env.NEXT_PUBLIC_API_URL}/files/getFile/${file.fileMongoPath}`,
          }
          : null;
      })
      .filter((item) => item !== null) as UploadFile[];
    return files;
  };

  if (!callLists && basicData) {
    return <Loading />;
  }
  return (
    <CandidatesLayoutComponent>
      <HelmetTitle title="Datos Básicos" />

      <section>
        <div className="step">
          <h1>DATOS BÁSICOS DEL CANDIDATO</h1>

          <BreadcrumbComponent />

          <div className="form_container">
            <Form
              form={form}
              onValuesChange={(_) => {
                changeData(_);
              }}
              className="form_box"
              name="basic"
              style={{ maxWidth: 600 }}
              initialValues={{
                firstLastName:
                  basicData?.firstLastName
                    ? basicData.firstLastName
                    : '',
                middleLastName:
                  basicData?.middleLastName
                    ? basicData.middleLastName
                    : '',
                firstName:
                  basicData?.firstName ? basicData.firstName : '',
                middleName:
                  basicData?.middleName
                    ? basicData.middleName
                    : '',
                documentType:
                  basicData?.documentType
                    ? basicData.documentType
                    : '',
                identificationNumber: userInfo!.username,
                documentIssueDate:
                  basicData?.documentIssueDate
                    ? dayjs(basicData.documentIssueDate, 'YYYY/MM/DD')
                    : '',
                documentIssuePlace:
                  basicData?.documentIssuePlace
                    ? basicData.documentIssuePlace
                    : '',
                birthDate:
                  basicData?.birthDate
                    ? dayjs(basicData.birthDate, 'YYYY/MM/DD')
                    : '',
                age: basicData?.age ? basicData.age : 0,
                birthCountry:
                  basicData?.birthCountry
                    ? basicData.birthCountry
                    : '',
                birthDepartment:
                  basicData?.birthDepartment
                    ? basicData.birthDepartment
                    : '',
                birthTown:
                  basicData?.birthTown ? basicData.birthTown : '',
                residenceAddress:
                  basicData?.residenceAddress
                    ? basicData.residenceAddress
                    : '',
                cityResidence:
                  basicData?.cityResidence
                    ? basicData.cityResidence
                    : '',
                district:
                  basicData?.district ? basicData.district : '',
                hasMilitaryPassbook:
                  basicData?.hasMilitaryPassbook
                    ? basicData.hasMilitaryPassbook
                    : false,
                militaryPassbookNumber:
                  basicData &&
                    basicData.militaryPassbookNumber !== 'undefined'
                    ? basicData.militaryPassbookNumber
                    : '',
                typeOfPassbook:
                  basicData && basicData.typeOfPassbook !== 'undefined'
                    ? basicData.typeOfPassbook
                    : 0,
                militaryDistrict:
                  basicData && basicData.militaryDistrict !== 'undefined'
                    ? basicData.militaryDistrict
                    : '',
                phone:
                  basicData && basicData.phone !== 'undefined'
                    ? basicData.phone
                    : 0,
                cellPhone:
                  basicData?.cellPhone ? basicData.cellPhone : '',
                maritalStatus:
                  basicData?.maritalStatus
                    ? basicData.maritalStatus
                    : '',
                childrenNumber:
                  basicData && typeof basicData.childrenNumber === 'number'
                    ? basicData.childrenNumber
                    : '',
                bodyMarkings:
                  basicData?.bodyMarkings
                    ? basicData.bodyMarkings
                    : '',
                otherBodyMarkings:
                  basicData?.otherBodyMarkings
                    ? basicData.otherBodyMarkings
                    : '',
                locationBodyMarkings:
                  basicData?.locationBodyMarkings
                    ? basicData.locationBodyMarkings
                    : '',
                RH: basicData?.RH ? basicData.RH : '',
                height: basicData?.height ? basicData.height : '',
                financiallyDependentPersons:
                  basicData &&
                    typeof basicData.financiallyDependentPersons === 'number'
                    ? basicData.financiallyDependentPersons
                    : '',
                cvFile: listFiles.find(
                  (file: any) => file.fileType === FileTypes.CANDIDATE_CV_FILE
                )
                  ? listFiles.find(
                    (file: any) =>
                      file.fileType === FileTypes.CANDIDATE_CV_FILE
                  ).fileMongoPath
                  : null,
                documentFile: listFiles.find(
                  (file: any) =>
                    file.fileType === FileTypes.CANDIDATE_DOCUMENT_FILE
                )
                  ? listFiles.find(
                    (file: any) =>
                      file.fileType === FileTypes.CANDIDATE_DOCUMENT_FILE
                  ).fileMongoPath
                  : null,
              }}
              onFinish={onFinish}
              onError={(e) => console.log(e)}
            >
              <div className="section">
                <Form.Item<CandidatesStep1FieldType>
                  className="input_element"
                  label="Primer Apellido"
                  name="firstLastName"
                  rules={[
                    {
                      required: true,
                      message: 'Ingresa tu Primer Apellido!',
                    },
                  ]}
                >
                  <Input
                    placeholder="Primer Apellido"
                    disabled={finishProcess}
                  />
                </Form.Item>

                <Form.Item<CandidatesStep1FieldType>
                  className="input_element"
                  label="Segundo Apellido"
                  name="middleLastName"
                >
                  <Input
                    placeholder="Segundo Apellido"
                    disabled={finishProcess}
                  />
                </Form.Item>

                <Form.Item<CandidatesStep1FieldType>
                  className="input_element"
                  label="Primer Nombre"
                  name="firstName"
                  rules={[
                    {
                      required: true,
                      message: 'Ingresa tu Primer Nombre!',
                    },
                  ]}
                >
                  <Input placeholder="Primer Nombre" disabled={finishProcess} />
                </Form.Item>

                <Form.Item<CandidatesStep1FieldType>
                  className="input_element"
                  label="Segundo Nombre"
                  name="middleName"
                >
                  <Input placeholder="Segundo Nombre" disabled={finishProcess} />
                </Form.Item>

                <ParameterList
                  groupId="1"
                  label="Tipo de Documento"
                  name="documentType"
                  placeHolder="Tipo de Documento"
                  requiredMessage="Selecciona un Tipo de Documento!"
                  disabled={finishProcess}
                />

                <Form.Item<CandidatesStep1FieldType>
                  className="input_element"
                  label="No. de Identificación"
                  name="identificationNumber"
                  rules={[
                    {
                      required: true,
                      message: 'Ingresa tu No. de Identificación!',
                    },
                  ]}
                >
                  <InputNumber
                    className="w_100"
                    placeholder="No. de Identificación"
                    type="number"
                    disabled
                  />
                </Form.Item>
              </div>

              <div className="section">
                <Form.Item<CandidatesStep1FieldType>
                  className="input_element"
                  label="País de Nacimiento"
                  name="birthCountry"
                  rules={[
                    {
                      required: true,
                      message: 'Selecciona tu País de Nacimiento!',
                    },
                  ]}
                >
                  <Select
                    allowClear
                    showSearch
                    optionFilterProp="name"
                    fieldNames={optionConfig}
                    className="w_100"
                    placeholder="País de Nacimiento"
                    options={countries}
                    disabled={finishProcess}
                  />
                </Form.Item>

                <Form.Item<CandidatesStep1FieldType>
                  className="input_element"
                  label="Fecha de Expedición"
                  name="documentIssueDate"
                  rules={[
                    {
                      required: true,
                      message: 'Selecciona tu Fecha de Expedición!',
                    },
                  ]}
                >
                  <DatePicker
                    format="YYYY/MM/DD"
                    className="w_100"
                    placeholder="Fecha de Expedición"
                    disabled={finishProcess}
                  />
                </Form.Item>

                <Form.Item<CandidatesStep1FieldType>
                  className="input_element"
                  label="Lugar de Expedición"
                  name="documentIssuePlace"
                  rules={[
                    {
                      required: true,
                      message: 'Selecciona un Lugar de Expedición!',
                    },
                  ]}
                >
                  <Select
                    allowClear
                    showSearch
                    optionFilterProp="name"
                    fieldNames={optionConfig}
                    className="w_100"
                    placeholder="Lugar de Expedición"
                    options={cities}
                    disabled={finishProcess}
                  />
                </Form.Item>

                <Form.Item<CandidatesStep1FieldType>
                  className="input_element"
                  label="Fecha de Nacimiento"
                  name="birthDate"
                  rules={[
                    {
                      required: true,
                      message: 'Selecciona tu Fecha de Nacimiento!',
                    },
                  ]}
                >
                  <DatePicker
                    format="YYYY/MM/DD"
                    className="w_100"
                    placeholder="Fecha de Nacimiento"
                    disabled={finishProcess}
                  />
                </Form.Item>

                <Form.Item<CandidatesStep1FieldType>
                  className="input_element"
                  label="Edad"
                  name="age"
                  rules={[
                    {
                      required: true,
                      message: 'Ingresa tu Edad!',
                    },
                  ]}
                >
                  <Input disabled placeholder="Edad" />
                </Form.Item>
              </div>

              <div className="section">
                {form.getFieldValue('birthCountry') === 43 && (
                  <>
                    <Form.Item<CandidatesStep1FieldType>
                      className="input_element"
                      label="Departamento de Nacimiento"
                      name="birthDepartment"
                      rules={[
                        {
                          required: true,
                          message:
                            'Selecciona tu Departamento de Nacimiento!',
                        },
                      ]}
                    >
                      <Select
                        allowClear
                        showSearch
                        optionFilterProp="name"
                        fieldNames={optionConfig}
                        className="w_100"
                        placeholder="Departamento de Nacimiento"
                        options={departments}
                        disabled={finishProcess}
                      />
                    </Form.Item>

                    <Form.Item<CandidatesStep1FieldType>
                      className="input_element"
                      label="Municipio de Nacimiento"
                      name="birthTown"
                      rules={[
                        {
                          required: true,
                          message: 'Selecciona tu Municipio de Nacimiento!',
                        },
                      ]}
                    >
                      <Select
                        allowClear
                        showSearch
                        optionFilterProp="name"
                        fieldNames={optionConfig}
                        className="w_100"
                        placeholder="Municipio de Nacimiento"
                        options={municipalities}
                        disabled={finishProcess}
                      />
                    </Form.Item>
                  </>
                )}

                <Form.Item<CandidatesStep1FieldType>
                  className="input_element"
                  label="Ciudad de Residencia"
                  name="cityResidence"
                  rules={[
                    {
                      required: true,
                      message: 'Selecciona tu Ciudad de Residencia!',
                    },
                  ]}
                >
                  <Select
                    allowClear
                    showSearch
                    optionFilterProp="name"
                    fieldNames={optionConfig}
                    className="w_100"
                    placeholder="Ciudad de Residencia"
                    options={cities}
                    disabled={finishProcess}
                  />
                </Form.Item>

                <Form.Item<CandidatesStep1FieldType>
                  className="input_element"
                  label="Dirección de Residencia"
                  name="residenceAddress"
                  rules={[
                    {
                      required: true,
                      message: 'Ingresa tu Dirección de Residencia!',
                    },
                  ]}
                >
                  <Input
                    placeholder="Dirección de Residencia"
                    disabled={finishProcess}
                  />
                </Form.Item>

                <Form.Item<CandidatesStep1FieldType>
                  className="input_element"
                  label="Barrio"
                  name="district"
                  rules={[
                    {
                      required: true,
                      message: 'Selecciona tu Barrio!',
                    },
                  ]}
                >
                  <Select
                    allowClear
                    showSearch
                    optionFilterProp="value"
                    fieldNames={optionConfig}
                    className="w_100"
                    placeholder="Barrio"
                    options={districts}
                    disabled={finishProcess}
                  />
                </Form.Item>

                <YesOrNot
                  label="¿Cuenta con libreta militar?"
                  name="hasMilitaryPassbook"
                  requiredMessage="Selecciona una opción"
                  disabled={finishProcess}
                />
              </div>

              <div className="section">
                {basicData?.hasMilitaryPassbook && (
                  <>
                    <Form.Item<CandidatesStep1FieldType>
                      className="input_element"
                      label="Libreta Militar"
                      name="militaryPassbookNumber"
                    >
                      <Input
                        placeholder="Libreta Militar"
                        disabled={finishProcess}
                      />
                    </Form.Item>

                    <Form.Item<CandidatesStep1FieldType>
                      className="input_element"
                      label="Clase de Libreta"
                      name="typeOfPassbook"
                    >
                      <Input
                        placeholder="Clase de Libreta"
                        disabled={finishProcess}
                      />
                    </Form.Item>

                    <Form.Item<CandidatesStep1FieldType>
                      className="input_element"
                      label="Distrito Militar"
                      name="militaryDistrict"
                    >
                      <Input
                        placeholder="Distrito Militar"
                        disabled={finishProcess}
                      />
                    </Form.Item>
                  </>
                )}

                <Form.Item<CandidatesStep1FieldType>
                  className="input_element"
                  label="Telefono Fijo"
                  name="phone"
                >
                  <InputNumber
                    className="w_100"
                    placeholder="Telefono Fijo"
                    type="text"
                    disabled={finishProcess}
                  />
                </Form.Item>

                <Form.Item<CandidatesStep1FieldType>
                  className="input_element"
                  label="Telefono Celular"
                  name="cellPhone"
                  rules={[
                    {
                      required: true,
                      message: 'Ingresa tu Telefono Celular!',
                    },
                  ]}
                >
                  <InputNumber
                    className="w_100"
                    placeholder="Telefono Celular"
                    type="text"
                    disabled={finishProcess}
                  />
                </Form.Item>

                <ParameterList
                  groupId="2"
                  label="Estado Civil"
                  name="maritalStatus"
                  placeHolder="Estado Civil"
                  requiredMessage="Selecciona el Estado Civil!"
                  disabled={finishProcess}
                />
              </div>

              <div className="section">
                <Form.Item<CandidatesStep1FieldType>
                  className="input_element"
                  label="No. de Hijos"
                  name="childrenNumber"
                  rules={[
                    {
                      required: true,
                      message: 'Selecciona No.de Hijos!',
                    },
                  ]}
                >
                  <Select
                    fieldNames={optionConfig}
                    className="w_100"
                    placeholder="No. de Hijos"
                    options={listBasicNumbers}
                    disabled={finishProcess}
                  />
                </Form.Item>
              </div>

              <div className="section">
                <ParameterList
                  groupId="3"
                  label="Marcas Corporales"
                  name="bodyMarkings"
                  placeHolder="Marcas Corporales"
                  requiredMessage="Selecciona alguna marca corporal!"
                  disabled={finishProcess}
                />

                {form.getFieldValue('bodyMarkings') === 14 && (
                  <Form.Item<CandidatesStep1FieldType>
                    className="input_element"
                    label="Cual? (es)"
                    name="otherBodyMarkings"
                  >
                    <Input placeholder="Cual? (es)" disabled={finishProcess} />
                  </Form.Item>
                )}

                {form.getFieldValue('bodyMarkings') > 0 &&
                  form.getFieldValue('bodyMarkings') !== 15 && (
                    <Form.Item<CandidatesStep1FieldType>
                      className="input_element"
                      label="Ubicación Marcas Corporales"
                      name="locationBodyMarkings"
                    >
                      <Input
                        placeholder="Ubicación Marcas Corporales"
                        disabled={finishProcess}
                      />
                    </Form.Item>
                  )}

                <ParameterList
                  groupId="7"
                  label="RH"
                  name="RH"
                  placeHolder="RH"
                  requiredMessage="Selecciona tu RH!"
                  disabled={finishProcess}
                />

                <Form.Item<CandidatesStep1FieldType>
                  className="input_element"
                  label="Estatura"
                  name="height"
                  rules={[
                    {
                      required: true,
                      message: 'Ingresa tu Estatura!',
                    },
                  ]}
                >
                  <InputNumber
                    className="w_100"
                    min={1}
                    max={280}
                    placeholder="Estatura (cm)"
                    type="number"
                    disabled={finishProcess}
                  />
                </Form.Item>

                <Form.Item<CandidatesStep1FieldType>
                  className="input_element"
                  label="No. personas que dependen econ."
                  name="financiallyDependentPersons"
                  rules={[
                    {
                      required: true,
                      message:
                        'Selecciona el No. personas que dependen economicamente!',
                    },
                  ]}
                >
                  <Select
                    options={listBasicNumbers}
                    className="w_100"
                    placeholder="No. personas que dependen econ."
                    fieldNames={optionConfig}
                    disabled={finishProcess}
                  />
                </Form.Item>
              </div>

              <div className="section">
                {basicData?.hasMilitaryPassbook && (
                  <Form.Item
                    className="input_element"
                    label="Documento Libreta Militar"
                    name="militaryBookFile"
                  >
                    <Upload
                      beforeUpload={beforeUpload}
                      action={`${process.env.NEXT_PUBLIC_API_URL}/multer/process`}
                      method="POST"
                      className="w_100"
                      defaultFileList={defaultFiles(
                        'Documento libreta militar',
                        FileTypes.CANDIDATE_MILITARY_BOOK_FILE
                      )}
                      maxCount={1}
                      disabled={finishProcess}
                    >
                      <Button className="button_upload_control">
                        <div className="loader_file_container">
                          <span>Documento Libreta Militar</span>
                          <div className="upload_action_button">
                            <span>Cargar</span>
                          </div>
                        </div>
                      </Button>
                    </Upload>
                  </Form.Item>
                )}

                <Form.Item
                  className="input_element"
                  label="Documento de Identidad"
                  name="documentFile"
                  rules={[
                    {
                      required: true,
                      message: 'Adjunta el archivo',
                    },
                  ]}
                >
                  <Upload
                    beforeUpload={beforeUpload}
                    action={`${process.env.NEXT_PUBLIC_API_URL}/multer/process`}
                    defaultFileList={defaultFiles(
                      'Documento de identidad',
                      FileTypes.CANDIDATE_DOCUMENT_FILE
                    )}
                    maxCount={1}
                    method="POST"
                    className="w_100"
                    disabled={finishProcess}
                  >
                    <Button className="button_upload_control">
                      <div className="loader_file_container">
                        <span>Documento de Identidad</span>
                        <div className="upload_action_button">
                          <span>Cargar</span>
                        </div>
                      </div>
                    </Button>
                  </Upload>
                </Form.Item>

                <Form.Item
                  className="input_element"
                  label="Documento Hoja de Vida"
                  name="cvFile"
                  rules={[
                    {
                      required: true,
                      message: 'Adjunta el archivo',
                    },
                  ]}
                >
                  <Upload
                    beforeUpload={beforeUpload}
                    action={`${process.env.NEXT_PUBLIC_API_URL}/multer/process`}
                    method="POST"
                    className="w_100"
                    defaultFileList={defaultFiles(
                      'Documento hoja de vida',
                      FileTypes.CANDIDATE_CV_FILE
                    )}
                    maxCount={1}
                    disabled={finishProcess}
                  >
                    <Button className="button_upload_control">
                      <div className="loader_file_container">
                        <span>Documento Hoja de Vida</span>
                        <div className="upload_action_button">
                          <span>Cargar</span>
                        </div>
                      </div>
                    </Button>
                  </Upload>
                </Form.Item>
              </div>

              <div className="buttons_bottom_navigation buttons_bottom_navigation_simple">
                <div className="button_container">
                  <span>Siguiente</span>
                  <Button
                    className="next"
                    htmlType="submit"
                    loading={loadingSave}
                  />
                </div>
              </div>
            </Form>
          </div>
        </div>
      </section>
    </CandidatesLayoutComponent>
  );
}
