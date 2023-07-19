interface Post {
    id?: string;
    title: string;
    createdDate: Date;
    text: string;
}

type PostInput = Omit<Post, "id" | "createdDate">;
type PostUpdateInput = Omit<Post, "createdDate">;

interface PostsResponse {
    total: number;
    pages: number;
    posts: Post[];
}