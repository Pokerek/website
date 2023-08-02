import { useState } from "react";
import { useLoaderData, useSubmit } from "react-router-dom";

import useUploadImage from "../../hooks/useUploadImage";

import {
    Editor,
    Form,
    Input,
    Select
} from "../../components/editor";
import Button from "../../components/custom/button";

const ProjectEditor = () => {
    const data = useLoaderData() as {
        project: Project | null,
        skills: Skill[]
    };

    const { setImage, uploadImage } = useUploadImage();
    const submit = useSubmit();

    const [name, setName] = useState(data.project?.name || "");
    const [description, setDescription] = useState(data.project?.description || "");
    const [gitHubLink, setGitHubLink] = useState(data.project?.links?.github || "");
    const [onlineLink, setOnlineLink] = useState(data.project?.links?.online || "");
    const [stack, setStack] = useState(data.project?.stack || []);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);
    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value);
    const handleGitHubLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => setGitHubLink(e.target.value);
    const handleOnlineLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => setOnlineLink(e.target.value);
    const handleStackChange = (e: React.ChangeEvent<HTMLSelectElement>) => setStack(Array.from(e.target.selectedOptions, option => option.value));
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.currentTarget.files) return;

        setImage(e.currentTarget.files[0]);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setImage(e.currentTarget.image.files[0]);
        const formData = new FormData(e.currentTarget);

        const imageUrl = await uploadImage(name);
        if (imageUrl) {
            formData.set("imageUrl", imageUrl);
        }
        formData.set("stack", JSON.stringify(stack))

        submit(formData, { method: data.project ? "PATCH" : "POST" });
    };
    return (
        <Editor>
            <h1>Project Editor</h1>
            <Form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    onChange={handleNameChange}
                />
                <Input
                    type="text"
                    name="description"
                    id="description"
                    value={description}
                    onChange={handleDescriptionChange}
                />
                <Select
                    name="stack"
                    id="stack"
                    value={stack}
                    options={data?.skills.map(skill => skill.name) || []}
                    onChange={handleStackChange}
                    multiple
                />
                <Input
                    type="text"
                    name="github"
                    id="github"
                    value={gitHubLink}
                    onChange={handleGitHubLinkChange}
                />
                <Input
                    type="text"
                    name="online"
                    id="online"
                    value={onlineLink}
                    onChange={handleOnlineLinkChange}
                />
                <Input
                    type="file"
                    name="image"
                    id="image"
                    onChange={handleImageChange}
                />
                {data.project && (
                    <>
                        <input type="hidden" name="id" value={data.project.id} />
                        <input type="hidden" name="imageUrl" value={data.project.imageUrl} />
                    </>
                )}
                <Button type="submit">Submit</Button>
            </Form>
        </Editor>
    )
}

export default ProjectEditor;