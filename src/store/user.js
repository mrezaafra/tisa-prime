import {defineStore} from "pinia";
import {ref} from "vue";
import {parseJwt} from "@/utility/scripts/helper";
import BaseUrls from "@/enums/config/baseUrls";
import {logout} from "@/utility/scripts/system";
import toast from "@/utility/plugins/toast.js";

export const useUserStore = defineStore('user', () => {
        const userInfo = ref(null)
        const permissionList = ref([])
        const token = ref(undefined)


        // Get Token -----------------------------------------------------------------------------------------------------
        async function initStore(jwt) {
            userInfo.value = {}
            token.value = jwt ?? undefined
            // Pars JWT ------------------------------------------------------------------------------------------------------
            const jwtData = await parseJwt(token.value)
            userInfo.value.id = jwtData.id
        }

        async function fetchUserInfo() {
            if (userInfo.value?.id == null) {
                return
            }

            // Get user data and permissions ---------------------------------------------------------------------------------
            const url = `${BaseUrls.AccessManagement}/users/${userInfo.value.id}`
            try {
                const userData = await sendRequest(url).get()
                // Get permissions
                permissionList.value = userData?.permissions?.map(x => x.id) || []
            } catch (error) {
                if (error.toLowerCase().includes('unauthorized')) {
                    await logout()
                }
                toast.error(error.message ?? error)
            }
        }

        const loadUserInfo = () => {
            const storedUserInfo = localStorage.getItem('userInfo')
            if (storedUserInfo) {
                userInfo.value = JSON.parse(storedUserInfo)
            }
        }

        function hasPermission(id) {
            return permissionList?.value?.includes(id)
        }

        const resetStore = () => {
            token.value = null
            userInfo.value = null
            permissionList.value = null
            localStorage.removeItem('userInfo')
        }

        return {
            userInfo,
            token,
            permissionList,
            initStore,
            fetchUserInfo,
            loadUserInfo,
            hasPermission,
            resetStore
        }
    },
    {
        persist: {
            key: 'user-store',
            paths: ['userInfo'],
        }
    }
)
