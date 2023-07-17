import { BACKEND_URL } from "../constants";

export default class MailService {
    static async sendMail(mail: Mail): Promise<void> {
        const response = await fetch(`${BACKEND_URL}/sendMessage`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(mail),
        });

        if (!response.ok) {
            throw new Error("Failed to send email");
        }
    }
}