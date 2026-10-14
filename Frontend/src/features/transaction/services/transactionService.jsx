import { api } from "@/api/apiClient";
import { ENDPOINTS } from "@/api/endpoints";

export const transactionService = {

  getTransactions: (params) =>
    api.get(`${ENDPOINTS.TRANSACTION}/`, { params }),

  createTransaction: (data) =>
    api.post(`${ENDPOINTS.TRANSACTION}/`, data),

  updateTransaction: (id, data) =>
    api.patch(`${ENDPOINTS.TRANSACTION}/${id}/`, data),

  deleteTransaction: (id) =>
    api.delete(`${ENDPOINTS.TRANSACTION}/${id}/`),

  getTransactionById: (id) =>
    api.get(`${ENDPOINTS.TRANSACTION}/${id}/`),

}