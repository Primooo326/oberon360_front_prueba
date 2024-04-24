import React from 'react';
import CandidatesLayoutComponent from '@/components/i+c/layout/Candidates';
import HelmetTitle from '@/components/i+c/ui/HelmetTitle';
import { useAppSelector } from '@/redux/hooks';
import { selectFinishProcess } from '@/redux/slices/candidates';

export default function CandidatesDashboardProcess() {
  const submitDataProcess = useAppSelector(selectFinishProcess);

  return (
    <CandidatesLayoutComponent>
      <HelmetTitle title="Mi Proceso" />

      <main>
        <div className="process_section">
          <div className="process_container">
            <h3>MI PROCESO</h3>
            <div className="progess_bar">
              <div className="progess_content">
                <div
                  className={`progress_item progress_item_start ${submitDataProcess === true
                    ? 'status_completed'
                    : 'status_in_process'
                    }`}
                >
                  <div className="icon_desc" id="register" />
                  <h4>REGISTRO DE INFORMACIÓN</h4>
                </div>
                <div
                  className={`progress_item ${submitDataProcess !== true
                    ? 'status_completed'
                    : 'status_in_process'
                    }`}
                >
                  <div className="icon_desc" id="referencing" />
                  <h4>REFERENCIACIÓN HOJA DE VIDA</h4>
                </div>
                <div className="progress_item">
                  <div className="icon_desc" id="visit" />
                  <h4>VISITA DOMICILIARIA</h4>
                </div>
                <div className="progress_item progress_item_end">
                  <div className="icon_desc" id="test" />
                  <h4>PRUEBA POLIGRAFÍA</h4>
                </div>
              </div>
            </div>
            <div className="captions">
              <table rules="all">
                <tbody>
                  <tr>
                    <td>
                      <div className="icon_caption" id="completed" />
                    </td>
                    <td>Completado</td>
                  </tr>
                  <tr>
                    <td>
                      <div className="icon_caption" id="in_process" />
                    </td>
                    <td>En proceso</td>
                  </tr>
                  <tr>
                    <td>
                      <div className="icon_caption" id="pending" />
                    </td>
                    <td>Pendiente</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </CandidatesLayoutComponent>
  );
}
