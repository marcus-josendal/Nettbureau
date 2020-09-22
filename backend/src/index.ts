import express from 'express'
import * as bodyParser from 'body-parser'
import {FormKeys, formRules} from 'nettbureau_common'
import {isNotNull} from './isNotNull'
const app = express()

// Gjøre validering av dataene vi får
// Sjekke postnummer opp mot Bring
// Bygge opp en error-response
// Sende epost varsel til io@nettbureau.no


type ErrorResponse = {
  field: FormKeys
  message: string
}

type ValidationRule = (value: string) => boolean | string

const validateAgainstRules = (rules: ValidationRule[] | ValidationRule, value: string, field: FormKeys): ErrorResponse[] =>
  (Array.isArray(rules) ? rules : [rules]).map(rule => {
    const message = rule(value)
    if (message === true) return null
    return {
      field,
      message: typeof message === 'string' ? message : 'Unexpected error'
    }
  }).filter(isNotNull)

app.use(bodyParser.json())

app.post('/api/user', (req, res) => {

  const formData: Record<FormKeys, string> = req.body
  console.log(formData)


  const validationResult = [
    ...validateAgainstRules(formRules.email, formData.email, FormKeys.Email),
    ...validateAgainstRules(formRules.required, formData.firstName, FormKeys.FirstName),
    ...validateAgainstRules(formRules.required, formData.surName, FormKeys.SurName),
  ]

  if(validationResult.length === 0) {
    res.send(200)
  } else {
    res.status(400)
    res.send(validationResult)
  }

  console.log(validationResult)

  res.end()

  // https://www.bring.no/radgivning/sende-noe/adressetjenester/postnummer/_/attachment/download/7f0186f6-cf90-4657-8b5b-70707abeb789:3b77c4350ff89d239ab8da139cd675c55c8300d7/Postnummerregister-ansi.txt
})

app.listen(8081, () => {
  console.log('Running on 8081')
})
