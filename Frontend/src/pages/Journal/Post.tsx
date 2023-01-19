import { FC } from "react";
import ReactMarkdown from "react-markdown";

import { TPost } from "../../types/Post";

import "./Post.scss";

type props = {
  post: TPost;
};

export const Post: FC<props> = (props) => {
  const date = new Date(props.post.createdDate).toISOString();
  return (
    <article className="post">
      <header className="post__header">
        <h3 className="post__title">{props.post.title}</h3>
        <span className="post__date">{date.slice(0, date.indexOf("T"))}</span>
      </header>
      <ReactMarkdown className="post__text">{props.post.text}</ReactMarkdown>
    </article>
  );
};
