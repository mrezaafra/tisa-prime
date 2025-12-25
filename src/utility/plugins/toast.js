import { useToast } from 'primevue/usetoast';
import appConfig from "@/config/app.js";

function getToastInstance() {
    if (typeof window !== 'undefined' && window.__primevue_toast_instance__) {
        return window.__primevue_toast_instance__
    }
    try {
        return useToast()
    } catch (error) {
        return {
            add: (options) => {
                if (typeof window !== 'undefined' && window.toast) {
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
    success: (message, title = null) => {
        getToastInstance().add({severity: 'success', summary: title, detail: message, life: appConfig.toast.time});
    },
    info: (message, title) => {
        getToastInstance().add({severity: 'info', summary: title, detail: message, life: appConfig.toast.time});
    },
    warn: (message, title) => {
        getToastInstance().add({severity: 'warn', summary: title, detail: message, life: appConfig.toast.time});
    },
    error: (message, title) => {
        getToastInstance().add({severity: 'error', summary: title, detail: message, life: appConfig.toast.time});
    },
}

export default toast;
