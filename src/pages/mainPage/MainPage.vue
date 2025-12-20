<template>


  <TisaInput
      :type="Enums.UI.InputTypes.GregorianDatePicker"
      v-model="test"
  />
</template>

<script setup>
import { onMounted, ref } from "vue";
import TisaInput from "@/components/base/input/TisaInput.vue";
import Enums from "@/enums/enums.js";

onMounted(() => {
  toast.error('salam')
})

const test = ref()
</script>

<style scoped lang="scss"></style>

