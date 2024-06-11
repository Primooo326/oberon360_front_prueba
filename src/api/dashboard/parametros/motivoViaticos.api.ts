// travel-reason
import { fetchApiWeb } from "@/api/instances";

export const getTravelReasons = async (page: number = 1, take: number = 10, term?: string) => {
    return await fetchApiWeb.get(`travel-reason?page=${page}&take=${take}${term ? `&term=${term}` : ''}`);
}
export const createTravelReason = async (data: any) => {
    return await fetchApiWeb.post("travel-reason", data);
}

export const updateTravelReason = async (data: any, id: string | number) => {
    return await fetchApiWeb.put(`travel-reason/${id}`, data);
}

export const deleteTravelReason = async (id: string | number) => {
    return await fetchApiWeb.delete(`travel-reason/${id}`);
}