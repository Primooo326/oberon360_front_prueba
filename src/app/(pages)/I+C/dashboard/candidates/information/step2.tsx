import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import CandidatesLayoutComponent from '@/components/i+c/layout/Candidates';
import BreadcrumbComponent from '@/components/i+c/ui/Breadcrumb';
import { Button, DatePicker, Form, Input, Space, Upload } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {
  saveWorkAcademicData,
  selectBasicData,
  selectFinishProcess,
  selectWorkAcademicData,
} from '@/redux/slices/candidates';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import ParameterList from '@/components/i+c/common/ParameterList';
import YesOrNot from '@/components/i+c/common/YesOrNot';
import HelmetTitle from '@/components/i+c/ui/HelmetTitle';
import type { CandidatesStep2FieldType } from '@/models/i+c/FormTypes';
import {
  getCandidateFiles,
  loadAcademicAndEmploymentData,
} from '@/api/i+c/Candidates';
import { showError, showSuccess } from '@/components/i+c/ui/Toast';
import ParameterListByChilds from '@/components/i+c/common/ParameterListByChilds';
import type { RcFile } from 'antd/es/upload';
import Loading from '@/components/i+c/ui/Loading';
import { FileTypes } from '@/models/i+c/FileTypes';
import type { UploadFile } from 'antd/lib';
import { beforeUpload } from '@/utils/i+c/helpers';

