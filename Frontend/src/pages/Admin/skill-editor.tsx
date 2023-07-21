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
import useUploadImage from "../../hooks/useUploadImage";

import "./skill-editor.scss";

const SkillEditor = () => {
    const skill = useLoaderData() as Skill | null;
    const [newSkill, setNewSkill] = useState(
        skill || {
            name: "",
            category: "",
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
        <div className="skill-editor">
            <h1>Skill Editor</h1>
            <form className="skill-editor__form" onSubmit={handleSubmit}>
                <label htmlFor="name"
                    className="skill-editor__label"
                >
                    Name
                    <input
                        type="text"
                        name="name"
                        id="name"
                        className="skill-editor__input"
                        value={newSkill.name}
                        onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                    />
                </label>
                <label
                    htmlFor="category"
                    className="skill-editor__label"
                >
                    Category
                    <select
                        name="category"
                        id="category"
                        value={newSkill.category}
                        className="skill-editor__input"
                        onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
                    >
                        <option value="frontend">Frontend</option>
                        <option value="backend">Backend</option>
                        <option value="tool">Tool</option>
                    </select>
                </label>
                <label
                    htmlFor="image"
                    className="skill-editor__label"
                >
                    Image
                    <input
                        type="file"
                        name="image"
                        id="image"
                        className="skill-editor__input"
                        onChange={handleImageChange}
                        accept="image/*"

                    />
                </label>
                {skill && (
                    <>
                        <input type="hidden" name="id" value={skill.id} />
                        <input type="hidden" name="imageUrl" value={skill.imageUrl} />
                    </>
                )}
                <Button type="submit">Submit</Button>
            </form>
        </div>
    )
}

export default SkillEditor;