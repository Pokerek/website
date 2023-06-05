import { Button } from "../../../components/custom/Button/Button";
import "./ContactForm.scss";

const ContactForm = () => {
  return (
    <form className="contactForm">
      <div className="contactForm__double">
        <input
          className="contactForm__input"
          type="text"
          id="name"
          name="name"
          placeholder="Your name"
        />
        <input
          className="contactForm__input"
          type="email"
          id="email"
          name="email"
          placeholder="Your email"
        />
      </div>
      <input
        className="contactForm__input"
        type="text"
        id="subject"
        name="subject"
        placeholder="Subject"
      />
      <textarea
        className="contactForm__textarea"
        id="message"
        name="message"
        placeholder="Your message"
      />
      <Button type="submit">Send</Button>
    </form>
  );
};

export default ContactForm;
