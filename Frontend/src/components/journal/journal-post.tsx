import { ReactMarkdown } from "react-markdown/lib/react-markdown";

import useAuth from "../../hooks/useAuth";
import Button from "../custom/button";
import { routesPaths } from "../../routes";

import "./journal-post.scss";

interface JournalPostProps {
  post: Post,
  showActions: boolean,
}

const JournalPost = ({ post, showActions }: JournalPostProps) => {
  const { authenticated } = useAuth();

  const { id, title, createdDate, text } = post;
  const date = new Date(createdDate).toLocaleDateString("en-GB");

  return (
    <article className="journal-post">
      <header className="journal-post__header">
        <h2 className="journal-post__title">{title}</h2>
        <p className="journal-post__date">{date}</p>
        {authenticated &&
          showActions &&
          (
            <div className="journal-post__actions">
              <Button link={`${routesPaths.WRITE_POST_PAGE}/${id}`}>Edit</Button>
            </div>
          )
        }
      </header>
      <ReactMarkdown className="journal-post__content">{text}</ReactMarkdown>
    </article>
  );
};

export default JournalPost;
