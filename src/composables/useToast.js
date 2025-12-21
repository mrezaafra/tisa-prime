import toast from '@/utility/plugins/toast'

/**
 * Composable for toast notifications
 * Provides a consistent interface for showing toast messages
 */
export function useToast() {
  return {
    success: toast.success,
    info: toast.info,
    warn: toast.warn,
    error: toast.error
  }
}
