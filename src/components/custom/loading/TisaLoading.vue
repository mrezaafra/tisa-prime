<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="modelValue" class="tisa-loading-overlay" @click.self="handleOverlayClick">
        <div class="tisa-loading-container">
          <div class="dots-loader">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
          </div>
          <p v-if="message" class="tisa-loading-message">
            {{ message }}
          </p>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  message: {
    type: String,
    default: ''
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
@import '@/assets/styles/variables.scss';

// Overlay
.tisa-loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: $loading-overlay-bg;
  backdrop-filter: blur($loading-overlay-blur);
  z-index: $loading-overlay-z-index;
}

// Container
.tisa-loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
  padding: 5px;
  width: 140px;
  min-height: 140px;
  background-color: rgba(var(--p-surface-0-rgb, 255, 255, 255), 0.8);
  border-radius: 10px;
  box-shadow: $loading-container-shadow;
}

// Dots loader
.dots-loader {
  display: flex;
  align-items: center;
  justify-content: center;
}

// Dot base styles
.dot {
  width: 15px;
  height: 15px;
  border-radius: 2px;
  transition: all 1s linear;
  animation: bounce .7s ease 0s alternate infinite;
  background-color: $loading-dot-color-primary;
}

.dot:first-child {
  background-color: $loading-dot-color-accent !important;
  animation-delay: 0s;
  margin-left: 10px;
}

.dot:nth-child(2) {
  animation-delay: 0.2s;
  margin-left: 4px;
}

.dot:nth-child(3) {
  animation-delay: 0.4s;
}

// Bounce animation
@keyframes bounce {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0.8);
  }
}

// Message
.tisa-loading-message {
  font-size: $loading-message-font-size;
  font-weight: $loading-message-font-weight;
  color: var(--p-surface-700, #374151);
  text-align: center;
  direction: rtl;
  transition: opacity 0.3s linear;
}
</style>
