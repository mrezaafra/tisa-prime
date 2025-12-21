import toast from '@/utility/plugins/toast'

export function useToast() {
    return {
        success: toast.success,
        info: toast.info,
        warn: toast.warn,
        error: toast.error
    }
}
