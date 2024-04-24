import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CandidatesLayoutComponent from '@/components/i+c/layout/Candidates';
import BreadcrumbComponent from '@/components/i+c/ui/Breadcrumb';
import {
  Button,
  Form,
  Input,
  InputNumber,
  Space,
  Upload,
  message,
  notification,
} from 'antd';
import type { CandidatesStep6FieldType } from '@/models/i+c/FormTypes';
import ParameterList from '@/components/i+c/common/ParameterList';
import HelmetTitle from '@/components/i+c/ui/HelmetTitle';
import {
  completeCandidateProcess,
  getCandidateFiles,
  getProcessCandidate,
  loadReferencesData,
} from '@/api/i+c/Candidates';
import { showError, showSuccess } from '@/components/i+c/ui/Toast';
import type { RcFile } from 'antd/es/upload';
import { FileTypes } from '@/models/i+c/FileTypes';
import type { UploadFile } from 'antd/lib';
import Loading from '@/components/i+c/ui/Loading';
import { CandidateModuleData } from '@/models/i+c/CandidateModuleData';
import { beforeUpload } from '@/utils/i+c/helpers';
import { useICCandidatesStore } from '@/states/i+c/I+C-candidates.state';

export default function CandidatesInformationStep6() {
  const { setFinishProcess, referencesData, finishProcess, saveReferencesData } = useICCandidatesStore()

  const [listFiles, setListFiles] = useState<any[]>([]);
  const [finishRetrieveData, setFinishRetrieveData] = useState(false);
  const [loadingSave, setloadingSave] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const router = useRouter();
  const [form] = Form.useForm();

  useEffect(() => {
    if (!finishRetrieveData) {
      getCandidateFiles()
        .then((res) => {
          if (res) {
            setListFiles(res.data);
            setFinishRetrieveData(true);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [finishRetrieveData]);

  const openValidateNotification = (status: any) => {
    api.error({
      message: 'Hace Falta diligenciar los estudios:',
      description: (
        <div>
          {Object.entries(status)
            .filter(
              (st: any) =>
                st[1] !== 'SUCCESS' &&
                st[0] !== 'spouseAndInLawsData' &&
                st[0] !== 'personalReferencesData'
            )
            .map((result, index) => (
              <div key={index}>
                <span>{`${CandidateModuleData[
                  result[0] as keyof typeof CandidateModuleData
                ]
                  }`}</span>
                <br />
              </div>
            ))}
        </div>
      ),
      placement: 'topRight',
    });
  };

  function onFinish(values: any) {
    setloadingSave(true);
    const formData = new FormData();
    const data = referencesData.map((item: any, index: number) => {
      !listFiles.find(
        (file: any) =>
          file.fileIndex === index &&
          file.fileType === FileTypes.CANDIDATE_REFERENCE_PERSONAL
      ) &&
        values.referencesData[index].referencePersonal &&
        formData.append(
          'file',
          values.referencesData[index].referencePersonal.fileList[0]
            .originFileObj as RcFile,
          `${index}###${FileTypes.CANDIDATE_REFERENCE_PERSONAL}###${values.referencesData[index].referencePersonal.fileList[0].originFileObj.name}`
        );
      return {
        ...item,
        indexItem: index,
      };
    });
    formData.append('data', JSON.stringify(data));
    getProcessCandidate()
      .then((response) => {
        if (response) {
          const { id, candidateId, RICDate, ...status } = response.data;
          if (
            status.basicData !== 'SUCCESS' &&
            status.academicAndEmploymentData !== 'SUCCESS' &&
            status.parentsAndSiblingsData !== 'SUCCESS' &&
            status.peopleWithLivesData !== 'SUCCESS'
          ) {
            openValidateNotification(status);
          } else {
            loadReferencesData(formData)
              .then((res) => {
                if (res) {
                  showSuccess(res.data);
                  completeCandidateProcess()
                    .then((response) => {
                      if (response) {
                        setFinishProcess(true)
                        router.push('/I+C/dashboard/candidates/calendar');
                        setloadingSave(false);
                      }
                    })
                    .catch((err) => {
                      setloadingSave(false);
                      console.log(err);
                    });
                }
              })
              .catch(() => {
                setloadingSave(false);
                showError('Error al cargar la información');
              });
          }
        }
      })
      .catch((err) => {
        console.log(err);
        setloadingSave(false);
        showError('Error al cargar la información');
      });
  }

  function changeData(event: any) {
    const item: any = Object.values(event)[0];
    if (Array.isArray(item)) {
      const index: any = Number(Object.keys(item)[0]);
      const key = Object.keys(item[index])[0];
      const value = Object.values(item[index])[0];
      const mapReferencesData: CandidatesStep6FieldType[] = [...referencesData];
      if (key !== 'referencePersonal') {
        const updatedObject = { ...mapReferencesData[index], [key]: value };
        mapReferencesData[index] = updatedObject;
      }
      saveReferencesData(mapReferencesData)
    }
  }

  const defaultFiles = (index: number) => {
    const files = listFiles
      .filter(
        (file) => file.fileType === FileTypes.CANDIDATE_REFERENCE_PERSONAL
      )
      .map((file) => {
        return file.fileType === FileTypes.CANDIDATE_REFERENCE_PERSONAL &&
          file.fileIndex === index
          ? {
            uid: `${index}`,
            name: 'Referencia Personal',
            status: 'done',
            url: `${process.env.NEXT_PUBLIC_API_URL}/files/getFile/${file.fileMongoPath}`,
          }
          : null;
      })
      .filter((item: any) => item !== null) as UploadFile[];
    return files;
  };

  if (!finishRetrieveData) {
    return <Loading />;
  }
  return (
    <CandidatesLayoutComponent>
      {contextHolder}

      <HelmetTitle title="Referencias Personales" />

      <section>
        <div className="step">
          <h1>REFERENCIAS PERSONALES SIN PARENTESCO FAMILIAR</h1>

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
                referencesData: [
                  {
                    fullName: referencesData[0]
                      ? referencesData[0].fullName
                      : '',
                    relationship: referencesData[0]
                      ? referencesData[0].relationship
                      : '',
                    phoneNumber: referencesData[0]
                      ? referencesData[0].phoneNumber
                      : '',
                    yearsOfAcquaintances: referencesData[0]
                      ? referencesData[0].yearsOfAcquaintances
                      : '',
                    whereKnowFrom: referencesData[0]
                      ? referencesData[0].whereKnowFrom
                      : '',
                    profession: referencesData[0]
                      ? referencesData[0].profession
                      : '',
                    referencePersonal: listFiles.find(
                      (file: any) =>
                        file.fileIndex === 0 &&
                        file.fileType ===
                        FileTypes.CANDIDATE_REFERENCE_PERSONAL
                    )
                      ? listFiles.find(
                        (file: any) =>
                          file.fileIndex === 0 &&
                          file.fileType ===
                          FileTypes.CANDIDATE_REFERENCE_PERSONAL
                      ).fileMongoPath
                      : null,
                  },
                  {
                    fullName: referencesData[1]
                      ? referencesData[1].fullName
                      : '',
                    relationship: referencesData[1]
                      ? referencesData[1].relationship
                      : '',
                    phoneNumber: referencesData[1]
                      ? referencesData[1].phoneNumber
                      : '',
                    yearsOfAcquaintances: referencesData[1]
                      ? referencesData[1].yearsOfAcquaintances
                      : '',
                    whereKnowFrom: referencesData[1]
                      ? referencesData[1].whereKnowFrom
                      : '',
                    profession: referencesData[1]
                      ? referencesData[1].profession
                      : '',
                    referencePersonal: listFiles.find(
                      (file: any) =>
                        file.fileIndex === 1 &&
                        file.fileType ===
                        FileTypes.CANDIDATE_REFERENCE_PERSONAL
                    )
                      ? listFiles.find(
                        (file: any) =>
                          file.fileIndex === 1 &&
                          file.fileType ===
                          FileTypes.CANDIDATE_REFERENCE_PERSONAL
                      ).fileMongoPath
                      : null,
                  },
                ],
              }}
              onFinish={onFinish}
            >
              <Form.List name="referencesData">
                {(fields) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space
                        key={key}
                        style={{ display: 'flex', marginBottom: 8 }}
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
                            groupId="6"
                            label="Parentesco"
                            name={[name, 'relationship']}
                            placeHolder="Parentesco"
                            requiredMessage="Selecciona un Parentesco!"
                            fieldProps={restField}
                            disabled={finishProcess}
                          />

                          <Form.Item
                            {...restField}
                            className="input_element"
                            label="Telefono"
                            name={[name, 'phoneNumber']}
                          >
                            <Input
                              placeholder="Telefono"
                              disabled={finishProcess}
                            />
                          </Form.Item>

                          <Form.Item
                            {...restField}
                            className="input_element"
                            label="Tiempo de Conocidos (Años)"
                            name={[name, 'yearsOfAcquaintances']}
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
                              disabled={finishProcess}
                            />
                          </Form.Item>

                          <Form.Item
                            {...restField}
                            className="input_element"
                            label="Ámbito en el que se conocieron"
                            name={[name, 'whereKnowFrom']}
                            rules={[
                              {
                                required: true,
                                message:
                                  'Ingresa el ámbito en el que se conocieron!',
                              },
                            ]}
                          >
                            <Input
                              placeholder="Ámbito en el que se conocieron"
                              disabled={finishProcess}
                            />
                          </Form.Item>

                          <ParameterList
                            groupId="15"
                            label="Profesión"
                            name={[name, 'profession']}
                            fieldProps={restField}
                            placeHolder="Profesión"
                            requiredMessage="Selecciona un Profesión!"
                            disabled={finishProcess}
                          />

                          <Form.Item
                            className="input_element"
                            label="Documento Referencia Personal"
                            name={[name, 'referencePersonal']}
                          >
                            <Upload
                              beforeUpload={beforeUpload}
                              action={`${process.env.NEXT_PUBLIC_API_URL}/multer/process`}
                              method="POST"
                              className="w_100"
                              defaultFileList={defaultFiles(name)}
                              maxCount={1}
                              disabled={finishProcess}
                            >
                              <Button className="button_upload_control">
                                <div className="loader_file_container">
                                  <span>Documento Referencia Personal</span>
                                  <div className="upload_action_button">
                                    <span>Cargar</span>
                                  </div>
                                </div>
                              </Button>
                            </Upload>
                          </Form.Item>
                        </div>
                      </Space>
                    ))}
                  </>
                )}
              </Form.List>

              <div className="button_container">
                <div className="end_flow">
                  <Button
                    className="finish_button"
                    htmlType="submit"
                    loading={loadingSave}
                  >
                    FINALIZAR
                  </Button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </section>
    </CandidatesLayoutComponent>
  );
}
