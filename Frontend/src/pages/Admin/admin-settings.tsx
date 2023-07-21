import { useLoaderData } from "react-router-dom";
import Button from "../../components/custom/button";

import "./admin-settings.scss";
import { routesPaths } from "../../routes";

const AdminSettings = () => {
    const data = useLoaderData() as { skills: Skill[] };

    const { skills } = data;

    return (
        <div className="admin-settings">
            <h2 className="title">Admin settings</h2>
            <div className="admin-settings__lists-container">
                <div className="admin-settings__list">
                    <h3 className="admin-settings__list-header">
                        Skills
                    </h3>
                    <ul className="admin-settings__list-body">
                        {
                            skills
                                .sort((a, b) => a.category < b.category ? -1 : 1)
                                .map(skill => (
                                    <li className="admin-settings__item">
                                        {`${skill.name} | ${skill.category}`}
                                        <p className="admin-settings__item-actions">
                                            <Button link={`${routesPaths.SKILL_FORM_PAGE}/${skill.id}`} className="admin-settings__button">Edit</Button>
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