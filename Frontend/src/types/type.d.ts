interface AuthResponse {
    username: string;
    expiresAt: string;
    message: string;
}

interface ErrorResponse {
    message: string;
}

interface MainPageLoaderResponse {
    skills: Skill[];
    experiences: Experience[];
}