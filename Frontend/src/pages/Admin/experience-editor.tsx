import {
    useLoaderData,
    useSubmit
} from "react-router-dom";
import {
    useState
} from "react";

import {
    Editor,
    Form,
    Input,
    Select,
    TextArea
} from "../../components/editor";
import Button from "../../components/custom/button";

const ExperienceEditor = () => {
    const data = useLoaderData() as {
        experience: Experience | null,
        skills: Skill[]
    };
    const { experience, skills } = data;
    const submit = useSubmit();

    const [title, setTitle] = useState(experience?.title || "");
    const [company, setCompany] = useState(experience?.company || "");
    const [location, setLocation] = useState(experience?.location || "");
    const [startDate, setStartDate] = useState(experience?.startDate || "");
    const [endDate, setEndDate] = useState(experience?.endDate || "");
    const [description, setDescription] = useState(experience?.description || "");
    const [technologies, setTechnologies] = useState(experience?.technologies || []);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
    const handleCompanyChange = (e: React.ChangeEvent<HTMLInputElement>) => setCompany(e.target.value);
    const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => setLocation(e.target.value);
    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => setStartDate(e.target.value);
    const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => setEndDate(e.target.value);
    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value);
    const handleTechnologiesChange = (e: React.ChangeEvent<HTMLSelectElement>) => setTechnologies(Array.from(e.target.selectedOptions, option => option.value));

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const fromData = new FormData(e.currentTarget);
        fromData.set("technologies", JSON.stringify(technologies));

        submit(fromData, { method: experience ? "PATCH" : "POST" });
    };

    return (
        <Editor>
            <h1>Experience Editor</h1>
            <Form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    name="title"
                    id="title"
                    label="Title"
                    value={title}
                    onChange={handleTitleChange}
                    placeholder="Title"
                />
                <Input
                    type="text"
                    name="company"
                    id="company"
                    label="Company"
                    value={company}
                    onChange={handleCompanyChange}
                    placeholder="Company"
                />
                <Input
                    type="text"
                    name="location"
                    id="location"
                    label="Location"
                    value={location}
                    onChange={handleLocationChange}
                    placeholder="Location"
                />
                <Input
                    type="date"
                    name="startDate"
                    id="startDate"
                    label="Start"
                    value={startDate}
                    onChange={handleStartDateChange}
                />
                <Input
                    type="date"
                    name="endDate"
                    id="endDate"
                    label="End"
                    value={endDate}
                    onChange={handleEndDateChange}
                />
                <TextArea
                    name="description"
                    id="description"
                    label="Description"
                    value={description}
                    onChange={handleDescriptionChange}
                    placeholder="Description"
                />
                <Select
                    name="technologies"
                    id="technologies"
                    label="Technologies"
                    value={technologies}
                    options={skills.map(skill => skill.name) || []}
                    onChange={handleTechnologiesChange}
                    multiple
                />
                {experience && (
                    <>
                        <input type="hidden" name="id" value={experience.id} />
                    </>
                )}
                <Button type="submit">Submit</Button>
            </Form>
        </Editor>
    );
}

export default ExperienceEditor;