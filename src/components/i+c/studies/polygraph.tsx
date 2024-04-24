import React from 'react';
import type { SimpleStudyProps } from '@/models/i+c/props/StepsProps';
import SimpleLoading from '../ui/SimpleLoading';

export default function StudyFlowPolygraph({ studyId }: SimpleStudyProps) {
  return (
    <div className="flow_section_container">
      <div className="flow_title_container">
        <div className="flow_title_box">
          <h3>Polígrafia</h3>
        </div>
      </div>

      <div className="flow_content">
        <div className="form_container">
          <div
            style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
          >
            <SimpleLoading />
          </div>
        </div>
      </div>
    </div>
  );
}
