import { fetchApiWeb } from "@/api/instances";

export const getProtocol = async (page: number = 1, take: number = 10, term?: string) => {
    return await fetchApiWeb.get(`protocol?page=${page}&take=${take}${term ? `&term=${term}` : ''}`);
}

export const createProtocol = async (data: any) => {
    return await fetchApiWeb.post("protocol", data);
}

export const updateProtocol = async (data: any, id: string | number) => {
    return await fetchApiWeb.put(`protocol/${id}`, data);
}

export const deleteProtocol = async (id: string | number) => {
    return await fetchApiWeb.delete(`protocol/${id}`);
}