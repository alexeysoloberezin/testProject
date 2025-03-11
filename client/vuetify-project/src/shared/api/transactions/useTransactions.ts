import { useQuery } from "@tanstack/vue-query";
import { api } from "@/app/providers/axiosInstance";
import type { Ref } from "vue";
import { format } from "date-fns";
import type { Transaction } from "@/shared/types/models/Transaction";

const getTransactions = async ({ queryKey }: { queryKey: any }) => {
  const [, page, perPage, type, dateRange, sortBy] = queryKey;

  const params: Record<string, any> = {
    page,
    per_page: perPage,
    type,
  };

  if (dateRange) {
    params.start_date = format(dateRange[0], "yyyy-MM-dd HH:mm:ss");
    params.end_date = format(dateRange[1], "yyyy-MM-dd HH:mm:ss");
  }

  if (sortBy.length > 0) {
    params.sort = sortBy[0].key;
    params.order = sortBy[0].order;
  }

  const response = await api.get(`/transactions`, { params });
  return {
    total: response.data.total,
    transactions: response.data.transactions.map((el: Transaction) => {
      return {
        ...el,
        date: format(el.date, "dd MMM yyyy, HH:mm"),
      };
    }),
  };
};

export function useTransactions(
  page: Ref<number>,
  perPage: Ref<number>,
  type: Ref<string>,
  dateRange: Ref<[Date, Date] | null>,
  sortBy: Ref<{ key: string; order: "asc" | "desc" }[]>
) {
  return useQuery({
    queryKey: ["transactions", page, perPage, type, dateRange, sortBy],
    queryFn: getTransactions,
    refetchInterval: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });
}
