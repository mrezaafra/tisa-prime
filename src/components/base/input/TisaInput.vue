<template>
  <component
      :is="component.type"
      v-model="model"
      :class="component.customClass"
      v-bind="component.props"
      fluid
  />
</template>

<script setup>
import { InputTypes } from "@/enums/ui/types.js";
import { ref } from "vue";
import { AutoComplete, CascadeSelect, Checkbox, ColorPicker, DatePicker, InputNumber, InputText } from "primevue";
import PersianDatePicker from "@/components/base/input/partials/PersianDatePicker.vue";

const model = defineModel()
const props = defineProps({
  type: {
    type: String,
    required: true,
    validator: (value) => Object.values(InputTypes).includes(value)
  },
})
const component = ref({
  customClass: '',
  props: {},
  events: {}
})

switch (props.type) {
  case InputTypes.AutoComplete:
    component.value.type = AutoComplete
    break;
  case InputTypes.CascadeSelect:
    component.value.type = CascadeSelect
    break;
  case InputTypes.Checkbox:
    component.value.type = Checkbox
    break;
  case InputTypes.ColorPicker:
    component.value.type = ColorPicker
    break;
  case InputTypes.DatePicker:
    component.value.type = PersianDatePicker
    break;
    case InputTypes.Text:
    component.value.type = InputText
    break;
  case InputTypes.Number:
    component.value.type = InputNumber
    break;


}
</script>

<style scoped lang="scss">

</style>
