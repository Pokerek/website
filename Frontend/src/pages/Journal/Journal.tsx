import { useFetch } from "usehooks-ts";
import { useState, useEffect } from "react";

import { SuperBox } from "../../components/SuperBox/SuperBox";
import { TPost } from "../../types/Post";
import { Post } from "./Post";
import { Loading } from "../../components/Loading/Loading";

import "./Journal.scss";

export default function Journal() {
  const { data } = useFetch<TPost[]>(
    `${process.env.REACT_APP_BACKEND_URL}/posts`,
  );
  const [posts, setPosts] = useState(data);

  useEffect(() => {
    setPosts(data);
  }, [data]);

  const postsList = posts?.map((post) => <Post key={post.title} post={post} />);
  return (
    <SuperBox className="journal">
      <h2 className="journal__title superBox__left">Journal</h2>
      <div className="journal__inner superBox__right">
        {postsList || <Loading />}
      </div>
    </SuperBox>
  );
}
