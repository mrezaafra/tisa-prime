import axios from 'axios'
import { useUserStore } from "@/stores/user"
import { handleAllSettledAnswer } from "@/utility/scripts/system"
import { isNullOrEmpty, persianDateToGregorian } from "@/utility/scripts/helper"
import Enums from "@/enums/enums"
import moment from "jalali-moment"
import toast from "@/utility/plugins/toast"
import appConfig from "@/config/app"
import { getGlobalLoading, getGlobalT } from "@/composables/globalService"

let loadingUrls = []
/**
 *
 * @param {string} url
 * @param {object} [options={needToken: true, customToken: nul}] - optional
 * @type {function(string,{needToken:boolean,customToken:string}): Promise | any}
 */
export let sendRequest = (url, options) => {
    __showLoading(url)
    options = __initOptions(options)

    // Make Axios Instance:
    let reqInstance = __initAxiosInstance(url)
    if (options.needToken || options.customToken) {
        reqInstance.defaults.headers.common['Authorization'] = `Bearer ${__getToken(options)}`
    }
    // -------------------------------------
    return {
        get: function () {
            return reqInstance.get(url).catch(function (error) {
                return __catchError(error)
            })
        },
        getPaginatedData: function (pageOption = {}) {
            const
                {
                    page = 1,
                    itemsPerPage = appConfig.table.itemsPerPage,
                    totalCount: totalCount
                } = pageOption,
                filterString = createFilterString(),
                orderByString = createOrderString(),
                // Construct the paginated URL
                paginatedUrl = `${url}?page=${page}&pageSize=${itemsPerPage}${filterString}${orderByString}`,
                // Determine if a count request is needed
                countReqFlag = isNullOrEmpty(totalCount) || filterString !== ''

            const requests = [
                reqInstance.get(paginatedUrl).catch(__catchError),
                ...(countReqFlag ? [reqInstance.get(`${url}?count=true${filterString}`).catch(__catchError)] : []),
            ]
            return Promise.allSettled(requests).then(([dataResult, countResult]) => ({
                data: handleAllSettledAnswer(dataResult),
                totalCount: countReqFlag ? handleAllSettledAnswer(countResult) : totalCount,
            }))

            function createFilterString() {
                if (isNullOrEmpty(pageOption.search)) {
                    return ''
                }
                let filter = ''
                switch (pageOption.search.type) {
                    case Enums.InputTypes.Text:
                        filter = `&filter=${pageOption.search.category}=*${pageOption.search.phrase}`
                        break
                    case 'DropDown':
                        const
                            _cat = pageOption.search.category,
                            items = pageOption.search.phrase.map(item => `${_cat}=${item.id}`),
                            orFilter = items.length > 1 ? `(${items.join('|')})` : items[0]
                        filter = `&filter=${orFilter}`
                        break
                    case 'DateRange':
                        filter = `&filter=${pageOption.search.category}>=${persianDateToGregorian(pageOption.search.phrase.from)},${pageOption.search.category}<${moment(persianDateToGregorian(pageOption.search.phrase.to)).add(1, 'days').format('YYYY-MM-DD')}`
                        break
                    case 'DateTimeRange':
                        filter = `&filter=${pageOption.search.category}>=${moment(persianDateToGregorian(pageOption.search.phrase.from, true)).format('YYYY-MM-DD HH:mm:00')},${pageOption.search.category}<=${moment(persianDateToGregorian(pageOption.search.phrase.to, true)).format('YYYY-MM-DD HH:mm:59')}`
                        break
                    default:
                        filter = `&filter=${pageOption.search.category}=${pageOption.search.phrase}`
                        break
                }
                return filter
            }


            function createOrderString() {
                if (!pageOption || !Array.isArray(pageOption.sortBy) || pageOption.sortBy.length === 0) {
                    return ''
                }

                return `&orderBy=${pageOption.sortBy.map(({key, order}) => `${key} ${order}`).join(',')}`
            }
        },
        post: function (data) {
            return reqInstance.post(url, data).catch(function (error) {
                return __catchError(error)
            })
        },
        put: function (data) {
            return reqInstance.put(url, data).catch(function (error) {
                return __catchError(error)
            })
        },
        patch: function (data) {
            return reqInstance.patch(url, data).catch(function (error) {
                return __catchError(error)
            })
        },
        delete: function () {
            return reqInstance.delete(url).catch(function (error) {
                return __catchError(error)
            })
        },
        getBlob: function () {
            reqInstance.defaults.responseType = 'blob'
            return reqInstance.get(url).catch(function (error) {
                return __catchError(error)
            })
        }
    }

// Private Function of sendRequest
    function __catchError(err) {
        __hideLoading(url)
        if (err?.response?.data?.message != null) {
            toast.error(err.response.data.message)
            return Promise.reject(err.response.data.message)
        }
        if (err?.message) {
            toast.error(err.message)
        }
        return Promise.reject(err?.message)
    }

    function __showLoading(url) {
        loadingUrls.push(url)
        const loading = getGlobalLoading()
        if (loading) {
            let urlSource = null
            try {
                const urlObj = new URL(url, window.location.origin)
                urlSource = urlObj.pathname
            } catch (error) {
                // If URL parsing fails, try to extract pathname manually
                try {
                    const match = url.match(/\/[^?#]*/)
                    urlSource = match ? match[0] : url
                } catch {
                    urlSource = url
                }
            }
            const globalT = getGlobalT()
            const message = globalT ? globalT('loading.fetchDataFrom', {source: urlSource}) : `در حال بارگذاری از ${urlSource}...`
            loading.show(message)
            if (loadingUrls.length === 0) {
                loading.hide()
            }
        }
    }

    function __hideLoading(url) {
        const index = loadingUrls.indexOf(url)
        if (index > -1) {
            loadingUrls.splice(index, 1)
        }
        const loading = getGlobalLoading()
        if (loading) {
            if (loadingUrls.length === 0) {
                loading.hide()
            }
        }
    }

    function __initOptions(options) {
        options = options || {}
        options.needToken = options.needToken !== false
        options.customToken = options.customToken ?? null
        return options
    }

    function __initAxiosInstance(url) {
        let reqInstance = axios.create()
        reqInstance.interceptors.response.use(function (response) {
            __hideLoading(url)
            if (response.config.responseType === 'blob') {
                return response
            }
            if (response.data?.status === false) {
                if (response.data?.message !== null) {
                    const errorMessage = response.data.message?.message ?? response.data.message
                    toast.error(errorMessage)
                    return Promise.reject(errorMessage)
                }
                const errorMsg = t('errors.somethingWentWrong')
                return Promise.reject(errorMsg)
            }
            return response.data.data
        })
        return reqInstance
    }

    function __getToken(options) {
        if (options.customToken) {
            return options.customToken
        }
        if (options.needToken) {
            return useUserStore().token
        }
        return null
    }
}

// ---------------------------------------------------------------------------------------------------------------------
