import { createContext, useState, FC } from "react";
import { TPost } from "../types/Post";

interface Write {
  post: TPost | null;
  handlePostChange: (post: TPost | null) => void;
}

export const WriteContext = createContext<Write | null>(null);

export const WriteProvider: FC<{ children: JSX.Element }> = ({ children }) => {
  const [post, setPost] = useState<TPost | null>(null);

  const handlePostChange = (post: TPost | null) => {
    setPost(post);
  };

  return (
    <WriteContext.Provider value={{ post, handlePostChange }}>
      {children}
    </WriteContext.Provider>
  );
};
