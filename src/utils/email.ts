import nodemailer from 'nodemailer'
import { env } from '../config/env.js'

let transporter: nodemailer.Transporter | null = null

try {
  if (env.emailHost && env.emailUser && env.emailPass) {
    transporter = nodemailer.createTransport({
      host: env.emailHost,
      port: env.emailPort,
      secure: false,
      auth: {
        user: env.emailUser,
        pass: env.emailPass
      }
    })
  }
} catch (error) {
  console.warn('Email configuration not available:', error)
}

interface EmailOptions {
  to: string
  subject: string
  text: string
  html?: string
}

export const sendEmail = async (options: EmailOptions) => {
  try {
    if (!transporter) {
      console.log('Email would be sent:', options)
      return
    }

    const mailOptions = {
      from: `E-Commerce API <${env.emailUser}>`,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html
    }

    await transporter.sendMail(mailOptions)
    console.log('Email sent successfully to:', options.to)
  } catch (error) {
    console.error('Email sending failed:', error)
    // Don't throw error to prevent API crashes
  }
}