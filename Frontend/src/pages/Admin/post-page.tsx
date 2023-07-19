import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import JournalPost from "../../components/journal/journal-post";
import JournalPostForm from "../../components/journal/journal-post-form";

const PostPage = () => {
  const post = useLoaderData() as Post | null;
  const [newPost, setNewPost] = useState(
    post || {
      title: "",
      createdDate: new Date(),
      text: "",
    },
  );

  return (
    <div>
      <JournalPostForm
        post={newPost}
        setPost={setNewPost}
        method={post ? "PATCH" : "POST"}
      />
      <h2 className="title">Preview</h2>
      <JournalPost
        post={newPost}
        showActions={false}
      />
    </div>
  );
};

export default PostPage;
