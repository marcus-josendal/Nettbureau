import express from 'express'
import * as bodyParser from 'body-parser'
import {ErrorResponse, FormKeys, formRules} from 'nettbureau_common'
import {isNotNull} from './utils/isNotNull'
import * as postNumbers from '../post_number.json'
const app = express()
app.use(bodyParser.json())

type ValidationRule = (value: string) => boolean | string

const validateAgainstRules = (rules: ValidationRule[] | ValidationRule, value: string, field: FormKeys): ErrorResponse[] => {
    return (Array.isArray(rules) ? rules : [rules]).map(rule => {
        const message = rule(value)
        if (message === true) return null
        return {
            field,
            message: typeof message === 'string' ? message : 'Unexpected error'
        }
    }).filter(isNotNull)
}

const validZip = (v: string) => {
    return Object.values(postNumbers).some(({postalCode}) => v === postalCode) || 'Ugydlig Postnummer'
}

app.post('/api/user', async (req, res) => {
    const formData: Record<FormKeys, string> = req.body
    const validationResult = [
        ...validateAgainstRules(formRules.email, formData.email, FormKeys.Email),
        ...validateAgainstRules(formRules.required, formData.firstName, FormKeys.FirstName),
        ...validateAgainstRules(formRules.required, formData.surName, FormKeys.SurName),
        ...validateAgainstRules(formRules.phone, formData.phoneNumber, FormKeys.PhoneNumber),
        ...validateAgainstRules(formRules.email, formData.email, FormKeys.Email),
        ...validateAgainstRules([...formRules.zipCode, validZip], formData.zipCode, FormKeys.ZipCode),
        ...validateAgainstRules(formRules.required, formData.address, FormKeys.Address),
    ]

    //await sendMail('marcus19971997@gmail.com', 'Personal info', formData)
})

app.listen(8081, () => {
    console.log('Running on 8081')
})
