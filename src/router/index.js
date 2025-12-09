import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '@/pages/mainPage/MainPage.vue'

const routes = [
  {
    path: '/',
    name: 'MainPage',
    component: MainPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

