// Use i18n
import {i18n} from "@/utility/plugins/i18n";
// ---------------------------------------------------------------------------------------------------------------------
// Routes functions
import routes from "@/router/routes";
import {createRouter, createWebHistory} from "vue-router";
// Guard (Middleware) --------------------------------------------------------------------------------------------------
import {useUserStore} from "@/stores/user";
import {middleware} from "@/router/middleware/middleware";

const {t} = i18n.global


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

router.beforeEach((to, from) => {
    document.title = `${t('appName')} | ${to?.meta?.title ?? to?.name}`

    const userStore = useUserStore()
    return middleware(userStore, to, from)
});

router.onError((error) => {
    console.error('Router error:', error)
    
    // Hide loading if it exists
    if (typeof window !== 'undefined' && window.loading) {
        window.loading.hide()
    }
    
    // Show error toast
    const errorMessage = t('errors.routeChange')
    if (typeof window !== 'undefined' && window.toast) {
        window.toast.error(errorMessage)
    }
})

export default router
