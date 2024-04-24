import type { RolesCreationRequest } from '@/models/i+c/Requests';
import { fetchApiIC } from "@/api/instances"
import { API_ENDPOINTS } from '@/data/constants';

export async function getRoles() {
  return fetchApiIC.get(`${API_ENDPOINTS.ROLES}/getRoles`);
}

export async function createRole(role: RolesCreationRequest) {
  return fetchApiIC.post(`${API_ENDPOINTS.ROLES}/createRole`, role);
}

export async function updateRole(roleId: string, role: RolesCreationRequest) {
  return fetchApiIC.put(`${API_ENDPOINTS.ROLES}/updateRole/${roleId}`, role);
}

export async function deleteRole(roleId: string) {
  return fetchApiIC.delete(`${API_ENDPOINTS.ROLES}/deleteRole/${roleId}`);
}
