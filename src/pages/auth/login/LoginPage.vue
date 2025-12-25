<template>
  <div class="tisa-login-page">
    <div class="tisa-login-container">
      <div class="tisa-login-header">
        <h1>{{ $t('login.title') }}</h1>
      </div>

      <form ref="loginFormRef" @submit.prevent="handleLogin" class="tisa-login-form">
        <TisaInput
            v-model="loginForm.mobile"
            :type="Enums.InputTypes.Mobile"
            :rules="[ValidationRules.Required, ValidationRules.Mobile]"
            required
        />
        <TisaInput
            v-model="loginForm.password"
            :type="Enums.InputTypes.Password"
            :label="$t('global.password')"
            :rules="[ValidationRules.Required, ValidationRules.Password]"
            required
        />
        <div class="tisa-login-options">
          <Checkbox
              v-model="loginForm.rememberMe"
              :binary="true"
              :inputId="'rememberMe'"
          />
          <label :for="'rememberMe'" class="tisa-checkbox-label">
            {{ $t('login.rememberMe') }}
          </label>
        </div>

        <Button
            type="submit"
            :label="$t('login.submit')"
            class="w-full tisa-login-button"
            fluid
        />
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import TisaInput from '@/components/base/input/TisaInput.vue'
import Enums from '@/enums/enums.js'
import { ValidationRules } from '@/utility/validationRules/validationRules.js'
import { validateForm } from '@/utility/scripts/helper.js'
import toast from '@/utility/plugins/toast.js'

const router = useRouter()
const userStore = useUserStore()

// Form state
const loginForm = ref({
  mobile: '',
  password: '',
  rememberMe: false
})

// Form ref for automatic validation
const loginFormRef = ref(null)

// Handle login
const handleLogin = async (event) => {
  // Validate form - pass event to automatically find form element
  if (!await validateForm(event || loginFormRef)) {
    return
  }

  try {
    // TODO: Replace with actual login API call
    // const response = await sendRequest('/api/auth/login').post({
    //   mobile: loginForm.value.mobile,
    //   password: loginForm.value.password
    // })

    // For development: Set a dummy token
    await userStore.initStore('dummy-token-for-development')

    // If remember me is checked, store credentials (in production, use secure storage)
    if (loginForm.value.rememberMe) {
      // Store logic here if needed
    }

    // Redirect to intended page or home
    const redirectPath = router.currentRoute.value.query.r || '/'
    router.push(redirectPath)

  } catch (error) {
    if (error?.message) {
      toast.error(error.message)
    }
  }
}
</script>

<style scoped lang="scss">
.tisa-login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(180deg, var(--p-primary-50) 0%, var(--p-surface-0) 100%);
}

.tisa-login-container {
  background: var(--p-surface-0);
  padding: 2.5rem;
  border: var(--p-primary-200) 1px solid;
  border-radius: var(--p-border-radius-sm);
  box-shadow: 0 10px 30px var(--p-primary-100);
  max-width: 420px;
  width: 100%;

  .tisa-login-header {
    text-align: center;
    margin-bottom: 2rem;

    h1 {
      margin-bottom: 0.5rem;
      color: var(--p-surface-900);
      font-size: 1.75rem;
      font-weight: 600;
    }

    p {
      color: var(--p-surface-600);
      font-size: 0.875rem;
    }

  }

  .tisa-login-form {
    .tisa-login-options {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 1.5rem;

      .tisa-checkbox-label {
        cursor: pointer;
        color: var(--p-surface-700);
        font-size: 0.875rem;
        user-select: none;
      }
    }

    .tisa-login-button {
      margin-top: 0.5rem;
      padding: 0.75rem;
      font-size: 1rem;
      font-weight: 500;
    }
  }
}

// Responsive design
@media (max-width: 480px) {
  .tisa-login-page {
    padding: 1rem;
  }

  .tisa-login-container {
    padding: 1.5rem;

    .tisa-login-header {
      h1 {
        font-size: 1.5rem;
      }
    }
  }
}
</style>
