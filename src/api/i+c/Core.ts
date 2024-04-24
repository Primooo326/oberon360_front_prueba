import { fetchApiIC } from "@/api/instances"
import { API_ENDPOINTS } from '@/data/constants';

// Modules
export async function getModules() {
  return fetchApiIC.get(`${API_ENDPOINTS.MODULES}/getModules`);
}

// Charges
export async function getCharges() {
  return fetchApiIC.get(`${API_ENDPOINTS.CHARGES}/getCharges`);
}

// Files
export async function getFile(path: string) {
  return fetchApiIC.get(`${API_ENDPOINTS.FILES}/getFile/${path}`);
}
