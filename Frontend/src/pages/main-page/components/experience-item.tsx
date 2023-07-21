import { ReactMarkdown } from "react-markdown/lib/react-markdown";

import "./experience-item.scss";

const convertDate = (date: Date) => {
    return date.getMonth() + 1 + "/" + date.getFullYear();
}

const ExperienceItem = ({ experience }: { experience: Experience }) => {
    const { title, description, technologies, startDate, endDate, company, location } = experience;
    const date = {
        start: convertDate(new Date(startDate)),
        end: endDate ? convertDate(new Date(endDate)) : "Present"
    }

    return (
        <div className="experience-item">
            <h3 className="experience-item__title">{title}</h3>
            <div className="experience-item__section">
                <p className="experience-item__text">{`${date.start} - ${date.end}`}</p>
                <p className="experience-item__text">{`${company}, ${location}`}</p>
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
            <div className="experience-item__section">
                <h4 className="experience-item__subtitle">
                    Description
                </h4>
                <ReactMarkdown className="experience-item__description">{description}</ReactMarkdown>
            </div>

        </div>
    );
}

export default ExperienceItem;
