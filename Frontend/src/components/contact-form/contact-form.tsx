import { useState, FormEvent, useEffect } from "react";
import { useActionData, useSubmit } from "react-router-dom";

import Button from "../custom/button";
import Message from "../custom/message";
import type ActionResult from "../../generics/action-result";

import "./contact-form.scss";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [visibleMessage, setVisibleMessage] = useState(false);
  const actionData = useActionData() as ActionResult | undefined;
  const [isSending, setIsSending] = useState(false);
  const submit = useSubmit();

  useEffect(() => {
    if (actionData?.success) {
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    }
    setVisibleMessage(true);
    setIsSending(false);
    setTimeout(() => {
      setVisibleMessage(false);
    }, 3000);
  }, [actionData]);

  const handleChange = (
    e: FormEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.currentTarget;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);
    submit(e.currentTarget, { method: "POST" });
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
      <Button type="submit" disabled={isSending}>
        {isSending ? "Sending..." : "Send"}
      </Button>
      {actionData && visibleMessage && (
        <Message text={actionData.message} type={actionData.success ? 'success' : 'error'} />
      )}
    </form>
  );
};

export default ContactForm;
