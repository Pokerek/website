import ActionResult from "../generics/action-result";
import MailService from "../services/mail-service";

const mailSendAction = async ({ request }: any) => {
    const formData = await request.formData();

    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');

    try {
        await MailService.sendMail({
            name,
            email,
            subject,
            message
        });

        return new ActionResult(true, 'Email sent successfully');
    } catch (error) {
        return new ActionResult(false, 'Error occurred while sending email');
    }
}

export default mailSendAction;