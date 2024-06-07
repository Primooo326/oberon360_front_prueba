import { fetchApiWeb } from "@/api/instances";

export const getActivities = async (
  page: number = 1,
  take: number = 10,
  term?: string
) => {
  return await fetchApiWeb.get(
    `activity?page=${page}&take=${take}${term ? `&term=${term}` : ""}`
  );
};

export const getAttendance = async (
  page: number = 1,
  take: number = 10,
  term?: string
) => {
  return await fetchApiWeb.post(
    `/attendance/findAttendance?page=${page}&take=${take}${
      term ? `&term=${term}` : ""
    }`
  );
};

export const createActivity = async (data: any) => {
  return await fetchApiWeb.post("activity", data);
};

export const updateActivity = async (data: any, id: string | number) => {
  return await fetchApiWeb.put(`activity/${id}`, data);
};

export const deleteActivity = async (id: string | number) => {
  return await fetchApiWeb.delete(`activity/${id}`);
};
