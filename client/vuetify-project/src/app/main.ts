/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
import {setupProviders} from "@/app/providers";

const app = createApp(App)

setupProviders(app)

app.mount('#app')
