import React from 'react';
import SimpleLoading from '@/components/i+c/ui/SimpleLoading';

type CustomerInfoHeaderProps = {
  studyInfo: any;
};

export default function CustomerInfoHeader({
  studyInfo,
}: CustomerInfoHeaderProps) {
  if (!studyInfo) {
    return <SimpleLoading />;
  }
    return (
      <div>
        <div className="header_customer_info">
          <div className="row_info">
            <span className="label">Cliente</span>
            <div className="info_box_container">
              <span>{studyInfo.request.customer.customerName}</span>
            </div>
          </div>
          <div className="row_info">
            <span className="label">No. Identificación candidato</span>
            <div className="info_box_container">
              <span>{studyInfo.candidate.username}</span>
            </div>
          </div>
          <div className="row_info">
            <span className="label">Nombre</span>
            <div className="info_box_container">
              <span>{studyInfo.candidate.name}</span>
            </div>
          </div>
          <div className="row_info">
            <span className="label">Cargo</span>
            <div className="info_box_container">
              <span>{studyInfo.candidate.charge}</span>
            </div>
          </div>
        </div>
      </div>
    );
}
