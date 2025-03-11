<script setup lang="ts">
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const date = defineModel<[Date, Date] | null>("date", { required: true });
</script>

<template>
  <VueDatePicker v-model="date" :dark="true" range />
</template>

<style lang="sass">
</style>
