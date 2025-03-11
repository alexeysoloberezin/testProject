<script setup lang="ts">
import { ref } from 'vue';
import {useCreateTransaction} from "@/shared/api/transactions/createTransaction";
import {transactionTypesSelect} from "@/shared/types/models/Transaction";

const {mutate, isPending} = useCreateTransaction();

const form = ref({
  amount: null,
  description: "",
  type: "income",
});

const transactionTypes = transactionTypesSelect;

const handleSubmit = () => {
  if (!form.value.amount || !form.value.description) return;

  mutate(
    {
      amount: form.value.amount,
      description: form.value.description,
      type: form.value.type,
      date: new Date().toISOString(),
    },
    {
      onSuccess: () => {
        form.value = {amount: null, description: "", type: "income"};
      },
    }
  );
};
</script>

<template>
  <v-dialog max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        color="primary"
        text="Добавить транзакцию"
      ></v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card title="Создать транзакцию">
        <v-card-text>
          <v-form @submit.prevent="handleSubmit">
            <v-text-field v-model="form.amount" label="Сумма" type="number" required></v-text-field>
            <v-text-field v-model="form.description" label="Описание" required></v-text-field>
            <v-select
              v-model="form.type"
              label="Тип"
              :item-title="'name'"
              :item-value="'value'"
              :items="transactionTypes"
              required
            ></v-select>

            <v-btn type="submit" :loading="isPending" :disabled="isPending" color="green">Создать</v-btn>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text="Закрыть" @click="isActive.value = false"></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
