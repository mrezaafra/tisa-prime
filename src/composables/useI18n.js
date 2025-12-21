import { useI18n as useVueI18n } from 'vue-i18n'

/**
 * Composable for internationalization
 * Wrapper around vue-i18n's useI18n for consistency
 */
export function useI18n() {
  const { t, locale, availableLocales } = useVueI18n()
  
  return {
    t,
    locale,
    availableLocales
  }
}
