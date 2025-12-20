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

router.onError(error => {
    console.error(error)
    loading.hide()
    toast.error(t('errors.routeChange'))
})

export default router
