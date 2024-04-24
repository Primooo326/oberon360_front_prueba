import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Radio, Select, Space, Upload } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { ConceptEnums, ConceptEnumsLabels } from '@/models/i+c/ConceptsEnum';
import { beforeUpload } from '@/utils/i+c/helpers';
import { showError, showSuccess } from '../ui/Toast';
import type { SimpleStudyProps } from '@/models/i+c/props/StepsProps';
import ParameterList from '../common/ParameterList';
import {
  getStudyBackgroundCheckData,
  loadStudyBackgroundCheckData,
} from '@/api/i+c/Studies';
import SimpleLoading from '../ui/SimpleLoading';
import type { RcFile } from 'antd/es/upload';

export default function StudyFlowBackgroundCheck({
  studyId,
}: SimpleStudyProps) {
  const [studyInfo, setStudyInfo] = useState<any>(null);
  const [loadingStudy, setLoadingStudy] = useState(false);
  const [finishRetrieveData, setfinishRetrieveData] = useState(false);
  const [defaultFiles, setDefaultFiles] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    if (!finishRetrieveData) {
      getStudyBackgroundCheckData(String(studyId))
        .then((res) => {
          if (res) {
            setStudyInfo(res.data);
            res.data.annexes.length > 0 && setDefaultFiles(res.data.annexes);
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
    const formData = new FormData();
    const studyData = {
      studyId,
      ...values,
      familyHistoryData: values.familyHistory.map((item: any) => {
        return {
          studyId,
          ...item,
        };
      }),
    };
    formData.append('studyData', JSON.stringify(studyData));
    values.annexes?.file.originFileObj &&
      formData.append(
        'file',
        values.annexes.file.originFileObj as RcFile,
        values.annexes.file.originFileObj.name
      );
    loadStudyBackgroundCheckData(formData)
      .then((res) => {
        if (res) {
          showSuccess(res.data);
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
      <div className="flow_section_container">
        <div className="flow_title_container">
          <div className="flow_title_box">
            <h3>Verificación de antecedentes</h3>
          </div>
        </div>
        <div className="flow_content">
          <div className="form_container">
            <Form
              form={form}
              className="form_box"
              name="basic"
              style={{ width: '100%' }}
              initialValues={{
                nationalRegistryofCivilStatus:
                  studyInfo?.studyData
                    ? studyInfo.studyData.nationalRegistryofCivilStatus
                    : '',
                nationalRegistryofCivilStatusRemarks:
                  studyInfo?.studyData
                    ? studyInfo.studyData.nationalRegistryofCivilStatusRemarks
                    : '',
                nationalAttorneyGeneralsOffice:
                  studyInfo?.studyData
                    ? studyInfo.studyData.nationalAttorneyGeneralsOffice
                    : '',
                nationalAttorneyGeneralsOfficeRemarks:
                  studyInfo?.studyData
                    ? studyInfo.studyData.nationalAttorneyGeneralsOfficeRemarks
                    : '',
                generalComptrolleroftheNation:
                  studyInfo?.studyData
                    ? studyInfo.studyData.generalComptrolleroftheNation
                    : '',
                generalComptrolleroftheNationRemarks:
                  studyInfo?.studyData
                    ? studyInfo.studyData.generalComptrolleroftheNationRemarks
                    : '',
                nationalPoliceDisqualifications:
                  studyInfo?.studyData
                    ? studyInfo.studyData.nationalPoliceDisqualifications
                    : '',
                nationalPoliceDisqualificationsRemarks:
                  studyInfo?.studyData
                    ? studyInfo.studyData.nationalPoliceDisqualificationsRemarks
                    : '',
                NationalRegistrySystemofCorrectiveMeasuresRNMC:
                  studyInfo?.studyData
                    ? studyInfo.studyData
                      .NationalRegistrySystemofCorrectiveMeasuresRNMC
                    : '',
                NationalRegistrySystemofCorrectiveMeasuresRNMCRemarks:
                  studyInfo?.studyData
                    ? studyInfo.studyData
                      .NationalRegistrySystemofCorrectiveMeasuresRNMCRemarks
                    : '',
                judicialBranch:
                  studyInfo?.studyData
                    ? studyInfo.studyData.judicialBranch
                    : '',
                judicialBranchRemarks:
                  studyInfo?.studyData
                    ? studyInfo.studyData.judicialBranchRemarks
                    : '',
                restrictivelistrecords:
                  studyInfo?.studyData
                    ? studyInfo.studyData.restrictivelistrecords
                    : '',
                restrictivelistrecordsRemarks:
                  studyInfo?.studyData
                    ? studyInfo.studyData.restrictivelistrecordsRemarks
                    : '',
                ConsultationOfLAFTLists:
                  studyInfo?.studyData
                    ? studyInfo.studyData.ConsultationOfLAFTLists
                    : '',
                ConsultationOfLAFTListsRemarks:
                  studyInfo?.studyData
                    ? studyInfo.studyData.ConsultationOfLAFTListsRemarks
                    : '',
                ConsultationOfPEPSLists:
                  studyInfo?.studyData
                    ? studyInfo.studyData.ConsultationOfPEPSLists
                    : '',
                ConsultationOfPEPSListsRemarks:
                  studyInfo?.studyData
                    ? studyInfo.studyData.ConsultationOfPEPSListsRemarks
                    : '',
                SIMITTrafficInformation:
                  studyInfo?.studyData
                    ? studyInfo.studyData.SIMITTrafficInformation
                    : '',
                SIMITTrafficInformationRemarks:
                  studyInfo?.studyData
                    ? studyInfo.studyData.SIMITTrafficInformationRemarks
                    : '',
                RUNTTrafficInformation:
                  studyInfo?.studyData
                    ? studyInfo.studyData.RUNTTrafficInformation
                    : '',
                RUNTTrafficInformationRemarks:
                  studyInfo?.studyData
                    ? studyInfo.studyData.RUNTTrafficInformationRemarks
                    : '',
                Adverse:
                  studyInfo?.studyData
                    ? studyInfo.studyData.Adverse
                    : '',
                AdverseRemarks:
                  studyInfo?.studyData
                    ? studyInfo.studyData.AdverseRemarks
                    : '',
                MilitarySituation:
                  studyInfo?.studyData
                    ? studyInfo.studyData.MilitarySituation
                    : '',
                MilitarySituationRemarks:
                  studyInfo?.studyData
                    ? studyInfo.studyData.MilitarySituationRemarks
                    : '',
                familyHistory:
                  studyInfo?.backgroundCheckFamilyHistory &&
                    studyInfo.backgroundCheckFamilyHistory.length > 0
                    ? studyInfo.backgroundCheckFamilyHistory.map(
                      (item: any) => {
                        return {
                          fullName: item.fullName,
                          relationship: item.relationship,
                          remarks: item.remarks,
                        };
                      }
                    )
                    : [],
                concept:
                  studyInfo?.studyBackgroundCheckResult
                    ? studyInfo.studyBackgroundCheckResult.concept
                    : '',
                remarks:
                  studyInfo?.studyBackgroundCheckResult
                    ? studyInfo.studyBackgroundCheckResult.remarks
                    : '',
              }}
              onFinish={submitFlow}
            >
              <div>
                <div style={{ marginTop: 20 }}>
                  <table style={{ width: '100%' }}>
                    <tbody>
                      <tr>
                        <th colSpan={4} style={{ textAlign: 'start' }}>
                          ¿Registra anotaciones?
                        </th>
                        <th colSpan={4}>
                          <div
                            style={{
                              width: 140,
                              display: 'flex',
                              justifyContent: 'space-around',
                            }}
                          >
                            <span>Si</span>
                            <span>No</span>
                          </div>
                        </th>
                        <th colSpan={4} style={{ textAlign: 'start' }}>
                          Observaciones
                        </th>
                      </tr>

                      <tr>
                        <td colSpan={4}>
                          <label className="label_list">
                            Registraduría Nacional del Estado Civil{' '}
                            <span style={{ color: 'red' }}>*</span>
                          </label>
                        </td>
                        <td colSpan={4}>
                          <Form.Item
                            rules={[
                              {
                                required: true,
                                message: 'Selecciona una opción',
                              },
                            ]}
                            style={{ width: 140, margin: 4 }}
                            name="nationalRegistryofCivilStatus"
                          >
                            <Radio.Group
                              style={{
                                display: 'flex',
                                justifyContent: 'space-evenly',
                              }}
                            >
                              <Radio value={true} />
                              <Radio value={false} />
                            </Radio.Group>
                          </Form.Item>
                        </td>
                        <td colSpan={4}>
                          <Form.Item
                            style={{ width: '100%', margin: 4 }}
                            name="nationalRegistryofCivilStatusRemarks"
                          >
                            <Input style={{ width: '100%' }} />
                          </Form.Item>
                        </td>
                      </tr>

                      <tr>
                        <td colSpan={4}>
                          <label className="label_list">
                            Procuraduría General de la Nación{' '}
                            <span style={{ color: 'red' }}>*</span>
                          </label>
                        </td>
                        <td colSpan={4}>
                          <Form.Item
                            rules={[
                              {
                                required: true,
                                message: 'Selecciona una opción',
                              },
                            ]}
                            style={{ width: 140, margin: 4 }}
                            name="nationalAttorneyGeneralsOffice"
                          >
                            <Radio.Group
                              style={{
                                display: 'flex',
                                justifyContent: 'space-evenly',
                              }}
                            >
                              <Radio value={true} />
                              <Radio value={false} />
                            </Radio.Group>
                          </Form.Item>
                        </td>
                        <td colSpan={4}>
                          <Form.Item
                            style={{ width: '100%', margin: 4 }}
                            name="nationalAttorneyGeneralsOfficeRemarks"
                          >
                            <Input style={{ width: '100%' }} />
                          </Form.Item>
                        </td>
                      </tr>

                      <tr>
                        <td colSpan={4}>
                          <label className="label_list">
                            Contraloria General de la Nación{' '}
                            <span style={{ color: 'red' }}>*</span>
                          </label>
                        </td>
                        <td colSpan={4}>
                          <Form.Item
                            rules={[
                              {
                                required: true,
                                message: 'Selecciona una opción',
                              },
                            ]}
                            style={{ width: 140, margin: 4 }}
                            name="generalComptrolleroftheNation"
                          >
                            <Radio.Group
                              style={{
                                display: 'flex',
                                justifyContent: 'space-evenly',
                              }}
                            >
                              <Radio value={true} />
                              <Radio value={false} />
                            </Radio.Group>
                          </Form.Item>
                        </td>
                        <td colSpan={4}>
                          <Form.Item
                            style={{ width: '100%', margin: 4 }}
                            name="generalComptrolleroftheNationRemarks"
                          >
                            <Input style={{ width: '100%' }} />
                          </Form.Item>
                        </td>
                      </tr>

                      <tr>
                        <td colSpan={4}>
                          <label className="label_list">
                            Policia Nacional - Consulta de Inhabilidades{' '}
                            <span style={{ color: 'red' }}>*</span>
                          </label>
                        </td>
                        <td colSpan={4}>
                          <Form.Item
                            rules={[
                              {
                                required: true,
                                message: 'Selecciona una opción',
                              },
                            ]}
                            style={{ width: 140, margin: 4 }}
                            name="nationalPoliceDisqualifications"
                          >
                            <Radio.Group
                              style={{
                                display: 'flex',
                                justifyContent: 'space-evenly',
                              }}
                            >
                              <Radio value={true} />
                              <Radio value={false} />
                            </Radio.Group>
                          </Form.Item>
                        </td>
                        <td colSpan={4}>
                          <Form.Item
                            style={{ width: '100%', margin: 4 }}
                            name="nationalPoliceDisqualificationsRemarks"
                          >
                            <Input style={{ width: '100%' }} />
                          </Form.Item>
                        </td>
                      </tr>

                      <tr>
                        <td colSpan={4}>
                          <label className="label_list">
                            Sistema Registro Nacional de Medidas Correctivas -
                            RNMC <span style={{ color: 'red' }}>*</span>
                          </label>
                        </td>
                        <td colSpan={4}>
                          <Form.Item
                            rules={[
                              {
                                required: true,
                                message: 'Selecciona una opción',
                              },
                            ]}
                            style={{ width: 140, margin: 4 }}
                            name="NationalRegistrySystemofCorrectiveMeasuresRNMC"
                          >
                            <Radio.Group
                              style={{
                                display: 'flex',
                                justifyContent: 'space-evenly',
                              }}
                            >
                              <Radio value={true} />
                              <Radio value={false} />
                            </Radio.Group>
                          </Form.Item>
                        </td>
                        <td colSpan={4}>
                          <Form.Item
                            style={{ width: '100%', margin: 4 }}
                            name="NationalRegistrySystemofCorrectiveMeasuresRNMCRemarks"
                          >
                            <Input style={{ width: '100%' }} />
                          </Form.Item>
                        </td>
                      </tr>

                      <tr>
                        <td colSpan={4}>
                          <label className="label_list">
                            Rama Judicial{' '}
                            <span style={{ color: 'red' }}>*</span>
                          </label>
                        </td>
                        <td colSpan={4}>
                          <Form.Item
                            rules={[
                              {
                                required: true,
                                message: 'Selecciona una opción',
                              },
                            ]}
                            style={{ width: 140, margin: 4 }}
                            name="judicialBranch"
                          >
                            <Radio.Group
                              style={{
                                display: 'flex',
                                justifyContent: 'space-evenly',
                              }}
                            >
                              <Radio value={true} />
                              <Radio value={false} />
                            </Radio.Group>
                          </Form.Item>
                        </td>
                        <td colSpan={4}>
                          <Form.Item
                            style={{ width: '100%', margin: 4 }}
                            name="judicialBranchRemarks"
                          >
                            <Input style={{ width: '100%' }} />
                          </Form.Item>
                        </td>
                      </tr>

                      <tr>
                        <td colSpan={4}>
                          <label className="label_list">
                            Listas restrictivas{' '}
                            <span style={{ color: 'red' }}>*</span>
                          </label>
                        </td>
                        <td colSpan={4}>
                          <Form.Item
                            rules={[
                              {
                                required: true,
                                message: 'Selecciona una opción',
                              },
                            ]}
                            style={{ width: 140, margin: 4 }}
                            name="restrictivelistrecords"
                          >
                            <Radio.Group
                              style={{
                                display: 'flex',
                                justifyContent: 'space-evenly',
                              }}
                            >
                              <Radio value={true} />
                              <Radio value={false} />
                            </Radio.Group>
                          </Form.Item>
                        </td>
                        <td colSpan={4}>
                          <Form.Item
                            style={{ width: '100%', margin: 4 }}
                            name="restrictivelistrecordsRemarks"
                          >
                            <Input style={{ width: '100%' }} />
                          </Form.Item>
                        </td>
                      </tr>

                      <tr>
                        <td colSpan={4}>
                          <label className="label_list">
                            Listas LAFT <span style={{ color: 'red' }}>*</span>
                          </label>
                        </td>
                        <td colSpan={4}>
                          <Form.Item
                            rules={[
                              {
                                required: true,
                                message: 'Selecciona una opción',
                              },
                            ]}
                            style={{ width: 140, margin: 4 }}
                            name="ConsultationOfLAFTLists"
                          >
                            <Radio.Group
                              style={{
                                display: 'flex',
                                justifyContent: 'space-evenly',
                              }}
                            >
                              <Radio value={true} />
                              <Radio value={false} />
                            </Radio.Group>
                          </Form.Item>
                        </td>
                        <td colSpan={4}>
                          <Form.Item
                            style={{ width: '100%', margin: 4 }}
                            name="ConsultationOfLAFTListsRemarks"
                          >
                            <Input style={{ width: '100%' }} />
                          </Form.Item>
                        </td>
                      </tr>

                      <tr>
                        <td colSpan={4}>
                          <label className="label_list">
                            Listas PEPS <span style={{ color: 'red' }}>*</span>
                          </label>
                        </td>
                        <td colSpan={4}>
                          <Form.Item
                            rules={[
                              {
                                required: true,
                                message: 'Selecciona una opción',
                              },
                            ]}
                            style={{ width: 140, margin: 4 }}
                            name="ConsultationOfPEPSLists"
                          >
                            <Radio.Group
                              style={{
                                display: 'flex',
                                justifyContent: 'space-evenly',
                              }}
                            >
                              <Radio value={true} />
                              <Radio value={false} />
                            </Radio.Group>
                          </Form.Item>
                        </td>
                        <td colSpan={4}>
                          <Form.Item
                            style={{ width: '100%', margin: 4 }}
                            name="ConsultationOfPEPSListsRemarks"
                          >
                            <Input style={{ width: '100%' }} />
                          </Form.Item>
                        </td>
                      </tr>

                      <tr>
                        <td colSpan={4}>
                          <label className="label_list">
                            Información de Transito SIMIT{' '}
                            <span style={{ color: 'red' }}>*</span>
                          </label>
                        </td>
                        <td colSpan={4}>
                          <Form.Item
                            rules={[
                              {
                                required: true,
                                message: 'Selecciona una opción',
                              },
                            ]}
                            style={{ width: 140, margin: 4 }}
                            name="SIMITTrafficInformation"
                          >
                            <Radio.Group
                              style={{
                                display: 'flex',
                                justifyContent: 'space-evenly',
                              }}
                            >
                              <Radio value={true} />
                              <Radio value={false} />
                            </Radio.Group>
                          </Form.Item>
                        </td>
                        <td colSpan={4}>
                          <Form.Item
                            style={{ width: '100%', margin: 4 }}
                            name="SIMITTrafficInformationRemarks"
                          >
                            <Input style={{ width: '100%' }} />
                          </Form.Item>
                        </td>
                      </tr>

                      <tr>
                        <td colSpan={4}>
                          <label className="label_list">
                            Información de Transito RUNT{' '}
                            <span style={{ color: 'red' }}>*</span>
                          </label>
                        </td>
                        <td colSpan={4}>
                          <Form.Item
                            rules={[
                              {
                                required: true,
                                message: 'Selecciona una opción',
                              },
                            ]}
                            style={{ width: 140, margin: 4 }}
                            name="RUNTTrafficInformation"
                          >
                            <Radio.Group
                              style={{
                                display: 'flex',
                                justifyContent: 'space-evenly',
                              }}
                            >
                              <Radio value={true} />
                              <Radio value={false} />
                            </Radio.Group>
                          </Form.Item>
                        </td>
                        <td colSpan={4}>
                          <Form.Item
                            style={{ width: '100%', margin: 4 }}
                            name="RUNTTrafficInformationRemarks"
                          >
                            <Input style={{ width: '100%' }} />
                          </Form.Item>
                        </td>
                      </tr>

                      <tr>
                        <td colSpan={4}>
                          <label className="label_list">
                            Adverso <span style={{ color: 'red' }}>*</span>
                          </label>
                        </td>
                        <td colSpan={4}>
                          <Form.Item
                            rules={[
                              {
                                required: true,
                                message: 'Selecciona una opción',
                              },
                            ]}
                            style={{ width: 140, margin: 4 }}
                            name="Adverse"
                          >
                            <Radio.Group
                              style={{
                                display: 'flex',
                                justifyContent: 'space-evenly',
                              }}
                            >
                              <Radio value={true} />
                              <Radio value={false} />
                            </Radio.Group>
                          </Form.Item>
                        </td>
                        <td colSpan={4}>
                          <Form.Item
                            style={{ width: '100%', margin: 4 }}
                            name="AdverseRemarks"
                          >
                            <Input style={{ width: '100%' }} />
                          </Form.Item>
                        </td>
                      </tr>

                      <tr>
                        <td colSpan={4}>
                          <label className="label_list">
                            Libreta Militar{' '}
                            <span style={{ color: 'red' }}>*</span>
                          </label>
                        </td>
                        <td colSpan={4}>
                          <Form.Item
                            rules={[
                              {
                                required: true,
                                message: 'Selecciona una opción',
                              },
                            ]}
                            style={{ width: 140, margin: 4 }}
                            name="MilitarySituation"
                          >
                            <Radio.Group
                              style={{
                                display: 'flex',
                                justifyContent: 'space-evenly',
                              }}
                            >
                              <Radio value={true} />
                              <Radio value={false} />
                            </Radio.Group>
                          </Form.Item>
                        </td>
                        <td colSpan={4}>
                          <Form.Item
                            style={{ width: '100%', margin: 4 }}
                            name="MilitarySituationRemarks"
                          >
                            <Input style={{ width: '100%' }} />
                          </Form.Item>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flow_title_container" style={{ marginTop: 30 }}>
                <div className="flow_title_box">
                  <h3>Verificación de antecedentes familiares</h3>
                </div>
              </div>

              <Form.List name="familyHistory">
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
                            label="Nombres Completos"
                            name={[name, 'fullName']}
                            rules={[
                              {
                                required: true,
                                message: 'Ingresa el nombre!',
                              },
                            ]}
                          >
                            <Input placeholder="Nombres Completos" />
                          </Form.Item>

                          <ParameterList
                            className="input_element_flow_operation"
                            fieldProps={restField}
                            groupId="16"
                            label="Parentesco"
                            name={[name, 'relationship']}
                            placeHolder="Parentesco"
                            requiredMessage="Selecciona el Parentesco!"
                          />

                          <Form.Item
                            {...restField}
                            className="input_element_flow_operation"
                            label="Observación"
                            name={[name, 'remarks']}
                          >
                            <Input />
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

              <div className="section" style={{ justifyContent: 'center' }}>
                <Form.Item
                  className="input_element_flow_operation"
                  label="Concepto"
                  name="concept"
                  rules={[
                    {
                      required: true,
                      message: 'Ingresa un concepto!',
                    },
                  ]}
                >
                  <Select
                    options={[
                      {
                        value: ConceptEnums.FAVORABLE,
                        label: ConceptEnumsLabels.FAVORABLE,
                      },
                      {
                        value: ConceptEnums.NOT_FAVORABLE,
                        label: ConceptEnumsLabels.NOT_FAVORABLE,
                      },
                      {
                        value: ConceptEnums.FAVORABLE_WITH_NEW,
                        label: ConceptEnumsLabels.FAVORABLE_WITH_NEW,
                      },
                    ]}
                  />
                </Form.Item>

                <Form.Item
                  className="input_element_flow_operation"
                  label="Observación"
                  name="remarks"
                  rules={[
                    {
                      required: true,
                      message: 'Ingresa una observación!',
                    },
                  ]}
                >
                  <Input type="text" />
                </Form.Item>

                <Form.Item
                  className="input_element_flow_operation"
                  label="Anexos"
                  name="annexes"
                >
                  <Upload
                    beforeUpload={beforeUpload}
                    action={`${process.env.NEXT_PUBLIC_API_URL}/multer/process`}
                    method="POST"
                    className="w_100"
                    maxCount={1}
                    defaultFileList={defaultFiles.map((annexe: any) => {
                      return {
                        uid: `${annexe._id}`,
                        name: annexe.name,
                        status: 'done',
                        url: `${process.env.NEXT_PUBLIC_API_URL}/files/operation/getFile/${annexe._id}`,
                      };
                    })}
                  >
                    <Button className="button_upload_control">
                      <div className="loader_file_container">
                        <span>Cargar Documento</span>
                        <div className="upload_action_button">
                          <span>Cargar</span>
                        </div>
                      </div>
                    </Button>
                  </Upload>
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
        </div>
      </div>
    );
}
