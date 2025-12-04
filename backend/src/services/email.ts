import nodemailer from 'nodemailer';
import { logger } from '../config/logger';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

interface ContactEmailData {
  fullName: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
}

export const sendContactEmail = async (data: ContactEmailData) => {
  try {
    const mailOptions = {
      from: process.env.SMTP_FROM || 'noreply@korima.co.ke',
      to: process.env.CONTACT_EMAIL || 'korirjuliu001@gmail.com',
      replyTo: data.email,
      subject: `New Contact Form Submission from ${data.fullName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #1a472a; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #1a472a; }
            .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>New Contact Form Submission</h2>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Name:</div>
                <div>${data.fullName}</div>
              </div>
              <div class="field">
                <div class="label">Email:</div>
                <div><a href="mailto:${data.email}">${data.email}</a></div>
              </div>
              ${data.phone ? `
              <div class="field">
                <div class="label">Phone:</div>
                <div>${data.phone}</div>
              </div>
              ` : ''}
              ${data.company ? `
              <div class="field">
                <div class="label">Company:</div>
                <div>${data.company}</div>
              </div>
              ` : ''}
              <div class="field">
                <div class="label">Message:</div>
                <div>${data.message}</div>
              </div>
            </div>
            <div class="footer">
              <p>This email was sent from the Korima contact form.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);
    logger.info(`Contact email sent for ${data.fullName}`);
  } catch (error) {
    logger.error('Failed to send contact email:', error);
    throw new Error('Failed to send email');
  }
};

export const sendWelcomeEmail = async (email: string) => {
  try {
    const mailOptions = {
      from: process.env.SMTP_FROM || 'noreply@korima.co.ke',
      to: email,
      subject: 'Welcome to Korima Newsletter',
      html: `
        <!DOCTYPE html>
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #1a472a;">Welcome to Korima!</h2>
            <p>Thank you for subscribing to our newsletter.</p>
            <p>You'll receive updates about our latest projects, insights, and African tech innovations.</p>
            <p style="margin-top: 30px;">Best regards,<br>The Korima Team</p>
          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);
    logger.info(`Welcome email sent to ${email}`);
  } catch (error) {
    logger.error('Failed to send welcome email:', error);
  }
};
