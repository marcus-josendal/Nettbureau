import {FormKeys} from 'nettbureau_common'

export const createPersonaMail = (messageObject: Record<FormKeys, string>): string => {
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

export const createConfirmMail = (fullName: string) => {
    return `
       <h2>We just received your information</h2>
       <span>Hello ${fullName}, thanks for submitting your info</span> 
    `
}
