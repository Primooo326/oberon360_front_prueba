import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import { Button, DatePicker, Form, Input, InputNumber, Select } from 'antd';
import CandidatesLayoutComponent from '@/components/i+c/layout/Candidates';
import BreadcrumbComponent from '@/components/i+c/ui/Breadcrumb';
import {
  saveSpouseAndInlawData,
  selectBasicData,
  selectFinishProcess,
  selectSpouseAndInlawData,
} from '@/redux/slices/candidates';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import type { CandidatesStep4FieldType } from '@/models/i+c/FormTypes';
import { optionConfig } from '@/data/constants';
import {
  getCountries,
  getDepartmentsByCountry,
  getMunicipalitiesByDepartment,
} from '@/api/i+c/Parameters';
import { showError, showSuccess } from '@/components/i+c/ui/Toast';
import YesOrNot from '@/components/i+c/common/YesOrNot';
import { loadSpouseAndParentsInlawData } from '@/api/i+c/Candidates';
import HelmetTitle from '@/components/i+c/ui/HelmetTitle';
import ParameterList from '@/components/i+c/common/ParameterList';
import Loading from '@/components/i+c/ui/Loading';

export default function CandidatesInformationStep4() {
  const [loadView, setLoadView] = useState(false);
  const spouseAndInlawData = useAppSelector(selectSpouseAndInlawData);
  const basicData = useAppSelector(selectBasicData);
  const submitData = useAppSelector(selectFinishProcess);
  const [countries, setCountries] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [municipalities, setMunicipalities] = useState([]);
  const [callLists, setCallLists] = useState(false);
  const [loadingSave, setloadingSave] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [form] = Form.useForm();

  useEffect(() => {
    if (!loadView) {
      if (basicData.maritalStatus !== 4) {
        setLoadView(true);
        router.push('/I+C/dashboard/candidates/information/step5');
      }
      setLoadView(true);
    }
  }, []);

  useEffect(() => {
    if (!callLists) {
      getCountries()
        .then((res) => {
          if (res) {
            setCountries(res.data);
          }
        })
        .catch((err) => {
          showError(err.response ? err.response.data.error : err);
        });
      if (spouseAndInlawData?.birthDepartment) {
        onChangeDepartment(String(spouseAndInlawData.birthDepartment));
      }
      if (spouseAndInlawData?.birthCountry) {
        onChangeCountry(String(spouseAndInlawData.birthCountry));
      }
      setCallLists(true);
    }
  }, [callLists, spouseAndInlawData]);

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

  function changeData(event: any) {
    let value: any = Object.values(event)[0];
    const key = Object.keys(event)[0];
    const mapSpouseAndInlawData: CandidatesStep4FieldType = {
      ...spouseAndInlawData,
    };
    if (key === 'birthDate') value = dayjs(value).format('YYYY/MM/DD');
    if (key === 'birthCountry') {
      onChangeCountry(value);
    }
    if (key === 'birthDepartment') onChangeDepartment(value);
    mapSpouseAndInlawData[key] = value;
    dispatch(saveSpouseAndInlawData(mapSpouseAndInlawData));
  }

  function onFinish() {
    setloadingSave(true);
    const data = {
      ...spouseAndInlawData,
      age: Number(spouseAndInlawData.age),
      identificationNumber: String(spouseAndInlawData.identificationNumber),
      birthDate: new Date(spouseAndInlawData.birthDate),
      cellPhoneNumber: String(spouseAndInlawData.cellPhoneNumber),
      phoneNumber: String(spouseAndInlawData.phoneNumber),
    };
    loadSpouseAndParentsInlawData(data)
      .then((res) => {
        if (res) {
          showSuccess(res.data);
          router.push('/I+C/dashboard/candidates/information/step5');
          setloadingSave(false);
        }
      })
      .catch(() => {
        setloadingSave(false);
        showError('Error al cargar la información');
      });
  }

  if (!loadView) {
    return <Loading />;
  }
  return (
    <CandidatesLayoutComponent>
      <HelmetTitle title="Datos Familiates Esposo(a)" />

      <section>
        <div className="step">
          <h1>DATOS FAMILIARES ESPOSO(A)</h1>

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
                fullName:
                  spouseAndInlawData?.fullName
                    ? spouseAndInlawData.fullName
                    : '',
                identificationNumber:
                  spouseAndInlawData?.identificationNumber
                    ? spouseAndInlawData.identificationNumber
                    : '',
                birthDate:
                  spouseAndInlawData?.birthDate
                    ? dayjs(spouseAndInlawData.birthDate, 'YYYY/MM/DD')
                    : '',
                birthCountry:
                  spouseAndInlawData?.birthCountry
                    ? spouseAndInlawData.birthCountry
                    : '',
                birthDepartment:
                  spouseAndInlawData?.birthDepartment
                    ? spouseAndInlawData.birthDepartment
                    : '',
                birthTown:
                  spouseAndInlawData?.birthTown
                    ? spouseAndInlawData.birthTown
                    : '',
                profession:
                  spouseAndInlawData?.profession
                    ? spouseAndInlawData.profession
                    : '',
                yearsOfAcquaintances:
                  spouseAndInlawData?.yearsOfAcquaintances
                    ? spouseAndInlawData.yearsOfAcquaintances
                    : '',
                age:
                  spouseAndInlawData?.age
                    ? spouseAndInlawData.age
                    : '',
                phoneNumber:
                  spouseAndInlawData?.phoneNumber
                    ? spouseAndInlawData.phoneNumber
                    : '',
                cellPhoneNumber:
                  spouseAndInlawData?.cellPhoneNumber
                    ? spouseAndInlawData.cellPhoneNumber
                    : '',
                motherInLawFullName:
                  spouseAndInlawData?.motherInLawFullName
                    ? spouseAndInlawData.motherInLawFullName
                    : '',
                motherInLawAge:
                  spouseAndInlawData?.motherInLawAge
                    ? spouseAndInlawData.motherInLawAge
                    : '',
                motherInLawLives: spouseAndInlawData
                  ? !!spouseAndInlawData.motherInLawLives
                  : '',
                motherInLawAddress:
                  spouseAndInlawData?.motherInLawAddress
                    ? spouseAndInlawData.motherInLawAddress
                    : '',
                motherInLawYearsOfAcquaintances:
                  spouseAndInlawData?.motherInLawYearsOfAcquaintances
                    ? spouseAndInlawData.motherInLawYearsOfAcquaintances
                    : '',
                motherInLawProfession:
                  spouseAndInlawData?.motherInLawProfession
                    ? spouseAndInlawData.motherInLawProfession
                    : '',
                fatherInLawFullName:
                  spouseAndInlawData?.fatherInLawFullName
                    ? spouseAndInlawData.fatherInLawFullName
                    : '',
                fatherInLawAge:
                  spouseAndInlawData?.fatherInLawAge
                    ? spouseAndInlawData.fatherInLawAge
                    : '',
                fatherInLawLives: spouseAndInlawData
                  ? !!spouseAndInlawData.fatherInLawLives
                  : '',
                fatherInLawAddress:
                  spouseAndInlawData?.fatherInLawAddress
                    ? spouseAndInlawData.fatherInLawAddress
                    : '',
                fatherInLawYearsOfAcquaintances:
                  spouseAndInlawData?.fatherInLawYearsOfAcquaintances
                    ? spouseAndInlawData.fatherInLawYearsOfAcquaintances
                    : '',
                fatherInLawProfession:
                  spouseAndInlawData?.fatherInLawProfession
                    ? spouseAndInlawData.fatherInLawProfession
                    : '',
              }}
              onFinish={onFinish}
            >
              <div className="section">
                <Form.Item<CandidatesStep4FieldType>
                  className="input_element"
                  label="Nombres Completos"
                  name="fullName"
                  rules={[
                    {
                      required: true,
                      message: 'Ingresa el Nombre Completo!',
                    },
                  ]}
                >
                  <Input
                    placeholder="Nombres Completos"
                    disabled={submitData}
                  />
                </Form.Item>

                <Form.Item<CandidatesStep4FieldType>
                  className="input_element"
                  label="No. de Identificación"
                  name="identificationNumber"
                  rules={[
                    {
                      required: true,
                      message: 'Ingresa el No. de Identificación!',
                    },
                  ]}
                >
                  <InputNumber
                    className="w_100"
                    placeholder="No. de Identificación"
                    type="text"
                    disabled={submitData}
                  />
                </Form.Item>

                <Form.Item<CandidatesStep4FieldType>
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
                    disabled={submitData}
                  />
                </Form.Item>

                <Form.Item<CandidatesStep4FieldType>
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
                    disabled={submitData}
                  />
                </Form.Item>

                <Form.Item<CandidatesStep4FieldType>
                  className="input_element"
                  label="Departamento de Nacimiento"
                  name="birthDepartment"
                  rules={[
                    {
                      required: true,
                      message: 'Selecciona tu Departamento de Nacimiento!',
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
                    disabled={submitData}
                  />
                </Form.Item>

                <Form.Item<CandidatesStep4FieldType>
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
                    disabled={submitData}
                  />
                </Form.Item>

                <ParameterList
                  groupId="15"
                  label="Profesión"
                  name="profession"
                  placeHolder="Profesión"
                  requiredMessage="Selecciona un Profesión!"
                  disabled={submitData}
                />
              </div>

              <div className="section">
                <Form.Item<CandidatesStep4FieldType>
                  className="input_element"
                  label="Tiempo de Conocidos (Años)"
                  name="yearsOfAcquaintances"
                  rules={[
                    {
                      required: true,
                      message: 'Ingresa el tiempo de Conocidos!',
                    },
                  ]}
                >
                  <InputNumber
                    className="w_100"
                    placeholder="Tiempo de Conocidos (Años)"
                    type="number"
                    disabled={submitData}
                  />
                </Form.Item>

                <Form.Item<CandidatesStep4FieldType>
                  className="input_element"
                  label="Edad"
                  name="age"
                  rules={[
                    {
                      required: true,
                      message: 'Ingresa la Edad!',
                    },
                  ]}
                >
                  <InputNumber
                    className="w_100"
                    placeholder="Edad"
                    type="number"
                    disabled={submitData}
                  />
                </Form.Item>

                <Form.Item<CandidatesStep4FieldType>
                  className="input_element"
                  label="Telefono Fijo"
                  name="phoneNumber"
                >
                  <InputNumber
                    className="w_100"
                    placeholder="Telefono Fijo"
                    type="text"
                    disabled={submitData}
                  />
                </Form.Item>

                <Form.Item<CandidatesStep4FieldType>
                  className="input_element"
                  label="Telefono Celular"
                  name="cellPhoneNumber"
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
                    disabled={submitData}
                  />
                </Form.Item>
              </div>

              <div className="step step_2">
                <h1>DATOS FAMILIARES SUEGROS</h1>

                <div className="section">
                  <Form.Item<CandidatesStep4FieldType>
                    className="input_element"
                    label="Nombres Completos de la suegra"
                    name="motherInLawFullName"
                    rules={[
                      {
                        required: true,
                        message: 'Ingresa el Nombre Completo de la suegra!',
                      },
                    ]}
                  >
                    <Input
                      placeholder="Nombres Completos de la suegra"
                      disabled={submitData}
                    />
                  </Form.Item>

                  <YesOrNot
                    label="¿Vive?"
                    name="motherInLawLives"
                    requiredMessage="Selecciona una opción"
                    disabled={submitData}
                  />

                  {spouseAndInlawData?.motherInLawLives && (
                    <>
                      <Form.Item<CandidatesStep4FieldType>
                        className="input_element"
                        label="Edad"
                        name="motherInLawAge"
                        rules={[
                          {
                            required: true,
                            message: 'Ingresa la Edad!',
                          },
                        ]}
                      >
                        <InputNumber
                          className="w_100"
                          type="number"
                          placeholder="Edad"
                          disabled={submitData}
                        />
                      </Form.Item>

                      <Form.Item<CandidatesStep4FieldType>
                        className="input_element"
                        label="Dirección de Residencia"
                        name="motherInLawAddress"
                        rules={[
                          {
                            required: true,
                            message: 'Ingresa la Dirección!',
                          },
                        ]}
                      >
                        <Input
                          placeholder="Dirección de Residencia"
                          disabled={submitData}
                        />
                      </Form.Item>

                      <Form.Item<CandidatesStep4FieldType>
                        className="input_element"
                        label="Tiempo de Conocidos (Años)"
                        name="motherInLawYearsOfAcquaintances"
                        rules={[
                          {
                            required: true,
                            message: 'Ingresa el tiempo de Conocidos!',
                          },
                        ]}
                      >
                        <InputNumber
                          className="w_100"
                          placeholder="Tiempo de Conocidos (Años)"
                          type="number"
                          disabled={submitData}
                        />
                      </Form.Item>

                      <ParameterList
                        groupId="15"
                        label="Profesión"
                        name="motherInLawProfession"
                        placeHolder="Profesión"
                        requiredMessage="Selecciona un Profesión!"
                        disabled={submitData}
                      />
                    </>
                  )}
                </div>

                <div className="section">
                  <Form.Item<CandidatesStep4FieldType>
                    className="input_element"
                    label="Nombres Completos del suegro"
                    name="fatherInLawFullName"
                    rules={[
                      {
                        required: true,
                        message: 'Ingresa el Nombre Completo del suegro!',
                      },
                    ]}
                  >
                    <Input
                      placeholder="Nombres Completos del suegro"
                      disabled={submitData}
                    />
                  </Form.Item>

                  <YesOrNot
                    label="¿Vive?"
                    name="fatherInLawLives"
                    requiredMessage="Selecciona una opción"
                    disabled={submitData}
                  />

                  {spouseAndInlawData?.fatherInLawLives && (
                    <>
                      <Form.Item<CandidatesStep4FieldType>
                        className="input_element"
                        label="Edad"
                        name="fatherInLawAge"
                        rules={[
                          {
                            required: true,
                            message: 'Ingresa la Edad!',
                          },
                        ]}
                      >
                        <InputNumber
                          className="w_100"
                          type="number"
                          placeholder="Edad"
                          disabled={submitData}
                        />
                      </Form.Item>

                      <Form.Item<CandidatesStep4FieldType>
                        className="input_element"
                        label="Dirección de Residencia"
                        name="fatherInLawAddress"
                        rules={[
                          {
                            required: true,
                            message: 'Ingresa la Dirección!',
                          },
                        ]}
                      >
                        <Input
                          placeholder="Dirección de Residencia"
                          disabled={submitData}
                        />
                      </Form.Item>

                      <Form.Item<CandidatesStep4FieldType>
                        className="input_element"
                        label="Tiempo de Conocidos (Años)"
                        name="fatherInLawYearsOfAcquaintances"
                        rules={[
                          {
                            required: true,
                            message: 'Ingresa el tiempo de Conocidos!',
                          },
                        ]}
                      >
                        <InputNumber
                          className="w_100"
                          placeholder="Tiempo de Conocidos (Años)"
                          type="number"
                          disabled={submitData}
                        />
                      </Form.Item>

                      <ParameterList
                        groupId="15"
                        label="Profesión"
                        name="fatherInLawProfession"
                        placeHolder="Profesión"
                        requiredMessage="Selecciona un Profesión!"
                        disabled={submitData}
                      />
                    </>
                  )}
                </div>
              </div>

              <div className="buttons_bottom_navigation buttons_bottom_navigation_double">
                <div className="button_container">
                  <span>Atrás</span>
                  <Button className="prev" htmlType="submit" />
                </div>

                <div className="button_container">
                  <span>Siguiente</span>
                  <Button className="next" htmlType="submit" loading={loadingSave} />
                </div>
              </div>
            </Form>
          </div>
        </div>
      </section>
    </CandidatesLayoutComponent>
  );
}
