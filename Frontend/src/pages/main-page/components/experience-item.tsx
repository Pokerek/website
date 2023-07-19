import { ReactMarkdown } from "react-markdown/lib/react-markdown";

import "./experience-item.scss";

const ExperienceItem = ({ experience }: { experience: Experience }) => {
    const { title, description, technologies } = experience;

    return (
        <div className="experience-item">
            <h3 className="experience-item__title">{title}</h3>
            <div className="experience-item__section">
                <h4 className="experience-item__subtitle">
                    Description
                </h4>
                <ReactMarkdown className="experience-item__description">{description}</ReactMarkdown>
            </div>
            <div className="experience-item__section">
                <h4 className="experience-item__subtitle">
                    Tech stack
                </h4>
                <ul className="experience-item__technologies">
                    {technologies.map((technology) => (
                        <li key={technology} className="experience-item__technology">
                            {technology}
                        </li>
                    ))}
                </ul>
            </div>

        </div>
    );
}

export default ExperienceItem;
