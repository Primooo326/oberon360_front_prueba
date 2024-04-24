import React, { useEffect, useState } from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space, Switch } from 'antd';
import type { StudiesProps } from '@/models/i+c/props/StepsProps';
import ParameterList from '@/components/i+c/common/ParameterList';
import {
  getHousingData,
  getVisitDomicilaryRemarks,
  loadHousingData,
} from '@/api/i+c/Studies';
import dayjs from 'dayjs';
import SimpleLoading from '@/components/i+c/ui/SimpleLoading';
import { showError, showSuccess } from '@/components/i+c/ui/Toast';
import OperationalParameterList from '@/components/i+c/common/ParameterList/operational';

const { TextArea } = Input;

export default function StudyHomeVisitStep4({
  studyId,
  candidateId,
  onChangeStep,
}: StudiesProps) {
  const [remarksData, setRemarksData] = useState<any>(null);
  const [studyInfo, setStudyInfo] = useState<any>(null);
  const [loadingStudy, setLoadingStudy] = useState(false);
  const [finishRetrieveData, setfinishRetrieveData] = useState(false);
  const [form] = Form.useForm();

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
      getHousingData(String(studyId), String(candidateId))
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

  const submitFlow = (values: any) => {
    setLoadingStudy(true);
    const data = {
      studyId,
      housingInformation: {
        housingStatus: values.housingStatus,
        accessRoads: values.accessRoads,
        externalPresentation: values.externalPresentation,
        internalPresentation: values.internalPresentation,
        numberFamiliesLivingIn: values.numberFamiliesLivingIn,
        totalPersonsInTheDwelling: values.totalPersonsInTheDwelling,
        environmentOfTheSector: values.environmentOfTheSector,
        descriptionOfTheHouse: values.descriptionOfTheHouse,
        vulnerabilityOfTheSector: values.vulnerabilityOfTheSector,
        publicServicesAndDomiciliaryServices:
          values.publicServicesAndDomiciliaryServices,
      },
      neighborsInformation: values.neighborhoodData.map((item: any) => {
        return {
          studyId,
          fullNames: item.fullNames,
          address: item.address,
          phone: item.phone,
          relationship: item.relationship,
        };
      }),
      ownsAssets: values.ownsAssets,
      hasBusinessInterests: values.hasBusinessInterests,
      housingPropertyItems: values.housingPropertyItems,
      housingDataRemarks: values.remarks,
    };
    loadHousingData(data)
      .then((res) => {
        if (res) {
          showSuccess(res.data);
          onChangeStep(4);
          setLoadingStudy(false);
        }
      })
      .catch((err) => {
        console.error(err);
        setLoadingStudy(false);
        showError('No se ha podido guardar la información');
      });
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
            housingType: studyInfo ? studyInfo.housingData.houseType : '',
            from: studyInfo
              ? dayjs(studyInfo.housingData.dateFrom).format('YYYY/MM/DD')
              : '',
            partnerFullName: studyInfo ? studyInfo.housingData.ownerName : '',
            district: studyInfo ? studyInfo.housingData.district : '',
            phone: studyInfo ? studyInfo.housingData.phone : '',
            address: studyInfo ? studyInfo.housingData.address : '',
            stratum: studyInfo ? studyInfo.housingData.stratum : '',
            housingStatus:
              studyInfo?.housingInformation
                ? studyInfo.housingInformation.housingStatus
                : '',
            accessRoads:
              studyInfo?.housingInformation
                ? studyInfo.housingInformation.accessRoads
                : '',
            externalPresentation:
              studyInfo?.housingInformation
                ? studyInfo.housingInformation.externalPresentation
                : '',
            internalPresentation:
              studyInfo?.housingInformation
                ? studyInfo.housingInformation.internalPresentation
                : '',
            numberFamiliesLivingIn:
              studyInfo?.housingInformation
                ? studyInfo.housingInformation.numberFamiliesLivingIn
                : '',
            totalPersonsInTheDwelling:
              studyInfo?.housingInformation
                ? studyInfo.housingInformation.totalPersonsInTheDwelling
                : '',
            environmentOfTheSector:
              studyInfo?.housingInformation
                ? studyInfo.housingInformation.environmentOfTheSector
                : '',
            descriptionOfTheHouse:
              studyInfo?.housingInformation
                ? studyInfo.housingInformation.descriptionOfTheHouse
                : '',
            vulnerabilityOfTheSector:
              studyInfo?.housingInformation
                ? studyInfo.housingInformation.vulnerabilityOfTheSector
                : '',
            publicServicesAndDomiciliaryServices:
              studyInfo?.housingInformation
                ? studyInfo.housingInformation
                  .publicServicesAndDomiciliaryServices
                : '',
            peopleWithLiveData: studyInfo ? studyInfo.peopleWithLiveData : [],
            neighborhoodData: studyInfo ? studyInfo.neighborhoodData : [],
            housingPropertyItems: studyInfo
              ? studyInfo.housingPropertyItems
              : [],
            remarks: remarksData ? remarksData.housingDataRemarks : '',
            ownsAssets:
              studyInfo?.housingPropertyData
                ? studyInfo.housingPropertyData.ownsAssets
                : false,
            hasBusinessInterests:
              studyInfo?.housingPropertyData
                ? studyInfo.housingPropertyData.hasBusinessInterests
                : false,
          }}
          onFinish={submitFlow}
        >
          <div className="section">
            <Form.Item
              className="input_element_flow_operation"
              label="Tipo"
              name="housingType"
            >
              <Input className="w_100" disabled />
            </Form.Item>

            <Form.Item
              className="input_element_flow_operation"
              label="Zona de vivienda"
              name="district"
            >
              <Input className="w_100" disabled />
            </Form.Item>

            <Form.Item
              className="input_element_flow_operation"
              label="Desde"
              name="from"
            >
              <Input className="w_100" disabled />
            </Form.Item>

            <Form.Item
              className="input_element_flow_operation"
              label="Nombre Propietario"
              name="partnerFullName"
            >
              <Input className="w_100" disabled />
            </Form.Item>

            <Form.Item
              className="input_element_flow_operation"
              label="Teléfono"
              name="phone"
            >
              <Input className="w_100" disabled />
            </Form.Item>

            <Form.Item
              className="input_element_flow_operation"
              label="Dirección"
              name="address"
            >
              <Input className="w_100" disabled />
            </Form.Item>
          </div>

          <div className="section">
            <Form.Item
              className="input_element_flow_operation"
              label="Barrio"
              name="district"
            >
              <Input className="w_100" disabled />
            </Form.Item>

            <OperationalParameterList
              listId="7"
              className="input_element_flow_operation"
              label="Estado de Vivienda"
              name="housingStatus"
              placeHolder="Estado de Vivienda"
              required={false}
            />

            <OperationalParameterList
              listId="7"
              className="input_element_flow_operation"
              label="Vías de acceso"
              name="accessRoads"
              placeHolder="Vías de acceso"
              required={false}
            />

            <OperationalParameterList
              listId="7"
              className="input_element_flow_operation"
              label="Presentación Externa"
              name="externalPresentation"
              placeHolder="Presentación Externa"
              required={false}
            />

            <OperationalParameterList
              listId="7"
              className="input_element_flow_operation"
              label="Presentación Interna"
              name="internalPresentation"
              placeHolder="Presentación Interna"
              required={false}
            />

            <Form.Item
              className="input_element_flow_operation"
              label="No. Familias que habitan en la vivienda"
              name="numberFamiliesLivingIn"
            >
              <Input className="w_100" />
            </Form.Item>
          </div>

          <div className="section">
            <Form.Item
              className="input_element_flow_operation"
              label="Total Personas que habitan en la vivienda"
              name="totalPersonsInTheDwelling"
            >
              <Input className="w_100" />
            </Form.Item>

            <Form.Item
              className="input_element_flow_operation"
              label="Estrato"
              name="stratum"
            >
              <Input className="w_100" disabled />
            </Form.Item>

            <OperationalParameterList
              listId="7"
              className="input_element_flow_operation"
              label="Entorno del sector"
              name="environmentOfTheSector"
              placeHolder="Entorno del sector"
              required={false}
            />

            <Form.Item
              className="input_element_flow_operation"
              label="Descripción de la vivienda"
              name="descriptionOfTheHouse"
            >
              <Input className="w_100" />
            </Form.Item>

            <Form.Item
              className="input_element_flow_operation"
              label="Vulnerabilidad del sector"
              name="vulnerabilityOfTheSector"
            >
              <Input className="w_100" />
            </Form.Item>

            <Form.Item
              className="input_element_flow_operation"
              label="Servicios públicos y domiciliarios"
              name="publicServicesAndDomiciliaryServices"
            >
              <Input className="w_100" />
            </Form.Item>
          </div>

          <div
            className="flow_title_container"
            style={{ width: '100%', marginTop: 20, marginBottom: 20 }}
          >
            <div className="flow_title_box">
              <h3>FAMILIARES O PERSONAS QUE CONVIVEN CON EL EVALUADO(A)</h3>
            </div>

            <Form.List name="peopleWithLiveData">
              {(fields) => (
                <div>
                  {fields.length > 0 ? (
                    fields.map(({ key, name, ...restField }) => (
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
                            label="Nombres completos"
                            name={[name, 'fullName']}
                          >
                            <Input className="w_100" disabled />
                          </Form.Item>

                          <Form.Item
                            {...restField}
                            className="input_element_flow_operation"
                            label="Edad"
                            name={[name, 'age']}
                          >
                            <Input className="w_100" disabled />
                          </Form.Item>

                          <Form.Item
                            {...restField}
                            className="input_element_flow_operation"
                            label="Telefono"
                            name={[name, 'phone']}
                          >
                            <Input className="w_100" disabled />
                          </Form.Item>

                          <Form.Item
                            {...restField}
                            className="input_element_flow_operation"
                            label="Profesión u Oficio"
                            name={[name, 'profession']}
                          >
                            <Input className="w_100" disabled />
                          </Form.Item>
                        </div>
                      </Space>
                    ))
                  ) : (
                    <span>No hay información cargada por el usuario</span>
                  )}
                </div>
              )}
            </Form.List>
          </div>

          <div
            className="flow_title_container"
            style={{ width: '100%', marginBottom: 20 }}
          >
            <div className="flow_title_box">
              <h3>INFORMACIÓN Y/O REFERENCIA DE VECINOS DEL EVALUADO(A)</h3>
            </div>

            <Form.List name="neighborhoodData">
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
                          label="Nombres completos"
                          name={[name, 'fullNames']}
                        >
                          <Input className="w_100" />
                        </Form.Item>

                        <Form.Item
                          {...restField}
                          className="input_element_flow_operation"
                          label="Dirección y/o barrio"
                          name={[name, 'address']}
                        >
                          <Input className="w_100" />
                        </Form.Item>

                        <Form.Item
                          {...restField}
                          className="input_element_flow_operation"
                          label="Telefono"
                          name={[name, 'phone']}
                        >
                          <Input className="w_100" />
                        </Form.Item>

                        <ParameterList
                          {...restField}
                          groupId="16"
                          className="input_element_flow_operation"
                          label="Relación"
                          name={[name, 'relationship']}
                          placeHolder="Relación"
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
          </div>

          <div
            className="flow_title_container"
            style={{ width: '100%', marginBottom: 20 }}
          >
            <div className="flow_title_box">
              <h3>BIENES O INMUEBLES CON LOS QUE CUENTA</h3>
            </div>

            <div className="section">
              <Form.Item
                className="input_element_flow_operation"
                label="Posee bienes o inmuebles"
                name="ownsAssets"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>

              <Form.Item
                className="input_element_flow_operation"
                label="Tiene participación en alguna empresa o negocio"
                name="hasBusinessInterests"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </div>

            <Form.List name="housingPropertyItems">
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
                          label="Bien o inmueble"
                          name={[name, 'name']}
                        >
                          <Input className="w_100" />
                        </Form.Item>

                        <Form.Item
                          {...restField}
                          className="input_element_flow_operation"
                          label="Cantidad"
                          name={[name, 'quantity']}
                        >
                          <Input className="w_100" />
                        </Form.Item>

                        <Form.Item
                          {...restField}
                          className="input_element_flow_operation"
                          label="Descripción"
                          name={[name, 'description']}
                        >
                          <Input className="w_100" />
                        </Form.Item>

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
          </div>

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
