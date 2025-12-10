<template>
  <div class="main-page">
    <!-- Navbar -->
    <nav class="navbar">
      <div class="navbar-content">
        <div class="navbar-brand">
          <i class="pi pi-bars navbar-toggle" @click="toggleSidebar"></i>
          <h1>{{ t('navbar.title') }}</h1>
        </div>
        <div class="navbar-menu">
          <Button
            :label="t('navbar.menu')"
            icon="pi pi-bars"
            text
            @click="toggleSidebar"
          />
        </div>
      </div>
    </nav>

    <div class="page-container">
      <!-- Sidebar -->
      <aside :class="['sidebar', { 'sidebar-open': sidebarOpen }]">
        <div class="sidebar-header">
          <h2>{{ t('sidebar.home') }}</h2>
        </div>
        <ul class="sidebar-menu">
          <li>
            <Button
              :label="t('sidebar.home')"
              icon="pi pi-home"
              text
              class="w-full justify-start"
            />
          </li>
          <li>
            <Button
              :label="t('sidebar.settings')"
              icon="pi pi-cog"
              text
              class="w-full justify-start"
            />
          </li>
          <li>
            <Button
              :label="t('sidebar.about')"
              icon="pi pi-info-circle"
              text
              class="w-full justify-start"
            />
          </li>
        </ul>
      </aside>

      <!-- Main Content -->
      <main class="main-content">
        <div class="content-wrapper">
          <h2 class="page-title">{{ t('title') }}</h2>
          <p class="welcome-text">{{ t('welcome') }}</p>

          <div class="counter-section">
            <h3>{{ t('counter') }}</h3>
            <div class="counter-display">
              <span class="counter-label">{{ t('currentCount') }}:</span>
              <span class="counter-value">{{ mainStore.count }}</span>
            </div>

            <div class="counter-buttons">
              <Button
                :label="t('increment')"
                icon="pi pi-plus"
                @click="mainStore.increment"
                class="p-button-success"
              />
              <Button
                :label="t('decrement')"
                icon="pi pi-minus"
                @click="mainStore.decrement"
                class="p-button-danger"
              />
              <Button
                :label="t('reset')"
                icon="pi pi-refresh"
                @click="mainStore.reset"
                class="p-button-secondary"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useMainStore } from '@/store/mainStore'

const { t, setLocaleMessage } = useI18n()
const mainStore = useMainStore()
const sidebarOpen = ref(false)

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

// Lazy load locale messages
onMounted(async () => {
  try {
    const localeModule = await import('./locales/fa.json')
    setLocaleMessage('fa', localeModule.default)
  } catch (error) {
    console.error('Failed to load locale:', error)
  }
})
</script>

<style scoped lang="scss">
.main-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.navbar {
  background: var(--p-surface-0);
  border-bottom: 1px solid var(--p-surface-200);
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;

  .navbar-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 100%;
  }

  .navbar-brand {
    display: flex;
    align-items: center;
    gap: 1rem;

    h1 {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--p-surface-900);
      margin: 0;
    }

    .navbar-toggle {
      font-size: 1.5rem;
      cursor: pointer;
      color: var(--p-surface-700);
      display: none;

      &:hover {
        color: var(--p-primary-color);
      }
    }
  }
}

.page-container {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.sidebar {
  width: 250px;
  background: var(--p-surface-0);
  border-left: 1px solid var(--p-surface-200);
  padding: 1.5rem;
  transition: transform 0.3s ease;
  overflow-y: auto;
  box-shadow: -2px 0 4px rgba(0, 0, 0, 0.1);

  .sidebar-header {
    margin-bottom: 2rem;

    h2 {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--p-surface-900);
    }
  }

  .sidebar-menu {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      margin-bottom: 0.5rem;
    }
  }
}

.main-content {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
  background: var(--p-surface-50);

  .content-wrapper {
    max-width: 1200px;
    margin: 0 auto;
  }

  .page-title {
    font-size: 2rem;
    font-weight: 700;
    color: var(--p-surface-900);
    margin-bottom: 1rem;
  }

  .welcome-text {
    font-size: 1.125rem;
    color: var(--p-surface-600);
    margin-bottom: 2rem;
  }

  .counter-section {
    background: var(--p-surface-0);
    padding: 2rem;
    border-radius: var(--p-content-border-radius);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    h3 {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--p-surface-900);
      margin-bottom: 1.5rem;
    }

    .counter-display {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 2rem;
      padding: 1rem;
      background: var(--p-surface-50);
      border-radius: var(--p-content-border-radius);

      .counter-label {
        font-size: 1.125rem;
        color: var(--p-surface-700);
        font-weight: 500;
      }

      .counter-value {
        font-size: 2rem;
        font-weight: 700;
        color: var(--p-primary-color);
      }
    }

    .counter-buttons {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }
  }
}

@media (max-width: 768px) {
  .navbar {
    .navbar-brand {
      .navbar-toggle {
        display: block;
      }
    }
  }

  .sidebar {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    z-index: 999;
    transform: translateX(100%);

    &.sidebar-open {
      transform: translateX(0);
    }
  }

  .main-content {
    padding: 1rem;
  }

  .counter-section {
    .counter-buttons {
      flex-direction: column;

      :deep(.p-button) {
        width: 100%;
      }
    }
  }
}
</style>

