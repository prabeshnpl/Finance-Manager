import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { accountService } from "../services/accountService";

export function useAccount() {
  const queryClient = useQueryClient();
  
  const accounts = useQuery({
    queryKey: ["finance", "accounts"],
    queryFn: () => accountService.getAccounts(),
    retry: false
  });

  // Account Mutations
  const createAccount = useMutation({
    mutationFn: accountService.createAccount,
    onSuccess: () => {
      queryClient.invalidateQueries(["finance", "accounts"]);
    },
  });

  const updateAccount = useMutation({
    mutationFn: ({ id, data }) => accountService.updateAccount(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["finance", "accounts"]);
    },
  });

  const deleteAccount = useMutation({
    mutationFn: accountService.deleteAccount,
    onSuccess: () => {
      queryClient.invalidateQueries(["finance", "accounts"]);
      queryClient.invalidateQueries(["finance", "transactions"]);
    },
  });

  return {
    accounts,
    createAccount,
    updateAccount,
    deleteAccount,
  };
}