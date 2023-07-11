import { Request, Response } from 'express';
import { transporter, MailOptions } from '../config/mailer';
import { MailMessage } from '../types/mail';
import HttpError from '../errors/http-error';

class MailController {
  public sendMail = async (req: Request, res: Response) => {
    const mailMessage = req.body as MailMessage;

    const mailOptions = MailOptions(mailMessage);

    try {
      await transporter.sendMail(mailOptions);
      return res.json({ message: 'Email sent' });
    } catch (error) {
      return new HttpError(500, 'Error sending email');
    }
  };
}

export default MailController;
