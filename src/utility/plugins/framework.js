import PrimeVue from 'primevue/config'
import frameworkLocale from "@/locales/framework.fa.json";
import TisaTheme from "@/config/theme.js";


export default {
    primeVue: PrimeVue,
    options: {
        theme: TisaTheme,
        locale: {
            ...frameworkLocale,
            rtl: true
        }
    }
}
