import { Button } from "../../../components/custom/Button/Button";
import Terminal from "../Terminal/Terminal";
import "./Contact.scss";

const Contact = () => {
  return (
    <section className="contact">
      <h2>Send a Transmission</h2>
      <Terminal />
      <h3 className="contact__subtitle">or use external connection</h3>
      <Button>Email: karolchrobok@gmail.com</Button>
      <Button>Linkedin: karol-chrobok</Button>
      <h3 className="contact__subtitle">May the Force be with You!</h3>
    </section>
  );
};

export default Contact;
