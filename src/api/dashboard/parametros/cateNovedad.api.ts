// category-novelty

import { fetchApiWeb } from "@/api/instances"

export const getCategoryNovelty = async (page: number = 1, take: number = 10, term?: string) => {
    return await fetchApiWeb.get(`category-novelty?page=${page}&take=${take}${term ? `&term=${term}` : ''}`);
}

export const createCategoryNovelty = async (data: any) => {
    return await fetchApiWeb.post("category-novelty", data);
}

export const updateCategoryNovelty = async (data: any, id: string | number) => {
    return await fetchApiWeb.put(`category-novelty/${id}`, data);
}

export const deleteCategoryNovelty = async (id: string | number) => {
    return await fetchApiWeb.delete(`category-novelty/${id}`);
}

export const findAllCategories = async () => {
    return await fetchApiWeb.get("category-novelty/findAllCategories");
}