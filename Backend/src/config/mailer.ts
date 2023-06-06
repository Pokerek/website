import { createTransport } from 'nodemailer';
import { MailMessage } from '../types/mail';

const transporter = createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
});

const MailOptions = (mailBody: MailMessage) => {
  return {
    from: mailBody.email,
    to: process.env.EMAIL,
    subject: mailBody.subject,
    text: mailBody.message
  };
};

export { transporter, MailOptions };
