import { ReactMarkdown } from "react-markdown/lib/react-markdown";

import "./journal-post.scss";

const JournalPost = () => {
  return (
    <article className="journal-post">
      <header className="journal-post__header">
        <h2 className="journal-post__title">Day 0</h2>
        <p className="journal-post__date">2023-06-02</p>
      </header>
      <ReactMarkdown className="journal-post__content">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident eos
        unde magnam, ipsum facilis quam vero cupiditate officiis porro dolores
        ea dolorem eligendi voluptas magni omnis temporibus reiciendis ullam
        aliquam?
      </ReactMarkdown>
    </article>
  );
};

export default JournalPost;
