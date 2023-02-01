import { useFetch } from "../../hooks/useFetch";
import { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

import { SuperBox } from "../../components/custom/SuperBox/SuperBox";
import { TPost } from "../../types/Post";
import { Post } from "./Post";
import { Loading } from "../../components/custom/Loading/Loading";
import { AuthContext } from "../../context/AuthContext";

import "./Journal.scss";

interface Posts {
  total: number;
  pages: number;
  posts: TPost[];
}

export default function Journal() {
  const [data, isLoading] = useFetch<Posts>(
    `${process.env.REACT_APP_BACKEND_URL}/posts`,
  );

  const [posts, setPosts] = useState<TPost[]>([]);
  const [page, setPage] = useState(2);
  const containerRef = useRef<HTMLDivElement>(null);

  const Authentication = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = async () => {
      const container = containerRef.current;
      if (!container) return;

      const bottomReached =
        container.scrollHeight - container.scrollTop <= container.clientHeight;
      if (!bottomReached) return;

      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/posts?page=${page}`,
      );
      const returnData: Posts = await response.json();
      if (returnData.pages < page) return;

      setPosts((prevPosts) => prevPosts.concat(returnData.posts));
      setPage(page + 1);
    };

    const container = containerRef.current;
    console.log(container);
    if (!container) return;

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [page]);

  useEffect(() => {
    if (data) setPosts(data.posts);
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
      <div className="journal__inner superBox__right" ref={containerRef}>
        {isLoading && <Loading />}
        {data && postsList}
      </div>
    </SuperBox>
  );
}
