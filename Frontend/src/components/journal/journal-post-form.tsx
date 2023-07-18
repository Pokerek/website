import { Form } from "react-router-dom";

import Button from "../custom/button";

import "./journal-post-form.scss";

interface JournalPostFormProps {
  method: "POST" | "PATCH";
  post: Post;
  setPost: (post: Post) => void;
}

const JournalPostForm = ({ method, post, setPost }: JournalPostFormProps) => {
  const { title, text } = post;

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setPost({ ...post, [name]: value });
  };

  return (
    <Form
      method={method}
      className="journal-post-form"
    >
      <input
        type="hidden"
        name="id"
        value={post.id}
      />
      <label
        htmlFor="title"
        className="journal-post-form__label"
      >
        Title
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={handleInputChange}
          className="journal-post-form__input"
        />
      </label>
      <label
        htmlFor="text"
        className="journal-post-form__label"
      >
        Text
        <textarea
          id="text"
          name="text"
          value={text}
          onChange={handleInputChange}
          className="journal-post-form__textarea"
        />
      </label>
      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default JournalPostForm;
