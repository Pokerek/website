import { Button } from "../../../components/custom/Button/Button";
import ScrollSection from "../ScrollSection/ScrollSection";
import ContactForm from "./ContactForm";

const Contact = () => {
  return (
    <ScrollSection id="contact">
      <h2>Send a Transmission</h2>
      <ContactForm />
      <p>or use external connection</p>
      <Button>Email: karolchrobok@gmail.com</Button>
      <Button>Linkedin: karol-chrobok</Button>
      <p>May the Force be with You!</p>
    </ScrollSection>
  );
};

export default Contact;
