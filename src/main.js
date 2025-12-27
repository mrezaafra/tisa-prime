// Styles
import 'primeicons/primeicons.css'
import './assets/styles/tailwind.css'  // Tailwind CSS v4 (must be CSS, not SCSS)
import './assets/styles/global.scss'  // Custom SCSS styles
// Store
import { createPinia } from 'pinia'
import persistedState from 'pinia-plugin-persistedstate'
// Localization
import { i18n } from "@/utility/plugins/i18n";
// App
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// Copyright
import { consoleCopyRight } from "@/utility/scripts/system.js";
import framework from "@/utility/plugins/framework.js";
// utility
import ToastService from 'primevue/toastservice';
// -------------------------------------------

const pinia = createPinia()
pinia.use(persistedState)
// ----------
consoleCopyRight()
// ----------
const app = createApp(App)
app.use(ToastService)
app.use(pinia)
app.use(router)
app.use(i18n)
app.use(framework.primeVue, framework.options)

// Note: sendRequest will be added to globalProperties in App.vue after initialization
app.mount('#app')

