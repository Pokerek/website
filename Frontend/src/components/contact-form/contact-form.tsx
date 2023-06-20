import { useState, FormEvent } from "react";

import Button from "../button/button";
import "./ContactForm.scss";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BACKEND_URL}/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.status !== 200) {
        throw new Error("Error occurred while submitting form");
      }

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (
    e: FormEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.currentTarget;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form className="contactForm" onSubmit={handleSubmit}>
      <div className="contactForm__double">
        <input
          className="contactForm__input"
          type="text"
          id="name"
          name="name"
          value={formData.name}
          placeholder="Your name"
          required
          onChange={handleChange}
        />
        <input
          className="contactForm__input"
          type="email"
          id="email"
          name="email"
          value={formData.email}
          placeholder="Your email"
          required
          onChange={handleChange}
        />
      </div>
      <input
        className="contactForm__input"
        type="text"
        id="subject"
        name="subject"
        value={formData.subject}
        placeholder="Subject"
        required
        onChange={handleChange}
      />
      <textarea
        className="contactForm__textarea"
        id="message"
        name="message"
        value={formData.message}
        placeholder="Your message"
        required
        onChange={handleChange}
      />
      <Button type="submit">Send</Button>
    </form>
  );
};

export default ContactForm;
