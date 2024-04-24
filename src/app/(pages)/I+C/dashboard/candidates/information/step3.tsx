import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import CandidatesLayoutComponent from '@/components/i+c/layout/Candidates';
import BreadcrumbComponent from '@/components/i+c/ui/Breadcrumb';
import { Button, Form, Input, InputNumber, Select, Space } from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';
import type { CandidatesStep3FieldType } from '@/models/i+c/FormTypes';
import YesOrNot from '@/components/i+c/common/YesOrNot';
import HelmetTitle from '@/components/i+c/ui/HelmetTitle';
import ParameterList from '@/components/i+c/common/ParameterList';
import { loadParentsAndSiblingsData } from '@/api/i+c/Candidates';
import { showError, showSuccess } from '@/components/i+c/ui/Toast';
import { useICCandidatesStore } from '@/states/i+c/I+C-candidates.state';

export default function CandidatesInformationStep3() {
  const [loadingSave, setloadingSave] = useState(false);
  const router = useRouter();
  const [form] = Form.useForm();
  const { saveParentsAndSiblingsData, parentSiblingsData, finishProcess } = useICCandidatesStore()

  function changeData(event: any) {
    const value: any = Object.values(event)[0];
    const key = Object.keys(event)[0];
    const mapParentSiblingsData: CandidatesStep3FieldType = {
      ...parentSiblingsData,
    };
    if (key === 'numberOfSiblings') {
      const siblingInfo = form.getFieldValue('siblingInformation');
      const currentItemCount = siblingInfo?.length;
      let newSiblings: any;
      if (value > currentItemCount) {
        const itemsToAdd = value - currentItemCount;
        newSiblings = [...siblingInfo];
        for (let index = 0; index < itemsToAdd; index++) {
          newSiblings.push({
            fullName: '',
            profession: '',
            address: '',
            phone: '',
          });
        }
      } else if (value < currentItemCount) {
        newSiblings = siblingInfo.slice(0, value);
      }
      form.setFieldValue('siblingInformation', newSiblings);
    }
    if (key === 'siblingInformation') {
      const item = value;
      const itemIndex: number = Number(Object.keys(item)[0]);
      const itemKey = Object.keys(item[itemIndex])[0];
      const itemValue = Object.values(item[itemIndex])[0];
      const mapSiblingInformation: any[] = [
        ...mapParentSiblingsData.siblingInformation,
      ];
      const updatedObject = {
        ...mapSiblingInformation[itemIndex],
        [itemKey]: itemValue,
      };
      mapSiblingInformation[itemIndex] = updatedObject;
      mapParentSiblingsData.siblingInformation = mapSiblingInformation;
    } else {
      mapParentSiblingsData[key] = value;
    }
    saveParentsAndSiblingsData(mapParentSiblingsData)
  }

  function onFinish(values: any) {
    setloadingSave(true);
    const data: any = {
      ...parentSiblingsData,
      fatherLives: values.fatherLives,
      motherLives: values.motherLives,
      siblingInformation: parentSiblingsData.siblingInformation.map(
        (item: any, index: number) => {
          return {
            ...item,
            indexItem: index,
          };
        }
      ),
    };
    parentSiblingsData.fatherCellPhone &&
      (data.fatherCellPhone = String(parentSiblingsData.fatherCellPhone));
    parentSiblingsData.fatherPhone &&
      (data.fatherPhone = String(parentSiblingsData.fatherPhone));
    parentSiblingsData.motherCellPhone &&
      (data.motherCellPhone = String(parentSiblingsData.motherCellPhone));
    parentSiblingsData.motherPhone &&
      (data.motherPhone = String(parentSiblingsData.motherPhone));
    loadParentsAndSiblingsData(data)
      .then((res) => {
        if (res) {
          showSuccess(res.data);
          router.push('/I+C/dashboard/candidates/information/step4');
          setloadingSave(false);
        }
      })
      .catch(() => {
        setloadingSave(false);
        showError('Error al cargar la información');
      });
  }

  return (
    <CandidatesLayoutComponent>
      <HelmetTitle title="Datos Familiares Padres" />

      <section>
        <div className="step">
          <h1>DATOS FAMILIARES PADRES</h1>

          <BreadcrumbComponent />

          <div className="form_container">
            <Form
              form={form}
              onValuesChange={(_) => {
                changeData(_);
              }}
              className="form_box"
              name="basic"
              style={{ width: '100%' }}
              initialValues={{
                motherName:
                  parentSiblingsData?.motherName
                    ? parentSiblingsData.motherName
                    : '',
                motherAdrress:
                  parentSiblingsData?.motherAdrress
                    ? parentSiblingsData.motherAdrress
                    : '',
                motherAge:
                  parentSiblingsData?.motherAge
                    ? parentSiblingsData.motherAge
                    : '',
                motherPhone:
                  parentSiblingsData?.motherPhone
                    ? parentSiblingsData.motherPhone
                    : '',
                motherProfession:
                  parentSiblingsData?.motherProfession
                    ? parentSiblingsData.motherProfession
                    : '',
                motherCellPhone:
                  parentSiblingsData?.motherCellPhone
                    ? parentSiblingsData.motherCellPhone
                    : '',
                motherLives: parentSiblingsData
                  ? !!parentSiblingsData.motherLives
                  : '',
                motherLivesWith: parentSiblingsData
                  ? !!parentSiblingsData.motherLivesWith
                  : '',
                fatherName:
                  parentSiblingsData?.fatherName
                    ? parentSiblingsData.fatherName
                    : '',
                fatherAdrress:
                  parentSiblingsData?.fatherAdrress
                    ? parentSiblingsData.fatherAdrress
                    : '',
                fatherAge:
                  parentSiblingsData?.fatherAge
                    ? parentSiblingsData.fatherAge
                    : '',
                fatherPhone:
                  parentSiblingsData?.fatherPhone
                    ? parentSiblingsData.fatherPhone
                    : '',
                fatherProfession:
                  parentSiblingsData?.fatherProfession
                    ? parentSiblingsData.fatherProfession
                    : '',
                fatherCellPhone:
                  parentSiblingsData?.fatherCellPhone
                    ? parentSiblingsData.fatherCellPhone
                    : '',
                fatherLives: parentSiblingsData
                  ? !!parentSiblingsData.fatherLives
                  : '',
                fatherLivesWith: parentSiblingsData
                  ? !!parentSiblingsData.fatherLivesWith
                  : '',
                numberOfSiblings:
                  parentSiblingsData &&
                    parentSiblingsData.siblingInformation.length > 0
                    ? parentSiblingsData.siblingInformation.length
                    : 0,
                siblingInformation:
                  parentSiblingsData.siblingInformation &&
                    parentSiblingsData.siblingInformation.length > 0
                    ? parentSiblingsData.siblingInformation
                    : [],
              }}
              onFinish={onFinish}
            >
              <div className="section">
                <Form.Item<CandidatesStep3FieldType>
                  className="input_element"
                  label="Nombres Completos de la madre"
                  name="motherName"
                  rules={[
                    {
                      required: true,
                      message: 'Ingresa el Nombre Completo!',
                    },
                  ]}
                >
                  <Input
                    placeholder="Nombres Completos"
                    disabled={finishProcess}
                  />
                </Form.Item>

                <YesOrNot
                  label="¿Vive?"
                  name="motherLives"
                  requiredMessage="Selecciona una opción"
                  disabled={finishProcess}
                />

                {parentSiblingsData.motherLives && (
                  <>
                    <Form.Item<CandidatesStep3FieldType>
                      className="input_element"
                      label="Dirección"
                      name="motherAdrress"
                      rules={[
                        {
                          required: true,
                          message: 'Ingresa la dirección',
                        },
                      ]}
                    >
                      <Input placeholder="Dirección" disabled={finishProcess} />
                    </Form.Item>

                    <Form.Item<CandidatesStep3FieldType>
                      className="input_element"
                      label="Edad"
                      name="motherAge"
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
                        disabled={finishProcess}
                      />
                    </Form.Item>

                    <Form.Item<CandidatesStep3FieldType>
                      className="input_element"
                      label="Telefono"
                      name="motherPhone"
                    >
                      <InputNumber
                        className="w_100"
                        placeholder="Telefono"
                        type="number"
                        disabled={finishProcess}
                      />
                    </Form.Item>

                    <YesOrNot
                      label="¿Vive con ella?"
                      name="motherLivesWith"
                      requiredMessage="Selecciona una opción"
                      disabled={finishProcess}
                    />

                    <ParameterList
                      groupId="15"
                      label="Profesión"
                      name="motherProfession"
                      placeHolder="Profesión"
                      requiredMessage="Selecciona un Profesión!"
                      disabled={finishProcess}
                    />

                    <Form.Item<CandidatesStep3FieldType>
                      className="input_element"
                      label="Celular"
                      name="motherCellPhone"
                      rules={[
                        {
                          required: true,
                          message: 'Ingresa el Celular!',
                        },
                      ]}
                    >
                      <InputNumber
                        className="w_100"
                        placeholder="Celular"
                        type="number"
                        disabled={finishProcess}
                      />
                    </Form.Item>
                  </>
                )}
              </div>

              <div className="section">
                <Form.Item<CandidatesStep3FieldType>
                  className="input_element"
                  label="Nombres Completos del padre"
                  name="fatherName"
                  rules={[
                    {
                      required: true,
                      message: 'Ingresa el Nombre Completo!',
                    },
                  ]}
                >
                  <Input
                    placeholder="Nombres Completos"
                    disabled={finishProcess}
                  />
                </Form.Item>

                <YesOrNot
                  label="¿Vive?"
                  name="fatherLives"
                  requiredMessage="Selecciona una opción"
                  disabled={finishProcess}
                />

                {parentSiblingsData.fatherLives && (
                  <>
                    <Form.Item<CandidatesStep3FieldType>
                      className="input_element"
                      label="Dirección"
                      name="fatherAdrress"
                      rules={[
                        {
                          required: true,
                          message: 'Ingresa la dirección',
                        },
                      ]}
                    >
                      <Input placeholder="Dirección" disabled={finishProcess} />
                    </Form.Item>

                    <Form.Item<CandidatesStep3FieldType>
                      className="input_element"
                      label="Edad"
                      name="fatherAge"
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
                        disabled={finishProcess}
                      />
                    </Form.Item>

                    <Form.Item<CandidatesStep3FieldType>
                      className="input_element"
                      label="Telefono"
                      name="fatherPhone"
                    >
                      <InputNumber
                        className="w_100"
                        placeholder="Telefono"
                        type="number"
                        disabled={finishProcess}
                      />
                    </Form.Item>

                    <YesOrNot
                      label="¿Vive con el?"
                      name="fatherLivesWith"
                      requiredMessage="Selecciona una opción"
                      disabled={finishProcess}
                    />

                    <ParameterList
                      groupId="15"
                      label="Profesión"
                      name="fatherProfession"
                      placeHolder="Profesión"
                      requiredMessage="Selecciona un Profesión!"
                      disabled={finishProcess}
                    />

                    <Form.Item<CandidatesStep3FieldType>
                      className="input_element"
                      label="Celular"
                      name="fatherCellPhone"
                      rules={[
                        {
                          required: true,
                          message: 'Ingresa el Celular!',
                        },
                      ]}
                    >
                      <InputNumber
                        className="w_100"
                        placeholder="Celular"
                        type="number"
                        disabled={finishProcess}
                      />
                    </Form.Item>
                  </>
                )}
              </div>

              <div className="step step_2">
                <h1>DATOS FAMILIARES HERMANOS</h1>

                <div className="section">
                  <Form.Item<CandidatesStep3FieldType>
                    className="input_element"
                    label="No. de Hermanos."
                    name="numberOfSiblings"
                    rules={[
                      {
                        required: true,
                        message: 'Selecciona el No. de Hermanos!',
                      },
                    ]}
                  >
                    <Select
                      className="w_100"
                      placeholder="No. de Hermanos"
                      disabled={finishProcess}
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

                <Form.List name="siblingInformation">
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
                                  message: 'Ingresa el nombre completo!',
                                },
                              ]}
                            >
                              <Input
                                placeholder="Nombres Completos"
                                disabled={finishProcess}
                              />
                            </Form.Item>

                            <ParameterList
                              fieldProps={restField}
                              groupId="15"
                              label="Profesión"
                              name={[name, 'profession']}
                              placeHolder="Profesión"
                              requiredMessage="Selecciona un Profesión!"
                              disabled={finishProcess}
                            />

                            <Form.Item
                              {...restField}
                              className="input_element"
                              label="Dirección/Barrio"
                              name={[name, 'address']}
                              rules={[
                                {
                                  required: true,
                                  message: 'Ingresa la Dirección/Barrio!',
                                },
                              ]}
                            >
                              <Input
                                placeholder="Dirección/Barrio"
                                disabled={finishProcess}
                              />
                            </Form.Item>

                            <Form.Item
                              {...restField}
                              className="input_element"
                              label="Telefono"
                              name={[name, 'phone']}
                            >
                              <Input
                                placeholder="Telefono"
                                disabled={finishProcess}
                              />
                            </Form.Item>

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