export default function CandidatesInformationStep2() {
  const workAcademicData = useAppSelector(selectWorkAcademicData);
  const [callLists, setCallLists] = useState(false);
  const [loadingSave, setloadingSave] = useState(false);
  const submitData = useAppSelector(selectFinishProcess);
  const [listFiles, setListFiles] = useState<any[]>([]);
  const basicData = useAppSelector(selectBasicData);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [form] = Form.useForm();

  useEffect(() => {
    if (!callLists) {
      getCandidateFiles()
        .then((res) => {
          if (res) {
            setListFiles(res.data);
            setCallLists(true);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [callLists]);

  function changeData(event: any) {
    const mapWorkAcademicData: CandidatesStep2FieldType = { ...workAcademicData };
    const item: any = Object.values(event)[0];
    if (Array.isArray(item)) {
      const field: any = Object.keys(event)[0];
      const index: any = Number(Object.keys(item)[0]);
      const key = Object.keys(item[index])[0];
      const value = Object.values(item[index])[0];
      const workAcademicDataArrays = [...mapWorkAcademicData[field]];
      if (
        key === 'dateOfGrade' ||
        key === 'dateLeaving' ||
        key === 'dateEntry'
      ) {
        const updatedDate = {
          ...workAcademicDataArrays[index],
          [key]: dayjs(String(value)).format('YYYY/MM/DD'),
        };
        workAcademicDataArrays[index] = updatedDate;
      } else if (
        key !== 'laborCertificationFile' &&
        key !== 'certificateFile' &&
        key !== 'diplomaFile'
      ) {
        const updatedObject = {
          ...workAcademicDataArrays[index],
          [key]: value,
        };
        workAcademicDataArrays[index] = updatedObject;
      }
      mapWorkAcademicData[field] = workAcademicDataArrays;
    } else {
      const value: any = Object.values(event)[0];
      const key = Object.keys(event)[0];
      mapWorkAcademicData[key] = value;
    }
    dispatch(saveWorkAcademicData(mapWorkAcademicData));
  }

  function onFinish(values: any) {
    setloadingSave(true);
    const formData = new FormData();
    const data = {
      candidateAcademicData: workAcademicData.candidateAcademicData.map(
        (item: any, index: number) => {
          !listFiles.find(
            (file: any) =>
              file.fileIndex === index &&
              file.fileType === FileTypes.CANDIDATE_ACADEMIC_DIPLOMA
          ) &&
            formData.append(
              'file',
              values.candidateAcademicData[index].diplomaFile.fileList[0]
                .originFileObj as RcFile,
              `${index}###${FileTypes.CANDIDATE_ACADEMIC_DIPLOMA}###${values.candidateAcademicData[index].diplomaFile.fileList[0].originFileObj.name}`
            );
          !listFiles.find(
            (file: any) =>
              file.fileIndex === index &&
              file.fileType === FileTypes.CANDIDATE_ACADEMIC_CERTIFICATE
          ) &&
            formData.append(
              'file',
              values.candidateAcademicData[index].certificateFile.fileList[0]
                .originFileObj as RcFile,
              `${index}###${FileTypes.CANDIDATE_ACADEMIC_CERTIFICATE}###${values.candidateAcademicData[index].certificateFile.fileList[0].originFileObj.name}`
            );
          return {
            indexItem: index,
            academycDegree: item.academycDegree,
            academyName: item.academyName,
            studyType: item.studyType,
            dateOfGrade: new Date(item.dateOfGrade),
          };
        }
      ),
      candidateEmploymentData: workAcademicData.candidateEmploymentData.map(
        (item: any, index: number) => {
          !listFiles.find(
            (file: any) =>
              file.fileIndex === index &&
              file.fileType === FileTypes.CANDIDATE_EMPLOYMENT_CERTIFICATE
          ) &&
            formData.append(
              'file',
              values.candidateEmploymentData[index].laborCertificationFile
                .fileList[0].originFileObj as RcFile,
              `${index}###${FileTypes.CANDIDATE_EMPLOYMENT_CERTIFICATE}###${values.candidateEmploymentData[index].laborCertificationFile.fileList[0].originFileObj.name}`
            );
          return {
            charge: item.charge,
            companyName: item.companyName,
            bossName: item.bossName,
            bossPhone: item.bossPhone,
            bossCharge: item.bossCharge,
            dateEntry: new Date(item.dateEntry),
            dateLeaving: new Date(item.dateLeaving),
            indexItem: index,
          };
        }
      ),
    };
    formData.append('data', JSON.stringify(data));
    loadAcademicAndEmploymentData(formData)
      .then((res) => {
        if (res) {
          showSuccess(res.data);
          router.push('/I+C/dashboard/candidates/information/step3');
          setloadingSave(false);
        }
      })
      .catch(() => {
        setloadingSave(false);
        showError('Error al cargar la información');
      });
  }

  const defaultFiles = (name: string, index: number, fileType: FileTypes) => {
    const files = listFiles
      .filter((file) => file.fileType === FileTypes[fileType])
      .map((file) => {
        return file.fileType === FileTypes[fileType] && file.fileIndex === index
          ? {
            uid: `${index}`,
            name,
            status: 'done',
            url: `${process.env.NEXT_PUBLIC_API_URL}/files/getFile/${file.fileMongoPath}`,
          }
          : null;
      })
      .filter((item: any) => item !== null) as UploadFile[];
    return files;
  };

  if (!callLists) {
    return <Loading />;
  }
  return (
    <CandidatesLayoutComponent>
      <HelmetTitle title="Información Académica" />

      <section>
        <div className="step">
          <h1>INFORMACIÓN ACADÉMICA</h1>
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
                needWorkExperience: workAcademicData
                  ? !!(workAcademicData.candidateEmploymentData &&
                    workAcademicData.candidateEmploymentData.length > 0)
                  : '',
                candidateAcademicData:
                  workAcademicData &&
                    workAcademicData.candidateAcademicData.length > 0
                    ? workAcademicData.candidateAcademicData.map(
                      (item: any, index: number) => {
                        return {
                          ...item,
                          dateOfGrade: dayjs(item.dateOfGrade),
                          diplomaFile: listFiles.find(
                            (file: any) =>
                              file.fileType ===
                              FileTypes.CANDIDATE_ACADEMIC_DIPLOMA &&
                              file.fileIndex === index
                          )
                            ? listFiles.find(
                              (file: any) =>
                                file.fileType ===
                                FileTypes.CANDIDATE_ACADEMIC_DIPLOMA &&
                                file.fileIndex === index
                            ).fileMongoPath
                            : null,
                          certificateFile: listFiles.find(
                            (file: any) =>
                              file.fileType ===
                              FileTypes.CANDIDATE_ACADEMIC_DIPLOMA &&
                              file.fileIndex === index
                          )
                            ? listFiles.find(
                              (file: any) =>
                                file.fileType ===
                                FileTypes.CANDIDATE_ACADEMIC_DIPLOMA &&
                                file.fileIndex === index
                            ).fileMongoPath
                            : null,
                        };
                      }
                    )
                    : [
                      {
                        academycDegree: '',
                        academyName: '',
                        dateOfGrade: '',
                        studyType: '',
                      },
                    ],
                candidateEmploymentData:
                  workAcademicData &&
                    workAcademicData.candidateEmploymentData.length > 0
                    ? workAcademicData.candidateEmploymentData.map(
                      (item: any, index: number) => {
                        return {
                          ...item,
                          dateLeaving: dayjs(item.dateLeaving),
                          dateEntry: dayjs(item.dateEntry),
                          laborCertificationFile: listFiles.find(
                            (file: any) =>
                              file.fileType ===
                              FileTypes.CANDIDATE_EMPLOYMENT_CERTIFICATE &&
                              file.fileIndex === index
                          )
                            ? listFiles.find(
                              (file: any) =>
                                file.fileType ===
                                FileTypes.CANDIDATE_EMPLOYMENT_CERTIFICATE &&
                                file.fileIndex === index
                            ).fileMongoPath
                            : null,
                        };
                      }
                    )
                    : [
                      {
                        charge: '',
                        companyName: '',
                        dateEntry: '',
                        dateLeaving: '',
                        bossName: '',
                        bossPhone: '',
                        bossCharge: '',
                      },
                    ],
              }}
              onFinish={onFinish}
            >
              <div className="section">
                <Form.List name="candidateAcademicData">
                  {(fields, { add, remove }) => (
                    <div className="row_container">
                      {fields.map(({ key, name, ...restField }) => (
                        <Space
                          key={key}
                          style={{
                            display: 'flex',
                            marginBottom: 8,
                            borderBottom: '4px solid #00336a',
                            paddingBottom: '20px',
                          }}
                          align="baseline"
                        >
                          <div className="section" style={{ marginTop: 0 }}>
                            <Form.Item
                              {...restField}
                              className="input_element"
                              label="Título"
                              name={[name, 'academycDegree']}
                              rules={[
                                {
                                  required: true,
                                  message: 'Ingresa el nombre del título!',
                                },
                              ]}
                            >
                              <Input
                                placeholder="Título"
                                disabled={submitData}
                              />
                            </Form.Item>

                            <ParameterListByChilds
                              groupId="14"
                              fatherParameterId={String(basicData.birthTown)}
                              label="Institución Educativa"
                              name={[name, 'academyName']}
                              placeHolder="Institución Educativa"
                              requiredMessage="Selecciona la Academia!"
                              fieldProps={restField}
                              disabled={submitData}
                            />

                            <Form.Item
                              className="input_element"
                              label="Fecha de Grado"
                              name={[name, 'dateOfGrade']}
                              rules={[
                                {
                                  required: true,
                                  message: 'Selecciona tu Fecha de Grado!',
                                },
                              ]}
                            >
                              <DatePicker
                                format="YYYY/MM/DD"
                                className="w_100"
                                placeholder="Fecha de Grado"
                                disabled={submitData}
                              />
                            </Form.Item>

                            <ParameterList
                              groupId="4"
                              label="Tipo de Estudio"
                              name={[name, 'studyType']}
                              placeHolder="Tipo de Estudio"
                              requiredMessage="Selecciona un Tipo de Estudio!"
                              fieldProps={restField}
                              disabled={submitData}
                            />

                            <Form.Item
                              className="input_element"
                              label="Documento Diploma"
                              name={[name, 'diplomaFile']}
                              rules={[
                                {
                                  required: true,
                                  message: 'Adjunta un archivo',
                                },
                              ]}
                            >
                              <Upload
                                beforeUpload={beforeUpload}
                                action={`${process.env.NEXT_PUBLIC_API_URL}/multer/process`}
                                method="POST"
                                className="w_100"
                                defaultFileList={defaultFiles(
                                  'Documento Diploma',
                                  name,
                                  FileTypes.CANDIDATE_ACADEMIC_DIPLOMA
                                )}
                                maxCount={1}
                                disabled={submitData}
                              >
                                <Button className="button_upload_control">
                                  <div className="loader_file_container">
                                    <span>Documento Diploma</span>
                                    <div className="upload_action_button">
                                      <span>Cargar</span>
                                    </div>
                                  </div>
                                </Button>
                              </Upload>
                            </Form.Item>

                            <Form.Item
                              className="input_element"
                              label="Documento Acta"
                              name={[name, 'certificateFile']}
                              rules={[
                                {
                                  required: true,
                                  message: 'Adjunta un archivo',
                                },
                              ]}
                            >
                              <Upload
                                beforeUpload={beforeUpload}
                                action={`${process.env.NEXT_PUBLIC_API_URL}/multer/process`}
                                method="POST"
                                className="w_100"
                                defaultFileList={defaultFiles(
                                  'Documento Acta',
                                  name,
                                  FileTypes.CANDIDATE_ACADEMIC_CERTIFICATE
                                )}
                                maxCount={1}
                                disabled={submitData}
                              >
                                <Button className="button_upload_control">
                                  <div className="loader_file_container">
                                    <span>Documento Acta</span>
                                    <div className="upload_action_button">
                                      <span>Cargar</span>
                                    </div>
                                  </div>
                                </Button>
                              </Upload>
                            </Form.Item>

                            <div className="remove_item_operator">
                              <MinusCircleOutlined
                                onClick={() => remove(name)}
                              />
                            </div>
                          </div>
                        </Space>
                      ))}

                      <div className="list_actions_container">
                        <Button
                          className="button_add"
                          shape="circle"
                          onClick={() => add()}
                          icon={<PlusOutlined />}
                        />
                      </div>
                    </div>
                  )}
                </Form.List>
              </div>

              <div className="step step_2">
                <h1>INFORMACIÓN LABORAL</h1>

                <div className="section">
                  <YesOrNot
                    label="¿Cuenta con experiencia Laboral?"
                    name="needWorkExperience"
                    requiredMessage="Selecciona una opción"
                    disabled={submitData}
                  />
                </div>

                {(form.getFieldValue('needWorkExperience') === true ||
                  workAcademicData.candidateEmploymentData.length > 0) && (
                    <div className="section">
                      <Form.List name="candidateEmploymentData">
                        {(fields, { add, remove }) => (
                          <div className="row_container">
                            {fields.map(({ key, name, ...restField }) => (
                              <Space
                                key={key}
                                style={{
                                  display: 'flex',
                                  marginBottom: 8,
                                  borderBottom: '4px solid #00336a',
                                  paddingBottom: '20px',
                                }}
                                align="baseline"
                              >
                                <div className="section">
                                  <Form.Item
                                    {...restField}
                                    className="input_element"
                                    label="Cargo"
                                    name={[name, 'charge']}
                                    rules={[
                                      {
                                        required: true,
                                        message: 'Ingresa el nombre del Cargo!',
                                      },
                                    ]}
                                  >
                                    <Input
                                      placeholder="Cargo"
                                      disabled={submitData}
                                    />
                                  </Form.Item>

                                  <Form.Item
                                    {...restField}
                                    className="input_element"
                                    label="Nombre de la Empresa"
                                    name={[name, 'companyName']}
                                    rules={[
                                      {
                                        required: true,
                                        message:
                                          'Ingresa el nombre de la Empresa!',
                                      },
                                    ]}
                                  >
                                    <Input
                                      placeholder="Nombre de la Empresa"
                                      disabled={submitData}
                                    />
                                  </Form.Item>

                                  <Form.Item
                                    className="input_element"
                                    label="Fecha de Ingreso"
                                    name={[name, 'dateEntry']}
                                    rules={[
                                      {
                                        required: true,
                                        message:
                                          'Selecciona tu Fecha de Ingreso!',
                                      },
                                    ]}
                                  >
                                    <DatePicker
                                      format="YYYY/MM/DD"
                                      className="w_100"
                                      placeholder="Fecha de Ingreso"
                                      disabled={submitData}
                                    />
                                  </Form.Item>

                                  <Form.Item
                                    className="input_element"
                                    label="Fecha de Egreso"
                                    name={[name, 'dateLeaving']}
                                    rules={[
                                      {
                                        required: true,
                                        message:
                                          'Selecciona tu Fecha de Egreso!',
                                      },
                                    ]}
                                  >
                                    <DatePicker
                                      format="YYYY/MM/DD"
                                      className="w_100"
                                      placeholder="Fecha de Egreso"
                                      disabled={submitData}
                                    />
                                  </Form.Item>

                                  <Form.Item
                                    {...restField}
                                    className="input_element"
                                    label="Nombre Jefe Directo"
                                    name={[name, 'bossName']}
                                  >
                                    <Input
                                      placeholder="Nombre Jefe Directo"
                                      disabled={submitData}
                                    />
                                  </Form.Item>

                                  <Form.Item
                                    {...restField}
                                    className="input_element"
                                    label="Telefono Jefe Directo"
                                    name={[name, 'bossPhone']}
                                  >
                                    <Input
                                      placeholder="Telefono Jefe Directo"
                                      disabled={submitData}
                                    />
                                  </Form.Item>

                                  <Form.Item
                                    {...restField}
                                    className="input_element"
                                    label="Cargo Jefe Directo"
                                    name={[name, 'bossCharge']}
                                  >
                                    <Input
                                      placeholder="Cargo Jefe Directo"
                                      disabled={submitData}
                                    />
                                  </Form.Item>

                                  <Form.Item
                                    className="input_element"
                                    label="Documento Certificación Laboral"
                                    name={[name, 'laborCertificationFile']}
                                    rules={[
                                      {
                                        required: true,
                                        message: 'Adjunta un archivo',
                                      },
                                    ]}
                                  >
                                    <Upload
                                      beforeUpload={beforeUpload}
                                      action={`${process.env.NEXT_PUBLIC_API_URL}/multer/process`}
                                      method="POST"
                                      className="w_100"
                                      defaultFileList={defaultFiles(
                                        'Documento Certificación Laboral',
                                        name,
                                        FileTypes.CANDIDATE_EMPLOYMENT_CERTIFICATE
                                      )}
                                      maxCount={1}
                                      disabled={submitData}
                                    >
                                      <Button className="button_upload_control">
                                        <div className="loader_file_container">
                                          <span>
                                            Documento Certificación Laboral
                                          </span>
                                          <div className="upload_action_button">
                                            <span>Cargar</span>
                                          </div>
                                        </div>
                                      </Button>
                                    </Upload>
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
                                className="button_add"
                                shape="circle"
                                onClick={() => add()}
                                icon={<PlusOutlined />}
                              />
                            </div>
                          </div>
                        )}
                      </Form.List>
                    </div>
                  )}
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
