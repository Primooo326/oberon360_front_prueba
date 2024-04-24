import { fetchApiIC } from "@/api/instances"
import { API_ENDPOINTS } from '@/data/constants';

export async function getCustomers() {
  return fetchApiIC.get(`${API_ENDPOINTS.CUSTOMERS}/getCustomers`);
}

export async function getCustomerInfo(customerId: string) {
  return fetchApiIC.get(`${API_ENDPOINTS.CUSTOMERS}/getCustomerInfo/${customerId}`);
}

export async function createCustomerParameter(param: any) {
  return fetchApiIC.post(`${API_ENDPOINTS.CUSTOMERS}/createParameter`, param);
}

export async function getParametersFromCustomerByGroup(
  customerId: string,
  groupId: string
) {
  return fetchApiIC.get(
    `${API_ENDPOINTS.CUSTOMERS}/getParameters/${customerId}?group=${groupId}`
  );
}

export async function getCustomerParameterTypes() {
  return fetchApiIC.get(`${API_ENDPOINTS.CUSTOMERS}/getParameterTypes`);
}

export async function updateParameter(param: any, paramId: string) {
  return fetchApiIC.put(
    `${API_ENDPOINTS.CUSTOMERS}/updateParameter/${paramId}`,
    param
  );
}

export async function deleteCustomerParameter(paramId: string) {
  return fetchApiIC.delete(`${API_ENDPOINTS.CUSTOMERS}/deleteParameter/${paramId}`);
}
