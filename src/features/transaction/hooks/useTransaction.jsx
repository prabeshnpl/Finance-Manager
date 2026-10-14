import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useInfiniteList from '../../../shared/hooks/useInfiniteList';
import { transactionService } from "../services/transactionService";
import { useState } from "react";

export function useTransaction() {
  const queryClient = useQueryClient();
  const [filters, setFilters] = useState({
    type: null, // income, expense
    category: null,
    account: null,
    startDate: null,
    endDate: null,
    member: null,
    search: null
  });

  // Infinite loader for transactions
  const useInfiniteTransactions = (overrideFilters = null) => {
    const combined = { ...filters, ...(overrideFilters || {}) };
    return useInfiniteList(
      ["finance", "transactions", "infinite"], 
      (params) => transactionService.getTransactions({ ...combined, ...params, page_size:5 }), 
      [combined]
    );
  };

  // Transaction Mutations
  const createTransaction = useMutation({
    mutationFn: transactionService.createTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries(["finance"]);
    },
  });

  const updateTransaction = useMutation({
    mutationFn: ({ id, data }) => transactionService.updateTransaction(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["finance"]);
    },
  });

  const deleteTransaction = useMutation({
    mutationFn: transactionService.deleteTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries(["finance"]);
    },
  });

  const accounts = useQuery({
    queryKey: ["finance", "accounts"],
    queryFn: () => transactionService.getAccounts(),
    retry: false
  });

  const exportTransactions = async (format = 'csv') => {
    try {
      const response = await transactionService.exportTransactions(format, filters);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `transactions_${Date.now()}.${format}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Export failed:', error);
      throw error;
    }
  };


  return {
    // Data
    accounts: accounts,
    useInfiniteTransactions,

    // Filters
    filters,
    setFilters,

    // Mutations
    createTransaction,
    updateTransaction,
    deleteTransaction,
    
    exportTransactions,
  };
}
