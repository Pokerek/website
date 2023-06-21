import { Outlet } from "react-router-dom";

import Header from "./components/layout/header";
import Container from "./components/layout/container";
import Footer from "./components/layout/footer";

function App() {
  return (
    <main className="App">
      <Header />
      <Container>
        <Outlet />
      </Container>
      <Footer />
    </main>
  );
}

export default App;
