// Styles
import 'primeicons/primeicons.css'
import "primeflex/primeflex.css";
import './assets/styles/global.scss'
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
import toast from '@/utility/plugins/toast';
// -------------------------------------------
// ----------
const t = i18n.global.t
window.$t = t
// ----------
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
app.mount('#app')

// Expose toast globally via app config
app.config.globalProperties.$toast = toast
window.$toast = toast
