import moment from "jalali-moment";
import toast from '@/utility/plugins/toast'
import { i18n } from '@/utility/plugins/i18n'

const { t } = i18n.global

export const digitsToEnglish = function (str) {
  if (str == null || typeof str === 'number') {
    return str
  }
  const lookupTable = {
    '۰': '0', '۱': '1', '۲': '2', '۳': '3', '۴': '4',
    '۵': '5', '۶': '6', '۷': '7', '۸': '8', '۹': '9',
    '٠': '0', '١': '1', '٢': '2', '٣': '3', '٤': '4',
    '٥': '5', '٦': '6', '٧': '7', '٨': '8', '٩': '9'
  };
  return str.replace(/[۰-۹٠-٩]/g, char => lookupTable[char]);
}
export const parseJwt = async function (token) {
  if (token != null) {
    let base64Url = token.split('.')[1]
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))
    return JSON.parse(jsonPayload)
  }
}
export const getShamsiDatePersianNumbers = function (date, withTime) {
  let option = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }
  if (withTime) {
    option['hour'] = '2-digit'
    option['minute'] = '2-digit'
  }
  return date.toLocaleDateString('fa-IR', option).replace('،', '')
}
export const persianDateToGregorian = function (persianDate, withTime = false) {
  let date = withTime
    ? moment.from(persianDate, 'fa', 'YYYY/MM/DD HH:mm:ss')
    : moment.from(persianDate, 'fa', 'YYYY/MM/DD')

  if (!date.isValid()) {
    return null
  }

  return withTime ? date.format('YYYY-MM-DD HH:mm:ss') : date.format('YYYY-MM-DD')
}
export const convertToShamsiDate = function (date, withTime = false) {
  let persianDate = date
  if (date && typeof date === 'object') {
    persianDate = digitsToEnglish(getShamsiDatePersianNumbers(date, withTime))
  } else if (date && (typeof date === 'string' || typeof date === 'number')) {
    let dateObject = new Date(date)
    if (dateObject.toString() === 'Invalid Date') {
      persianDate = null
    } else {
      persianDate = digitsToEnglish(getShamsiDatePersianNumbers(new Date(date), withTime))
    }
  }
  return persianDate
}
export const findInObjectOfObjects = function (object, searchKey, value) {
  let key = Object.keys(object).filter(x => object[x][searchKey] === value);
  return !!key ? object[key] : null
}
export const domGenerator = function (data) {
  return {
    /**
     * Generate Dom from DataEnums
     * @param color
     * @returns string
     */
    textWithIcon: function (color = 'rgb(var(--v-theme-primary))') {
      return `<i class="v-icon mdi ${data.Icon}" style="font-size: 1.2rem; color:${data.Color ?? color}"></i><span class="mr-2">${data.Caption}</span>`
    }
  }
}
export const formatNumber = (number) => {
  if (number == null) {
    return null
  }
  let num = +(digitsToEnglish(number).toString().replaceAll(',', ''))
  return new Intl.NumberFormat().format(num)
}
export const isNullOrEmpty = (value) => {
  // null or undefined
  if (value === null || value === undefined) {
    return true
  }
  // string
  if (typeof value === 'string' && value.trim() === '') {
    return true
  }
  // array
  if (Array.isArray(value) && value.length === 0) {
    return true
  }
  // object
  if (typeof value === 'object' && Object.keys(value).length === 0) {
    return true
  }

  // otherwise
  return false
}
import {sendRequest} from '@/utility/scripts/requestManagement'

