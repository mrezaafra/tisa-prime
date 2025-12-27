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

          <p class="tisa-loading-msg">
            {{ message ?? $t('loading.pleaseWaite') }}
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

<style scoped>
@import "tailwindcss" reference;

.tisa-loading-overlay {
  @apply fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-[9999];
}

.tisa-loading-container {
  @apply flex flex-col items-center justify-center w-40 min-h-40 rounded-sm py-8 px-1 shadow-lg;
  background-color: rgba(var(--p-surface-0-rgb, 255, 255, 255), 0.8);
}

.dots-loader {
  @apply flex items-center justify-center;
}

.dot {
  @apply w-[15px] h-[15px] rounded-sm transition-all duration-1000 ease-linear;
  animation: bounce 0.7s ease 0s alternate infinite;
  background-color: #059ca7;
}

.dot:first-child {
  @apply ml-2.5;
  background-color: #a91c5e !important;
  animation-delay: 0s;
}

.dot:nth-child(2) {
  @apply ml-1;
  animation-delay: 0.2s;
}

.dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes bounce {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0.8);
  }
}

.tisa-loading-msg {
  @apply text-center mt-4 text-xs;
}
</style>
