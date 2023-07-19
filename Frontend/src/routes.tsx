import { RouteObject } from "react-router-dom";

import MainPage from "./pages/main-page";
import JournalPage from "./pages/journal-page";
import ProjectsPage from "./pages/projects-page";
import ErrorPage from "./pages/ErrorPage/error-page";
import AdminPage from "./pages/Admin/admin-page";
import LoginPage from "./pages/Admin/login-page";
import PostPage from "./pages/Admin/post-page";

import mainPageLoader from "./loaders/main-page-loader";
import journalPageLoader from "./loaders/journal-page-loader";
import projectsPageLoader from "./loaders/projects-page-loader";
import postPageLoader from "./loaders/post-page-loader";
import authLoader from "./loaders/auth-loader";

import loginPageAction from "./actions/login-page-action";
import logoutAction from "./actions/logout-action";
import postPageAction from "./actions/post-page-action";
import sendMailAction from "./actions/send-mail-action";

import App from "./App";

export const routesPaths = {
    HOME_PAGE: '/',
    JOURNAL_PAGE: '/journal',
    PROJECT_PAGE: '/project',
    ADMIN_PAGE: '/admin',
    LOGIN_PAGE: '/login',
    LOGOUT_PAGE: '/admin/logout',
    WRITE_POST_PAGE: '/admin/write'
}

const routes: RouteObject[] = [
    {
        path: '/',
        element: < App />,
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
                        path: `${routesPaths.WRITE_POST_PAGE}/:id?`,
                        element: <PostPage />,
                        loader: postPageLoader,
                        action: postPageAction,
                    },
                    {
                        path: routesPaths.LOGOUT_PAGE,
                        action: logoutAction,
                    }
                ],
            },
            {
                path: "*",
                element: <ErrorPage />,
            },
        ]
    }
];

export default routes;