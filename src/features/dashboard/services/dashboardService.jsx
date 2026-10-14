import { api } from "@/api/apiClient";
import { ENDPOINTS } from "@/api/endpoints";

export const dashboardService = {
  
  getSummary: (params) =>
    api.get(`${ENDPOINTS.SUMMARY}/`, { params }),

  getIncomeExpenseTrend: (params) =>
    api.get(`${ENDPOINTS.REPORT}/income-expense-trend/`, { params}),

  getCategories: () =>
    api.get(`${ENDPOINTS.CATEGORY}/`),

  getAccounts: (params) =>
    api.get(`${ENDPOINTS.ACCOUNT}/`, { params }),

};
