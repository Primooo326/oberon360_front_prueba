import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
} from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';
import CandidatesLayoutComponent from '@/components/i+c/layout/Candidates';
import BreadcrumbComponent from '@/components/i+c/ui/Breadcrumb';
import ParameterList from '@/components/i+c/common/ParameterList';
import HelmetTitle from '@/components/i+c/ui/HelmetTitle';
import { optionConfig } from '@/data/constants';
import { getDistrictsByMunicipality } from '@/api/i+c/Parameters';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  savePeopleWithlivesAndHousingData,
  selectBasicData,
  selectFinishProcess,
  selectPeopleWithlivesAndHousingData,
} from '@/redux/slices/candidates';
import { showError, showSuccess } from '@/components/i+c/ui/Toast';
import type { CandidatesStep5FieldType } from '@/models/i+c/FormTypes';
import { loadPeopleWithlivesAndHousingData } from '@/api/i+c/Candidates';

export default function CandidatesInformationStep5() {
  const peopleWithlivesAndHousingData = useAppSelector(
    selectPeopleWithlivesAndHousingData
  );
  const basicData = useAppSelector(selectBasicData);
  const [districts, setDistricts] = useState([]);
  const submitData = useAppSelector(selectFinishProcess);
  const [finishCallCatalogs, setfinishCallCatalogs] = useState(false);
  const [loadingSave, setloadingSave] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [form] = Form.useForm();

  useEffect(() => {
    if (!finishCallCatalogs) {
      basicData &&
        getDistrictsByMunicipality(String(basicData.birthTown))
          .then((res) => {
            if (res) {
              setDistricts(res.data);
              setfinishCallCatalogs(true);
            }
          })
          .catch((err) => {
            showError(err.response ? err.response.data.error : err);
          });
    }
  }, [finishCallCatalogs]);

  function onFinish() {
    setloadingSave(true);
    const data = {
      housingData: {
        houseType: peopleWithlivesAndHousingData.houseType,
        dateFrom: new Date(peopleWithlivesAndHousingData.dateFrom),
        district: peopleWithlivesAndHousingData.district,
        ownerName: peopleWithlivesAndHousingData.ownerName,
        stratum: peopleWithlivesAndHousingData.stratum,
        address: peopleWithlivesAndHousingData.address,
      },
      peopleInformation: peopleWithlivesAndHousingData.peopleInformation.map(
        (item: any, index: number) => {
          return {
            ...item,
            phone: String(item.phone),
            indexItem: index,
          };
        }
      ),
    };
    loadPeopleWithlivesAndHousingData(data)
      .then((res) => {
        if (res) {
          showSuccess(res.data);
          router.push('/I+C/dashboard/candidates/information/step6');
          setloadingSave(false);
        }
      })
      .catch(() => {
        setloadingSave(false);
        showError('Error al cargar la información');
      });
  }

  function changeData(event: any) {
    let value: any = Object.values(event)[0];
    const key = Object.keys(event)[0];
    const mapPeopleWithlivesAndHousingData: CandidatesStep5FieldType = {
      ...peopleWithlivesAndHousingData,
    };
    if (key === 'dateFrom') value = dayjs(value).format('YYYY/MM/DD');
    if (key === 'peopleNumber') {
      const peopleInfo = form.getFieldValue('peopleInformation');
      const currentItemCount = peopleInfo?.length;
      let newPeoples;
      if (value > currentItemCount) {
        const itemsToAdd = value - currentItemCount;
        newPeoples = [...peopleInfo];
        for (let index = 0; index < itemsToAdd; index++) {
          newPeoples.push({
            fullName: '',
            age: '',
            phone: '',
            relationship: '',
            maritalStatus: '',
            profession: '',
          });
        }
      } else if (value < currentItemCount) {
        newPeoples = peopleInfo.slice(0, value);
      }
      form.setFieldValue('peopleInformation', newPeoples);
    }
    if (key === 'peopleInformation') {
      const item = value;
      const itemIndex: number = Number(Object.keys(item)[0]);
      const itemKey = Object.keys(item[itemIndex])[0];
      const itemValue = Object.values(item[itemIndex])[0];
      const mapPeopleInformation: any[] = [
        ...mapPeopleWithlivesAndHousingData.peopleInformation,
      ];
      const updatedObject = {
        ...mapPeopleInformation[itemIndex],
        [itemKey]: itemValue,
      };
      mapPeopleInformation[itemIndex] = updatedObject;
      mapPeopleWithlivesAndHousingData.peopleInformation = mapPeopleInformation;
    } else {
      mapPeopleWithlivesAndHousingData[key] = value;
    }
    dispatch(
      savePeopleWithlivesAndHousingData(mapPeopleWithlivesAndHousingData)
    );
  }

  return (
    <CandidatesLayoutComponent>
      <HelmetTitle title="Personas con las que vive" />

      <section>
        <div className="step">
          <h1>PERSONAS CON LAS QUE VIVE</h1>

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
                peopleNumber:
                  peopleWithlivesAndHousingData &&
                    peopleWithlivesAndHousingData.peopleNumber > 0
                    ? peopleWithlivesAndHousingData.peopleNumber
                    : 0,
                peopleInformation:
                  peopleWithlivesAndHousingData &&
                    peopleWithlivesAndHousingData.peopleInformation.length > 0
                    ? peopleWithlivesAndHousingData.peopleInformation
                    : [],
                houseType:
                  peopleWithlivesAndHousingData && peopleWithlivesAndHousingData
                    ? peopleWithlivesAndHousingData.houseType
                    : '',
                dateFrom:
                  peopleWithlivesAndHousingData && peopleWithlivesAndHousingData
                    ? dayjs(peopleWithlivesAndHousingData.dateFrom)
                    : '',
                district:
                  peopleWithlivesAndHousingData && peopleWithlivesAndHousingData
                    ? peopleWithlivesAndHousingData.district
                    : '',
                ownerName:
                  peopleWithlivesAndHousingData && peopleWithlivesAndHousingData
                    ? peopleWithlivesAndHousingData.ownerName
                    : '',
                stratum:
                  peopleWithlivesAndHousingData && peopleWithlivesAndHousingData
                    ? peopleWithlivesAndHousingData.stratum
                    : '',
                address:
                  peopleWithlivesAndHousingData && peopleWithlivesAndHousingData
                    ? peopleWithlivesAndHousingData.address
                    : '',
              }}
              onFinish={onFinish}
            >
              <div className="section">
                <Form.Item
                  className="input_element"
                  label="No. de Personas con las que vive"
                  name="peopleNumber"
                  rules={[
                    {
                      required: true,
                      message: 'Selecciona una opción!',
                    },
                  ]}
                >
                  <Select
                    className="w_100"
                    placeholder="No. de Personas con las que vive"
                    disabled={submitData}
                  >
                    <Select.Option value="0">0</Select.Option>
                    <Select.Option value="1">1</Select.Option>
                    <Select.Option value="2">2</Select.Option>
                    <Select.Option value="3">3</Select.Option>
                    <Select.Option value="4">4</Select.Option>
                    <Select.Option value="5">5</Select.Option>
                    <Select.Option value="6">6</Select.Option>
                    <Select.Option value="7">7</Select.Option>
                    <Select.Option value="8">8</Select.Option>
                    <Select.Option value="9">9</Select.Option>
                    <Select.Option value="10">10</Select.Option>
                  </Select>
                </Form.Item>
              </div>

              <Form.List name="peopleInformation">
                {(fields, { remove }, { errors }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space
                        key={key}
                        style={{
                          display: 'flex',
                          marginBottom: 8,
                        }}
                        align="baseline"
                      >
                        <div className="section">
                          <Form.Item
                            {...restField}
                            className="input_element"
                            label="Nombres Completos"
                            name={[name, 'fullName']}
                            rules={[
                              {
                                required: true,
                                message: 'Ingresa los Nombres Completos!',
                              },
                            ]}
                          >
                            <Input
                              placeholder="Nombres Completos"
                              disabled={submitData}
                            />
                          </Form.Item>

                          <Form.Item
                            {...restField}
                            className="input_element"
                            label="Edad"
                            name={[name, 'age']}
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

                          <Form.Item
                            {...restField}
                            className="input_element"
                            label="Telefono"
                            name={[name, 'phone']}
                          >
                            <InputNumber
                              className="w_100"
                              placeholder="Telefono"
                              disabled={submitData}
                            />
                          </Form.Item>

                          <ParameterList
                            fieldProps={restField}
                            groupId="16"
                            label="Parentesco"
                            name={[name, 'relationship']}
                            placeHolder="Parentesco"
                            requiredMessage="Selecciona el Parentesco!"
                            disabled={submitData}
                          />

                          <ParameterList
                            fieldProps={restField}
                            groupId="2"
                            label="Estado Civil"
                            name={[name, 'maritalStatus']}
                            placeHolder="Estado Civil"
                            requiredMessage="Selecciona el Estado Civil!"
                            disabled={submitData}
                          />

                          <ParameterList
                            fieldProps={restField}
                            groupId="15"
                            label="Profesión"
                            name={[name, 'profession']}
                            placeHolder="Profesión"
                            requiredMessage="Selecciona un Profesión!"
                            disabled={submitData}
                          />

                          <MinusCircleOutlined
                            className="remove_item_operator"
                            onClick={() => remove(name)}
                          />
                        </div>
                      </Space>
                    ))}
                    <Form.ErrorList errors={errors} />
                  </>
                )}
              </Form.List>

              <div className="step step_2">
                <h1>VIVIENDA</h1>

                <div className="section">
                  <ParameterList
                    groupId="5"
                    label="Tipo de Vivienda"
                    name="houseType"
                    placeHolder="Tipo de Vivienda"
                    requiredMessage="Selecciona un Tipo de Vivienda!"
                    disabled={submitData}
                  />

                  <Form.Item
                    className="input_element"
                    label="Desde"
                    name="dateFrom"
                    rules={[
                      {
                        required: true,
                        message: 'Selecciona una fecha!',
                      },
                    ]}
                  >
                    <DatePicker
                      format="YYYY/MM/DD"
                      className="w_100"
                      placeholder="Desde"
                      disabled={submitData}
                    />
                  </Form.Item>

                  <Form.Item
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
                      disabled={submitData}
                    />
                  </Form.Item>

                  <Form.Item
                    className="input_element"
                    label="Nombre Propietario"
                    name="ownerName"
                    rules={[
                      {
                        required: true,
                        message: 'Ingresa tu Nombre Propietario!',
                      },
                    ]}
                  >
                    <Input
                      placeholder="Nombre Propietario"
                      disabled={submitData}
                    />
                  </Form.Item>

                  <Form.Item
                    className="input_element"
                    label="Estrato"
                    name="stratum"
                    rules={[
                      {
                        required: true,
                        message: 'Ingresa tu Estrato!',
                      },
                    ]}
                  >
                    <Select placeholder="Estrato" disabled={submitData}>
                      <Select.Option value="1">1</Select.Option>
                      <Select.Option value="2">2</Select.Option>
                      <Select.Option value="3">3</Select.Option>
                      <Select.Option value="4">4</Select.Option>
                      <Select.Option value="5">5</Select.Option>
                      <Select.Option value="6">6</Select.Option>
                    </Select>
                  </Form.Item>
                </div>

                <div style={{ width: 530, marginTop: 10, paddingLeft: 10 }}>
                  <Form.Item
                    className="input_element_auto"
                    label="Dirección"
                    name="address"
                    rules={[
                      {
                        required: true,
                        message: 'Ingresa tu Dirección!',
                      },
                    ]}
                  >
                    <Input
                      className="w_100"
                      placeholder="Dirección"
                      disabled={submitData}
                    />
                  </Form.Item>
                </div>
              </div>

              <div className="buttons_bottom_navigation buttons_bottom_navigation_double">
                <div className="button_container">
                  <span>Atrás</span>
                  <Button className="prev" htmlType="submit" />
                </div>

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
