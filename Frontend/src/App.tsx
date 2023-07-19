import { Outlet } from "react-router-dom";

import Header from "./components/layout/header";
import Container from "./components/layout/container";

function App() {
  return (
    <main className="App">

      <Header />
      <Container>
        <Outlet />
      </Container>

    </main>
  );
}

export default App;
