import React, { useState } from 'react';
import { Breadcrumb } from 'antd';
import ReferencingStep1 from './steps/step1';
import ReferencingStep2 from './steps/step2';
import ReferencingStep3 from './steps/step3';
import ReferencingStep4 from './steps/step4';

type StudyFlowReferencingProps = {
  studyId: number;
  candidateId: string;
};

export default function StudyFlowReferencing({
  studyId,
  candidateId,
}: StudyFlowReferencingProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      index: 0,
      title: 'Datos Básicos',
      component: (
        <ReferencingStep1 studyId={studyId} candidateId={candidateId} />
      ),
    },
    {
      index: 1,
      title: 'Información Laboral',
      component: (
        <ReferencingStep2 studyId={studyId} candidateId={candidateId} />
      ),
    },
    {
      index: 2,
      title: 'Información Académica',
      component: (
        <ReferencingStep3 studyId={studyId} candidateId={candidateId} />
      ),
    },
    {
      index: 3,
      title: 'Referencias personales sin parentesco familiar',
      component: (
        <ReferencingStep4 studyId={studyId} candidateId={candidateId} />
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
        <div>{steps[currentStep].component}</div>
      </div>
    </div>
  );
}
