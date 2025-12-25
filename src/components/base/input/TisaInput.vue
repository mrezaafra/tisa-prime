<template>
  <div class="tisa-input-wrapper" data-tisa-input ref="wrapperRef">
    <label
        v-if="component.props.label"
        class="tisa-input-label"
        :for="inputId">
      <span>{{ component.props.label }}</span>
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
    <Message
        v-if="errorMessage"
        severity="error"
        size="small"
        variant="simple">
      {{ errorMessage }}
    </Message>
    <Message
        v-else-if="hint"
        severity="secondary"
        size="small"
        variant="simple">
      {{ hint }}
    </Message>
  </div>
</template>

<script setup>
import { InputTypes } from "@/enums/partials/types.js";
import { computed, onMounted, ref, useAttrs, watch } from "vue";
import {
  AutoComplete,
  CascadeSelect,
  Checkbox,
  ColorPicker,
  InputMask,
  InputNumber,
  InputText,
  Message,
  Password
} from "primevue";
import PersianDatePicker from "@/components/base/input/partials/PersianDatePicker.vue";
import { i18n } from "@/utility/plugins/i18n.js";

// -------------------------
// Imports & Setup
// -------------------------
const {t} = i18n.global
const model = defineModel()
const attrs = useAttrs()

// -------------------------
// Props & Emits
// -------------------------
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
  }
})

const emit = defineEmits(['update:modelValue', 'blur', 'input'])

// -------------------------
// Constants
// -------------------------
let inputIdCounter = 0
const ALLOWED_KEYS = new Set([
  'Backspace', 'Delete', 'Tab', 'Escape', 'Enter',
  'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
  'Home', 'End'
])
const NUMERIC_REGEX = /^\d$/
const NON_DIGIT_REGEX = /\D/g
const EXCLUDED_ATTRS = new Set(['class', 'style', 'id'])

// -------------------------
// State
// -------------------------
const inputId = computed(() => `tisa-input-${++inputIdCounter}`)
const errorMessage = ref('')
const isDirty = ref(false)
const isNumberStringType = computed(() => props.type === InputTypes.NumberString)
const wrapperRef = ref(null)

// -------------------------
// Component Configuration
// -------------------------
const component = ref({
  customClass: '',
  props: {
    label: props.label
  },
  events: {},
  type: null
})

switch (props.type) {
  case InputTypes.AutoComplete:
    component.value.type = AutoComplete
    break
  case InputTypes.CascadeSelect:
    component.value.type = CascadeSelect
    break
  case InputTypes.Checkbox:
    component.value.type = Checkbox
    break
  case InputTypes.ColorPicker:
    component.value.type = ColorPicker
    break
  case InputTypes.DatePicker:
    component.value.type = PersianDatePicker
    component.value.customClass = 'ltr-center'
    break
  case InputTypes.Text:
    component.value.type = InputText
    break
  case InputTypes.Password:
    component.value.type = Password
    component.value.props.feedback = false
    component.value.props.toggleMask = true
    break
  case InputTypes.Number:
    component.value.type = InputNumber
    component.value.customClass = 'ltr-left'
    break
  case InputTypes.NumberString:
    component.value.type = InputText
    component.value.customClass = 'ltr-left'
    component.value.props.inputmode = 'numeric'
    break
  case InputTypes.Mobile:
    component.value.type = InputMask
    component.value.customClass = 'ltr-left'
    component.value.props.slotChar = ''
    component.value.props.mask = '99999999999'
    component.value.props.placeholder = '09123456789'
    component.value.props.autoClear = false
    component.value.props.unmask = false
    component.value.props.label = t("global.mobile")
    break
}

// -------------------------
// Computed Properties
// -------------------------
const mergedProps = computed(() => {
  const baseProps = {...props}
  const componentDefaults = component.value.props || {}
  const directProps = {}

  for (const key in attrs) {
    if (!EXCLUDED_ATTRS.has(key) && !(key in props)) {
      directProps[key] = attrs[key]
    }
  }

  const invalidProp = errorMessage.value ? {invalid: true} : {}

  return {
    ...baseProps,
    ...componentDefaults,
    ...directProps,
    ...invalidProp
  }
})

// -------------------------
// Validation
// -------------------------
const validate = () => {
  if (!isDirty.value) {
    isDirty.value = true
  }

  errorMessage.value = ''

  if (!props.rules?.length) {
    return true
  }

  for (const rule of props.rules) {
    if (typeof rule === 'function') {
      const result = rule(model.value)
      if (result !== true) {
        errorMessage.value = result || ''
        return false
      }
    }
  }

  return true
}

// -------------------------
// Event Handlers
// -------------------------
const onKeyDown = (event) => {
  if (!isNumberStringType.value) return

  const {key, ctrlKey, altKey, metaKey} = event

  if (ctrlKey || altKey || metaKey) return
  if (ALLOWED_KEYS.has(key)) return
  if (NUMERIC_REGEX.test(key)) return

  event.preventDefault()
}

const onPaste = (event) => {
  if (!isNumberStringType.value) return

  event.preventDefault()
  const clipboardData = event.clipboardData || window.clipboardData
  const pastedText = clipboardData.getData('text')
  const numericValue = pastedText.replace(NON_DIGIT_REGEX, '')

  if (!numericValue) return

  const inputElement = event.target
  const currentValue = String(model.value || '')
  const start = inputElement.selectionStart || 0
  const end = inputElement.selectionEnd || 0
  const newValue = (currentValue.slice(0, start) + numericValue + currentValue.slice(end))
      .replace(NON_DIGIT_REGEX, '')

  model.value = newValue
}

const onInput = (event) => {
  if (isNumberStringType.value && model.value != null) {
    const numericValue = String(model.value).replace(NON_DIGIT_REGEX, '')
    if (numericValue !== String(model.value)) {
      model.value = numericValue
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

// -------------------------
// Watchers
// -------------------------
watch(() => props.rules, () => {
  if (isDirty.value) {
    validate()
  }
}, {deep: true})

// -------------------------
// Component Registration
// -------------------------
onMounted(() => {
  if (wrapperRef.value) {
    wrapperRef.value.__tisaInputInstance = {
      validate,
      isValid: computed(() => !errorMessage.value),
      errorMessage: computed(() => errorMessage.value)
    }
  }
})

// -------------------------
// Expose
// -------------------------
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
    margin-bottom: 2px;
    color: var(--p-surface-700);
    font-size: 0.875rem;

    .tisa-input-required {
      color: var(--p-danger-color);
      margin-right: 0.25rem;

      i {
        font-size: 0.5rem;
      }
    }

    span {
      vertical-align: middle;
    }
  }
}
</style>
