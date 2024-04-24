"use client"
import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import HelmetTitle from '@/components/i+c/ui/HelmetTitle';
import OperationLayoutComponent from '@/components/i+c/layout/Operation';
import OperationTopBar from '@/components/i+c/ui/Operation/TopBar';
import StudyFlowReferencing from '@/components/i+c/studies/referencing';
import CustomerInfoHeader from '@/components/i+c/studies/components/CustomerInfoHeader';
import {
  getStudiesFromCandidate,
  getStudyTypesFromServices,
} from '@/api/i+c/Studies';
import StudyFlowHomeVisit from '@/components/i+c/studies/homeVisit';
import StudyFlowBackgroundCheck from '@/components/i+c/studies/backgroundCheck';
import StudyFlowFinancialStudy from '@/components/i+c/studies/financialStudy';
import StudyFlowIntegrityTest from '@/components/i+c/studies/integrityTest';
import StudyFlowPolygraph from '@/components/i+c/studies/polygraph';
import Loading from '@/components/i+c/ui/Loading';
import { Tabs } from 'antd';
import ACLModules from '@/components/i+c/auth/AccessModule';
import { EModules } from '@/models/i+c/Modules';

export default function OperationStudiesTransactionPage() {
  const [finishLoadInfo, setfinishLoadInfo] = useState(false);
  const [finishRetrieveStudyInfo, setFinishRetrieveStudyInfo] = useState(false);
  const [studyTypesInfo, setStudyTypesInfo] = useState<any[]>([]);
  const [studyInfo, setStudyInfo] = useState<any>(null);
  const { requestId, candidateId } = useParams();

  const renderStudy = (study: any) => {
    const studyType = studyTypesInfo.find(
      (studyType: any) => studyType.service === study.service.id
    )?.studyType;
    switch (studyType) {
      case 1:
        return (
          <StudyFlowReferencing
            studyId={study.id}
            candidateId={String(candidateId)}
          />
        );

      case 2:
        return (
          <StudyFlowHomeVisit
            studyId={study.id}
            candidateId={String(candidateId)}
          />
        );

      case 3:
        return (
          <StudyFlowBackgroundCheck
            studyId={study.id}
            candidateId={String(candidateId)}
          />
        );

      case 4:
        return (
          <StudyFlowFinancialStudy
            studyId={study.id}
            candidateId={String(candidateId)}
          />
        );

      case 5:
        return (
          <StudyFlowIntegrityTest
            studyId={study.id}
            candidateId={String(candidateId)}
          />
        );

      case 6:
        return (
          <StudyFlowPolygraph
            studyId={study.id}
            candidateId={String(candidateId)}
          />
        );

      default:
        break;
    }
  };

  useEffect(() => {
    if (!finishRetrieveStudyInfo && requestId) {
      getStudiesFromCandidate(String(candidateId), String(requestId))
        .then((res) => {
          if (res) {
            setStudyInfo(res.data);
            setFinishRetrieveStudyInfo(true);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [requestId, finishRetrieveStudyInfo]);

  useEffect(() => {
    if (candidateId && !finishLoadInfo) {
      getStudyTypesFromServices()
        .then((res) => {
          if (res) {
            const studyTypes = res.data.map((studyType: any) => {
              return {
                service: studyType.serviceId,
                studyType: studyType.studyType.id,
                studyTypeName: studyType.studyType.name,
              };
            });
            setStudyTypesInfo(studyTypes);
            setfinishLoadInfo(true);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [finishRetrieveStudyInfo, finishLoadInfo]);

  if (!finishLoadInfo && !finishRetrieveStudyInfo) {
    return <Loading />;
  }
  return (
    <OperationLayoutComponent>
      <HelmetTitle title="Estudios" />

      <ACLModules requiredPermission={EModules.STUDIES}>
        <OperationTopBar title="Estudios" path="/studies">
          <div />
        </OperationTopBar>

        <div className="operation_module_content_all">
          <CustomerInfoHeader studyInfo={studyInfo} />

          {studyInfo !== null && (
            <Tabs
              style={{ padding: 20, marginLeft: 30 }}
              type="card"
              items={studyInfo.studies.map((study: any) => {
                return {
                  key: study.id,
                  label: studyTypesInfo.find(
                    (studyType) =>
                      String(studyType.service) === String(study.service.id)
                  )?.studyTypeName,
                  children: <div>{renderStudy(study)}</div>,
                };
              })}
            />
          )}
        </div>
      </ACLModules>
    </OperationLayoutComponent>
  );
}
