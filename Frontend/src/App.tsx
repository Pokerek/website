import "./App.scss";
import { Routes, Route } from "react-router-dom";

import { Footer } from "./components/Layout/footer/Footer";
import { Header } from "./components/Layout/header/Header";
import { Welcome } from "./pages/welcome/Welcome";
import About from "./pages/About/About";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Journal from "./pages/Journal/Journal";
import Projects from "./pages/Projects/Projects";
import { Container } from "./components/Layout/container/Container";
import { SecretContext } from "./context/SecretContext";
import useSecret from "./hooks/useSecret";
import { LoginForm } from "./pages/Admin/LoginForm";

function App() {
  const { activeSecret, handleKeyPress } = useSecret(
    process.env.REACT_APP_SECRET_PASSWORD,
  );

  return (
    <SecretContext.Provider value={{ isAdmin: activeSecret }}>
      <div className="App" onKeyUp={handleKeyPress}>
        <Header />
        <Container>
          <Routes>
            <Route path="/">
              <Route index element={<Welcome />} />
              <Route path="about.me" element={<About />} />
              <Route path="journal.dev" element={<Journal />} />
              <Route path="project.file" element={<Projects />} />
              {activeSecret && <Route path="admin" element={<LoginForm />} />}
              <Route path="*" element={<ErrorPage />} />
            </Route>
          </Routes>
        </Container>
        <Footer />
      </div>
    </SecretContext.Provider>
  );
}

export default App;
