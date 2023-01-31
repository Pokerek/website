import { useFetch } from "usehooks-ts";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

import { SuperBox } from "../../components/custom/SuperBox/SuperBox";
import { TPost } from "../../types/Post";
import { Post } from "./Post";
import { Loading } from "../../components/custom/Loading/Loading";
import { AuthContext } from "../../context/AuthContext";

import "./Journal.scss";

export default function Journal() {
  const { data } = useFetch<TPost[]>(
    `${process.env.REACT_APP_BACKEND_URL}/posts`,
  );
  const [posts, setPosts] = useState(data);
  const Authentication = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    setPosts(data);
  }, [data]);

  const postsList = posts?.map((post) => <Post key={post.title} post={post} />);

  return (
    <SuperBox className="journal">
      <div className="superBox__left">
        <h2 className="journal__title">Journal</h2>
        {Authentication?.isLogin && (
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              navigate("/admin/edit");
            }}
          >
            Write new Post
          </Button>
        )}
      </div>
      <div className="journal__inner superBox__right">
        {postsList || <Loading />}
      </div>
    </SuperBox>
  );
}
