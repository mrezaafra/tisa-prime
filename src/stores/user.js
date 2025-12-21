import {defineStore} from "pinia";
import {ref} from "vue";
import {parseJwt} from "@/utility/scripts/helper";
import {logout} from "@/utility/scripts/system";
import toast from "@/utility/plugins/toast.js";
import {sendRequest} from "@/utility/scripts/requestManagement";
import {i18n} from "@/utility/plugins/i18n";
import appConfig from "@/config/app.js";

const {t} = i18n.global

export const useUserStore = defineStore('user', () => {
        const userInfo = ref(null)
        const permissionList = ref([])
        const token = ref(undefined)
        const isLoading = ref(false)

        /**
         * Initialize store with JWT token
         * @param {string} jwt - JWT token string
         */
        async function initStore(jwt) {
            try {
                if (!jwt) {
                    throw new Error(t('errors.somethingWentWrong'))
                }

                userInfo.value = {}
                token.value = jwt

                // Parse JWT to extract user ID
                const jwtData = await parseJwt(token.value)
                if (!jwtData?.id) {
                    throw new Error(t('errors.somethingWentWrong'))
                }

                userInfo.value.id = jwtData.id
            } catch (error) {
                console.error('Error initializing user store:', error)
                const errorMessage = error.message || t('errors.somethingWentWrong')
                toast.error(errorMessage)
                throw error
            }
        }

        /**
         * Fetch user information and permissions from server
         */
        async function fetchUserInfo() {
            if (userInfo.value?.id == null) {
                console.warn('Cannot fetch user info: user ID is missing')
                return
            }

            isLoading.value = true
            const url = `${appConfig.url.accessManagement}/users/${userInfo.value.id}`

            try {
                const userData = await sendRequest(url).get()

                if (!userData) {
                    throw new Error(t('errors.somethingWentWrong'))
                }

                // Extract permissions
                permissionList.value = userData?.permissions?.map(x => x.id) || []

                // Update user info with fetched data
                userInfo.value = {
                    ...userInfo.value,
                    ...userData
                }
            } catch (error) {
                const errorMessage = error?.message || error?.toString() || t('errors.somethingWentWrong')

                // Handle unauthorized errors
                if (errorMessage.toLowerCase().includes('unauthorized') ||
                    errorMessage.toLowerCase().includes('401')) {
                    await logout()
                    return
                }

                toast.error(errorMessage)
                console.error('Error fetching user info:', error)
            } finally {
                isLoading.value = false
            }
        }

        /**
         * Load user info from localStorage
         */
        const loadUserInfo = () => {
            try {
                const storedUserInfo = localStorage.getItem('userInfo')
                if (storedUserInfo) {
                    userInfo.value = JSON.parse(storedUserInfo)
                }
            } catch (error) {
                console.error('Error loading user info from localStorage:', error)
                localStorage.removeItem('userInfo')
            }
        }

        /**
         * Check if user has a specific permission
         * @param {string|number} id - Permission ID
         * @returns {boolean} True if user has permission
         */
        function hasPermission(id) {
            if (!id) return false
            return permissionList.value?.includes(id) ?? false
        }

        /**
         * Check if user has any of the provided permissions
         * @param {Array<string|number>} ids - Array of permission IDs
         * @returns {boolean} True if user has at least one permission
         */
        function hasAnyPermission(ids) {
            if (!Array.isArray(ids) || ids.length === 0) return false
            return ids.some(id => hasPermission(id))
        }

        /**
         * Check if user has all of the provided permissions
         * @param {Array<string|number>} ids - Array of permission IDs
         * @returns {boolean} True if user has all permissions
         */
        function hasAllPermissions(ids) {
            if (!Array.isArray(ids) || ids.length === 0) return false
            return ids.every(id => hasPermission(id))
        }

        /**
         * Reset store and clear all user data
         */
        const resetStore = () => {
            token.value = null
            userInfo.value = null
            permissionList.value = []
            isLoading.value = false

            try {
                localStorage.removeItem('userInfo')
            } catch (error) {
                console.error('Error clearing localStorage:', error)
            }
        }

        return {
            userInfo,
            token,
            permissionList,
            isLoading,
            initStore,
            fetchUserInfo,
            loadUserInfo,
            hasPermission,
            hasAnyPermission,
            hasAllPermissions,
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
