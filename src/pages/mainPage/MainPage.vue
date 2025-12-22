<template>

  Number:
  <TisaInput
      :type="Enums.InputTypes.Number"
  />
  DatePicker:
  <TisaInput
      :type="Enums.InputTypes.DatePicker"
      v-model="test"
  />
  {{test}}
  ColorPicker:
  <TisaInput
      :type="Enums.InputTypes.ColorPicker"
  />
  Text:
  <TisaInput
      :type="Enums.InputTypes.Text"
  />
  AutoComplete:
  <TisaInput
      :type="Enums.InputTypes.AutoComplete"
  />
  CascadeSelect:
  <TisaInput
      :type="Enums.InputTypes.CascadeSelect"
  />
  Checkbox:
  <TisaInput
      :type="Enums.InputTypes.Checkbox"
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
