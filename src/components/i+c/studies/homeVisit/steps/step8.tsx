import React, { useEffect, useState } from 'react';
import type { StudiesProps } from '@/models/i+c/props/StepsProps';
import { Button, Form, Input } from 'antd';
import SimpleLoading from '@/components/i+c/ui/SimpleLoading';
import PhotographicRecord from '../components/PhotographicRecord';
import {
  getVisitDomicilaryConcept,
  loadVisitDomicilaryConcept,
} from '@/api/i+c/Studies';
import type { RcFile } from 'antd/es/upload';
import { showError, showSuccess } from '@/components/i+c/ui/Toast';

const { TextArea } = Input;

export default function StudyHomeVisitStep8({
  studyId,
  onChangeStep,
}: StudiesProps) {
  const [studyInfo, setStudyInfo] = useState<any>(null);
  const [loadingStudy, setLoadingStudy] = useState(false);
  const [finishRetrieveData, setfinishRetrieveData] = useState(false);
  const [form] = Form.useForm();

  const setDefaultFiles = (filesData: any) => {
    if (filesData.length === 4) {
      form.setFieldValue('photographicRecordEvaluated', {
        uid: filesData.photoRegistration[0]._id,
        name: filesData.photoRegistration[0].name,
        status: 'done',
        url: `${process.env.NEXT_PUBLIC_API_URL}/files/operation/getFile/${filesData.photoRegistration[0]._id}`,
      });
      form.setFieldValue('photographicRecordSocialEnvironment', {
        uid: filesData.photoRegistration[1]._id,
        name: filesData.photoRegistration[1].name,
        status: 'done',
        url: `${process.env.NEXT_PUBLIC_API_URL}/files/operation/getFile/${filesData.photoRegistration[1]._id}`,
      });
      form.setFieldValue('photographicRecordHomeNomenclature', {
        uid: filesData.photoRegistration[2]._id,
        name: filesData.photoRegistration[2].name,
        status: 'done',
        url: `${process.env.NEXT_PUBLIC_API_URL}/files/operation/getFile/${filesData.photoRegistration[2]._id}`,
      });
      form.setFieldValue('photographicRecordHomeAndEvaluated', {
        uid: filesData.photoRegistration[3]._id,
        name: filesData.photoRegistration[3].name,
        status: 'done',
        url: `${process.env.NEXT_PUBLIC_API_URL}/files/operation/getFile/${filesData.photoRegistration[3]._id}`,
      });
    }
  };

  useEffect(() => {
    if (!finishRetrieveData) {
      getVisitDomicilaryConcept(String(studyId))
        .then((res) => {
          if (res) {
            setStudyInfo(res.data);
            res.data.photoRegistration.length > 0 && setDefaultFiles(res.data);
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
    formData.append('studyId', String(studyId));
    formData.append(
      'descriptionPhotographicRecord',
      values.descriptionPhotographicRecord
    );
    formData.append('remarks', values.remarks);
    formData.append('conceptOfVisit', values.conceptOfVisit);
    values.photographicRecordEvaluated.originFileObj &&
      formData.append(
        'file',
        values.photographicRecordEvaluated.originFileObj as RcFile,
        `0###${values.photographicRecordEvaluated.originFileObj.name}`
      );
    values.photographicRecordSocialEnvironment.originFileObj &&
      formData.append(
        'file',
        values.photographicRecordSocialEnvironment.originFileObj as RcFile,
        `1###${values.photographicRecordSocialEnvironment.originFileObj.name}`
      );
    values.photographicRecordHomeNomenclature.originFileObj &&
      formData.append(
        'file',
        values.photographicRecordHomeNomenclature.originFileObj as RcFile,
        `2###${values.photographicRecordHomeNomenclature.originFileObj.name}`
      );
    values.photographicRecordHomeAndEvaluated.originFileObj &&
      formData.append(
        'file',
        values.photographicRecordHomeAndEvaluated.originFileObj as RcFile,
        `3###${values.photographicRecordHomeAndEvaluated.originFileObj.name}`
      );
    loadVisitDomicilaryConcept(formData)
      .then((res) => {
        if (res) {
          showSuccess(res.data);
          onChangeStep(8);
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
            conceptOfVisit:
              studyInfo?.visitDomicilaryConceptData
                ? studyInfo.visitDomicilaryConceptData.conceptOfVisit
                : '',
            remarks:
              studyInfo?.visitDomicilaryConceptData
                ? studyInfo.visitDomicilaryConceptData.remarks
                : '',
            descriptionPhotographicRecord:
              studyInfo?.visitDomicilaryConceptData
                ? studyInfo.visitDomicilaryConceptData
                  .descriptionPhotographicRecord
                : '',
          }}
          onFinish={submitFlow}
        >
          <div className="row-photo-container">
            <div className="photo-record-container">
              <Form.Item
                className="photo-record-box"
                name="photographicRecordEvaluated"
                valuePropName="fileList"
                rules={[
                  {
                    required: true,
                    message: 'Adjunta una imagen !',
                  },
                ]}
              >
                <PhotographicRecord
                  label="Registro Fotografico del evaluado (a)"
                  handleChange={(e) =>
                    form.setFieldValue('photographicRecordEvaluated', e)
                  }
                  defaultFile={
                    studyInfo.photoRegistration.length === 4
                      ? {
                        uid: studyInfo.photoRegistration[0]._id,
                        name: studyInfo.photoRegistration[0]._id,
                        status: 'done',
                        url: `${process.env.NEXT_PUBLIC_API_URL}/files/operation/getFile/${studyInfo.photoRegistration[0]._id}`,
                      }
                      : null
                  }
                />
              </Form.Item>
              <Form.Item
                className="photo-record-box"
                name="photographicRecordSocialEnvironment"
                valuePropName="fileList"
                rules={[
                  {
                    required: true,
                    message: 'Adjunta una imagen !',
                  },
                ]}
              >
                <PhotographicRecord
                  label="Registro Fotografico del evaluado (a) en su ambito social"
                  handleChange={(e) =>
                    form.setFieldValue('photographicRecordSocialEnvironment', e)
                  }
                  defaultFile={
                    studyInfo.photoRegistration.length === 4
                      ? {
                        uid: studyInfo.photoRegistration[1]._id,
                        name: studyInfo.photoRegistration[1]._id,
                        status: 'done',
                        url: `${process.env.NEXT_PUBLIC_API_URL}/files/operation/getFile/${studyInfo.photoRegistration[1]._id}`,
                      }
                      : null
                  }
                />
              </Form.Item>
              <Form.Item
                className="photo-record-box"
                name="photographicRecordHomeNomenclature"
                valuePropName="fileList"
                rules={[
                  {
                    required: true,
                    message: 'Adjunta una imagen !',
                  },
                ]}
              >
                <PhotographicRecord
                  label="Registro Fotografico nomenclatura de vivienda del evaluado (a)"
                  handleChange={(e) =>
                    form.setFieldValue('photographicRecordHomeNomenclature', e)
                  }
                  defaultFile={
                    studyInfo.photoRegistration.length === 4
                      ? {
                        uid: studyInfo.photoRegistration[2]._id,
                        name: studyInfo.photoRegistration[2]._id,
                        status: 'done',
                        url: `${process.env.NEXT_PUBLIC_API_URL}/files/operation/getFile/${studyInfo.photoRegistration[2]._id}`,
                      }
                      : null
                  }
                />
              </Form.Item>
              <Form.Item
                className="photo-record-box"
                name="photographicRecordHomeAndEvaluated"
                valuePropName="fileList"
                rules={[
                  {
                    required: true,
                    message: 'Adjunta una imagen !',
                  },
                ]}
              >
                <PhotographicRecord
                  label="Registro Fotografico fachada de la vivienda y evaluado (a)"
                  handleChange={(e) =>
                    form.setFieldValue('photographicRecordHomeAndEvaluated', e)
                  }
                  defaultFile={
                    studyInfo.photoRegistration.length === 4
                      ? {
                        uid: studyInfo.photoRegistration[3]._id,
                        name: studyInfo.photoRegistration[3]._id,
                        status: 'done',
                        url: `${process.env.NEXT_PUBLIC_API_URL}/files/operation/getFile/${studyInfo.photoRegistration[3]._id}`,
                      }
                      : null
                  }
                />
              </Form.Item>
            </div>

            <Form.Item
              className="input_element_flow_operation"
              style={{ width: '48%' }}
              label="Descripción Registro fotográfico"
              name="descriptionPhotographicRecord"
              rules={[
                {
                  required: true,
                  message: 'Ingresa la información!',
                },
              ]}
            >
              <TextArea rows={3} />
            </Form.Item>
          </div>

          <div
            className="section"
            style={{ justifyContent: 'space-between', marginTop: 50 }}
          >
            <Form.Item
              className="input_element_flow_operation"
              style={{ width: '48%' }}
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

            <Form.Item
              className="input_element_flow_operation"
              style={{ width: '48%' }}
              label="Concepto de visita"
              name="conceptOfVisit"
              rules={[
                {
                  required: true,
                  message: 'Ingresa el concepto!',
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
