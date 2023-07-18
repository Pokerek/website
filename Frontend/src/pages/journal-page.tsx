import { useState } from "react";
import { useActionData, useLoaderData, useSubmit } from "react-router-dom";

import JournalPost from "../components/journal/journal-post";

import "./journal-page.scss";
import PostsService from "../services/posts-service";
import Button from "../components/custom/button";

export default function JournalPage() {
  const [page, setPage] = useState(2);
  const [isMorePosts, setIsMorePosts] = useState(true);
  const postsFromLoader = useLoaderData() as Post[];
  const [posts, setPosts] = useState(postsFromLoader);

  const handlePostsLoad = async () => {
    const newPosts = await PostsService.getPosts(page);
    setPosts([...posts, ...newPosts]);

    if (posts.length / page > newPosts.length) {
      setIsMorePosts(false);
      return;
    }

    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="journal">
      <h1 className="journal__title">Journal</h1>
      <div className="journal__posts">
        {posts.map((post) => (
          <JournalPost
            key={post.id}
            post={post}
          />
        ))}
      </div>
      {isMorePosts && (
        <Button
          className="journal__load-more"
          onClick={handlePostsLoad}
        >
          Load more
        </Button>
      )}
    </div>
  );
}
