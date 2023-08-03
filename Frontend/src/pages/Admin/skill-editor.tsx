import {
    useState,
    FormEvent,
    ChangeEvent
} from "react";
import {
    useLoaderData,
    useSubmit
} from "react-router-dom";

import Button from "../../components/custom/button";
import {
    Editor,
    Form,
    Input,
    Select
} from "../../components/editor";
import useUploadImage from "../../hooks/useUploadImage";

const SkillEditor = () => {
    const skill = useLoaderData() as Skill | null;
    const [newSkill, setNewSkill] = useState(
        skill || {
            name: "",
            category: "",
            order: 0
        },
    );

    const { setImage, uploadImage } = useUploadImage();
    const submit = useSubmit();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setImage(e.currentTarget.image.files[0]);
        const formData = new FormData(e.currentTarget);

        const imageUrl = await uploadImage(newSkill.name);
        if (imageUrl) {
            formData.set("imageUrl", imageUrl);
        }

        submit(formData, { method: skill ? "PATCH" : "POST" });
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.currentTarget.files) return;

        setImage(e.currentTarget.files[0]);
    };

    return (
        <Editor>
            <h1>Skill Editor</h1>
            <Form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    name="name"
                    id="name"
                    label="Name"
                    value={newSkill.name}
                    onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                />
                <Select
                    name="category"
                    id="category"
                    label="Category"
                    value={newSkill.category}
                    onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
                    options={[
                        'frontend',
                        'backend',
                        'tool'
                    ]}
                />
                <Input
                    type="number"
                    name="order"
                    id="order"
                    label="Order"
                    value={newSkill.order}
                    onChange={(e) => setNewSkill({ ...newSkill, order: parseInt(e.target.value) })}
                    min={0}
                />
                <Input
                    type="file"
                    name="image"
                    id="image"
                    label="Image"
                    onChange={handleImageChange}
                    accept="image/*"
                />
                {skill && (
                    <>
                        <input type="hidden" name="id" value={skill.id} />
                        <input type="hidden" name="imageUrl" value={skill.imageUrl} />
                    </>
                )}
                <Button type="submit">Submit</Button>
            </Form>
        </Editor>
    )
}

export default SkillEditor;