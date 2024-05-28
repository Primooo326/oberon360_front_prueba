import { fetchApiWeb } from "./instances";

export const getDrivers = async (page: number = 1, take: number = 10) => {
    return await fetchApiWeb.get(`driver?page=${page}&take=${take}`);
}