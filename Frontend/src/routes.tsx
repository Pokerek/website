import { RouteObject } from "react-router-dom";

import MainPage from "./pages/main-page";
import JournalPage from "./pages/journal-page";
import ProjectsPage from "./pages/projects/projects-page";
import ErrorPage from "./pages/ErrorPage/error-page";

import AdminPage from "./pages/Admin/admin-page";
import LoginPage from "./pages/Admin/login-page";
import AdminSettings from "./pages/Admin/admin-settings";

import mainPageLoader from "./loaders/main-page-loader";
import journalPageLoader from "./loaders/journal-page-loader";
import projectsPageLoader from "./loaders/projects-page-loader";
import authLoader from "./loaders/auth-loader";
import adminSettingsLoader from "./loaders/admin-settings-loader";

import loginPageAction from "./actions/login-page-action";
import logoutAction from "./actions/logout-action";
import sendMailAction from "./actions/send-mail-action";

import PostEditor from "./pages/Admin/post-editor";
import postEditorLoader from "./loaders/post-editor-loader";
import postEditorAction from "./actions/post-editor-action";

import SkillEditor from "./pages/Admin/skill-editor";
import skillEditorLoader from "./loaders/skill-editor-loader";
import skillEditorAction from "./actions/skill-editor-action";

import ProjectEditor from "./pages/Admin/project-editor";
import projectEditorLoader from "./loaders/project-editor-loader";
import projectEditorAction from "./actions/project-editor-action";

import ExperienceEditor from "./pages/Admin/experience-editor";
import experienceEditorLoader from "./loaders/experience-editor-loader";
import experienceEditorAction from "./actions/experience-editor-action";

import App from "./App";

export const routesPaths = {
    HOME_PAGE: '/',
    JOURNAL_PAGE: '/journal',
    PROJECT_PAGE: '/project',
    ADMIN_PAGE: '/admin',
    LOGIN_PAGE: '/login',
    LOGOUT_PAGE: '/admin/logout',
    WRITE_POST_PAGE: '/admin/write',
    SKILL_FORM_PAGE: '/admin/skill',
    PROJECT_FORM_PAGE: '/admin/project',
    EXPERIENCE_FORM_PAGE: '/admin/experience',
}

const routes: RouteObject[] = [
    {
        path: '/',
        element: < App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: routesPaths.HOME_PAGE,
                element: <MainPage />,
                loader: mainPageLoader,
                action: sendMailAction,
            },
            {
                path: routesPaths.PROJECT_PAGE,
                element: <ProjectsPage />,
                loader: projectsPageLoader,
            },
            {
                path: routesPaths.JOURNAL_PAGE,
                element: <JournalPage />,
                loader: journalPageLoader,
            },
            {
                path: routesPaths.LOGIN_PAGE,
                element: <LoginPage />,
                action: loginPageAction,
            },
            {
                path: routesPaths.ADMIN_PAGE,
                loader: authLoader,
                element: <AdminPage />,
                children: [
                    {
                        path: routesPaths.ADMIN_PAGE,
                        element: <AdminSettings />,
                        loader: adminSettingsLoader,
                    },
                    {
                        path: `${routesPaths.SKILL_FORM_PAGE}/:id?`,
                        element: <SkillEditor />,
                        loader: skillEditorLoader,
                        action: skillEditorAction,
                    },
                    {
                        path: `${routesPaths.WRITE_POST_PAGE}/:id?`,
                        element: <PostEditor />,
                        loader: postEditorLoader,
                        action: postEditorAction,
                    },
                    {
                        path: `${routesPaths.PROJECT_FORM_PAGE}/:id?`,
                        element: <ProjectEditor />,
                        loader: projectEditorLoader,
                        action: projectEditorAction,
                    },
                    {
                        path: `${routesPaths.EXPERIENCE_FORM_PAGE}/:id?`,
                        element: <ExperienceEditor />,
                        loader: experienceEditorLoader,
                        action: experienceEditorAction
                    },
                    {
                        path: routesPaths.LOGOUT_PAGE,
                        action: logoutAction,
                    }
                ],
            }
        ]
    }
];

export default routes;