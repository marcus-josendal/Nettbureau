import nodemailer from 'nodemailer'

export const sendMail = async (to: string, subject: string, html: string) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USERNAME,
            pass: process.env.GMAIL_PASSWORD
        }
    })

    const mailOptions = {
        to,
        html,
        subject,
        from: process.env.GMAIL_USERNAME
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error)
            throw new Error('Could not send email')
        } else {
            console.log('Email sent: ' + info.response)
        }
    })
}
