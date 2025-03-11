<script setup lang="ts">
import {useTransactions} from "@/shared/api/transactions/useTransactions";
import CreateTransactionForm from "@/features/transaction/CreateTransactionForm.vue";
import SelectDateRange from "@/shared/ui/SelectDateRange.vue";
import {
  type Transaction,
  TransactionType,
  transactionTypeLocales,
  transactionTypesSelect,
} from "@/shared/types/models/Transaction";
import {storeToRefs} from "pinia";
import {watch} from "vue";
import {useTransactionStore} from "@/app/providers/stores/app";

const transactionItems = transactionTypesSelect;
const transactionStore = useTransactionStore();
const {page, itemsPerPage, selectedType, dateRange, sortBy, headers} = storeToRefs(transactionStore);

const {data: transactions, isLoading, error, refetch} = useTransactions(
  page,
  itemsPerPage,
  selectedType,
  dateRange,
  sortBy
);

watch([page, itemsPerPage, selectedType, dateRange, sortBy], () => {
  refetch();
});
</script>

<template>
  <h3 v-if="error" class="text-center">{{ error.message }}</h3>
  <template v-else>
    <v-row>
      <v-col>
        <CreateTransactionForm/>
      </v-col>
      <v-col>
        <SelectDateRange v-model:date="dateRange"/>
      </v-col>
      <v-col cols="2">
        <v-select
          v-model="selectedType"
          label="Type"
          density="compact"
          variant="solo-filled"
          :item-title="'name'"
          :item-value="'value'"
          :clearable="true"
          :items="transactionItems"
        ></v-select>
      </v-col>
    </v-row>
    <v-data-table-server
      v-model:items-per-page="itemsPerPage"
      v-model:page="page"
      :headers="headers"
      :items="transactions?.transactions"
      :items-length="transactions?.total"
      :loading="isLoading"
      v-model:sort-by="sortBy"
      item-value="name"
    >
      <template v-slot:item.type="{ item }">
      <span
        :class="{
            'text-green font-bold': (item as Transaction).type === TransactionType.INCOME,
            'text-red font-bold': (item as Transaction).type === TransactionType.EXPENSE,
          }"
      >
        {{ transactionTypeLocales[(item as Transaction).type] }}
      </span>
      </template>
    </v-data-table-server>
  </template>
</template>
