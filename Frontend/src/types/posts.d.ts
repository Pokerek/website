interface Post {
    id?: number;
    title: string;
    createdDate: Date;
    text: string;
}

type PostInput = Omit<Post, "id" | "createdDate">;

interface PostsResponse {
    total: number;
    pages: number;
    posts: Post[];
}