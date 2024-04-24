import { API_ENDPOINTS } from '@/data/constants';
import { fetchApiIC } from "@/api/instances"
export async function authenticateUser(body: any) {
  return fetchApiIC.post(`${API_ENDPOINTS.AUTH}/login`, body);
}

export async function validateSession() {
  return fetchApiIC.post(`${API_ENDPOINTS.AUTH}/validate`);
}
