import {RouteNames} from "@/enums/config/routeNames.js";

export function middleware(user, to, from) {
  const hasToken = user.token != null
  // Auth ------------------------------------
  if (hasToken) {
    if (to.name === RouteNames.Auth.LogIn) {
      return from
    }
  }

  if (!hasToken && to.name !== RouteNames.Auth.LogIn) {
    return {
      name: RouteNames.Auth.LogIn,
      query: {r: to.path}
    }
  }

  // Default ---------------------------------
  if (to.name === RouteNames.DefaultPage) {
    return {name: RouteNames.MainPage}
  }

  // Check Permissions ------------------------
  let pathPermission = to.meta.permissions
  if (pathPermission && pathPermission.length) {
    let access = false
    pathPermission.forEach(x => {
      if (user.hasPermission(x)) {
        access = true
      }
    })
    if (!access) {
      return {
        name: RouteNames.Error.Page403
      }
    }
  }
}
