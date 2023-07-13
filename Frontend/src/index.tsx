import { createRoot } from "react-dom/client";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import App from "./App";
import MainPage from "./pages/main-page";
import JournalPage from "./pages/journal-page";
import ErrorPage from "./pages/ErrorPage/error-page";
import LoginPage from "./pages/Admin/login-page";

import mainPageLoader from "./loaders/main-page-loader";
import journalPageLoader from "./loaders/journal-page-loader";
import loginPageAction from "./actions/login-page-action";

import ROUTES from "./constants/routes";

import "./styles/index.scss";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<App />}
    >
      <Route
        path={ROUTES.HOME_PAGE.PATH}
        element={<MainPage />}
        loader={mainPageLoader}
      />
      <Route
        path={ROUTES.JOURNAL_PAGE.PATH}
        element={<JournalPage />}
        loader={journalPageLoader}
      />
      <Route path="/admin">
        <Route
          path={ROUTES.LOGIN_PAGE.PATH}
          element={<LoginPage />}
          action={loginPageAction}
        />
      </Route>
      <Route
        path="*"
        element={<ErrorPage />}
      />
    </Route>,
  ),
);

const container = document.getElementById("root");
if (!container) {
  throw new Error("No root element found");
}

const root = createRoot(container);
root.render(<RouterProvider router={router} />);
