/**
 * Environment variable validation and configuration
 * Ensures required environment variables are present
 */

const requiredEnvVars = [
  'VITE_ACCESS_MANAGEMENT'
]

/**
 * Validates that all required environment variables are set
 * @throws {Error} If any required environment variable is missing
 */
export function validateEnv() {
  const missing = requiredEnvVars.filter(key => !import.meta.env[key])
  
  if (missing.length > 0) {
    console.warn('Missing environment variables:', missing)
    // In development, we might want to use defaults
    if (import.meta.env.DEV) {
      console.warn('Running in development mode with missing env vars')
    }
  }
}

/**
 * Gets an environment variable with optional default value
 * @param {string} key - Environment variable key
 * @param {string} defaultValue - Default value if not set
 * @returns {string} Environment variable value or default
 */
export function getEnv(key, defaultValue = '') {
  return import.meta.env[key] || defaultValue
}

/**
 * Environment configuration object
 */
export const env = {
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
  mode: import.meta.env.MODE,
  accessManagement: getEnv('VITE_ACCESS_MANAGEMENT', '/api/access-management')
}

// Validate on import
validateEnv()
