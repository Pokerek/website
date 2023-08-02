interface ProjectLinks {
    online?: string;
    github?: string;
}

interface Project {
    id: string;
    name: string;
    stack: string[];
    description: string;
    imageUrl: string;
    links?: ProjectLinks;
}

type ProjectInput = Omit<Project, "id">;