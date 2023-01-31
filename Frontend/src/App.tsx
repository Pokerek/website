import "./App.scss";
import { Routes, Route } from "react-router-dom";
import { useContext } from "react";

import { Footer } from "./components/Layout/footer/Footer";
import { Header } from "./components/Layout/header/Header";
import { Welcome } from "./pages/welcome/Welcome";
import About from "./pages/About/About";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Journal from "./pages/Journal/Journal";
import ProjectList from "./pages/Projects/ProjectsList";
import { Container } from "./components/Layout/container/Container";
import { LoginForm } from "./pages/Admin/LoginForm";
import { WritePost } from "./pages/Journal/WritePost";
import { AuthContext } from "./context/AuthContext";

function App() {
  const Authentication = useContext(AuthContext);

  return (
    <div className="App" onKeyDown={Authentication?.handleKeyPress}>
      <Header />
      <Container>
        <Routes>
          <Route path="/">
            <Route index element={<Welcome />} />
            <Route path="about.me" element={<About />} />
            <Route path="journal.dev" element={<Journal />} />
            <Route path="project.file" element={<ProjectList />} />
            {Authentication?.isAdmin && (
              <Route path="admin/">
                <Route index element={<LoginForm />} />
                <Route path="edit" element={<WritePost />} />
              </Route>
            )}
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
