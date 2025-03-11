import { defineStore } from "pinia";
import { ref } from "vue";
import { transactionConfig } from "@/entities/transaction/model/config";

export const useTransactionStore = defineStore("transaction", () => {
  const page = ref(1);
  const itemsPerPage = ref(transactionConfig.itemsPerPage);
  const selectedType = ref<string>("");
  const dateRange = ref<[Date, Date] | null>(null);
  const sortBy = ref<{ key: string; order: "asc" | "desc" }[]>([]);
  const headers = ref(transactionConfig.headers);

  return {
    page,
    itemsPerPage,
    selectedType,
    dateRange,
    sortBy,
    headers,
  };
});
