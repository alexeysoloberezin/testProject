import { setupVueQuery } from './vueQuery/vueQueryProvider';
import router from "@/app/providers/router";
import pinia from './stores'
import vuetify from "@/app/providers/vuetify/vuetify";

export function setupProviders(app: any) {
  setupVueQuery(app);
  app
    .use(router)
    .use(pinia)
    .use(vuetify)
}
