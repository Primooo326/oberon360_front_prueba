import React, { type ReactElement, useEffect, useState } from 'react';
import { Layout, Popover, Tooltip } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import PrivateRoute from '../PrivateRoute';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  saveBasicData,
  saveParentsAndSiblingsData,
  savePeopleWithlivesAndHousingData,
  saveReferencesData,
  saveSpouseAndInlawData,
  saveWorkAcademicData,
  selectBasicData,
  selectParentSiblingsData,
  selectPeopleWithlivesAndHousingData,
  selectReferencesData,
  selectSpouseAndInlawData,
  selectWorkAcademicData,
  setFinishProcess,
  setServicesScheduled,
} from '@/redux/slices/candidates';
import {
  getAcademicAndEmploymentData,
  getBasicData,
  getParentsAndSiblingsData,
  getPeopleWithlivesAndHousingData,
  getProcessCandidate,
  getReferencesData,
  getServicesScheduled,
  getSpouseInlawData,
} from '@/api/i+c/Candidates';
import Loading from '@/components/i+c/ui/Loading';

const { Content, Sider } = Layout;

function CandidatesLayoutComponent({ children }: { children: ReactElement }) {
  const [finishCallCandidateInfo, setfinishCallCandidateInfo] = useState(false);
  const [openDialogLogout, setOpenDialogLogout] = useState(false);
  const basicData = useAppSelector(selectBasicData);
  const workAcademicData = useAppSelector(selectWorkAcademicData);
  const parentSiblingsData = useAppSelector(selectParentSiblingsData);
  const spouseAndInlawData = useAppSelector(selectSpouseAndInlawData);
  const peopleWithlivesAndHousingData = useAppSelector(
    selectPeopleWithlivesAndHousingData
  );
  const referencesData = useAppSelector(selectReferencesData);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const hide = () => {
    setOpenDialogLogout(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpenDialogLogout(newOpen);
  };

  useEffect(() => {
    if (!finishCallCandidateInfo) {
      Promise.all([
        basicData &&
        Object.keys(basicData).length === 0 &&
        getBasicData().then((res) => {
          if (res) {
            dispatch(saveBasicData(res.data));
          }
        }),
        workAcademicData.candidateAcademicData.length === 0 &&
        workAcademicData.candidateEmploymentData.length === 0 &&
        getAcademicAndEmploymentData().then((res) => {
          if (res) {
            dispatch(saveWorkAcademicData(res.data));
          }
        }),
        Object.keys(parentSiblingsData).length === 0 &&
        getParentsAndSiblingsData().then((res) => {
          if (res) {
            dispatch(saveParentsAndSiblingsData(res.data));
          }
        }),
        spouseAndInlawData &&
        Object.keys(spouseAndInlawData).length === 0 &&
        getSpouseInlawData().then((res) => {
          if (res) {
            dispatch(saveSpouseAndInlawData(res.data));
          }
        }),
        Object.keys(peopleWithlivesAndHousingData).length === 0 &&
        getPeopleWithlivesAndHousingData().then((res) => {
          if (res) {
            dispatch(savePeopleWithlivesAndHousingData(res.data));
          }
        }),
        referencesData.length === 0 &&
        getReferencesData().then((res) => {
          if (res) {
            dispatch(saveReferencesData(res.data));
          }
        }),
        getProcessCandidate().then((res) => {
          if (res) {
            const { id, candidateId, RICDate, ...status } = res.data;
            if (
              status.basicData === 'SUCCESS' &&
              status.academicAndEmploymentData === 'SUCCESS' &&
              status.parentsAndSiblingsData === 'SUCCESS' &&
              status.peopleWithLivesData === 'SUCCESS' &&
              status.personalReferencesData === 'SUCCESS'
            ) {
              dispatch(setFinishProcess(true));
            }
          }
        }),
        getServicesScheduled().then((res) => {
          if (res) {
            dispatch(setServicesScheduled(res.data));
          }
        }),
      ]).then(() => {
        setfinishCallCandidateInfo(true);
      });
    }
  }, [finishCallCandidateInfo]);

  function validateActiveRoute(namePath: string): boolean {
    return String(router.pathname.split('/I+C/dashboard/candidates')[1]).includes(
      namePath
    );
  }

  if (!finishCallCandidateInfo) {
    return <Loading />;
  }
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider id={'navbar_custom'}>
        <div className="menu_container">
          <div className="top_menu">
            <div className="logo" />
            <div className="items">
              <div
                className={`${validateActiveRoute('information') ? 'active_menu' : ''
                  }`}
              >
                <Tooltip placement="right" title="Mi informacion">
                  <Link href="/I+C/dashboard/candidates/information/step1">
                    <div className="menu_item" id="information" />
                  </Link>
                </Tooltip>
              </div>
              <div
                className={`${validateActiveRoute('calendar') ? 'active_menu' : ''
                  }`}
              >
                <Tooltip placement="right" title="Calendario">
                  <Link href="/I+C/dashboard/candidates/calendar">
                    <div className="menu_item" id="calendar" />
                  </Link>
                </Tooltip>
              </div>
              <div
                className={`${validateActiveRoute('process') ? 'active_menu' : ''
                  }`}
              >
                <Tooltip placement="right" title="Mi proceso">
                  <Link href="/I+C/dashboard/candidates/process" passHref={true}>
                    <div className="menu_item" id="process" />
                  </Link>
                </Tooltip>
              </div>
            </div>
          </div>
          <div className="logout_container">
            <Popover
              content={
                <div className="logout_confirmation_container">
                  <span>¿Esta seguro de cerrar sesión?</span>

                  <div className="buttons">
                    <div className="cancel_action" onClick={hide}>
                      <span>Cancelar</span>
                    </div>

                    <Link href="/I+C/auth/logout">
                      <div className="confirm_action">
                        <span>Aceptar</span>
                      </div>
                    </Link>
                  </div>
                </div>
              }
              placement="right"
              trigger="click"
              open={openDialogLogout}
              onOpenChange={handleOpenChange}
            >
              <div style={{ cursor: 'pointer' }} id="logout" />
            </Popover>
          </div>
        </div>
      </Sider>
      <Layout>
        <Content>
          <section className="candidates_layout">
            <div className="container_logo">
              <div className="logo" />
            </div>
            {children}
          </section>
        </Content>
      </Layout>
    </Layout>
  );
}

export default PrivateRoute(CandidatesLayoutComponent);
