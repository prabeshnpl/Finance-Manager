import api from "@/api/apiClient";
import { ENDPOINTS } from "@/api/endpoints";

export const reportService = {
    
  getSummary: (params) =>
    api.get(`${ENDPOINTS.SUMMARY}/`, { params }),

  getReports: (params) =>
    api.get(`${ENDPOINTS.REPORT}/`, { params }),

  getIncomeExpenseTrend: (params) =>
    api.get(`${ENDPOINTS.REPORT}/income-expense-trend/`, { params }),

  getCategories: () =>
    api.get(`${ENDPOINTS.CATEGORY}/`),

  getAccounts: () =>
    api.get(`${ENDPOINTS.ACCOUNT}/`),

  getCategoryBreakdown: (params) =>
    api.get(`${ENDPOINTS.CATEGORY_BREAKDOWN}/`, { params }),

  getMemberWiseBreakdown: (params) =>
    api.get(`${ENDPOINTS.MEMBER_BREAKDOWN}/`, { params }),


}