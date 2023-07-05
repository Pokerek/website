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

import ROUTES from "./constants/routes";

import "./styles/index.scss";
import ErrorPage from "./pages/ErrorPage/error-page";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<App />}
      errorElement={<ErrorPage />}
    >
      <Route
        path={ROUTES.HOME_PAGE.PATH}
        element={<MainPage />}
      />
      <Route
        path={ROUTES.JOURNAL_PAGE.PATH}
        element={<JournalPage />}
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
