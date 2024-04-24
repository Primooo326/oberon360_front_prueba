import { fetchApiIC } from "@/api/instances"
import { API_ENDPOINTS } from '@/data/constants';

export async function updatePassword(body: any) {
  return fetchApiIC.put(`${API_ENDPOINTS.USERS}/updatePassword`, body);
}

export async function getUsers() {
  return fetchApiIC.get(`${API_ENDPOINTS.USERS}/getUsers`);
}

export async function createUser(user: FormData) {
  return fetchApiIC.post(`${API_ENDPOINTS.USERS}/createUser`, user);
}

export async function updateUser(userId: string, user: FormData) {
  return fetchApiIC.put(`${API_ENDPOINTS.USERS}/updateUser/${userId}`, user);
}

export async function deleteUser(userId: string) {
  return fetchApiIC.delete(`${API_ENDPOINTS.USERS}/deleteUser/${userId}`);
}
