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

function App() {
  return (
    <div className="App">
      <Header />
      <Container>
        <Routes>
          <Route path="/">
            <Route index element={<Welcome />} />
            <Route path="about.me" element={<About />} />
            <Route path="journal.dev" element={<Journal />} />
            <Route path="project.file" element={<Projects />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
