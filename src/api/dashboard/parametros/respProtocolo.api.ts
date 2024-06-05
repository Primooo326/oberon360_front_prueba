import { fetchApiWeb } from "@/api/instances";

// protocol-responsible
export const getProtocolResponsible = async (page: number = 1, take: number = 10, term?: string) => {
    return await fetchApiWeb.get(`protocol-responsible?page=${page}&take=${take}${term ? `&term=${term}` : ''}`);
}

export const createProtocolResponsible = async (data: any) => {
    return await fetchApiWeb.post("protocol-responsible", data);
}

export const updateProtocolResponsible = async (data: any, id: string | number) => {
    return await fetchApiWeb.put(`protocol-responsible/${id}`, data);
}

export const deleteProtocolResponsible = async (id: string | number) => {
    return await fetchApiWeb.delete(`protocol-responsible/${id}`);
}