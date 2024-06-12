// points
import { fetchApiWeb } from "@/api/instances"

export const getPoints = async (page: number = 1, take: number = 50000, term?: string) => {
    return await fetchApiWeb.get(`points?page=${page}&take=${take}${term ? `&term=${term}` : ''}`);
}

export const createPoint = async (data: any) => {
    return await fetchApiWeb.post("points", data);
}

export const updatePoint = async (data: any, id: string | number) => {
    return await fetchApiWeb.put(`points/${id}`, data);
}

export const deletePoint = async (id: string | number) => {
    return await fetchApiWeb.delete(`points/${id}`);
}