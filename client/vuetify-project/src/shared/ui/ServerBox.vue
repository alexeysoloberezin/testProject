<script setup lang="ts">
const props = defineProps<{
  isLoading: boolean;
  error?: Error | null;
  data: any;
}>();
</script>

<template>
  <div>
    <div v-if="isLoading">Загрузка...</div>
    <div v-else-if="error">Ошибка: {{ error.message }}</div>
    <div v-else>
      <slot :data="data"></slot>
    </div>
  </div>
</template>

<style scoped lang="sass">

</style>
