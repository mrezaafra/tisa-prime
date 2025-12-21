import { getFullConfigUrl } from "@/utility/scripts/system.js";

export const appConfig = {
    url: {
        accessManagement: getFullConfigUrl(import.meta.env.VITE_ACCESS_MANAGEMENT_URL) || null,
    },
    table: {
        itemsPerPage: Number(import.meta.env.VITE_TABLE_ITEMS_PER_PAGE) || 10,
    }
}

export default appConfig
