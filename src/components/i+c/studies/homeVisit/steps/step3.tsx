import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import type { StudiesProps } from '@/models/i+c/props/StepsProps';
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Space,
} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import ParameterList from '@/components/i+c/common/ParameterList';
import SimpleLoading from '@/components/i+c/ui/SimpleLoading';
import {
  getFamilySecondaryData,
  getSecondaryStudyFamilyData,
  getVisitDomicilaryRemarks,
  loadSecondaryFamilyData,
} from '@/api/i+c/Studies';
import { showError, showSuccess } from '@/components/i+c/ui/Toast';
import { optionConfig } from '@/data/constants';
import {
  getCountries,
  getDepartmentsByCountry,
  getMunicipalitiesByDepartment,
} from '@/api/i+c/Parameters';

const { TextArea } = Input;

export default function StudyHomeVisitStep3({
  studyId,
  candidateId,
  onChangeStep,
}: StudiesProps) {
  const [remarksData, setRemarksData] = useState<any>(null);
  const [studyInfo, setStudyInfo] = useState<any>(null);
  const [familyStudyData, setFamilyStudyData] = useState<any>(null);
  const [loadingStudy, setLoadingStudy] = useState(false);
  const [countries, setCountries] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [municipalities, setMunicipalities] = useState([]);
  const [finishRetrieveData, setfinishRetrieveData] = useState(false);
  const [finishRetrieveCatalogs, setfinishRetrieveCatalogs] = useState(false);
  const [hasChildrensControl, setHasChildrensControl] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (!finishRetrieveCatalogs) {
      getCountries()
        .then((res) => {
          if (res) {
            setCountries(res.data);
            setfinishRetrieveCatalogs(true);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [finishRetrieveCatalogs]);

  useEffect(() => {
    if (!finishRetrieveData) {
      getVisitDomicilaryRemarks(String(studyId))
        .then((res) => {
          if (res) {
            setRemarksData(res.data);
          }
        })
        .catch((err) => {
          console.error(err);
        });
      getSecondaryStudyFamilyData(String(studyId))
        .then((res) => {
          if (res) {
            setFamilyStudyData(res.data);
          }
        })
        .catch((err) => {
          console.error(err);
        });
      getFamilySecondaryData(String(candidateId))
        .then((res) => {
          if (res) {
            setStudyInfo(res.data);
            setfinishRetrieveData(true);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [finishRetrieveData]);

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

  const submitFlow = (values: any) => {
    setLoadingStudy(true);
    const data = {
      studyId,
      childInformation: values.childInformation
        ? values.childInformation.map((item: any) => {
          return {
            fullNames: item.fullNames,
            identificationNumber: item.identificationNumber,
            birthCountry: item.birthCountry,
            birthDate: item.birthDate,
            birthDepartment: item.birthDepartment,
            birthTown: item.birthTown,
            livesWith: item.livesWith,
            age: item.age,
            phone: item.phone,
            cellPhone: item.cellPhone,
            profession: item.profession,
          };
        })
        : [],
      secondaryFamilyDataRemarks: values.remarks,
    };
    loadSecondaryFamilyData(data)
      .then((res) => {
        if (res) {
          showSuccess(res.data);
          onChangeStep(3);
          setLoadingStudy(false);
        }
      })
      .catch((err) => {
        console.error(err);
        setLoadingStudy(false);
        showError('No se ha podido guardar la información');
      });
  };

  const handleChangeChildrensData = (e: any) => {
    setHasChildrensControl(
      !!(
      e.target.value === true && e.target.checked === true )
    );
  };

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
            partnerFullName:
              studyInfo?.spouseData
                ? studyInfo.spouseData.fullName
                : '',
            partnerAge:
              studyInfo?.spouseData ? studyInfo.spouseData.age : '',
            partnerIdentificationNumber:
              studyInfo?.spouseData
                ? studyInfo.spouseData.identificationNumber
                : '',
            partnerDepartment:
              studyInfo?.spouseData
                ? studyInfo.spouseData.birthDepartment
                : '',
            partnerAddress: '',
            partnerTown:
              studyInfo?.spouseData
                ? studyInfo.spouseData.birthTown
                : '',
            profession:
              studyInfo?.spouseData
                ? studyInfo.spouseData.profession
                : '',
            partnerYearsOfAcquaintances:
              studyInfo?.spouseData
                ? studyInfo.spouseData.yearsOfAcquaintances
                : '',
            partnerPhone:
              studyInfo?.spouseData
                ? studyInfo.spouseData.phoneNumber
                : '',
            partnerCellPhone:
              studyInfo?.spouseData
                ? studyInfo.spouseData.cellPhoneNumber
                : '',
            remarks: remarksData ? remarksData.secondaryFamilyDataRemarks : '',
            hasChildrens:
              !!(
              familyStudyData?.childInformation &&
                familyStudyData.childInformation.length > 0),
            childInformation:
              familyStudyData?.childInformation &&
                familyStudyData.childInformation.length > 0
                ? familyStudyData.childInformation.map((item: any) => {
                  return {
                    fullNames: item.fullNames,
                    identificationNumber: item.identificationNumber,
                    birthDate: dayjs(item.birthDate, 'YYYY/MM/DD'),
                    birthCountry: item.birthCountry,
                    birthDepartment: item.birthDepartment,
                    birthTown: item.birthTown,
                    livesWith: item.livesWith,
                    age: item.age,
                    phone: item.phone,
                    cellPhone: item.cellPhone,
                    profession: item.profession,
                  };
                })
                : [],
          }}
          onFinish={submitFlow}
        >
          <div className="section">
            <Form.Item
              className="input_element_flow_operation"
              label="Nombres completos del esposo (a)"
              name="partnerFullName"
            >
              <Input className="w_100" disabled />
            </Form.Item>

            <Form.Item
              className="input_element_flow_operation"
              label="Edad"
              name="partnerAge"
            >
              <Input className="w_100" disabled />
            </Form.Item>

            <Form.Item
              className="input_element_flow_operation"
              label="No de Identificación"
              name="partnerIdentificationNumber"
            >
              <Input className="w_100" disabled />
            </Form.Item>

            <Form.Item
              className="input_element_flow_operation"
              label="Departamento de Nacimiento"
              name="partnerDepartment"
            >
              <Input className="w_100" disabled />
            </Form.Item>

            <Form.Item
              className="input_element_flow_operation"
              label="Dirección"
              name="partnerAddress"
            >
              <Input className="w_100" disabled />
            </Form.Item>

            <Form.Item
              className="input_element_flow_operation"
              label="Municipio de Nacimiento"
              name="partnerTown"
            >
              <Input className="w_100" disabled />
            </Form.Item>

            <Form.Item
              className="input_element_flow_operation"
              label="Profesión"
              name="profession"
            >
              <Input className="w_100" disabled />
            </Form.Item>

            <Form.Item
              className="input_element_flow_operation"
              label="Tiempo de conocido (años)"
              name="partnerYearsOfAcquaintances"
            >
              <Input className="w_100" disabled />
            </Form.Item>

            <Form.Item
              className="input_element_flow_operation"
              label="Telefono Fijo"
              name="partnerPhone"
            >
              <Input className="w_100" disabled />
            </Form.Item>

            <Form.Item
              className="input_element_flow_operation"
              label="Telefono Celular"
              name="partnerCellPhone"
            >
              <Input className="w_100" disabled />
            </Form.Item>
          </div>

          <div className="section">
            <Form.Item
              className="input_element_flow_operation"
              label="¿Tiene hijos?"
              name="hasChildrens"
            >
              <Radio.Group
                style={{
                  display: 'flex',
                  justifyContent: 'space-evenly',
                }}
                onChange={handleChangeChildrensData}
              >
                <Radio value={true}>Sí</Radio>
                <Radio value={false}>No</Radio>
              </Radio.Group>
            </Form.Item>
          </div>

          {hasChildrensControl === true && (
            <Form.List name="childInformation">
              {(fields, { add, remove }) => (
                <div>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space
                      key={key}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        marginBottom: 8,
                        borderBottom: '1px solid #00336a',
                        paddingBottom: '20px',
                      }}
                      align="baseline"
                    >
                      <div className="section">
                        <Form.Item
                          {...restField}
                          className="input_element_flow_operation"
                          label="Nombres completos Hijo(a)"
                          name={[name, 'fullNames']}
                        >
                          <Input className="w_100" />
                        </Form.Item>

                        <Form.Item
                          {...restField}
                          className="input_element_flow_operation"
                          label="Tarjeta de Identidad"
                          name={[name, 'identificationNumber']}
                        >
                          <Input className="w_100" />
                        </Form.Item>

                        <Form.Item
                          {...restField}
                          className="input_element_flow_operation"
                          label="Fecha de Nacimiento"
                          name={[name, 'birthDate']}
                        >
                          <DatePicker className="w_100" format="YYYY/MM/DD" />
                        </Form.Item>

                        <Form.Item
                          {...restField}
                          className="input_element_flow_operation"
                          label="País de Nacimiento"
                          name={[name, 'birthCountry']}
                          rules={[
                            {
                              required: true,
                              message: 'Selecciona tu País de Nacimiento!',
                            },
                          ]}
                        >
                          <Select
                            onChange={onChangeCountry}
                            allowClear
                            showSearch
                            optionFilterProp="name"
                            fieldNames={optionConfig}
                            className="w_100"
                            placeholder="País de Nacimiento"
                            options={countries}
                          />
                        </Form.Item>

                        <Form.Item
                          {...restField}
                          className="input_element_flow_operation"
                          label="Departamento de Nacimiento"
                          name={[name, 'birthDepartment']}
                          rules={[
                            {
                              required: true,
                              message:
                                'Selecciona tu Departamento de Nacimiento!',
                            },
                          ]}
                        >
                          <Select
                            onChange={onChangeDepartment}
                            allowClear
                            showSearch
                            optionFilterProp="name"
                            fieldNames={optionConfig}
                            className="w_100"
                            placeholder="Departamento de Nacimiento"
                            options={departments}
                          />
                        </Form.Item>

                        <Form.Item
                          {...restField}
                          className="input_element_flow_operation"
                          label="Municipio de Nacimiento"
                          name={[name, 'birthTown']}
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
                          />
                        </Form.Item>

                        <Form.Item
                          {...restField}
                          className="input_element_flow_operation"
                          style={{ width: 330, margin: 4 }}
                          label="¿Convive con el evaluado?"
                          name={[name, 'livesWith']}
                        >
                          <Radio.Group
                            style={{
                              display: 'flex',
                              justifyContent: 'space-evenly',
                            }}
                          >
                            <Radio value={true}>Sí</Radio>
                            <Radio value={false}>No</Radio>
                          </Radio.Group>
                        </Form.Item>

                        <Form.Item
                          {...restField}
                          className="input_element_flow_operation"
                          label="Edad"
                          name={[name, 'age']}
                        >
                          <InputNumber className="w_100" />
                        </Form.Item>

                        <Form.Item
                          {...restField}
                          className="input_element_flow_operation"
                          label="Telefono Fijo"
                          name={[name, 'phone']}
                        >
                          <Input className="w_100" />
                        </Form.Item>

                        <Form.Item
                          {...restField}
                          className="input_element_flow_operation"
                          label="Telefono Celular"
                          name={[name, 'cellPhone']}
                        >
                          <Input className="w_100" />
                        </Form.Item>

                        <ParameterList
                          {...restField}
                          groupId="15"
                          className="input_element_flow_operation"
                          label="Profesión u Oficio"
                          name={[name, 'profession']}
                          placeHolder="Profesión"
                          required={false}
                        />

                        <div className="remove_item_operator">
                          <MinusCircleOutlined
                            style={{ marginLeft: 20 }}
                            onClick={() => remove(name)}
                          />
                        </div>
                      </div>
                    </Space>
                  ))}
                  <div className="list_actions_container">
                    <Button
                      shape="circle"
                      onClick={() => add()}
                      icon={<PlusOutlined />}
                    />
                  </div>
                </div>
              )}
            </Form.List>
          )}

          <div className="section">
            <Form.Item
              className="input_element_flow_operation w_100"
              label="Observación"
              name="remarks"
              rules={[
                {
                  required: true,
                  message: 'Ingresa las obervaciones!',
                },
              ]}
            >
              <TextArea rows={8} />
            </Form.Item>
          </div>

          <div className="buttons_bottom_navigation buttons_bottom_navigation_simple">
            <Button
              type="primary"
              className="submit_studie_button"
              htmlType="submit"
              loading={loadingStudy}
            >
              <span>GUARDAR</span>
            </Button>
          </div>
        </Form>
      </div>
    );
}
