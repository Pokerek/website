import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { SuperBox } from "../../components/custom/SuperBox/SuperBox";
import { WriteContext } from "../../context/WriteContext";
import { AuthContext } from "../../context/AuthContext";
import { TPost } from "../../types/Post";
import { Post } from "./Post";

import "./Post.scss";
import { Button } from "../../components/custom/Button/Button";
// import useCookies from "react-cookie/cjs/useCookies";

const NEW_POST: TPost = {
  title: "New Post",
  createdDate: new Date(),
  text: "Write new post...",
  tags: [],
};

export const WritePost = () => {
  const [title, setTitle] = useState("New Post");
  const [text, setText] = useState("Write new post...");
  const [post, setPost] = useState<TPost>(NEW_POST);
  const navigate = useNavigate();
  // const [cookies] = useCookies();

  const Write = useContext(WriteContext);
  const Authentication = useContext(AuthContext);
  if (!Write || !Authentication) return <Navigate to="/" />;

  const { isLogin } = Authentication;
  if (!isLogin) return <Navigate to="/" />;

  const date = new Date(post.createdDate).toISOString();

  // useEffect(() => {
  //   if (Write.post) {
  //     setTitle(Write.post.title);
  //     setText(Write.post.text);
  //     setPost(Write.post);
  //   }
  // }, []);

  // useEffect(() => {
  //   setPost((prevPost) => {
  //     return { ...prevPost, title, text };
  //   });
  // }, [title, text]);

  const handleSavePost = (post: TPost) => {
    const AuthCookie = null; // cookies["Authorization"];
    if (!AuthCookie) return navigate("/admin");

    const cookie = `Authorization=${AuthCookie}`;

    if (post._id) {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/posts/${post._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookie,
        },
        body: JSON.stringify(post),
        credentials: "include",
      })
        .then((response) => {
          if (response.status !== 200) throw Error("Something went wrong!");
        })
        .catch((error) => console.log(error));
    } else {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookie,
        },
        body: JSON.stringify(post),
        credentials: "include",
      })
        .then((response) => {
          if (response.status !== 200) throw Error("Something went wrong!");
        })
        .catch((error) => console.log(error?.message));
    }
    return navigate("/journal.dev");
  };

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
          <Button
            onClick={() => {
              handleSavePost(post);
            }}
            text="Save post"
            className="btn--green"
          />
        </article>
      </div>
      <div className="superBox__half">
        <Post post={post} />
      </div>
    </SuperBox>
  );
};
