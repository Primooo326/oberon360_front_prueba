import { fetchApiWeb } from "../../instances";

export const getDrivers = async (page: number = 1, take: number = 10, term?: string) => {
    return await fetchApiWeb.get(`driver?page=${page}&take=${take}${term ? `&term=${term}` : ''}`);
}

export const findAllDrivers = async () => {
    return await fetchApiWeb.get("driver/findAllDrivers");
}


export const updateDriver = async (data: any, id: string | number) => {
    return await fetchApiWeb.put(`driver/${id}`, data);
}

export const createDriver = async (data: any) => {
    return await fetchApiWeb.post("driver", data);
}

export const deleteDriver = async (id: string | number) => {
    return await fetchApiWeb.delete(`driver/${id}`);
}