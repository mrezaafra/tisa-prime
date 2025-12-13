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
import { ref } from "vue";
import toast from "@/utility/plugins/toast.js";

// Loading --------------------------------
const loadingModel = ref(false)
const loadingMessage = ref(null)
const loading = {
  show: (message = null) => {
    loadingModel.value = true
    loadingMessage.value = message
  },
  hide: () => loadingModel.value = false
}
window.loading = loading
// Toast ------------------------------------
window.toast = toast
</script>

<style lang="scss">

</style>

