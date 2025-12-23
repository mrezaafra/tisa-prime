import { useToast } from 'primevue/usetoast';

const config = {
    time: 3150
}

// Create a singleton toast instance
let toastInstance = null

function getToastInstance() {
    // Try to get from window if available (set after app initialization)
    if (typeof window !== 'undefined' && window.__primevue_toast_instance__) {
        return window.__primevue_toast_instance__
    }
    
    // Try to use composable (works in component context)
    try {
        return useToast()
    } catch (error) {
        // If useToast fails, return a fallback that uses window.toast
        return {
            add: (options) => {
                if (typeof window !== 'undefined' && window.toast) {
                    // Use the global toast if available
                    const severity = options.severity || 'info'
                    window.toast[severity](options.detail || options.summary || '')
                } else {
                    console.warn('Toast service not available:', options)
                }
            }
        }
    }
}

const toast = {
    success: (message) => {
        getToastInstance().add({severity: 'success', summary: 'Success', detail: message, life: config.time});
    },
    info: (message) => {
        getToastInstance().add({severity: 'info', summary: 'Info', detail: message, life: config.time});
    },
    warn: (message) => {
        getToastInstance().add({severity: 'warn', summary: 'Warn', detail: message, life: config.time});
    },
    error: (message) => {
        getToastInstance().add({severity: 'error', summary: 'Error', detail: message, life: config.time});
    },
}

export default toast;
