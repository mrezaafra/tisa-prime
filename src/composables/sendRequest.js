/**
 * Global sendRequest instance
 * This is initialized in App.vue and can be imported directly in any component or file
 *
 * Usage in components:
 * import { sendRequest } from '@/composables/sendRequest'
 * const data = await sendRequest('/api/users').get()
 *
 * Usage in utility files:
 * import { sendRequest } from '@/composables/sendRequest'
 */
let sendRequestInstance = null

/**
 * Initialize sendRequest instance
 * @param {Function} instance - The sendRequest function
 */
export function initSendRequest(instance) {
    sendRequestInstance = instance
}

/**
 * Get the sendRequest instance
 * @returns {Function|null} The sendRequest function
 */
export function getSendRequest() {
    return sendRequestInstance
}

/**
 * SendRequest function - can be imported and used directly
 * @param {string} url - Request URL
 * @param {Object} [options] - Request options
 * @returns {Object} Request methods (get, post, put, patch, delete, getBlob, getPaginatedData)
 */
export function sendRequest(url, options) {
    if (!sendRequestInstance) {
        console.warn('sendRequest is not initialized yet. Make sure App.vue has mounted.')
        return null
    }
    return sendRequestInstance(url, options)
}

// Default export
export default sendRequest
