import PrimeVue from 'primevue/config'
// Styles -------------------------------
import presetTheme from '@primevue/themes/lara'
import 'primeicons/primeicons.css'
import './assets/styles/global.scss'
// Store --------------------------------
import { createPinia } from 'pinia'
// Localization ---------------------------
import { createI18n } from 'vue-i18n'
import faLocale from './system/fa.json'
// ---------------------------------------
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const pinia = createPinia()

const i18n = createI18n({
    legacy: false,
    locale: 'fa',
    fallbackLocale: 'fa',
    messages: {}
})

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(i18n)
app.use(PrimeVue, {
    theme: {
        preset: presetTheme,
        options: {
            prefix: 'p',
            darkModeSelector: false,
            cssLayer: false
        }
    },
    ripple: true,
    locale: {
        ...faLocale,
        rtl: true
    }
})

app.mount('#app')

