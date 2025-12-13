import {getFullConfigUrl} from "@/utility/scripts/system";

const BaseUrls = Object.freeze({
  AccessManagement: getFullConfigUrl(`${import.meta.env.VITE_ACCESS_MANAGEMENT}`),
})
export default BaseUrls
