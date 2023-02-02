import { FC, useContext } from "react";
import ReactMarkdown from "react-markdown";
import { ButtonGroup, Button } from "@mui/material";
import { TPost } from "../../types/Post";

import "./Post.scss";
import { FaEdit } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { WriteContext } from "../../context/WriteContext";
import { AuthContext } from "../../context/AuthContext";

interface IProps {
  post: TPost;
}

export const Post: FC<IProps> = ({ post }) => {
  const navigate = useNavigate();
  const Write = useContext(WriteContext);
  const Authentication = useContext(AuthContext);
  const location = useLocation();

  const postDate = new Date(post.createdDate).toISOString();

  const isEdit = location.pathname.endsWith("edit");

  const handleEditAction = () => {
    if (Write) {
      Write.handlePostChange(post);

      navigate("/edit");
    }
  };

  return (
    <article className="post">
      <header className="post__header">
        <h3 className="post__title">{post.title}</h3>
        {Authentication?.isLogin && !isEdit && (
          <ButtonGroup>
            <Button
              variant="contained"
              color="success"
              startIcon={<FaEdit />}
              onClick={handleEditAction}
            >
              Edit
            </Button>
          </ButtonGroup>
        )}
        <span className="post__date">
          {postDate.slice(0, postDate.indexOf("T"))}
        </span>
      </header>
      <ReactMarkdown className="post__text">{post.text}</ReactMarkdown>
    </article>
  );
};
