import React, { useState } from 'react';
import { Breadcrumb } from 'antd';
import type { SimpleStudyProps } from '@/models/i+c/props/StepsProps';
import StudyHomeVisitStep1 from './steps/step1';
import StudyHomeVisitStep2 from './steps/step2';
import StudyHomeVisitStep3 from './steps/step3';
import StudyHomeVisitStep4 from './steps/step4';
import StudyHomeVisitStep5 from './steps/step5';
import StudyHomeVisitStep6 from './steps/step6';
import StudyHomeVisitStep7 from './steps/step7';
import StudyHomeVisitStep8 from './steps/step8';
import StudyHomeVisitStep9 from './steps/step9';

export default function StudyFlowHomeVisit({
  studyId,
  candidateId,
}: SimpleStudyProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      index: 0,
      title: 'Información básica',
      component: (
        <StudyHomeVisitStep1
          candidateId={String(candidateId)}
          onChangeStep={setCurrentStep}
        />
      ),
    },
    {
      index: 1,
      title: 'Información familiar',
      component: (
        <StudyHomeVisitStep2
          studyId={studyId}
          candidateId={String(candidateId)}
          onChangeStep={setCurrentStep}
        />
      ),
    },
    {
      index: 2,
      title: 'Información familiar secundaria',
      component: (
        <StudyHomeVisitStep3
          studyId={studyId}
          candidateId={String(candidateId)}
          onChangeStep={setCurrentStep}
        />
      ),
    },
    {
      index: 3,
      title: 'Información vivienda',
      component: (
        <StudyHomeVisitStep4
          studyId={studyId}
          candidateId={String(candidateId)}
          onChangeStep={setCurrentStep}
        />
      ),
    },
    {
      index: 4,
      title: 'Información laboral',
      component: (
        <StudyHomeVisitStep5
          studyId={studyId}
          candidateId={String(candidateId)}
          onChangeStep={setCurrentStep}
        />
      ),
    },
    {
      index: 5,
      title: 'Información académica',
      component: (
        <StudyHomeVisitStep6
          studyId={studyId}
          candidateId={String(candidateId)}
          onChangeStep={setCurrentStep}
        />
      ),
    },
    {
      index: 6,
      title: 'Situación económica',
      component: (
        <StudyHomeVisitStep7
          studyId={studyId}
          candidateId={String(candidateId)}
          onChangeStep={setCurrentStep}
        />
      ),
    },
    {
      index: 7,
      title: 'Concepto Final',
      component: (
        <StudyHomeVisitStep8
          studyId={studyId}
          candidateId={String(candidateId)}
          onChangeStep={setCurrentStep}
        />
      ),
    },
    {
      index: 8,
      title: 'Referenciación',
      component: (
        <StudyHomeVisitStep9
          studyId={studyId}
          candidateId={String(candidateId)}
          onChangeStep={setCurrentStep}
        />
      ),
    },
  ];

  const renderBreadcrubmtItem = (item: any) => {
    return (
      <span
        style={{
          cursor: 'pointer',
          color: currentStep === item.index ? '#0058ff' : '#000',
        }}
        onClick={() => setCurrentStep(item.index)}
      >
        {item.title}
      </span>
    );
  };

  return (
    <div className="flow_section_container">
      <div className="flow_title_container">
        <div className="flow_breadcrumb">
          <Breadcrumb items={steps} itemRender={renderBreadcrubmtItem} />
        </div>
        <div className="flow_title_box">
          <h3>{steps[currentStep].title}</h3>
        </div>
      </div>

      <div className="flow_content">
        <div className="flow_content">
          <div>{steps[currentStep].component}</div>
        </div>
      </div>
    </div>
  );
}
