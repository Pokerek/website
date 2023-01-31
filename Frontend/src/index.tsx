import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";

import { WriteProvider } from "./context/WriteContext";
import { AuthProvider } from "./context/AuthContext";

import "./index.scss";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CookiesProvider>
        <WriteProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </WriteProvider>
      </CookiesProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
