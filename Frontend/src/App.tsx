import { useContext, useEffect } from "react";

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
import { WriteContext } from "./context/WriteContext";

function App() {
  return (
    <div className="App">
      <Header />
      <Container>
        <Welcome />
      </Container>
    </div>
  );
}

export default App;
