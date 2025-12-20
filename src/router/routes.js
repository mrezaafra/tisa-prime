import MainLayout from "@/layouts/main/MainLayout.vue";
import Enums from "@/enums/enums.js";
import { i18n } from "@/utility/plugins/i18n";

/** --------------------------------------------------------------------------------------------------------------------
 *    [
 *      {
 *        path:                String
 *        name:                String
 *        meta.title:          String           >     Used for pageTitle and subMenu
 *        meta.icon:           String           >     Icon: mdi > used for subMenu
 *        meta.type:           String           >     | 1. internal (Should have routeName)
 *                                                    | 2. external (link by target _blank)
 *                                                    | 3. header (Should have children: Array)
 *        meta.permissions     Array<DataEnum>  >     Empty array or undefined means "Access is allowed for all users"
 *        meta.showInMenu      Boolean          >     Default: true
 *        component
 *        children:            Array
 *      }
 *    ]
 * ---------------------------------------------------------------------------------------------------------------------
 */
//----------------------------------------------------------------------------------------------------------------------
const {t} = i18n.global
const menuItems = [
    {
        path: '/admin',
        name: Enums.RouteNames.MainPage,
        meta: {
            title: t('mainPage.title'),
            icon: "mdi-home-outline",
            type: "internal"
        },
        component: () => import('@/pages/mainPage/MainPage.vue')
    },
]
//----------------------------------------------------------------------------------------------------------------------
const routes = [
    {
        path: '/login',
        name: Enums.RouteNames.Auth.LogIn,
        meta: {
            title: t('auth.login.title'),
            showInMenu: false
        },
        component: () => import('@/pages/auth/LoginPage.vue')
    },
    {
        path: '',
        name: Enums.RouteNames.DefaultPage,
        component: MainLayout,
        children: menuItems,
    },
    // Catch-all route for 404
    {
        path: '/:pathMatch(.*)*',
        name: Enums.RouteNames.Error.Page404,
        redirect: '/'
    },
]
//----------------------------------------------------------------------------------------------------------------------
export default routes
