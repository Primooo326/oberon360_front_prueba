// sub-category-novelty
import { fetchApiWeb } from "@/api/instances";

export const getSubCategoryNovelty = async (page: number = 1, take: number = 10, term?: string) => {
    return await fetchApiWeb.get(`/sub-category-novelty?page=${page}&take=${take}${term ? `&term=${term}` : ''}`);
};

export const createSubCategoryNovelty = async (data: any) => {
    return await fetchApiWeb.post("/sub-category-novelty", data);
};

export const updateSubCategoryNovelty = async (data: any, id: string,) => {
    return await fetchApiWeb.put(`/sub-category-novelty/${id}`, data);
};

export const deleteSubCategoryNovelty = async (id: string) => {
    return await fetchApiWeb.delete(`/sub-category-novelty/${id}`);
};

