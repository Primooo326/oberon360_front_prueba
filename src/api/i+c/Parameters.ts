import { fetchApiIC } from "@/api/instances"
import { API_ENDPOINTS } from '@/data/constants';

// Locations

export async function getCountries() {
  return fetchApiIC.get(`${API_ENDPOINTS.LOCATIONS}/countries/getCountries`);
}

export async function getDepartmentsByCountry(countryId: string) {
  return fetchApiIC.get(
    `${API_ENDPOINTS.LOCATIONS}/departments/getDepartmentsByCountry/${countryId}`
  );
}

export async function getMunicipalitiesByDepartment(countryId: string) {
  return fetchApiIC.get(
    `${API_ENDPOINTS.LOCATIONS}/municipalities/getMunicipalitiesByDepartment/${countryId}`
  );
}

export async function getCitiesByCountry(countryId: string) {
  return fetchApiIC.get(
    `${API_ENDPOINTS.LOCATIONS}/municipalities/getMunicipalitiesByCountry/${countryId}`
  );
}

export async function getDistrictsByMunicipality(municipalityId: string) {
  return fetchApiIC.get(
    `${API_ENDPOINTS.LOCATIONS}/districts/getDistrictsByMunicipality/${municipalityId}`
  );
}

// Professions
export async function getProfessions() {
  return fetchApiIC.get(`${API_ENDPOINTS.PROFESSIONS}/getProfessions`);
}

// Parameters

export async function getParameterGroups() {
  return fetchApiIC.get(`${API_ENDPOINTS.PARAMETERS}/groups/list`);
}

export async function getParameterTypes() {
  return fetchApiIC.get(`${API_ENDPOINTS.PARAMETERS}/types/list`);
}

export async function getParametersByGroup(groupId: string) {
  return fetchApiIC.get(
    `${API_ENDPOINTS.PARAMETERS}/getParametersByGroup/${groupId}`
  );
}

export async function getOperationParametersByListId(groupId: string) {
  return fetchApiIC.get(
    `${API_ENDPOINTS.OPERATIONAL_PARAMETERS}/getOperationParametersByListId/${groupId}`
  );
}

export async function getParametersByGroupAndOrderFather(
  groupId: string,
  fatherId: string
) {
  return fetchApiIC.get(
    `${API_ENDPOINTS.PARAMETERS}/getParametersByGroup/${groupId}?fatherId=${fatherId}`
  );
}

export async function createParameter(parameter: any) {
  return fetchApiIC.post(`${API_ENDPOINTS.PARAMETERS}/createParameter`, parameter);
}

export async function editParameter(parameterId: string, parameter: any) {
  return fetchApiIC.put(
    `${API_ENDPOINTS.PARAMETERS}/updateParameter/${parameterId}`,
    parameter
  );
}

export async function deleteParameter(parameterId: string) {
  return fetchApiIC.delete(
    `${API_ENDPOINTS.PARAMETERS}/deleteParameter/${parameterId}`
  );
}

// Operational Groups
export async function getCustomerOperationalGroupByUser(leaderId: string) {
  return fetchApiIC.get(
    `${API_ENDPOINTS.OPERATIONAL_GROUPS}/getCustomerOperationalGroupByUser/${leaderId}`
  );
}

export async function getOperationalGroups() {
  return fetchApiIC.get(`${API_ENDPOINTS.OPERATIONAL_GROUPS}/getOperationalGroups`);
}

export async function createOperationalGroup(group: any) {
  return fetchApiIC.post(
    `${API_ENDPOINTS.OPERATIONAL_GROUPS}/createOperationalGroup`,
    group
  );
}

export async function editOperationalGroup(groupId: string, group: any) {
  return fetchApiIC.put(
    `${API_ENDPOINTS.OPERATIONAL_GROUPS}/updateOperationalGroup/${groupId}`,
    group
  );
}

export async function deleteOperationalGroup(groupId: string) {
  return fetchApiIC.delete(
    `${API_ENDPOINTS.OPERATIONAL_GROUPS}/deleteOperationalGroup/${groupId}`
  );
}
