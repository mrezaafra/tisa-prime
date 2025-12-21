import { ref } from 'vue'

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
