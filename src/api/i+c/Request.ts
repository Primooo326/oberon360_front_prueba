import type { RequestCustom } from '@/models/i+c/Requests';
import { fetchApiIC } from "@/api/instances"
import { API_ENDPOINTS } from '@/data/constants';

export async function getRequests() {
  return fetchApiIC.get(`${API_ENDPOINTS.REQUEST}/getRequests`);
}

export async function createRequest(request: RequestCustom) {
  return fetchApiIC.post(`${API_ENDPOINTS.REQUEST}/createRequest`, request);
}

export async function loadRequest(request: FormData) {
  return fetchApiIC.post(`${API_ENDPOINTS.REQUEST}/bulkUpload`, request);
}

export async function sendAndSubmitRequest(
  requestId: string,
  customerId: string
) {
  return fetchApiIC.post(
    `${API_ENDPOINTS.REQUEST}/submitRequest/${requestId}?customerId=${customerId}`
  );
}

export async function downloadRequestTemplate() {
  return fetchApiIC.get(`${API_ENDPOINTS.REQUEST}/downloadTemplate`, 'arraybuffer');
}

export async function updateRequest(requestId: string, request: RequestCustom) {
  return fetchApiIC.put(
    `${API_ENDPOINTS.REQUEST}/updateRequest/${requestId}`,
    request
  );
}

export async function deleteRequest(requestId: string) {
  return fetchApiIC.delete(`${API_ENDPOINTS.REQUEST}/deleteRequest/${requestId}`);
}
