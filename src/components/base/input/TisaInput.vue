<template>
  <div class="tisa-input-wrapper">
    <label v-if="component.props.label" class="tisa-input-label" :for="inputId">
      <span> {{ component.props.label }}</span>
      <span v-if="required" class="tisa-input-required">
        <i class="pi pi-asterisk"></i>
      </span>
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
        @keydown="onKeyDown"
        @paste="onPaste"
        fluid
    />
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
import {
  AutoComplete,
  CascadeSelect,
  Checkbox,
  ColorPicker,
  InputMask,
  InputNumber,
  InputText,
  Password
} from "primevue";
import PersianDatePicker from "@/components/base/input/partials/PersianDatePicker.vue";
import { i18n } from "@/utility/plugins/i18n.js";

const {t} = i18n.global
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
    default: null
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
  props: {
    label: props.label,
  },
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
  case InputTypes.NumberString:
    component.value.type = InputText
    component.value.customClass = 'ltr-left'
    component.value.props.inputmode = 'numeric'
    break;
  case InputTypes.Mobile:
    component.value.type = InputMask
    component.value.customClass = 'ltr-left'
    component.value.props.slotChar = ''
    component.value.props.mask = '99999999999'
    component.value.props.placeholder = '09123456789'
    component.value.props.autoClear = false
    component.value.props.unmask = false
    component.value.props.label = t("global.mobile")
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

// Keydown handler to prevent non-numeric input for NumberString
const onKeyDown = (event) => {
  // For NumberString type, only allow numeric keys and control keys
  if (props.type === InputTypes.NumberString) {
    const key = event.key
    // Allow: numbers (0-9), backspace, delete, tab, escape, enter, arrow keys, home, end
    const allowedKeys = [
      'Backspace', 'Delete', 'Tab', 'Escape', 'Enter',
      'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
      'Home', 'End'
    ]

    // Allow control keys (Ctrl, Alt, Meta)
    if (event.ctrlKey || event.altKey || event.metaKey) {
      return true
    }

    // Allow allowed keys
    if (allowedKeys.includes(key)) {
      return true
    }

    // Allow numbers
    if (/^\d$/.test(key)) {
      return true
    }

    // Prevent all other keys
    event.preventDefault()
    return false
  }
}

// Paste handler to filter non-numeric characters
const onPaste = (event) => {
  if (props.type === InputTypes.NumberString) {
    event.preventDefault()
    const pastedText = (event.clipboardData || window.clipboardData).getData('text')
    // Extract only numeric characters from pasted text
    const numericValue = pastedText.replace(/\D/g, '')
    if (numericValue) {
      // Get current input value and insert numeric characters
      const currentValue = String(model.value || '')
      const inputElement = event.target
      const start = inputElement.selectionStart || 0
      const end = inputElement.selectionEnd || 0
      const newValue = currentValue.slice(0, start) + numericValue + currentValue.slice(end)
      model.value = newValue.replace(/\D/g, '')
    }
  }
}

// Input handler
const onInput = (event) => {
  // For NumberString type, filter out non-numeric characters
  if (props.type === InputTypes.NumberString && model.value !== null && model.value !== undefined) {
    // Remove all non-numeric characters
    const numericValue = String(model.value).replace(/\D/g, '')
    if (numericValue !== String(model.value)) {
      model.value = numericValue
      // Update the input element's value directly
      if (event?.target) {
        event.target.value = numericValue
      }
    }
  }

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

      i {
        font-size: 0.5rem;
      }
    }
  }

  .tisa-input-label span {
    vertical-align: middle;
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
