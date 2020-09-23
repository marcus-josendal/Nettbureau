import nodemailer from 'nodemailer'
import {FormKeys} from 'nettbureau_common'

export const sendMail = async (to: string, subject: string, messageObject: Record<FormKeys, string>) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'nettbureau.task.test.email@gmail.com',
            pass: 'ggvwr33rfef5ywre'
        }
    })

    const html = createHTMLMessage(messageObject)
    const mailOptions = {
        to,
        html,
        subject,
        from: 'nettbureau.task.test.email@gmail.com'
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    })
}

export const createHTMLMessage = (messageObject: Record<FormKeys, string>): string => {
    const listItems = Object.entries(messageObject).map(([key, val]) => {
        const keySplit = key.replace(/([A-Z]+)*([A-Z][a-z])/g, "$1 $2")
        const formattedKey = keySplit.charAt(0).toUpperCase() + keySplit.toLowerCase().slice(1)
        return `<li><span style="font-weight: bold">${formattedKey}</span>: ${val}</li>`
    }).join('')

    return `
            <h2>New personal information submitted</h2>
            <ul>
                ${listItems}
            </ul>
        `
}
