import { useToast } from 'primevue/usetoast';

const config = {
    time: 3150
}

function getToastInstance() {
    return useToast();
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
