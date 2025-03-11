import {api} from "@/app/providers/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import type {Transaction} from "@/shared/types/models/Transaction";

export const createTransaction = async (transaction: Omit<Transaction, "id">) => {
  const response = await api.post("/transactions", transaction);
  return response.data;
};

export function useCreateTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (transaction: Omit<Transaction, "id">) => createTransaction(transaction),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });
}
