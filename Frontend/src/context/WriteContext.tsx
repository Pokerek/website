import { createContext, useState, FC } from "react";
import { TPost } from "../types/Post";

interface Write {
  post: TPost | undefined;
  handlePostChange: (post: TPost) => void;
}

export const WriteContext = createContext<Write | null>(null);

export const WriteProvider: FC<{ children: JSX.Element }> = ({ children }) => {
  const [post, setPost] = useState<TPost>();

  const handlePostChange = (post: TPost) => {
    setPost(post);
  };

  return (
    <WriteContext.Provider value={{ post, handlePostChange }}>
      {children}
    </WriteContext.Provider>
  );
};
