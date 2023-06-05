import { Button } from "../../../components/custom/Button/Button";
import ScrollSection from "../ScrollSection/ScrollSection";
import "./Contact.scss";

const Contact = () => {
  return (
    <ScrollSection id="contact">
      <h2>Send a Transmission</h2>
      <h3 className="contact__subtitle">or use external connection</h3>
      <Button>Email: karolchrobok@gmail.com</Button>
      <Button>Linkedin: karol-chrobok</Button>
      <h3 className="contact__subtitle">May the Force be with You!</h3>
    </ScrollSection>
  );
};

export default Contact;
