import { fetchApiIC } from "@/api/instances"
import { API_ENDPOINTS } from '@/data/constants';

export async function getStudiesScheduled() {
  return fetchApiIC.get(
    `${API_ENDPOINTS.CANDIDATES}/information/getStudiesScheduled`
  );
}

export async function getStudyTypesFromServices() {
  return fetchApiIC.get(`${API_ENDPOINTS.STUDIES}/getStudyTypesFromServices`);
}

export async function getStudiesFromCandidate(
  candidateId: string,
  requestId: string
) {
  return fetchApiIC.get(
    `${API_ENDPOINTS.STUDIES}/getStudiesFromCandidate/${candidateId}?requestId=${requestId}`
  );
}

export async function getStudiesFromRequests() {
  return fetchApiIC.get(`${API_ENDPOINTS.STUDIES}/getStudiesFromRequests`);
}

export async function assignToAnalyst(body: any) {
  return fetchApiIC.post(`${API_ENDPOINTS.STUDIES}/assignToAnalyst`, body);
}

export async function scheduleService(body: any) {
  return fetchApiIC.post(`${API_ENDPOINTS.STUDIES}/scheduleService`, body);
}

// Candidate Info

export async function getCandidateFiles(candidateId: string) {
  return fetchApiIC.get(`${API_ENDPOINTS.STUDIES}/getCandidateFiles/${candidateId}`);
}

export async function getCandidateBasicData(candidateId: string) {
  return fetchApiIC.get(
    `${API_ENDPOINTS.STUDIES}/getCandidateBasicData/${candidateId}`
  );
}

export async function getFamilyData(candidateId: string) {
  return fetchApiIC.get(`${API_ENDPOINTS.STUDIES}/getFamilyData/${candidateId}`);
}

export async function getFamilySecondaryData(candidateId: string) {
  return fetchApiIC.get(
    `${API_ENDPOINTS.STUDIES}/getFamilySecondaryData/${candidateId}`
  );
}

export async function getEmploymentData(candidateId: string) {
  return fetchApiIC.get(`${API_ENDPOINTS.STUDIES}/getEmploymentData/${candidateId}`);
}

export async function getAcademicData(candidateId: string) {
  return fetchApiIC.get(`${API_ENDPOINTS.STUDIES}/getAcademicData/${candidateId}`);
}

export async function getVisitDomicilaryRemarks(studyId: string) {
  return fetchApiIC.get(
    `${API_ENDPOINTS.STUDIES}/getVisitDomicilaryRemarks/${studyId}`
  );
}

export async function loadVisitDomicilaryRemarks(studyRemarks: any) {
  return fetchApiIC.post(
    `${API_ENDPOINTS.STUDIES}/loadVisitDomicilaryRemarks/`,
    studyRemarks
  );
}

export async function getHousingData(studyId: string, candidateId: string) {
  return fetchApiIC.get(
    `${API_ENDPOINTS.STUDIES}/getHousingData/${studyId}?candidateId=${candidateId}`
  );
}

export async function loadHousingData(economicData: any) {
  return fetchApiIC.post(`${API_ENDPOINTS.STUDIES}/loadHousingData/`, economicData);
}

export async function getEconomicIncomeData(studyId: string) {
  return fetchApiIC.get(`${API_ENDPOINTS.STUDIES}/getEconomicIncomeData/${studyId}`);
}

export async function loadEconomicIncomeData(economicData: any) {
  return fetchApiIC.post(
    `${API_ENDPOINTS.STUDIES}/loadEconomicIncomeData/`,
    economicData
  );
}

export async function loadVisitDomicilaryConcept(conceptInformation: FormData) {
  return fetchApiIC.post(
    `${API_ENDPOINTS.STUDIES}/loadVisitDomicilaryConcept/`,
    conceptInformation
  );
}

export async function getVisitDomicilaryConcept(studyId: string) {
  return fetchApiIC.get(
    `${API_ENDPOINTS.STUDIES}/getVisitDomicilaryConcept/${studyId}`
  );
}

export async function loadVisitDomiciliaryReferencingData(
  referencingRemarksData: any
) {
  return fetchApiIC.post(
    `${API_ENDPOINTS.STUDIES}/loadVisitDomiciliaryReferencingData/`,
    referencingRemarksData
  );
}

export async function getStudyFamilyData(studyId: string) {
  return fetchApiIC.get(`${API_ENDPOINTS.STUDIES}/getStudyFamilyData/${studyId}`);
}

export async function loadFamilyData(economicData: any) {
  return fetchApiIC.post(`${API_ENDPOINTS.STUDIES}/loadFamilyData/`, economicData);
}

export async function getSecondaryStudyFamilyData(studyId: string) {
  return fetchApiIC.get(
    `${API_ENDPOINTS.STUDIES}/getSecondaryStudyFamilyData/${studyId}`
  );
}

export async function loadSecondaryFamilyData(economicData: any) {
  return fetchApiIC.post(
    `${API_ENDPOINTS.STUDIES}/loadSecondaryFamilyData/`,
    economicData
  );
}

export async function loadCandidateEmploymentStudyData(studyData: any) {
  return fetchApiIC.post(
    `${API_ENDPOINTS.STUDIES}/loadCandidateEmploymentStudyData/`,
    studyData
  );
}

export async function getCandidateEmploymentStudyData(
  studyId: string,
  candidateId: string
) {
  return fetchApiIC.get(
    `${API_ENDPOINTS.STUDIES}/getCandidateEmploymentStudyData/${candidateId}?studyId=${studyId}`
  );
}

export async function loadCandidateAcademicStudyData(studyData: any) {
  return fetchApiIC.post(
    `${API_ENDPOINTS.STUDIES}/loadCandidateAcademicStudyData/`,
    studyData
  );
}

export async function getCandidateAcademicData(
  studyId: string,
  candidateId: string
) {
  return fetchApiIC.get(
    `${API_ENDPOINTS.STUDIES}/getCandidateAcademicData/${candidateId}?studyId=${studyId}`
  );
}

export async function loadCandidateReferencesStudyData(studyData: any) {
  return fetchApiIC.post(
    `${API_ENDPOINTS.STUDIES}/loadCandidateReferencesStudyData/`,
    studyData
  );
}

export async function getCandidateReferencesData(
  studyId: string,
  candidateId: string
) {
  return fetchApiIC.get(
    `${API_ENDPOINTS.STUDIES}/getCandidateReferencesData/${candidateId}?studyId=${studyId}`
  );
}

export async function loadStudyBackgroundCheckData(studyData: any) {
  return fetchApiIC.post(
    `${API_ENDPOINTS.STUDIES}/loadStudyBackgroundCheckData/`,
    studyData
  );
}

export async function getStudyBackgroundCheckData(studyId: string) {
  return fetchApiIC.get(
    `${API_ENDPOINTS.STUDIES}/getStudyBackgroundCheckData/${studyId}`
  );
}

export async function loadStudyFinancialData(studyData: any) {
  return fetchApiIC.post(
    `${API_ENDPOINTS.STUDIES}/loadStudyFinancialData/`,
    studyData
  );
}

export async function getStudyFinancialData(studyId: string) {
  return fetchApiIC.get(`${API_ENDPOINTS.STUDIES}/getStudyFinancialData/${studyId}`);
}
