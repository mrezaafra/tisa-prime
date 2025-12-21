import { useToast } from 'primevue/usetoast';

const config = {
    time: 3150
}

const toast = {
    success: (message) => {
        useToast().add({severity: 'success', summary: 'Success', detail: message, life: config.time});
    },
    info: (message) => {
        useToast().add({severity: 'info', summary: 'Info', detail: message, life: config.time});
    },
    warn: (message) => {
        useToast().add({severity: 'warn', summary: 'Warn', detail: message, life: config.time});
    },
    error: (message) => {
        useToast().add({severity: 'error', summary: 'Error', detail: message, life: config.time});
    },
}

export default toast;
