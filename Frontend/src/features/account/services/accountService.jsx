import { api } from "../../../api/apiClient";
import { ENDPOINTS } from "../../../api/endpoints";

export const accountService = {
    
  getAccounts: (params) =>
    api.get(`${ENDPOINTS.ACCOUNT}/`, { params }),

  createAccount: (data) =>
    api.post(`${ENDPOINTS.ACCOUNT}/`, data),

  updateAccount: (id, data) =>
    api.patch(`${ENDPOINTS.ACCOUNT}/${id}/`, data),

  deleteAccount: (id) =>
    api.delete(`${ENDPOINTS.ACCOUNT}/${id}/`),

  getAccountBalance: (id) =>
    api.get(`${ENDPOINTS.ACCOUNT}/${id}/balance/`),

};
