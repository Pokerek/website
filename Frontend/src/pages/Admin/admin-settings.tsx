import { useLoaderData } from "react-router-dom";
import { useState } from "react";

import Button from "../../components/custom/button";

import { routesPaths } from "../../routes";

import "./admin-settings.scss";

const AdminSettings = () => {
    const data = useLoaderData() as { skills: Skill[], projects: Project[], experiences: Experience[] };

    const [showSkills, setShowSkills] = useState<boolean>(false);
    const [showProjects, setShowProjects] = useState<boolean>(false);
    const [showExperiences, setShowExperiences] = useState<boolean>(false);

    const { skills, projects, experiences } = data;

    return (
        <div className="admin-settings">
            <h2 className="title">Admin settings</h2>
            <div className="admin-settings__lists-container">
                <div className="admin-settings__list">
                    <h3 className="admin-settings__list-header">
                        Skills
                        <Button onClick={() => setShowSkills(!showSkills)} className="admin-settings__button">{showSkills ? "Hide" : "Show"}</Button>
                    </h3>
                    <ul className={`admin-settings__list-body${showSkills ? ' active' : ''}`}>
                        {
                            skills
                                .map(skill => (
                                    <li key={skill.id} className="admin-settings__item">
                                        {`${skill.name} | ${skill.category} | ${skill.order}`}
                                        <p className="admin-settings__item-actions">
                                            <Button link={`${routesPaths.SKILL_FORM_PAGE}/${skill.id}`} className="admin-settings__button">Edit</Button>
                                        </p>
                                    </li>
                                ))
                        }
                    </ul>
                </div>
                <div className="admin-settings__list">
                    <h3 className="admin-settings__list-header">
                        Projects
                        <Button onClick={() => setShowProjects(!showProjects)} className="admin-settings__button">{showProjects ? "Hide" : "Show"}</Button>
                    </h3>
                    <ul className={`admin-settings__list-body${showProjects ? ' active' : ''}`}>
                        {
                            projects.map(project => (
                                <li key={project.id} className="admin-settings__item">
                                    {`${project.name}`}
                                    <p className="admin-settings__item-actions">
                                        <Button link={`${routesPaths.PROJECT_FORM_PAGE}/${project.id}`} className="admin-settings__button">Edit</Button>
                                    </p>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="admin-settings__list">
                    <h3 className="admin-settings__list-header">
                        Experiences
                        <Button onClick={() => setShowExperiences(!showExperiences)} className="admin-settings__button">{showExperiences ? "Hide" : "Show"}</Button>
                    </h3>
                    <ul className={`admin-settings__list-body${showExperiences ? ' active' : ''}`}>
                        {
                            experiences.map(experience => (
                                <li key={experience.id} className="admin-settings__item">
                                    {`${experience.title} | ${experience.company}`}
                                    <p className="admin-settings__item-actions">
                                        <Button link={`${routesPaths.EXPERIENCE_FORM_PAGE}/${experience.id}`} className="admin-settings__button">Edit</Button>
                                    </p>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default AdminSettings;