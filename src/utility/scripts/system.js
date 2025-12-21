import router from "@/router";
import { useUserStore } from "@/stores/user";
import { RouteNames } from "@/enums/partials/routeNames";


// Copyright -----------------------------------------------------------------------------------------------------------
export function consoleCopyRight() {
    let tanin = `
 ▄▄▄▄▄▄▄▄   ▄▄▄▄▄▄     ▄▄▄▄       ▄▄    
 ▀▀▀██▀▀▀   ▀▀██▀▀   ▄█▀▀▀▀█     ████   
    ██        ██     ██▄         ████   
    ██        ██      ▀████▄    ██  ██  
    ██        ██          ▀██   ██████  
    ██      ▄▄██▄▄   █▄▄▄▄▄█▀  ▄██  ██▄ 
    ▀▀      ▀▀▀▀▀▀    ▀▀▀▀▀    ▀▀    ▀▀ 
`
    console.info(tanin)
    console.info(
        '%cنو ره اندیشان تیسا',
        `border-radius: 0 7px;
   padding:      10px 20px;
   margin:       10px 0;
   background:   #235590;
   color:        white;
   font-size:    18px;s
   font-weight:  bold;
   font-family:  "Vazirmatn RD FD", "vazirmatn", "Segoe UI", "Times New Roman", Times, serif;`,
        '\n [ www.Norahand.com ] ©',
        '\n By: MahmoudRezaAfra '
    )
}

// Request utility -----------------------------------------------------------------------------------------------------
export function getFullConfigUrl(apiAddress, ws) {
    if (ws) {
        let protocol = location.protocol === 'http:' ? 'ws' : 'wss'
        return `${protocol}://${document.location.host}/${apiAddress}`
    }
    return `${document.location.origin}/${apiAddress}`
}

export function handleAllSettledAnswer(res) {
    if (res.status === 'fulfilled') {
        return res.value
    } else {
        toast.error(res.reason.message)
    }
}

// Misc ----------------------------------------------------------------------------------------------------------------
export async function logout() {
    const userStore = useUserStore()
    userStore.resetStore()
    if (router.currentRoute.value.name === RouteNames.DefaultPage) {
        return
    }
    await router.push({
        name: RouteNames.DefaultPage,
        query: {r: location.pathname + location.search}
    })
}
