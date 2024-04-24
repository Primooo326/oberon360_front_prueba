import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Radio, Select, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import type { StudiesProps } from '@/models/i+c/props/StepsProps';
import SimpleLoading from '@/components/i+c/ui/SimpleLoading';
import {
  getFamilyData,
  getStudyFamilyData,
  getVisitDomicilaryRemarks,
  loadFamilyData,
} from '@/api/i+c/Studies';
import { getCharges } from '@/api/i+c/Core';
import ParameterList from '@/components/i+c/common/ParameterList';
import { showError, showSuccess } from '@/components/i+c/ui/Toast';

const { TextArea } = Input;

export default function StudyHomeVisitStep2({
  studyId,
  candidateId,
  onChangeStep,
}: StudiesProps) {
  const [remarksData, setRemarksData] = useState<any>(null);
  const [candidateInfo, setCandidateInfo] = useState<any>(null);
  const [studyInfo, setStudyInfo] = useState<any>(null);
  const [finishRetrieveData, setfinishRetrieveData] = useState(false);
  const [chargesList, setChargesList] = useState([]);
  const [loadingStudy, setLoadingStudy] = useState(false);
  const [finishCallCatalogs, setFinishCallCatalogs] = useState(false);
  const [hasFamyliWorkinControl, setHasFamyliWorkinControl] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (!finishCallCatalogs) {
      getCharges()
        .then((res) => {
          if (res) {
            setChargesList(res.data);
            setFinishCallCatalogs(true);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [finishCallCatalogs]);

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
      getStudyFamilyData(String(studyId))
        .then((res) => {
          if (res) {
            setStudyInfo(res.data);
          }
        })
        .catch((err) => {
          console.error(err);
        });
      getFamilyData(candidateId)
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

  const submitFlow = (values: any) => {
    setLoadingStudy(true);
    const data = {
      studyId,
      familyInformation: values.familyMembersWorkingInTheCompany
        ? values.familyMembersWorkingInTheCompany.map((item: any) => {
          return {
            fullNames: item.fullNames,
            relationShip: item.relationShip,
            charge: item.charge,
            phone: item.phone,
          };
        })
        : [],
      familyDataRemarks: values.remarks,
    };
    loadFamilyData(data)
      .then((res) => {
        if (res) {
          showSuccess(res.data);
          onChangeStep(2);
          setLoadingStudy(false);
        }
      })
      .catch((err) => {
        console.error(err);
        setLoadingStudy(false);
        showError('No se ha podido guardar la información');
      });
  };

  const handleChangeFamilyWorkingData = (e: any) => {
    setHasFamyliWorkinControl(
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
            motherName: candidateInfo.parentsData.motherName
              ? candidateInfo.parentsData.motherName
              : '',
            motherAdrress: candidateInfo.parentsData.motherAdrress
              ? candidateInfo.parentsData.motherAdrress
              : '',
            motherAge: candidateInfo.parentsData.motherAge
              ? candidateInfo.parentsData.motherAge
              : '',
            motherPhone: candidateInfo.parentsData.motherPhone
              ? candidateInfo.parentsData.motherPhone
              : '',
            motherLives: candidateInfo
              ? candidateInfo.parentsData.motherLives  === true
              : '',
            motherLivesWith: candidateInfo.parentsData.motherLivesWith
              ? candidateInfo.parentsData.motherLivesWith
              : '',
            motherProfession: candidateInfo.parentsData.motherProfession
              ? candidateInfo.parentsData.motherProfession
              : '',
            motherCellPhone: candidateInfo.parentsData.motherCellPhone
              ? candidateInfo.parentsData.motherCellPhone
              : '',
            fatherName: candidateInfo.parentsData.fatherName
              ? candidateInfo.parentsData.fatherName
              : '',
            fatherAdrress: candidateInfo.parentsData.fatherAdrress
              ? candidateInfo.parentsData.fatherAdrress
              : '',
            fatherAge: candidateInfo.parentsData.fatherAge
              ? candidateInfo.parentsData.fatherAge
              : '',
            fatherPhone: candidateInfo.parentsData.fatherPhone
              ? candidateInfo.parentsData.fatherPhone
              : '',
            fatherLives: candidateInfo
              ? candidateInfo.parentsData.fatherLives  === true
              : '',
            fatherLivesWith: candidateInfo.parentsData.fatherLivesWith
              ? candidateInfo.parentsData.fatherLivesWith
              : '',
            fatherProfession: candidateInfo.parentsData.fatherProfession
              ? candidateInfo.parentsData.fatherProfession
              : '',
            fatherCellPhone: candidateInfo.parentsData.fatherCellPhone
              ? candidateInfo.parentsData.fatherCellPhone
              : '',
            siblingsData:
              candidateInfo.siblingsData &&
                candidateInfo.siblingsData.length > 0
                ? candidateInfo.siblingsData
                : [],
            hasFamilyWorking:
              !!(
              studyInfo?.familyData &&
                studyInfo.familyData.length > 0),
            familyMembersWorkingInTheCompany:
              studyInfo?.familyData ? studyInfo.familyData : [],
            remarks: remarksData ? remarksData.familyDataRemarks : '',
          }}
          onFinish={submitFlow}
        >
          <div className="section">
            <Form.Item
              className="input_element_flow_operation"
              label="Nombres completos de la madre"
              name="motherName"
            >
              <Input className="w_100" disabled />
            </Form.Item>

            <Form.Item
              className="input_element_flow_operation"
              style={{ width: 300, margin: 4 }}
              name="motherLives"
              label="¿Vive?"
            >
              <Radio.Group
                style={{
                  display: 'flex',
                  justifyContent: 'space-evenly',
                }}
                disabled
              >
                <Radio value={true}>Sí</Radio>
                <Radio value={false}>No</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              className="input_element_flow_operation"
              label="¿Convive con el evaluado?"
              style={{ width: 300, margin: 4 }}
              name="motherLivesWith"
            >
              <Radio.Group
                style={{
                  display: 'flex',
                  justifyContent: 'space-evenly',
                }}
                disabled
              >
                <Radio value={true}>Sí</Radio>
                <Radio value={false}>No</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              className="input_element_flow_operation"
              label="Edad"
              name="motherAge"
            >
              <Input className="w_100" disabled />
            </Form.Item>

            <Form.Item
              className="input_element_flow_operation"
              label="Dirección"
              name="motherAdrress"
            >
              <Input className="w_100" disabled />
            </Form.Item>

            <Form.Item
              className="input_element_flow_operation"
              label="Telefono Fijo"
              name="motherPhone"
            >
              <Input className="w_100" disabled />
            </Form.Item>

            <Form.Item
              className="input_element_flow_operation"
              label="Telefono Celular"
              name="motherCellPhone"
            >
              <Input className="w_100" disabled />
            </Form.Item>

            <Form.Item
              className="input_element_flow_operation"
              label="Profesión u Oficio"
              name="motherProfession"
            >
              <Input className="w_100" disabled />
            </Form.Item>
          </div>

          <div className="section">
            <Form.Item
              className="input_element_flow_operation"
              label="Nombres completos del padre"
              name="fatherName"
            >
              <Input className="w_100" disabled />
            </Form.Item>

            <Form.Item
              className="input_element_flow_operation"
              style={{ width: 300, margin: 4 }}
              label="¿Vive?"
              name="fatherLives"
            >
              <Radio.Group
                style={{
                  display: 'flex',
                  justifyContent: 'space-evenly',
                }}
                disabled
              >
                <Radio value={true}>Sí</Radio>
                <Radio value={false}>No</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              className="input_element_flow_operation"
              style={{ width: 300, margin: 4 }}
              label="¿Convive con el evaluado?"
              name="fatherLivesWith"
            >
              <Radio.Group
                style={{
                  display: 'flex',
                  justifyContent: 'space-evenly',
                }}
                disabled
              >
                <Radio value={true}>Sí</Radio>
                <Radio value={false}>No</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              className="input_element_flow_operation"
              label="Edad"
              name="fatherAge"
            >
              <Input className="w_100" disabled />
            </Form.Item>

            <Form.Item
              className="input_element_flow_operation"
              label="Dirección"
              name="fatherAdrress"
            >
              <Input className="w_100" disabled />
            </Form.Item>

            <Form.Item
              className="input_element_flow_operation"
              label="Telefono Fijo"
              name="fatherPhone"
            >
              <Input className="w_100" disabled />
            </Form.Item>

            <Form.Item
              className="input_element_flow_operation"
              label="Telefono Celular"
              name="fatherCellPhone"
            >
              <Input className="w_100" disabled />
            </Form.Item>

            <Form.Item
              className="input_element_flow_operation"
              label="Profesión u Oficio"
              name="fatherProfession"
            >
              <Input className="w_100" disabled />
            </Form.Item>

            <Form.List name="siblingsData">
              {(fields, { }) => (
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
                          label="Nombres completos Hermanos"
                          name={[name, 'fullName']}
                        >
                          <Input className="w_100" disabled />
                        </Form.Item>

                        <Form.Item
                          {...restField}
                          className="input_element_flow_operation"
                          style={{ width: 300, margin: 4 }}
                          name={[name, 'lives']}
                          label="¿Vive?"
                        >
                          <Radio.Group
                            style={{
                              display: 'flex',
                              justifyContent: 'space-evenly',
                            }}
                            disabled
                          >
                            <Radio value={true}>Sí</Radio>
                            <Radio value={false}>No</Radio>
                          </Radio.Group>
                        </Form.Item>

                        <Form.Item
                          {...restField}
                          className="input_element_flow_operation"
                          label="¿Convive con el evaluado?"
                          style={{ width: 300, margin: 4 }}
                          name={[name, 'livesWith']}
                        >
                          <Radio.Group
                            style={{
                              display: 'flex',
                              justifyContent: 'space-evenly',
                            }}
                            disabled
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
                          <Input className="w_100" disabled />
                        </Form.Item>

                        <Form.Item
                          {...restField}
                          className="input_element_flow_operation"
                          label="Dirección de residencia"
                          name={[name, 'address']}
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
                          label="Barrio"
                          name={[name, 'district']}
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
                  ))}
                </div>
              )}
            </Form.List>

            <div className="flow_title_container" style={{ width: '100%' }}>
              <div className="flow_title_box">
                <h3>¿TIENE FAMILIARES QUE TRABAJEN EN LA EMPRESA?</h3>
              </div>

              <div className="section">
                <Form.Item
                  className="input_element_flow_operation"
                  name="hasFamilyWorking"
                >
                  <Radio.Group
                    style={{
                      display: 'flex',
                      justifyContent: 'space-evenly',
                    }}
                    onChange={handleChangeFamilyWorkingData}
                  >
                    <Radio value={true}>Sí</Radio>
                    <Radio value={false}>No</Radio>
                  </Radio.Group>
                </Form.Item>
              </div>

              {hasFamyliWorkinControl === true && (
                <Form.List name="familyMembersWorkingInTheCompany">
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
                              label="Nombres y Apelldios"
                              name={[name, 'fullNames']}
                              rules={[
                                {
                                  required: true,
                                  message: 'Ingresa el nombre completo!',
                                },
                              ]}
                            >
                              <Input className="w_100" />
                            </Form.Item>

                            <ParameterList
                              className="input_element_flow_operation"
                              fieldProps={restField}
                              groupId="16"
                              label="Parentesco"
                              name={[name, 'relationShip']}
                              placeHolder="Parentesco"
                              requiredMessage="Selecciona el Parentesco!"
                            />

                            <Form.Item
                              {...restField}
                              className="input_element_flow_operation"
                              label="Cargo"
                              name={[name, 'charge']}
                              rules={[
                                {
                                  required: true,
                                  message: 'Selecciona el cargo!',
                                },
                              ]}
                            >
                              <Select placeholder="Cargo">
                                {chargesList.map((charge: any) => (
                                  <Select.Option
                                    key={charge.id}
                                    value={charge.id}
                                  >
                                    {charge.value}
                                  </Select.Option>
                                ))}
                              </Select>
                            </Form.Item>

                            <Form.Item
                              {...restField}
                              className="input_element_flow_operation"
                              label="Telefono"
                              name={[name, 'phone']}
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
              )}
            </div>

            <div className="section w_100">
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
