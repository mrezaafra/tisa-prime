// Use i18n
import {i18n} from "@/utility/plugins/i18n";
// ---------------------------------------------------------------------------------------------------------------------
// Routes functions
import routes from "@/router/routes";
import {createRouter, createWebHistory} from "vue-router";
// Guard (Middleware) --------------------------------------------------------------------------------------------------
import {useUserStore} from "@/stores/user";
import {middleware} from "@/router/middleware/middleware";
import {getGlobalLoading, getGlobalToast, getGlobalT} from "@/composables/globalService";

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
    const loading = getGlobalLoading()
    if (loading) {
        loading.hide()
    }
    
    // Show error toast
    const globalT = getGlobalT() || t
    const errorMessage = globalT('errors.routeChange')
    const toast = getGlobalToast()
    if (toast) {
        toast.error(errorMessage)
    }
})

export default router
