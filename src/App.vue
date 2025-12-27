<template>
  <div id="app">
    <TisaLoading
        v-model="loadingModel"
        :message="loadingMessage"
    />
    <RouterView/>
    <Toast position="bottom-left"/>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import { getCurrentInstance } from 'vue'
import TisaLoading from "@/components/custom/loading/TisaLoading.vue";
import { useLoading } from '@/composables/useLoading'
import { useI18n } from '@/composables/useI18n'
import { useToast as usePrimeToast } from 'primevue/usetoast'
import { initGlobalService } from '@/composables/globalService'
import { initSendRequest } from '@/composables/sendRequest'
import toast from "@/utility/plugins/toast.js";
import { useSendRequest } from "@/composables/index.js";

const {isLoading: loadingModel, loadingMessage, show: showLoading, hide: hideLoading} = useLoading()
const {t} = useI18n()
const toastInstance = usePrimeToast()
const {sendRequest} = useSendRequest()

// Expose toast instance globally for use in utility functions
if (typeof window !== 'undefined') {
  window.__primevue_toast_instance__ = toastInstance
}

// Initialize global service for utility scripts
const loading = {
  show: showLoading,
  hide: hideLoading
}

initGlobalService({
  sendRequest,
  loading,
  toast,
  t
})

// Initialize sendRequest module for direct imports
initSendRequest(sendRequest)

// Make sendRequest available globally in all Vue components
const instance = getCurrentInstance()
if (instance) {
  instance.appContext.config.globalProperties.$sendRequest = sendRequest
  instance.appContext.config.globalProperties.sendRequest = sendRequest
}
</script>

<style lang="scss">
// Global app styles
</style>

