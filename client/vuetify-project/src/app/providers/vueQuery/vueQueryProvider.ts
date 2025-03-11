import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query';
import type { App } from 'vue';

const queryClient = new QueryClient();

export function setupVueQuery(app: App) {
  app.use(VueQueryPlugin, { queryClient });
}
