import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import PrimeVue from 'primevue/config'
// import Aura from '@primevue/themes/aura'
import Lara from '@primevue/themes/lara'

import 'primeicons/primeicons.css'

import App from './App.vue'
import router from './router'
import './styles/global.scss'

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
    preset: Lara,
    options: {
      darkModeSelector: false,
      cssLayer: false
    }
  },
  ripple: true,
  locale: {
    rtl: true
  }
})

app.mount('#app')

