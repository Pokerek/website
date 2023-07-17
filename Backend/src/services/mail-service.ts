import { createTransport } from 'nodemailer';

interface Address {
  name: string;
  address: string;
}

export interface MailInput {
  email: string;
  name: string;
  subject: string;
  message: string;
}


export default class MailService {
  private static transporter = createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  private static createMessage = (from: Address, subject: string, text: string) => {
    return {
      from,
      to: process.env.EMAIL as string,
      subject,
      text
    };
  };

  static sendMail = async ({ email, name, subject, message }: MailInput) => {
    const userAddress = { name: `${name} <${email}>`, address: email };
    const mail = this.createMessage(userAddress, subject, message);

    await this.transporter.sendMail(mail);
  }
}
