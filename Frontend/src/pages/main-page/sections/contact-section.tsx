import Button from "../../../components/custom/button";

import ScrollSection from "../components/scroll-section";
import ContactForm from "../components/contact-form";

const ContactSection = () => {
  return (
    <ScrollSection id="contact">
      <h2 className="title">Send a Transmission</h2>
      <ContactForm />
      <p className="description">or use external connection</p>
      <Button href="mailto:karolchrobok@gmail.com">Email: karolchrobok@gmail.com</Button>
      <Button href="https://www.linkedin.com/in/karol-chrobok/">Linkedin: karol-chrobok</Button>
      <p className="description">May the Force be with You!</p>
    </ScrollSection>
  );
};

export default ContactSection;
