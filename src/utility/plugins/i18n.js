import {createI18n} from "vue-i18n";

const globalLocale = import.meta.glob('@/locales/**.fa.json', {eager: true})
const componentLocales = import.meta.glob('@/components/**/locales/**.fa.json', {eager: true})
const locales = import.meta.glob('@/pages/**/locales/**.fa.json', {eager: true})

const messages = {}

let sources = {
  ...globalLocale,
  ...componentLocales,
  ...locales
}

for (const path in sources) {
  Object.assign(messages, sources[path])
}

export const i18n = createI18n({
  locale: 'fa',
  fallbackLocale: 'fa',
  legacy: false,
  globalInjection: true,
  messages: {fa: messages}
})