export const downloadServerFile = async function (url, fileName = null) {
  try {
    const response = await sendRequest(url).getBlob()
    downloadBlob(response)
  } catch (error) {
    const errorMessage = error?.message || error?.toString() || t('errors.fileDownloadError')
    toast.error(errorMessage)
    throw error
  }

  function downloadBlob(response) {
    try {
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(response.data)
      link.setAttribute('download', _getFileName())
      document.body.appendChild(link)
      link.click()

      // Cleanup
      setTimeout(() => {
        document.body.removeChild(link)
        window.URL.revokeObjectURL(link.href)
      }, 100)
    } catch (error) {
      console.error('Error downloading blob:', error)
      toast.error(t('errors.fileDownloadError'))
      throw error
    }

    function _getFileName() {
      let finalResult = fileName || 'download'

      try {
        const contentDisposition = response.headers?.get?.('Content-Disposition')
        if (contentDisposition) {
          const match = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)
          if (match && match[1]) {
            finalResult = fileName ?? decodeURIComponent(match[1].replace(/['"]/g, ''))
          }
        }
      } catch (error) {
        // Fallback to URL-based filename
        try {
          const urlParts = response.config?.url?.split('/') || []
          if (urlParts.length > 0) {
            finalResult = fileName ?? urlParts[urlParts.length - 1]
          }
        } catch {
          // Use default filename
        }
      }

      return finalResult
    }
  }
}
export const numberToWords = function (number) {
  if (isNullOrEmpty(number)) {
    return
  }
  const delimiter = ' و ';
  const zero = 'صفر';
  const negative = 'منفی ';
  const point = ' و ';
  const letters = [
    ['', 'یک', 'دو', 'سه', 'چهار', 'پنج', 'شش', 'هفت', 'هشت', 'نه'],
    ['ده', 'یازده', 'دوازده', 'سیزده', 'چهارده', 'پانزده', 'شانزده', 'هفده', 'هجده', 'نوزده', 'بیست'],
    ['', '', 'بیست', 'سی', 'چهل', 'پنجاه', 'شصت', 'هفتاد', 'هشتاد', 'نود'],
    ['', 'صد', 'دویست', 'سیصد', 'چهارصد', 'پانصد', 'ششصد', 'هفتصد', 'هشتصد', 'نهصد'],
    ['', ' هزار', ' میلیون', ' میلیارد', ' بیلیون', ' بیلیارد', ' تریلیون', ' تریلیارد', ' کوآدریلیون', ' کادریلیارد', ' کوینتیلیون', ' کوانتینیارد', ' سکستیلیون', ' سکستیلیارد', ' سپتیلیون', ' سپتیلیارد', ' اکتیلیون', ' اکتیلیارد', ' نانیلیون', ' نانیلیارد', ' دسیلیون', ' دسیلیارد'],
  ];
  const decimalSuffixes = [
    '',
    'دهم',
    'صدم',
    'هزارم',
    'ده‌هزارم',
    'صد‌هزارم',
    'میلیونوم',
    'ده‌میلیونوم',
    'صدمیلیونوم',
    'میلیاردم',
    'ده‌میلیاردم',
    'صد‌‌میلیاردم'
  ];
  const prepareNumber = (num) => {
    let out = num;
    if (typeof out === 'number') {
      out = out.toString();
    }
    if (out.length % 3 === 1) {
      out = `00${out}`;
    } else if (out.length % 3 === 2) {
      out = `0${out}`;
    }
    return out.replace(/\d{3}(?=\d)/g, '$&*').split('*');
  };
  const tinyNumToWord = (num) => {
    if (parseInt(num, 0) === 0) {
      return '';
    }
    const parsedInt = parseInt(num, 0);
    if (parsedInt < 10) {
      return letters[0][parsedInt];
    }
    if (parsedInt <= 20) {
      return letters[1][parsedInt - 10];
    }
    if (parsedInt < 100) {
      const one = parsedInt % 10;
      const ten = (parsedInt - one) / 10;
      if (one > 0) {
        return letters[2][ten] + delimiter + letters[0][one];
      }
      return letters[2][ten];
    }
    const one = parsedInt % 10;
    const hundreds = (parsedInt - (parsedInt % 100)) / 100;
    const ten = (parsedInt - ((hundreds * 100) + one)) / 10;
    const out = [letters[3][hundreds]];
    const secondPart = ((ten * 10) + one);
    if (secondPart === 0) {
      return out.join(delimiter);
    }
    if (secondPart < 10) {
      out.push(letters[0][secondPart]);
    } else if (secondPart <= 20) {
      out.push(letters[1][secondPart - 10]);
    } else {
      out.push(letters[2][ten]);
      if (one > 0) {
        out.push(letters[0][one]);
      }
    }
    return out.join(delimiter);
  };
  const convertDecimalPart = (decimalPart) => {
    decimalPart = decimalPart.replace(/0*$/, "");
    if (decimalPart === '') {
      return '';
    }
    if (decimalPart.length > 11) {
      decimalPart = decimalPart.slice(0, 11);
    }
    return point + num2persian(decimalPart) + ' ' + decimalSuffixes[decimalPart.length];
  };
  const num2persian = (input) => {
    input = input.toString().replace(/[^0-9.-]/g, '');
    let isNegative = false;
    const floatParse = parseFloat(input);
    if (isNaN(floatParse)) {
      return zero;
    }
    if (floatParse === 0) {
      return zero;
    }
    if (floatParse < 0) {
      isNegative = true;
      input = input.replace(/-/g, '');
    }
    let decimalPart = '';
    let integerPart = input;
    let pointIndex = input.indexOf('.');
    if (pointIndex > -1) {
      integerPart = input.substring(0, pointIndex);
      decimalPart = input.substring(pointIndex + 1, input.length);
    }
    if (integerPart.length > 66) {
      return 'خارج از محدوده';
    }
    const slicedNumber = prepareNumber(integerPart);
    const out = [];
    for (let i = 0; i < slicedNumber.length; i += 1) {
      const converted = tinyNumToWord(slicedNumber[i]);
      if (converted !== '') {
        out.push(converted + letters[4][slicedNumber.length - (i + 1)]);
      }
    }
    if (decimalPart.length > 0) {
      decimalPart = convertDecimalPart(decimalPart);
    }
    return (isNegative ? negative : '') + out.join(delimiter) + decimalPart;
  };
  // ------------------------------------------------------------
  let ans = num2persian(number)
  if ((number < 0 && number > -1) || (number > 0 && number < 1)) {
    ans = ans.replace(point, '')
  }

  return ans
}
export const updateTableOptionHelper = (option, tableOption, sortOptions, makeTableData) => {
  if (!option) {
    tableOption.value = null;
    makeTableData(null, true);
    return;
  }

  if (sortOptions == null) {
    sortOptions = option.sortBy || null;
  }

  tableOption.value = {...option, sortBy: sortOptions};
  makeTableData(tableOption.value)
}

export const validateForm = async function (formRefs) {
  if (!formRefs) {
    console.error('validateForm: formRefs is required')
    return false
  }

  let isValid = true
  // Handle both ref objects and plain objects
  const refs = formRefs.value || formRefs

  // Validate all inputs
  for (const key in refs) {
    const inputRef = refs[key]
    // Handle both ref.value and direct ref
    const actualRef = inputRef?.value || inputRef

    if (actualRef && typeof actualRef.validate === 'function') {
      const inputValid = actualRef.validate()
      if (!inputValid) {
        isValid = false
      }
    }
  }

  if (!isValid) {
    // Use window.toast which is set up globally in App.vue
    if (typeof window !== 'undefined' && window.toast) {
      window.toast.error(t('errors.validateInput'))
    } else {
      // Fallback to imported toast
      toast.error(t('errors.validateInput'))
    }
  }

  return isValid
}
