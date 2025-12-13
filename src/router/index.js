import MainLayout from "@/layouts/main/MainLayout.vue";
import { createRouter, createWebHistory } from 'vue-router'
import routes from "@/router/routes.js";

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to) {
        if (to.hash) {
            return {
                el: to.hash,
                behavior: 'smooth',
            }
        } else {
            return {
                top: 0,
                behavior: 'smooth'
            }
        }
    }
})

export default router

