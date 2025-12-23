<template>
  <div class="tisa-input-wrapper">
    <label v-if="label" class="tisa-input-label" :for="inputId">
      {{ label }}
      <span v-if="required" class="tisa-input-required">*</span>
    </label>

    <component
        :id="inputId"
        :is="component.type"
        v-model="model"
        :class="[component.customClass, errorMessage ? 'p-invalid' : '']"
        v-bind="mergedProps"
        :aria-describedby="errorMessage ? `${inputId}-error` : undefined"
        :aria-invalid="errorMessage ? 'true' : 'false'"
        @blur="validate"
        @input="onInput"
        fluid
    ></component>

    <small v-if="errorMessage" :id="`${inputId}-error`" class="tisa-input-error">
      {{ errorMessage }}
    </small>

    <small v-else-if="hint" class="tisa-input-hint">
      {{ hint }}
    </small>
  </div>
</template>

<script setup>
import { InputTypes } from "@/enums/partials/types.js";
import { computed, ref, useAttrs, watch } from "vue";
import { AutoComplete, CascadeSelect, Checkbox, ColorPicker, InputNumber, InputText, Password } from "primevue";
import PersianDatePicker from "@/components/base/input/partials/PersianDatePicker.vue";

const model = defineModel()
const attrs = useAttrs()

const props = defineProps({
  type: {
    type: String,
    required: true,
    validator: (value) => Object.values(InputTypes).includes(value)
  },
  label: {
    type: String,
    default: ''
  },
  hint: {
    type: String,
    default: ''
  },
  rules: {
    type: Array,
    default: () => []
  },
  required: {
    type: Boolean,
    default: false
  },
  suffix: {
    type: String,
    default: ''
  },
  prefix: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  password: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'blur', 'input'])

// Generate unique ID for input
const inputId = computed(() => `tisa-input-${Math.random().toString(36).substr(2, 9)}`)

// Error message state
const errorMessage = ref('')
const isDirty = ref(false)

// Component mapping
const component = ref({
  customClass: '',
  props: {},
  events: {},
  type: null
})

// Initialize component type
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
    component.value.customClass = 'ltr-center'
    break;
  case InputTypes.Text:
    component.value.type = InputText
    break;
  case InputTypes.Password:
    component.value.type = Password
    component.value.props.feedback = false
    component.value.props.toggleMask = true
    break;
  case InputTypes.Number:
    component.value.type = InputNumber
    component.value.customClass = 'ltr-left'
    break;
}


const mergedProps = computed(() => {
  const baseProps = {
    placeholder: props.placeholder,
    disabled: props.disabled,
    readonly: props.readonly,
  }

  const componentDefaults = component.value.props || {}

  const directProps = {}

  Object.keys(attrs).forEach(key => {
    if (!['class', 'style', 'id'].includes(key) && !(key in props)) {
      directProps[key] = attrs[key]
    }
  })

  // Merge with priority: directProps > componentDefaults > baseProps
  return {
    ...baseProps,
    ...componentDefaults,
    ...directProps
  }
})

// Validation function
const validate = () => {
  if (!isDirty.value) {
    isDirty.value = true
  }

  errorMessage.value = ''

  if (props.rules && props.rules.length > 0) {
    for (const rule of props.rules) {
      if (typeof rule === 'function') {
        const result = rule(model.value)
        if (result !== true) {
          errorMessage.value = result || ''
          return false
        }
      }
    }
  }

  return true
}

// Input handler
const onInput = () => {
  emit('input', model.value)
  if (isDirty.value) {
    validate()
  }
}

// Watch for external validation
watch(() => props.rules, () => {
  if (isDirty.value) {
    validate()
  }
}, {deep: true})

// Expose validate method for parent form
defineExpose({
  validate,
  isValid: computed(() => !errorMessage.value),
  errorMessage: computed(() => errorMessage.value)
})
</script>

<style scoped lang="scss">
.tisa-input-wrapper {
  margin-bottom: 1rem;

  .tisa-input-label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: var(--p-surface-700);
    font-size: 0.875rem;

    .tisa-input-required {
      color: var(--p-danger-color);
      margin-right: 0.25rem;
    }
  }

  .tisa-input-error {
    display: block;
    margin-top: 0.25rem;
    color: var(--p-danger-color);
    font-size: 0.75rem;
  }

  .tisa-input-hint {
    display: block;
    margin-top: 0.25rem;
    color: var(--p-surface-500);
    font-size: 0.75rem;
  }
}

// LTR classes for specific input types
:deep(.ltr-center) {
  direction: ltr;
  text-align: center;
}

:deep(.ltr-left) {
  direction: ltr;
  text-align: left;
}
</style>
