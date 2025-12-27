/**
 * Global service for accessing composables from utility scripts
 * This service is initialized in App.vue and can be accessed from anywhere
 */

let globalService = {
  sendRequest: null,
  loading: null,
  toast: null,
  t: null
}

/**
 * Initialize the global service with composable instances
 * @param {Object} services - Object containing sendRequest, loading, toast, and t functions
 */
export function initGlobalService(services) {
  globalService.sendRequest = services.sendRequest
  globalService.loading = services.loading
  globalService.toast = services.toast
  globalService.t = services.t
}

/**
 * Get the global loading service
 * @returns {Object|null} Loading service with show/hide methods
 */
export function getGlobalLoading() {
  return globalService.loading
}

/**
 * Get the global toast service
 * @returns {Object|null} Toast service with success/info/warn/error methods
 */
export function getGlobalToast() {
  return globalService.toast
}

/**
 * Get the global translation function
 * @returns {Function|null} Translation function
 */
export function getGlobalT() {
  return globalService.t
}

/**
 * Get the global sendRequest function
 * @returns {Function|null} SendRequest function for making HTTP requests
 */
export function getGlobalSendRequest() {
  return globalService.sendRequest
}
