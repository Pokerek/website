interface Experience {
    id?: string;
    title: string;
    company: string;
    location: string;
    startDate: Date;
    endDate?: Date;
    technologies: string[];
    description: string;
}