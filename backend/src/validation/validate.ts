import {ErrorResponse, FormKeys} from 'nettbureau_common'
import {isNotNull} from '../utils/isNotNull'
import * as postNumbers from '../../post_number.json'

type ValidationRule = (value: string) => boolean | string

export const validateAgainstRules = (rules: ValidationRule[] | ValidationRule, value: string, field: FormKeys): ErrorResponse[] => {
  return (Array.isArray(rules) ? rules : [rules]).map(rule => {
    const message = rule(value)
    if (message === true) return null
    return {
      field,
      message: typeof message === 'string' ? message : 'Unexpected error'
    }
  }).filter(isNotNull)
}

export const validZip = (v: string) => {
  return Object.values(postNumbers).some(({postalCode}) => v === postalCode) || 'Ugydlig Postnummer'
}
