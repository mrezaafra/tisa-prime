<template>
  <div id="app">
    <TisaLoading
        v-model="loadingModel"
        :message="loadingMessage"
    />
    <RouterView/>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import TisaLoading from "@/components/custom/loading/TisaLoading.vue";
import { ref } from "vue";

// Loading --------------------------------
const loadingModel = ref(true)
const loadingMessage = ref(null)
</script>

<style lang="scss">

</style>

