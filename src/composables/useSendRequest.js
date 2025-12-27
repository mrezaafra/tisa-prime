import { sendRequest as sendRequestUtil } from '@/utility/scripts/requestManagement'

/**
 * Composable for making HTTP requests
 * Provides a Vue-friendly wrapper around sendRequest utility
 *
 * @returns {Object} Object containing sendRequest function with the same API as the utility version
 *
 * @example
 * ```js
 * const { sendRequest } = useSendRequest()
 * const data = await sendRequest('/api/users').get()
 * ```
 */
export function useSendRequest() {
    const sendRequest = (url, options) => {
        return sendRequestUtil(url, options)
    }

    return {
        sendRequest
    }
}
