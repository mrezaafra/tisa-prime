import { ref } from 'vue'

/**
 * Composable for managing global loading state
 * Provides a reactive loading state that can be used throughout the application
 */
export function useLoading() {
  const isLoading = ref(false)
  const loadingMessage = ref(null)

  const show = (message = null) => {
    isLoading.value = true
    loadingMessage.value = message
  }

  const hide = () => {
    isLoading.value = false
    loadingMessage.value = null
  }

  return {
    isLoading,
    loadingMessage,
    show,
    hide
  }
}
