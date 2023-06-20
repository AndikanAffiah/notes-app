import '@/assets/main.css'

// @ts-ignore
import App from './App.vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
// @ts-ignore
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)

app.use(pinia)

app.mount('#app')
