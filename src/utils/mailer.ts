import nodemailer, { SendMailOptions } from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'
import log from './logger'


const smtp = {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
}

const transporter = nodemailer.createTransport({
    ...smtp,
    auth: {user: smtp.user, pass: smtp.pass },
} as SMTPTransport.Options)


async function sendEmail(payload: SendMailOptions) {
    transporter.sendMail(payload, (err, info) => {
        if(err) {
            log.error(`${err} Error sending email`)
            return
        }
        log.info(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`)
    })
}


export default sendEmail