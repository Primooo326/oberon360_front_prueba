import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import CandidatesLayoutComponent from '@/components/i+c/layout/Candidates';
import HelmetTitle from '@/components/i+c/ui/HelmetTitle';
import { getServicesScheduled } from '@/api/i+c/Candidates';
import { showError } from '@/components/i+c/ui/Toast';
import Loading from '@/components/i+c/ui/Loading';
import CalendarSVG from '@/components/i+c/ui/CalendarSVG';

export default function DashboardCandidatesCalendar() {
  const [finishRetrieveData, setFinishRetrieveData] = useState(false);
  const [studiesScheduled, setStudiesScheduled] = useState<any>([]);

  useEffect(() => {
    if (!finishRetrieveData) {
      getServicesScheduled()
        .then((res) => {
          if (res) {
            setStudiesScheduled(res.data);
            setFinishRetrieveData(true);
          }
        })
        .catch(() => {
          showError('Error al obtener las programaciones');
        });
    }
  }, [finishRetrieveData]);

  if (!finishRetrieveData) {
    return <Loading />;
  }
    return (
      <CandidatesLayoutComponent>
        <HelmetTitle title="Calendario" />

        <main>
          <div className="calendar_section">
            <div className="header_container">
              <h1>MI CALENDARIO</h1>
            </div>

            <div className="calendar_container">
              <div className="calendar_logo">
                <div className="svg-container">
                  <CalendarSVG />
                </div>
                <div className="calendar_actions">
                  <div className="action_card">
                    <div className="details">
                      <h3>PRUEBA DE POLIGRAFÍA</h3>
                      <div className="box_content">
                        <div className="content">
                          <div id="poligrafia" className="icon" />
                        </div>
                        <div className="simple_row">
                          <div className="d_row">
                            <span>
                              {`Estudio ${studiesScheduled.find(
                                (study: any) => study.itsAPolygraph === true
                              )
                                ? studiesScheduled.find(
                                  (study: any) =>
                                    study.itsAPolygraph === true
                                ).name
                                : 'Sin Programar'
                                }`}
                            </span>
                          </div>
                          <div className="d_row">
                            <span>{`Fecha: ${studiesScheduled.find(
                              (study: any) => study.itsAPolygraph === true
                            )
                              ? dayjs(
                                studiesScheduled.find(
                                  (study: any) =>
                                    study.itsAPolygraph === true
                                ).dateTimeEvent
                              ).format('L')
                              : 'Sin Programar'
                              }`}</span>
                          </div>
                          <div className="d_row">
                            <span>{`Hora: ${studiesScheduled.find(
                              (study: any) => study.itsAPolygraph === true
                            )
                              ? dayjs(
                                studiesScheduled.find(
                                  (study: any) =>
                                    study.itsAPolygraph === true
                                ).dateTimeEvent
                              ).format('HH:mm')
                              : 'Sin Programar'
                              }`}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="action_card">
                    <div className="details">
                      <h3>VISITA DOMICILIARIA</h3>
                      <div className="box_content">
                        <div className="content">
                          <div id="visita" className="icon" />
                        </div>
                        <div className="simple_row">
                          <div className="d_row">
                            <span>
                              {`Estudio ${studiesScheduled.find(
                                (study: any) => study.itsAVisit === true
                              )
                                ? studiesScheduled.find(
                                  (study: any) => study.itsAVisit === true
                                ).name
                                : 'Sin Programar'
                                }`}
                            </span>
                          </div>
                          <div className="d_row">
                            <span>{`Fecha: ${studiesScheduled.find(
                              (study: any) => study.itsAVisit === true
                            )
                              ? dayjs(
                                studiesScheduled.find(
                                  (study: any) => study.itsAVisit === true
                                ).dateTimeEvent
                              ).format('L')
                              : 'Sin Programar'
                              }`}</span>
                          </div>
                          <div className="d_row">
                            <span>{`Hora: ${studiesScheduled.find(
                              (study: any) => study.itsAVisit === true
                            )
                              ? dayjs(
                                studiesScheduled.find(
                                  (study: any) => study.itsAVisit === true
                                ).dateTimeEvent
                              ).format('HH:mm')
                              : 'Sin Programar'
                              }`}</span>
                          </div>
                          <div className="d_row">
                            <span>{`Tipo de visita: ${studiesScheduled.find(
                              (study: any) => study.itsAVisit === true
                            )
                              ? studiesScheduled.find(
                                (study: any) => study.itsAVisit === true
                              ).canBeTakenVirtual === true
                                ? 'VIRTUAL'
                                : 'PRESENCIAL'
                              : 'Sin Programar'
                              }`}</span>
                          </div>
                          {studiesScheduled.length > 0 &&
                            studiesScheduled.find(
                              (study: any) => study.itsAVisit === true
                            ).canBeTakenVirtual === true && (
                              <div className="d_row">
                                <span>{`Link de conexión: ${studiesScheduled.find(
                                  (study: any) => study.itsAVisit === true
                                )
                                  ? studiesScheduled.find(
                                    (study: any) => study.itsAVisit === true
                                  ).additionalInformation
                                  : 'Sin Programar'
                                  }`}</span>
                              </div>
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="calendar_description">
                <div className="box_container">
                  <h2>RECOMENDACIONES</h2>
                  <h4>Prueba de poligrafía</h4>
                  <ol>
                    <li>Documento de identificación</li>
                    <li>Hoja de vida</li>
                    <li>Contar con disponibilidad de tiempo</li>
                    <li>
                      No haber consumido alcohol, ni sustancias alucinógenas 24
                      horas antes de la prueba
                    </li>
                    <li>Prepárate físicamente</li>
                    <li>Dormir bien la noche anterior a la prueba</li>
                  </ol>

                  <h4>Visita domiciliaria</h4>
                  <ol>
                    <li>Contar con disponibililidad de tiempo</li>
                    <li>
                      Contar con buena conexión a internet y cámara de video
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </main>
      </CandidatesLayoutComponent>
    );
}
