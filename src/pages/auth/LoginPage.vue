<template>
  <div class="tisa-login-page">
    <div class="tisa-login-container">
      <div class="tisa-login-header">
        <h1>{{ $t('auth.login.title') }}</h1>
        <p>{{ $t('auth.login.subtitle') }}</p>
      </div>

      <form @submit.prevent="handleLogin" class="tisa-login-form">
        <TisaInput
          ref="mobileInputRef"
          v-model="loginForm.mobile"
          :type="Enums.InputTypes.Text"
          :label="$t('auth.login.mobile')"
          :placeholder="'09123456789'"
          :rules="[ValidationRules.Required, ValidationRules.Mobile]"
          required
        />

        <TisaInput
          ref="passwordInputRef"
          v-model="loginForm.password"
          :type="Enums.InputTypes.Text"
          :label="$t('auth.login.password')"
          :placeholder="$t('auth.login.password')"
          :rules="[ValidationRules.Required, ValidationRules.Password]"
          required
          password
        />

        <div class="tisa-login-options">
          <Checkbox
            v-model="loginForm.rememberMe"
            :binary="true"
            :inputId="'rememberMe'"
          />
          <label :for="'rememberMe'" class="tisa-checkbox-label">
            {{ $t('auth.login.rememberMe') }}
          </label>
        </div>

        <Button
          type="submit"
          :label="$t('auth.login.button')"
          :loading="isLoading"
          class="w-full tisa-login-button"
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

// Input refs for validation
const mobileInputRef = ref(null)
const passwordInputRef = ref(null)

// Loading state
const isLoading = ref(false)

// Form refs object for validateForm
const loginFormRef = ref({
  mobile: mobileInputRef,
  password: passwordInputRef
})

// Handle login
const handleLogin = async () => {
  // Validate form
  if (!await validateForm(loginFormRef)) {
    return
  }

  isLoading.value = true

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
    
    toast.success('ورود با موفقیت انجام شد')
  } catch (error) {
    console.error('Login error:', error)
    toast.error(error?.message || 'خطا در ورود به سیستم')
  } finally {
    isLoading.value = false
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
  background: linear-gradient(135deg, var(--p-primary-50) 0%, var(--p-surface-0) 100%);
}

.tisa-login-container {
  background: var(--p-surface-0);
  padding: 2.5rem;
  border-radius: var(--p-border-radius-lg);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
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
