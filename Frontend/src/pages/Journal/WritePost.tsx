import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import { SuperBox } from "../../components/custom/SuperBox/SuperBox";
import { WriteContext } from "../../context/WriteContext";
import { AuthContext } from "../../context/AuthContext";
import { TPost } from "../../types/Post";
import { Post } from "./Post";

import "./Post.scss";

const NEW_POST: TPost = {
  title: "New Post",
  createdDate: new Date(),
  text: "Write new post...",
};

export const WritePost = () => {
  const [title, setTitle] = useState("New Post");
  const [text, setText] = useState("Write new post...");
  const [post, setPost] = useState<TPost>(NEW_POST);

  const Write = useContext(WriteContext);
  const Authentication = useContext(AuthContext);

  if (!Write || !Authentication) return <Navigate to="/" />;

  const { isLogin } = Authentication;
  if (!isLogin) return <Navigate to="/" />;

  if (Write.post) {
    setPost(Write.post);
  }

  useEffect(() => {
    setPost((prevPost) => {
      return { ...prevPost, title, text };
    });
  }, [title, text]);

  const date = new Date(post.createdDate).toISOString();

  return (
    <SuperBox>
      <div className="superBox__half">
        <article className="post">
          <header className="post__header">
            <input
              className="post__input"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <span className="post__date">
              {date.slice(0, date.indexOf("T"))}
            </span>
          </header>
          <textarea
            className="post__textArea"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </article>
      </div>
      <div className="superBox__half">
        <Post post={post} />
      </div>
    </SuperBox>
  );
};
