import '@/assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

// @ts-ignore
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"
const pinia = createPinia();

// @ts-ignore
import App from './App.vue'

const app = createApp(App)
pinia.use(piniaPluginPersistedstate)

app.use(pinia)

app.mount('#app')
