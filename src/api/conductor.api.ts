import { fetchApiWeb } from "./instances";

export const getDrivers = async (page: number = 1, take: number = 10) => {
    return await fetchApiWeb.get(`driver?page=${page}&take=${take}`);
}

export const findAllDrivers = async () => {
    return await fetchApiWeb.get("driver/findAllDrivers");
}

export const downloadExcel = async (data: any) => {
    return await fetchApiWeb.downloadExcel("driver/downloadExcel", { dataExport: data });
};

export const updateDriver = async (data: any, id: string | number) => {
    return await fetchApiWeb.put(`driver/${id}`, data);
}

export const createDriver = async (data: any) => {
    return await fetchApiWeb.post("driver", data);
}