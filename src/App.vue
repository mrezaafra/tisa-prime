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
import TisaLoading from "@/components/custom/loading/TisaLoading.vue";
import { ref, getCurrentInstance } from "vue";
import toast from "@/utility/plugins/toast.js";
import { useI18n } from '@/composables/useI18n'
import { useToast } from 'primevue/usetoast'

const { t } = useI18n()
const toastInstance = useToast()

// Expose toast instance globally for use in utility functions
if (typeof window !== 'undefined') {
    window.__primevue_toast_instance__ = toastInstance
}

/**
 * Global loading state management
 * Exposed on window for backward compatibility with existing code
 */
const loadingModel = ref(false)
const loadingMessage = ref(null)

const loading = {
  show: (message = null) => {
    loadingModel.value = true
    loadingMessage.value = message
  },
  hide: () => {
    loadingModel.value = false
    loadingMessage.value = null
  }
}

// Expose globally for backward compatibility
// TODO: Migrate to composables in future refactoring
if (typeof window !== 'undefined') {
  window.loading = loading
  window.toast = toast
  window.$t = t
}
</script>

<style lang="scss">
// Global app styles
</style>

