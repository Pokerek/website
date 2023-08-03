interface Experience {
    id?: string;
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate?: string;
    technologies: string[];
    description: string;
}

type ExperienceInput = Omit<Experience, "id">;