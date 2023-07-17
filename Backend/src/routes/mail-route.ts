import GenericRoute from "./generic-route";
import MailController from "../controllers/mail-controller";

class MailRoutes extends GenericRoute {
  private mailController = new MailController();

  constructor() {
    super("/sendMessage");

    this.router.post(
      this.path,
      this.mailController.sendMail
    );
  }
}

export default MailRoutes;
