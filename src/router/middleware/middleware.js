import {RouteNames} from "@/enums/partials/routeNames.js";

/**
 * Router middleware for authentication and authorization
 * @param {Object} user - User store instance
 * @param {Object} to - Target route
 * @param {Object} from - Source route
 * @returns {Object|undefined} Redirect object or undefined to continue
 */
export function middleware(user, to, from) {
  const hasToken = user.token != null

  // Auth: Redirect authenticated users away from login page
  if (hasToken) {
    if (to.name === RouteNames.Auth.LogIn) {
      return from || { name: RouteNames.MainPage }
    }
  }

  // Auth: Redirect unauthenticated users to login
  if (!hasToken && to.name !== RouteNames.Auth.LogIn) {
    return {
      name: RouteNames.Auth.LogIn,
      query: {r: to.fullPath}
    }
  }

  // Default: Redirect root to main page
  if (to.name === RouteNames.DefaultPage) {
    return {name: RouteNames.MainPage}
  }

  // Permissions: Check route permissions
  const pathPermissions = to.meta?.permissions
  if (Array.isArray(pathPermissions) && pathPermissions.length > 0) {
    // User needs at least one of the required permissions
    const hasAccess = user.hasAnyPermission(pathPermissions)

    if (!hasAccess) {
      return {
        name: RouteNames.Error.Page403
      }
    }
  }

  // Allow navigation
  return undefined
}
