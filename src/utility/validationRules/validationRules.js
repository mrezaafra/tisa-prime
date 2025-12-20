import {isShebaValid} from "@/utility/validationRules/partials/_sheba.js"
//----------------------------------------------------------------------------------------------------------------------
import {i18n} from "@/plugins/i18n";
import {toast} from "vue-sonner";
import {isNullOrEmpty} from "@/utility/scripts/helper";

const {t} = i18n.global
//----------------------------------------------------------------------------------------------------------------------
export const ValidationRules = {
  Required: value => {
    return isNullOrEmpty(value) ? t('errors.requiredField') : true
  },
  Type: {
    Farsi: value => {
      if (isNullOrEmpty(value)) {
        return
      }
      const pattern = /[\u0600-\u06FF]+([0-9\u06F0-\u06F9]*)/g;
      return pattern.test(value) || t('errors.type.farsi')
    },
    English: value => {
      if (isNullOrEmpty(value)) {
        return
      }
      const pattern = /^[A-Za-z0-9\s\-_&^@#$%*!]+$/;
      return pattern.test(value) || t('errors.type.english')
    },
    Email: value => {
      if (isNullOrEmpty(value)) {
        return
      }
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return pattern.test(value) || t('errors.type.email')
    },
    ShamsiDate: value => {
      if (isNullOrEmpty(value)) {
        return
      }
      const pattern = /^(13|14)\d{2}\/(0[1-6]\/(0[1-9]|[12][0-9]|3[01])|(0[7-9]|1[0-2])\/(0[1-9]|[12][0-9]|30))$/
      return pattern.test(value) || t('errors.type.shamsiDate')
    },
    Time: value => {
      if (isNullOrEmpty(value)) {
        return
      }
      const pattern = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/
      return pattern.test(value) || t('errors.type.time')
    },
    Sheba: value => {
      if (isNullOrEmpty(value)) {
        return
      }
      return isShebaValid(value) || t('errors.type.sheba')
    },
    NationalCode: value => {
      if (isNullOrEmpty(value)) {
        return
      }

      let str = value.toString();

      // validate the string length and value
      const strLen = str.length, strVal = parseInt(str);
      if (strLen < 8 || strLen > 10 || isNaN(strVal) || strVal === 0)
        return false;

      // make sure the string is padded with zeros
      while (str.length < 10) str = '0' + str;

      // invalidate consecutive arrangement of the same digit
      if (str.match(/^(\d)\1+$/g)) return false;

      const checkDigit = parseInt(str.slice(-1));
      str = str.slice(0, -1); // remove the check digit
      let sum = 0
      for (let i = str.length; i > 0; i--) {
        sum += (i + 1) * str.substr(-i, 1);
      }
      // calculate sum modulo 11
      const mod = sum % 11;
      let flag = (mod < 2 && mod === checkDigit) || (mod >= 2 && mod + checkDigit === 11)

      return flag || t('errors.type.nationalCode');
    },
    ZipCode: value => {
      if (isNullOrEmpty(value)) {
        return
      }
      const pattern = /\b(?!(\d)\1{3})[13-9]{4}[1346-9][013-9]{5}\b/
      return pattern.test(value) || t('errors.type.zipCode')
    },
    DateTime: value => {
      if (isNullOrEmpty(value)) {
        return
      }
      const pattern = /^\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}$/
      return pattern.test(value) || t('errors.type.time')
    },
  },
  MinValue: (min) => (value) => {
    if (isNullOrEmpty(value)) {
      return
    }
    return +min <= +value || t('errors.min', {value: min, count: value})
  },
  MaxValue: (max) => (value) => {
    if (isNullOrEmpty(value)) {
      return
    }
    return +max >= +value || t('errors.max', {value: max, count: value})
  },
  MinChar: (min) => (value) => {
    if (isNullOrEmpty(value)) {
      return
    }
    value += ''
    return +min <= value.length || t('errors.minChar', {value: min, count: value.length})
  },
  MaxChar: (max) => (value) => {
    if (isNullOrEmpty(value)) {
      return
    }
    value += ''
    return +max >= value.length || t('errors.maxChar', {value: max, count: value.length})
  },
  ExactChar: (charLength) => (value) => {
    if (isNullOrEmpty(value)) {
      return
    }
    value += ''
    return +charLength === value.length || t('errors.exactChar', {value: charLength, count: value.length})
  }
}
// validateForm -----------------------------
export const validateForm = async function (formRef) {
  const {valid} = await formRef.value.validate()
  if (!valid) {
    toast.error($t('errors.validateInput'))
  }
  return valid;
}
