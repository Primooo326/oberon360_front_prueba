import { fetchApiIC } from "@/api/instances"
import { API_ENDPOINTS } from '@/data/constants';

export async function loadBasicData(body: FormData) {
  return fetchApiIC.post(
    `${API_ENDPOINTS.CANDIDATES}/information/loadBasicData`,
    body
  );
}

export async function getBasicData() {
  return fetchApiIC.get(`${API_ENDPOINTS.CANDIDATES}/information/getBasicData`);
}

export async function loadAcademicAndEmploymentData(body: FormData) {
  return fetchApiIC.post(
    `${API_ENDPOINTS.CANDIDATES}/information/loadAcademicAndEmploymentData`,
    body
  );
}

export async function getAcademicAndEmploymentData() {
  return fetchApiIC.get(
    `${API_ENDPOINTS.CANDIDATES}/information/getAcademicAndEmploymentData`
  );
}

export async function loadParentsAndSiblingsData(body: any) {
  return fetchApiIC.post(
    `${API_ENDPOINTS.CANDIDATES}/information/loadParentsAndSiblingsData`,
    body
  );
}

export async function getParentsAndSiblingsData() {
  return fetchApiIC.get(
    `${API_ENDPOINTS.CANDIDATES}/information/getParentsAndSiblingsData`
  );
}

export async function loadSpouseAndParentsInlawData(body: any) {
  return fetchApiIC.post(
    `${API_ENDPOINTS.CANDIDATES}/information/loadSpouseAndParentsInlawData`,
    body
  );
}

export async function getSpouseInlawData() {
  return fetchApiIC.get(
    `${API_ENDPOINTS.CANDIDATES}/information/getSpouseInlawData`
  );
}

export async function loadPeopleWithlivesAndHousingData(body: any) {
  return fetchApiIC.post(
    `${API_ENDPOINTS.CANDIDATES}/information/loadPeopleWithlivesAndHousingData`,
    body
  );
}

export async function getPeopleWithlivesAndHousingData() {
  return fetchApiIC.get(
    `${API_ENDPOINTS.CANDIDATES}/information/getPeopleWithlivesAndHousingData`
  );
}

export async function loadReferencesData(body: FormData) {
  return fetchApiIC.post(
    `${API_ENDPOINTS.CANDIDATES}/information/loadReferencesData`,
    body
  );
}

export async function getReferencesData() {
  return fetchApiIC.get(`${API_ENDPOINTS.CANDIDATES}/information/getReferencesData`);
}

export async function getCandidateFiles() {
  return fetchApiIC.get(`${API_ENDPOINTS.CANDIDATES}/information/getCandidateFiles`);
}

export async function completeCandidateProcess() {
  return fetchApiIC.post(
    `${API_ENDPOINTS.CANDIDATES}/information/CompleteCandidateProcess`
  );
}

export async function getProcessCandidate() {
  return fetchApiIC.get(
    `${API_ENDPOINTS.CANDIDATES}/information/getProcessCandidate`
  );
}

export async function getServicesScheduled() {
  return fetchApiIC.get(`${API_ENDPOINTS.CANDIDATES}/getServicesScheduled`);
}
