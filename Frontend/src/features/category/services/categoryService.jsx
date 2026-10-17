import { api } from "@/api/apiClient";
import { ENDPOINTS } from "@/api/endpoints";

export const categoryService = {
  getCategories: () =>
    api.get(`${ENDPOINTS.CATEGORY}/`),

  createCategory: (data) =>
    api.post(`${ENDPOINTS.CATEGORY}/`, data),

  updateCategory: (id, data) =>
    api.patch(`${ENDPOINTS.CATEGORY}/${id}/`, data),

  deleteCategory: (id) =>
    api.delete(`${ENDPOINTS.CATEGORY}/${id}/`),

}