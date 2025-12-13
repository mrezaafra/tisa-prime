import PrimeVue from 'primevue/config'
import presetTheme from "@primevue/themes/lara";
import frameworkLocale from "@/locales/framework.fa.json";

export default {
    primeVue: PrimeVue,
    options: {
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
            ...frameworkLocale,
            rtl: true
        }
    }
}
