import express from 'express'
import dotenv from 'dotenv'
import * as bodyParser from 'body-parser'
import {sendMail} from './mail/mailerService'
import { FormKeys, formRules} from 'nettbureau_common'
import {createConfirmMail, createPersonaMail} from './mail/mailTemplates'
import { validateAgainstRules, validZip} from './validation/validate'
const app = express()
app.use(bodyParser.json())
dotenv.config()

app.post('/api/user', async (req, res) => {
    const formData: Record<FormKeys, string> = req.body
    const validationResult = [
        ...validateAgainstRules(formRules.required, formData.firstName, FormKeys.FirstName),
        ...validateAgainstRules(formRules.required, formData.surName, FormKeys.SurName),
        ...validateAgainstRules(formRules.required, formData.address, FormKeys.Address),
        ...validateAgainstRules([...formRules.required, ...formRules.email], formData.email, FormKeys.Email),
        ...validateAgainstRules([...formRules.required, ...formRules.phone], formData.phoneNumber, FormKeys.PhoneNumber),
        ...validateAgainstRules([...formRules.required,...formRules.zipCode, validZip], formData.zipCode, FormKeys.ZipCode),
    ]

    if(validationResult.length === 0) {
        try {
            const ioMessage = createPersonaMail(formData)
            await sendMail('io@nettbureau.no.', 'Personal info', ioMessage)

            const confirmMessage = createConfirmMail(`${formData.firstName} ${formData.surName}`)
            await sendMail(formData.email, 'We recieved your personal data', confirmMessage)
            res.sendStatus(200)
        } catch (err) {
            res.status(500).send({error: err})
        }
    } else {
        res.status(400).send({ error: validationResult })
    }
})

app.listen(8081, () => {
    console.log('Running on 8081')
})
