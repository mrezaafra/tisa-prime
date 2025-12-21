import toast from '@/utility/plugins/toast'
import { logout } from '@/utility/scripts/system'
import { i18n } from '@/utility/plugins/i18n'

/**
 * Error handler utility
 * Provides consistent error handling across the application
 */

const { t } = i18n.global

/**
 * Handles API errors with appropriate user feedback
 * @param {Error|string} error - Error object or error message
 * @param {Object} options - Error handling options
 * @param {boolean} options.showToast - Whether to show toast notification (default: true)
 * @param {boolean} options.logoutOnUnauthorized - Whether to logout on 401 (default: true)
 * @returns {string} Error message
 */
export function handleError(error, options = {}) {
  const {
    showToast = true,
    logoutOnUnauthorized = true
  } = options

  let errorMessage = t('errors.somethingWentWrong')

  // Extract error message from error object
  if (typeof error === 'string') {
    // If it's already a string, use it directly (might be a translated message)
    errorMessage = error
  } else if (error?.message) {
    errorMessage = error.message
  } else if (error?.response?.data?.message) {
    errorMessage = error.response.data.message
  } else if (error?.response?.data?.error) {
    errorMessage = error.response.data.error
  }

  // Handle unauthorized errors
  if (logoutOnUnauthorized && (
    errorMessage.toLowerCase().includes('unauthorized') ||
    errorMessage.toLowerCase().includes('401') ||
    error?.response?.status === 401
  )) {
    logout()
    return t('errors.somethingWentWrong')
  }

  // Show toast notification
  if (showToast) {
    toast.error(errorMessage)
  }

  // Log error for debugging
  if (import.meta.env.DEV) {
    console.error('Error handled:', error)
  }

  return errorMessage
}

/**
 * Creates an error handler function with predefined options
 * @param {Object} defaultOptions - Default options for error handling
 * @returns {Function} Error handler function
 */
export function createErrorHandler(defaultOptions = {}) {
  return (error) => handleError(error, defaultOptions)
}
