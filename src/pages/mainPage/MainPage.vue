<template>

  <TisaInput
      :type="Enums.UI.InputTypes.GregorianDatePicker"
      v-model="test"
  />

</template>

<script setup>
import { ref } from "vue";
import TisaInput from "@/components/base/input/TisaInput.vue";
import Enums from "@/enums/enums.js";

const test = ref()
</script>

<style scoped lang="scss">
.tisa-main-page {
  padding: 2rem;

  h1 {
    margin-bottom: 2rem;
    color: var(--p-surface-900);
  }
}

.tisa-main-page-content {
  max-width: 500px;
}
</style>
