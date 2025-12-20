<template>
  <div class="tisa-login-page">
    <div class="tisa-login-container">
      <h1>{{ $t('auth.login.title') }}</h1>
      <p>{{ $t('auth.login.subtitle') }}</p>
      <Button
        :label="$t('auth.login.button')"
        @click="handleLogin"
        class="w-full"
      />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

const handleLogin = () => {
  // For development: Set a dummy token to bypass auth
  // In production, this should be replaced with actual login logic
  userStore.initStore('dummy-token-for-development')
  const redirectPath = router.currentRoute.value.query.r || '/'
  router.push(redirectPath)
}
</script>

<style scoped lang="scss">
.tisa-login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  background-color: var(--p-surface-50);
}

.tisa-login-container {
  background: var(--p-surface-0);
  padding: 2rem;
  border-radius: var(--p-content-border-radius);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  text-align: center;

  h1 {
    margin-bottom: 0.5rem;
    color: var(--p-surface-900);
  }

  p {
    margin-bottom: 2rem;
    color: var(--p-surface-600);
  }
}
</style>
