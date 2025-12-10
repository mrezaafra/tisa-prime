<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="modelValue" class="tisa-loading-overlay" @click.self="handleOverlayClick">
        <div class="tisa-loading-container">
          <ProgressSpinner
              :style="{ width: size, height: size }"
              :strokeWidth="strokeWidth"
              :animationDuration="animationDuration"
          />
          <p v-if="message" class="tisa-loading-message">
            {{ message }}
          </p>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import ProgressSpinner from 'primevue/progressspinner'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  message: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: '50px'
  },
  strokeWidth: {
    type: String,
    default: '4'
  },
  animationDuration: {
    type: String,
    default: '1s'
  },
  fullScreen: {
    type: Boolean,
    default: true
  },
  closable: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'close'])

const handleOverlayClick = () => {
  if (props.closable) {
    emit('update:modelValue', false)
    emit('close')
  }
}
</script>

<style scoped lang="scss">
.tisa-loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  backdrop-filter: blur(2px);
}

.tisa-loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  padding: 2rem;
  background-color: var(--p-surface-0);
  border-radius: var(--p-content-border-radius);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  min-width: 200px;
}

.tisa-loading-message {
  margin: 0;
  font-size: 1rem;
  font-weight: 500;
  color: var(--p-surface-700);
  text-align: center;
  direction: rtl;
}

// Fade transition
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
