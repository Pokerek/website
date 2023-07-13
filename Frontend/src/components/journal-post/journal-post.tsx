import { ReactMarkdown } from "react-markdown/lib/react-markdown";

import "./journal-post.scss";

interface JournalPostProps {
  post: Post;
}

const JournalPost = ({ post }: JournalPostProps) => {
  const { title, date, text } = post;

  return (
    <article className="journal-post">
      <header className="journal-post__header">
        <h2 className="journal-post__title">{title}</h2>
        <p className="journal-post__date">{date}</p>
      </header>
      <ReactMarkdown className="journal-post__content">{text}</ReactMarkdown>
    </article>
  );
};

export default JournalPost;
