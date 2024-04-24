import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Breadcrumb } from 'antd';

export default function BreadcrumbComponent() {
  const router = useRouter();

  const setActiveParam = (step: string) => {
    return (
      router.pathname.split('/I+C/dashboard/candidates/information/')[1] === step
    );
  };

  const breadcrumbItems = [
    {
      title: (
        <Link
          className={`breadcrum_item ${setActiveParam('step1') ? 'active_breadcrumb' : ''
            }`}
          href="/I+C/dashboard/candidates/information/step1"
        >
          Datos Básicos del candidato
        </Link>
      ),
    },
    {
      title: (
        <Link
          className={`breadcrum_item ${setActiveParam('step2') ? 'active_breadcrumb' : ''
            }`}
          href="/I+C/dashboard/candidates/information/step2"
        >
          Información académica
        </Link>
      ),
    },
    {
      title: (
        <Link
          className={`breadcrum_item ${setActiveParam('step3') ? 'active_breadcrumb' : ''
            }`}
          href="/I+C/dashboard/candidates/information/step3"
        >
          Datos Familiares padres
        </Link>
      ),
    },
    {
      title: (
        <Link
          className={`breadcrum_item ${setActiveParam('step4') ? 'active_breadcrumb' : ''
            }`}
          href="/I+C/dashboard/candidates/information/step4"
        >
          Datos Familiares esposo(a)
        </Link>
      ),
    },
    {
      title: (
        <Link
          className={`breadcrum_item ${setActiveParam('step5') ? 'active_breadcrumb' : ''
            }`}
          href="/I+C/dashboard/candidates/information/step5"
        >
          Personas con las que vive
        </Link>
      ),
    },
    {
      title: (
        <Link
          className={`breadcrum_item ${setActiveParam('step6') ? 'active_breadcrumb' : ''
            }`}
          href="/I+C/dashboard/candidates/information/step6"
        >
          Referencias personales sin parentesco familiar
        </Link>
      ),
    },
  ];

  return (
    <div className="breadcrum_container">
      <Breadcrumb items={breadcrumbItems} />
    </div>
  );
}
