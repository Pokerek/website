import { createRoot } from "react-dom/client";
import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import "./styles/index.scss";
import routes from "./routes";
import { StrictMode } from "react";
import { AuthProvider } from "./contexts/auth-context";

const router = createBrowserRouter(routes
);

const container = document.getElementById("root");
if (!container) {
  throw new Error("No root element found");
}

const root = createRoot(container);
root.render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
